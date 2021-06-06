var mysql = require('mysql');
var config =
{
  host: '192.168.18.128',
  user: 'root',
  password: 'P@z20102010',
  database: 'projeto',
  port: 3306,
  ssl: true
};
const conn = new mysql.createConnection(config);
       conn.connect(()=>{
        console.log("Conectado com Sucesso no Banco")
       });
       
module.exports = conn;