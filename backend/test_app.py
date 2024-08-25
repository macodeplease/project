import unittest
from app import app

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_post_valid_data(self):
        response = self.app.post('/bfhl', json={'data': ['M', '1', '334', '4', 'B', 'Z', 'a']})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"is_success": true', response.data)
        self.assertIn(b'"numbers": ["1", "334", "4"]', response.data)
        self.assertIn(b'"alphabets": ["M", "B", "Z", "a"]', response.data)
        self.assertIn(b'"highest_lowercase_alphabet": ["a"]', response.data)

    def test_post_no_data(self):
        response = self.app.post('/bfhl', json={'data': []})
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"numbers": []', response.data)
        self.assertIn(b'"alphabets": []', response.data)
        self.assertIn(b'"highest_lowercase_alphabet": []', response.data)

    def test_get(self):
        response = self.app.get('/bfhl')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'"operation_code": 1', response.data)

if __name__ == '__main__':
    unittest.main()
