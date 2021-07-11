var modelCliente = require("../Models/modelCliente");

module.exports.index = async (req, res) => {
    res.render('login', { title: "Tela de Login", dados: req.session })



}

module.exports.autenticador = async (req, res) => {
    var email = req.body.loginemail;
    var senha = req.body.loginsenha;
    try {
        modelCliente.login(email, senha).then(async function (resultado) {
            if (resultado.length == 0) {
                //redirect para tela de erros
                res.render("erros/errologin", { title: "Erro de Login" })
            } else {

                req.session.logado = true;
                req.session.iduser = resultado[0].id;
                //req.session.cookie.expires = false
                req.session.save( function(err) {
                    req.session.reload( function (err) {
                        res.render("index", { title: "Tela de Usuario", dados: req.session.logado })

                    });
                });
                   // res.render("index", { title: "Tela de Usuario", dados: req.session.logado })

              
                


                console.log(req.session)






            }

        })

    } catch (error) {
        console.log("Criar redirect de Erro");

    }



}

module.exports.home = async (req, res) => {
    if (req.session.logado) {
        
        res.render("index", { title: "Tela de Usuario", dados: req.session.logado })


    } else {
       
        res.redirect("/login")
    }
}

module.exports.logout = async (req, res) => {
    req.session.destroy()
    req.session = null
    req.sessionID = null

    res.redirect("/login")
}