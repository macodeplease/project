import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jsonData = { data: JSON.parse(data) };

        try {
            const res = await axios.post('http://localhost:5000/bfhl', jsonData);
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError('There was an error!');
            console.error("There was an error!", err);
        }
    };

    return (
        <div style={{ margin: '50px' }}>
            <h1>React to Flask Communication</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="10"
                    cols="50"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder='Enter JSON data (e.g., {"data": ["A", "C", "Z", "c", "i"]})'
                    required
                />
                <button type="submit">Send to Backend</button>
            </form>
            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <h3>{error}</h3>
                </div>
            )}
            {response && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Response from Flask Backend:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
