import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

test('renders input and submit button', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter JSON data/i);
  const buttonElement = screen.getByText(/Send to Backend/i);
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('shows response after successful submission', async () => {
  mock.onPost('http://localhost:5000/bfhl').reply(200, {
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers: ['1', '334', '4'],
    alphabets: ['M', 'B', 'Z', 'a'],
    highest_lowercase_alphabet: ['a']
  });

  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter JSON data/i);
  const buttonElement = screen.getByText(/Send to Backend/i);

  fireEvent.change(inputElement, { target: { value: '{"data": ["M", "1", "334", "4", "B", "Z", "a"]}' } });
  fireEvent.click(buttonElement);

  const responseElement = await screen.findByText(/Response from Flask Backend:/i);
  expect(responseElement).toBeInTheDocument();
});
