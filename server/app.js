const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());

app.use('/api', api);
app.use(express.static('static'));
app.use(morgan('dev'));
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    res.json(err)
});
mongoose.connect('mongodb://localhost:27017/workflow', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// 'mongodb+srv://islam:islam123@cluster0.ou5fv.mongodb.net/workflow?retryWrites=true&w=majority'
// 'mongodb://localhost:27017/workflow'
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('connected to mongodb');
});
app.listen(app.get('port'), function() {
    console.log('API SERVER LISTEN ON PORT ' + PORT)
});
const PORT = process.env.PORT || 8081
app.listen(PORT);