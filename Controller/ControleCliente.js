var modelCliente = require("../Models/modelCliente");
var retorno = '';
var detalheRetorno = '';
module.exports.index = async (req, res) => {
  // modalcliente = new modelCliente()


  try {
    modelCliente.showCliente().then(async function (resultado) {
      retorno = resultado

    })


  } catch (error) {
    console.log(error)
  }

/*  if (typeof (retorno) === "undefined" || retorno == "" || retorno == null) {

    console.log("Veio indefinido" + typeof (retorno))

  } else {
    console.log("Valor Correto" + retorno)
  }

*/

 


setTimeout(()=>{
  res.render('clientes', { title: "Clientes", dados: retorno });
},400)


  //console.log();
  //console.log("Teste")

}

module.exports.detalhes = async (req,res)=>{
  var id =  req.params.id
  try {
    modelCliente.detalheCliente(id).then(async function (resultado) {
        detalheRetorno = resultado
  
      })
  } catch (error) {
    
  }
 // console.log(detalheRetorno)
  setTimeout(()=>{
    res.render('cliente/detalhesClientes', { title: "Clientes", dados: detalheRetorno });
  },400)
}

module.exports.cadastro = async (req,res)=>{


  setTimeout(()=>{
    res.render('cliente/cadastro', { title: "Cadastro de Clientes", dados: null });
  },400)

}


module.exports.cadastrando = async (req,res)=>{
 var nome_cliente =  req.body.cliente_nome
 var endereco_cliente =  req.body.cliente_cidade
 var obs_cliente =  req.body.cliente_obs

 modelCliente.insert(nome_cliente,endereco_cliente,obs_cliente)
//  console.log(nome_cliente , endereco_cliente , obs_cliente)
  setTimeout(()=>{
    res.redirect('/clientes');
  },400)

}

module.exports.delete = async (req,res)=>{
  var id = req.params.id

modelCliente.delete(id);

  
    setTimeout(()=>{
      //res.send(req)
      res.redirect('/clientes')
    },400)
  

  //console.log(req)

}



//module.exports = ControleCliente;
