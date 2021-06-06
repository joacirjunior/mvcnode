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
  var sql = "SELECT id,nome,endereco FROM clientes where id=?"
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

module.exports.insert = (nome_cliente, endereco_cliente, obs_cliente)=>{

  var sql = "INSERT INTO clientes (nome,endereco,observacao) VALUES ?"
  var values = [
    [nome_cliente, endereco_cliente,obs_cliente],
    
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



//module.exports = clienteModal;




