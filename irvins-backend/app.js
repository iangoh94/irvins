const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import Routes
const productsRoute = require('./routes/products');

app.use('/api/products', productsRoute);

// Routes
app.get('/', (req, res) => {
    res.send('Base route');
});

// DB Connection
mongoose.connect('mongodb+srv://admin:P@ssw0rd@cluster0.jjvuv.mongodb.net/irvins?retryWrites=true&w=majority', 
    { useNewUrlParser: true },
    () => { console.log('DB Connected'); }
);

app.listen(3030);