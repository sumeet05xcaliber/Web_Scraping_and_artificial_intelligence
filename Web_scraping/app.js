import express from 'express'
import cheerio from 'cheerio'
const port=5000
const app=express();
app.post('/scrape', async (req, res) => {
    const { url } = req.body;
  
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const scrapedText = $('body').text();
  
      // Send scraped text to the Flask server for processing
      // (implement this in the next steps)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Scraping failed' });
    }
  });
app.use(express.json())
app.listen(port,()=>{
    console.log(`Node Js server is running on port ${port}`);
})