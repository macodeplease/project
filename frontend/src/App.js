import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    // State to hold the input data
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState([]);
    const [validJson, setValidJson] = useState(true);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidJson(true); // Reset JSON validity state
        setError(null);

        try {
            const jsonData = JSON.parse(inputData);  // Parse the input data

            // Validate JSON structure
            if (!Array.isArray(jsonData.data)) {
                throw new Error("Invalid JSON format");
            }

            // Send POST request to Flask backend
            const res = await axios.post('http://localhost:5000/bfhl', jsonData);
            setResponse(res.data);
        } catch (error) {
            console.error("There was an error!", error);
            setValidJson(false);
            setError("Invalid JSON format or server error.");
        }
    };

    // Filter response data based on selected options
    const filterResponse = () => {
        if (!response) return {};

        const filteredData = {};
        if (filter.includes("Numbers")) {
            filteredData.numbers = response.numbers;
        }
        if (filter.includes("Alphabets")) {
            filteredData.alphabets = response.alphabets;
        }
        if (filter.includes("Highest lowercase alphabet")) {
            filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }
        return filteredData;
    };

    return (
        <div style={{ margin: '50px' }}>
            <h1>React to Flask Communication</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="4"
                    cols="50"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='Enter JSON data, e.g., {"data": ["A", "C", "z"]}'
                    required
                />
                <button type="submit">Send to Backend</button>
            </form>
            {!validJson && <p style={{ color: 'red' }}>Error: {error}</p>}
            {response && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Response from Flask Backend:</h3>
                    <select multiple={true} value={filter} onChange={(e) => setFilter(Array.from(e.target.selectedOptions, option => option.value))}>
                        <option value="Numbers">Numbers</option>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
