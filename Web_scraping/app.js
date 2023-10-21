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
    const title = $('title').text(); // Extract the title from the <title> tag
    console.log(title); // Log the title to the console

    // If you want to return the title as a response
    res.status(200).json( title );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Scraping failed' });
  }
});
app.use(express.json())
app.listen(port,()=>{
    console.log(`Node Js server is running on port ${port}`);
})