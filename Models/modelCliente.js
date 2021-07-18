var db = require("../Util/db")

var resultado;
var retornoDetalha;
module.exports.showCliente = () => {

  return new Promise((resolve, reject) => {

    db.query("SELECT * FROM clientes", (err, result) => {
      if (err) throw console.log("Erro no momento da Consulta " + err);

      //resultado = JSON.parse(JSON.stringify(result))

      if (result === undefined || result == null || result == '') {
        resultado = null
        resolve(resultado)
      } else {

        resultado = result
        resolve(resultado)
      }

    })

  })

}

module.exports.detalheCliente = (id) =>
{
  var sql = "SELECT id,nome,endereco,observacao,avatar FROM clientes where id=?"
  var idRetorno = id;
  return new Promise((resolve, reject) => {

    db.query(sql,[idRetorno], (err, result) => {
      if (err) throw console.log("Erro no momento da Consulta " + err);

      //resultado = JSON.parse(JSON.stringify(result))

      if (result === undefined || result == null || result == '') {

      } else {

        retornoDetalha = result
        resolve(retornoDetalha)
      }

    })

  })
}

module.exports.insert = (nome_cliente, endereco_cliente, obs_cliente, img_avatar)=>{

  var sql = "INSERT INTO clientes (nome,endereco,observacao,avatar) VALUES ?"
  var values = [
    [nome_cliente, endereco_cliente,obs_cliente,img_avatar],
    
  ];
  return new Promise((resolve, reject) => {

    db.query(sql,[values], (err, result) => {
      if (err) throw console.log("Erro no momento da Consulta " + err);

      //resultado = JSON.parse(JSON.stringify(result))

      if (result === undefined || result == null || result == '') {

      } else {

        resolve("Dados Inseridos com Sucesso")
      }

    })

  })

}

module.exports.delete = (id)=>{
  
  return new Promise((resolve,reject)=>{
    var sql = "DELETE FROM clientes WHERE id = ?";
    db.query(sql,[id],(err,result)=>{
      if(result)
      {
        resolve("Dado Excluido")
      }else{
        reject("Erro ao deletar dados")
      }
    })
  })
 
}

module.exports.login = (email,senha)=>{

  var sql = "SELECT id,nome FROM clientes where email_cliente=? and senha_cliente=? "
  var email_login = email;
  var senha_login = senha;
  return new Promise((resolve, reject) => {

    db.query(sql,[email_login,senha_login], (err, result) => {
      if (err) throw console.log("Erro no momento da Consulta " + err);

      //resultado = JSON.parse(JSON.stringify(result))

      if (result === undefined || result == null || result == '' || result == 0) {
        resolve(result)
      } else {

        retornoDetalha = result
        resolve(retornoDetalha)
      }

    })

  })

}

module.exports.editar = (id_edit,nome_cliente, endereco_cliente, obs_cliente)=>{
  
    var sql = "UPDATE clientes SET nome=?,endereco=?,observacao=? WHERE  id=?;"
    return new Promise((resolve, reject) => {
  
      db.query(sql,[nome_cliente, endereco_cliente,obs_cliente,id_edit], (err, result) => {
        if (err) throw console.log("Erro no momento da Consulta " + err);
  
        //resultado = JSON.parse(JSON.stringify(result))
  
        if (result === undefined || result == null || result == '') {
  
        } else {
  
          resolve("Dados Inseridos com Sucesso")
        }
  
      })
  
    })
  
  

 
 

}



//module.exports = clienteModal;




