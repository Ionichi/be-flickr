const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

const FLICKR_API_URL = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';

app.get('/api/images', async (req, res) => {
    try {
        const response = await axios.get(FLICKR_API_URL)
            .then(data => {
                function jsonFlickrFeed(data) {
                    res.json(data);
                }
                eval(data.data);
            });
    } catch (error) {
        console.error("Error fetching images: ", error);
        res.status(500).json({error: "Failed to fetch images"});
    }
});

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});