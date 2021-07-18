var modelCliente = require("../Models/modelCliente");
var retorno = '';
var detalheRetorno = '';

// INDEX CLIENTE
module.exports.index = async (req, res) => {
  // modalcliente = new modelCliente()

  if (req.session.logado) {
    try {
      modelCliente.showCliente().then(async function (resultado) {
        retorno = resultado

      })


    } catch (error) {
      console.log(error)
    }



    setTimeout(() => {
      res.render('clientes', { title: "Clientes", dados: retorno });
    }, 400)
  } else {
    res.redirect("/login")
  }



}

// DETALHES DE CLIENTE


module.exports.detalhes = async (req, res) => {
  if (req.session.logado) {
    var id = req.params.id
    try {
      modelCliente.detalheCliente(id).then(async function (resultado) {
        detalheRetorno = resultado

      })
    } catch (error) {

    }
    // console.log(detalheRetorno)
    setTimeout(() => {
      res.render('cliente/detalhesClientes', { title: "Clientes", dados: detalheRetorno });
    }, 400)
  } else {
    res.redirect("/login")
  }

}


//TELA DE CADASTRO

module.exports.cadastro = async (req, res) => {
  if (req.session.logado) {
    setTimeout(() => {
      res.render('cliente/cadastro', { title: "Cadastro de Clientes", dados: null });
    }, 400)
  } else {
    res.redirect("/login")
  }



}


//FORM CADASTRO CLIENTE

module.exports.cadastrando = async (req, res) => {
  if (req.session.logado) {
    const path = require('path');
    const util = require('util');

    const file = req.files.clientes_avatar
    const filename = file.name;
    const size = file.size;
    const extension = path.extname(filename)

    const extensaoliberada = /png|jpeg|jpg|gif/;

    if (!extensaoliberada.test(extension)) throw "Extensao não suportada";
    if (size > 80000) throw "Arquivo Muito Grande";
    const md5 = file.md5;
    const URL = "public/imgs/" + md5 + extension;
    const caminho = "../imgs/" + md5 + extension;
    await util.promisify(file.mv)(URL);

    var nome_cliente = req.body.cliente_nome
    var endereco_cliente = req.body.cliente_cidade
    var obs_cliente = req.body.cliente_obs
    var img_avatar = caminho;

    //console.log(URL);

    modelCliente.insert(nome_cliente, endereco_cliente, obs_cliente, img_avatar)
    //  console.log(nome_cliente , endereco_cliente , obs_cliente)
    setTimeout(() => {
      res.redirect('/clientes');
    }, 400)

  } else {
    res.redirect("/login")
  }


}


// DELETAR CLIENTE
module.exports.delete = async (req, res) => {

  if (req.session.logado) {

    var id = req.params.id

    modelCliente.delete(id);


    setTimeout(() => {
      //res.send(req)
      res.redirect('/clientes')
    }, 400)

  } else {
    res.redirect("/login")
  }


  //console.log(req)

}

//Editar

module.exports.editar = async (req, res) => {
  if (req.session.logado) {
    var id = req.params.id
    try {
      modelCliente.detalheCliente(id).then(async function (resultado) {
        detalheRetorno = resultado

      })
    } catch (error) {

    }
    res.render("cliente/editar", { title: "Editar Cliente", dados: detalheRetorno })
  } else {
    res.redirect("/login");
  }
}

module.exports.editando = async (req, res) => {
  if (req.session.logado) {
    const id_edit = req.params.id

    var nome_cliente = req.body.cliente_nome
    var endereco_cliente = req.body.cliente_cidade
    var obs_cliente = req.body.cliente_obs



    //console.log(URL);

    modelCliente.editar(id_edit, nome_cliente, endereco_cliente, obs_cliente)
    //  console.log(nome_cliente , endereco_cliente , obs_cliente)
    setTimeout(() => {
      res.redirect('/clientes');
    }, 400)
  } else {
    res.redirect("/login")
  }


}



//module.exports = ControleCliente;
