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
                    const allData = data.items;
                    const perPage = 10;
                    const page = ((parseInt(req.query.page)) < 1 ? 1 : parseInt(req.query.page)) || 1;
                    const startIndex = (page - 1) * perPage;
                    const endIndex = page * perPage;
                    const paginatedData = allData.slice(startIndex, endIndex);

                    const updatedData = {
                        items: paginatedData,
                        total_data: allData.length,
                        total_page: Math.ceil(allData.length / perPage),
                        currentPage: page,
                    };

                    res.json(updatedData);
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