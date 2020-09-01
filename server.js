const express = require('express');

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes here
// HTML Routes here

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});

