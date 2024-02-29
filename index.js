const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

const FLICKR_API_URL = 'https://api.flickr.com/services/feeds/photos_public.gne';

app.get('/api/images', async (req, res) => {
    try {
        const response = await axios.get(FLICKR_API_URL);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching images: ", error);
        res.status(500).json({error: "Failed to fetch images"});
    }
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});