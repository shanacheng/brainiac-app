const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

//database
const database = require('./config/keys').mongoURI;

//connect 
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

    //deploy to heroku (env.port)
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server listening at port ${port}`));
