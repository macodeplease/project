import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    // State to hold the input data
    const [data, setData] = useState('');
    const [response, setResponse] = useState(null);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const jsonData = { data };  // Prepare the data to be sent

        // Send POST request to Flask backend
        axios.post('http://localhost:5000/api/data', jsonData)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    };

    return (
        <div style={{ margin: '50px' }}>
            <h1>React to Flask Communication</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="Enter some data"
                    required
                />
                <button type="submit">Send to Backend</button>
            </form>
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
