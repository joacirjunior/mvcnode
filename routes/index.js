var express = require('express');
var routes = express.Router();
var app = express();
const path = require('path');
app.set('views', path.join(__dirname, 'View'));
app.set('view engine', 'ejs');

routes.use('/', function (req, res, next) {
    res.render('index', {
        title: 'Bem vindo ao APP'
    });
});
