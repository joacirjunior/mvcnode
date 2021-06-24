var retorno = '';
var detalheretorno = '';

module.exports.index = async(req,res) =>{
    if(req.session.login == null)
    {
        res.redirect('login')
    }else{
        res.render('index',{title:"Index", dados:null})
    }

        
}