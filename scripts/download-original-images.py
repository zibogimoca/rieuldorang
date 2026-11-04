"""Download image assets referenced by imported pages, preserving file identities."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import json
import urllib.request

TARGET = Path('public/images/pages')
TARGET.mkdir(parents=True, exist_ok=True)
items = {}
for path in Path('src/content/pages').glob('*.json'):
    for item in json.loads(path.read_text())['images']:
        items[item['source']] = item['file']

def download(entry):
    name, filename = entry
    dest = TARGET / filename
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        return None
    url = f'https://static.wixstatic.com/media/{name}/v1/fit/w_1600,h_1600,q_85/{name}'
    try:
        with urllib.request.urlopen(url, timeout=45) as response:
            data = response.read()
        dest.write_bytes(data)
        return None
    except Exception as exc:
        return f'{name}: {exc}'

with ThreadPoolExecutor(max_workers=8) as pool:
    errors = [x for x in pool.map(download, items.items()) if x]
print(f'{len(items)-len(errors)}/{len(items)} images ready')
for error in errors:
    print(error)
if errors:
    raise SystemExit(1)
