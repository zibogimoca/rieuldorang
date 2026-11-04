"""Import original public page text and image URLs from saved Wix HTML.

Run from the repository root after placing the captured original HTML in
/tmp/rieul-pages. This script never changes application code or existing images.
"""
from html.parser import HTMLParser
from pathlib import Path
import json
import re

VOID_TAGS = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
SOURCE = Path('/tmp/rieul-pages')
OUTPUT = Path('src/content/pages')

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.images = []
        self.depth = 0
        self.parts = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if self.depth:
            if tag not in VOID_TAGS:
                self.depth += 1
            if tag in ('br', 'p', 'h1', 'h2', 'h3', 'h4'):
                self.parts.append('\n')
        elif data.get('data-testid') == 'richTextElement':
            self.depth = 1
            self.parts = []
        if tag == 'img':
            source = data.get('src', '')
            match = re.search(r'https://static\.wixstatic\.com/media/([^/]+)', source)
            if match and 'd29bb0698b3f40eebcea3c6fd55d5e51' not in match.group(1):
                image = {'source': match.group(1), 'alt': data.get('alt', '')}
                if image['source'] not in {x['source'] for x in self.images}:
                    self.images.append(image)

    def handle_endtag(self, tag):
        if self.depth and tag not in VOID_TAGS:
            self.depth -= 1
            if self.depth == 0:
                text = re.sub(r'\n\s*\n+', '\n', ''.join(self.parts)).strip()
                if text and text not in {'\u200b', 'Projects', 'News', 'Contact', 'Rieuldorang', '© 2026 Rieuldorang. All Rights Reserved.'}:
                    self.text.append(text)

    def handle_data(self, data):
        if self.depth:
            self.parts.append(data)

claimed = {}
for path in sorted(SOURCE.glob('*.html')):
    parser = PageParser()
    parser.feed(path.read_text())
    for index, image in enumerate(parser.images, 1):
        image['file'] = claimed.setdefault(image['source'], f"{path.stem}/{index:02d}{Path(image['source']).suffix.lower()}")
    (OUTPUT / f'{path.stem}.json').write_text(json.dumps({'text': parser.text, 'images': parser.images}, ensure_ascii=False, indent=2) + '\n')
    print(f'{path.stem}: {len(parser.text)} text blocks, {len(parser.images)} images')
