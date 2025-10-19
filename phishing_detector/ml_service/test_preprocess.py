"""Quick smoke test for preprocess_text to ensure it returns the expected length."""
from training.utils import preprocess_text
import json

def load_char_index(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

if __name__ == '__main__':
    ci = load_char_index('models/url_char_index.json')
    sample = 'http://example.com/path/to/resource?query=1'
    vec = preprocess_text(sample, ci)
    print('vector length:', len(vec))
    print('dtype:', vec.dtype)
    print('first 10 ids:', vec[:10])