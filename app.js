var express = require('express');


var https = require('https');
namespace = require('express-namespace');

var app = express();
var methodOverride = require('method-override');

var ControleCliente = require("./Controller/ControleCliente");
var ControllerLogin = require('./Controller/ControllerLogin');

var fileUpload = require('express-fileupload');
const path = require('path');
var md5 = require('md5');
var session = require('express-session');


const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

var MySQLStore = require('express-mysql-session')(session);
var options = {
  host: '192.168.18.128',
  port: 3306,
  user: 'root',
  password: 'P@z20102010',
  database: 'projeto',
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};

var sessionStore = new MySQLStore(options);
//MINDDWARES
app.use(express.static(path.join(__dirname + '/public')));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

const Susuario = md5("Login de Usuario");
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: Susuario,
  name: "loginuser",
  resave: false,
  unset: 'destroy',
  store: sessionStore,
  saveUninitialized: false,
  cookie: { segure: true, maxAge: 60, expires: false }
}))

//SETS
app.set('views', path.join(__dirname, 'View'));
app.set('view engine', 'ejs');

//INICIO DAS ROTAS



//Rotas de Autenticação
app.get('/login', ControllerLogin.index);
app.get('/logout', ControllerLogin.logout);
app.get('/', ControllerLogin.home);
app.get('/index', ControllerLogin.home);
app.post('/autenticalogin', ControllerLogin.autenticador);












//Rotas de Clientes
app.namespace('/clientes', function () {

  app.get('/', ControleCliente.index);
  app.get('/cadastro', ControleCliente.cadastro);
  app.post('/cadastrando', ControleCliente.cadastrando)



});

app.namespace('/clientes', function () {

  app.get('/:id', ControleCliente.detalhes);
  app.delete('/:id/delete', ControleCliente.delete);
  app.get('/:id/editar', ControleCliente.editar);
  app.put('/:id/editando', ControleCliente.editando);



});


/*
app.get('/clientes',function(req,res,next){
    var idfunc = req.params.id;
    //res.send("Pagina Foo" + idfunc);

    res.render('clientes',{
        title:"Controle de Clientes"
    });
});*/

//module.exports =  app;
https.createServer({ key: key, cert: cert }, app).listen(8000);
