var modelCliente = require("../Models/modelCliente");
module.exports.index = async(req,res) =>{

    res.render('login',{title:"Tela de Login", dados:null})

}

module.exports.autenticador = async(req,res) =>{
var email = req.body.loginemail;
var senha = req.body.loginsenha;
try {
    modelCliente.login(email,senha).then(async function(resultado){
            if(resultado.length == 0)
            {   
                //redirect para tela de erros
               res.render("erros/errologin",{title:"Erro de Login"})
            }else{
                setTimeout(()=>{
                                     
                    req.session.login = resultado[0].id;
                    res.render('index',{title:"Index"})
                    //res.render('cliente/cadastro', { title: "Cadastro de Clientes", dados: null });
                  },400)
             
            }
       
    })
    console.log(pegalongin)
} catch (error) {
    console.log("Criar redirect de Erro");
    
}



}