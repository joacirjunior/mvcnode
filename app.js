var express = require('express');
var http = require('http');
namespace = require('express-namespace');
var app = express();
var methodOverride = require('method-override')

var ControleCliente = require("./Controller/ControleCliente");
var fileUpload = require('express-fileupload');

const path = require('path');


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
app.set('views', path.join(__dirname, 'View'));
app.set('view engine', 'ejs');



app.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Bem vindo ao APP'
    });
});

app.namespace('/clientes', function() {

    app.get('/', ControleCliente.index);
    app.get('/cadastro',ControleCliente.cadastro);
    app.post('/cadastrando',ControleCliente.cadastrando)
  
  
   
});

app.namespace('/clientes', function() {

    app.get('/:id', ControleCliente.detalhes);
    app.delete('/:id/delete',ControleCliente.delete);
  
   
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
http.createServer(app).listen(8000);
