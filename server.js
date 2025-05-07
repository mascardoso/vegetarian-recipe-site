const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/meal', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&tags=vegetarian&number=1`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch meal' });
  }
});

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all handler: for any request that doesn't match /api, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});