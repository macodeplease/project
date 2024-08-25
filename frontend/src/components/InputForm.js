import React, { useState } from 'react';
import axios from 'axios';

const InputForm = () => {
    const [data, setData] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const jsonData = { data };  // The data you want to send to Flask

        // Send POST request to Flask
        axios.post('http://localhost:5000/api/data', jsonData)
            .then((response) => {
                console.log(response.data);
                // Handle response data here
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter some data"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default InputForm;
