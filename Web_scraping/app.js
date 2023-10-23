import express from 'express'
import cheerio from 'cheerio'
import cors from 'cors'
import axios from 'axios'
const port=5000
const app=express();
app.use(cors())
app.use(express.json())

app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const scrapedTextArray = []; // Create an array to store the scraped text

    // Select all <p> elements and extract their text
    $('p').each((index, element) => {
      const text = $(element).text();
      scrapedTextArray.push(text);
    });

    // Join the scraped text from all <p> elements into a single string
    const scrapedText = scrapedTextArray.join('\n');
    console.log(scrapedText); 

    // Send the scraped text to your Flask app
    const flaskURL = 'http://127.0.0.1:5000/process-text'; // Replace with the actual URL of your Flask server
    const data = { text: scrapedText };

    const flaskResponse = await axios.post(flaskURL, data);

    // If you want to return the response from the Flask app
    res.status(200).json(flaskResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Scraping and sending data to Flask failed' });
  }
});
app.use(express.json())
app.listen(port,()=>{
    console.log(`Node Js server is running on port ${port}`);
})