// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the URL to the Node.js server for scraping
      const response = await axios.post('http://localhost:5000/scrape', { url });

      // Send the scraped text to the Flask server for processing
      // const processingResponse = await axios.post('http://flask-server-url:5000/process-text', {
      //   text: response.data.scrapedText,
      // });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult('An error occurred');
    }
  };

  return (
    <div className="App">
      <h1>Web Scraping and Text Processing</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Scrape and Process</button>
      </form>
      {result && (
        <div>
          <h2>Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
