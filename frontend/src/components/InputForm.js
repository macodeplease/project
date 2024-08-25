import React, { useState } from 'react';

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const jsonData = JSON.parse(jsonInput);

      const res = await fetch('http://localhost:5000/bh1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON or API Error');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>JSON Input:</label>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter valid JSON'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <label>Select Data to Display:</label>
      <select multiple={true} onChange={handleOptionChange}>
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="highestLowercase">Highest Lowercase Alphabet</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h3>Response:</h3>
          <p>User ID: {response.user_id}</p>
          <p>College Email ID: {response.college_email_id}</p>
          <p>College Roll Number: {response.college_roll_number}</p>
          {selectedOptions.includes('alphabets') && (
            <p>Alphabets: {response.alphabets_array.join(', ')}</p>
          )}
          {selectedOptions.includes('numbers') && (
            <p>Numbers: {response.numbers_array.join(', ')}</p>
          )}
          {selectedOptions.includes('highestLowercase') && (
            <p>Highest Lowercase Alphabet: {response.highest_lowercase}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputForm;
