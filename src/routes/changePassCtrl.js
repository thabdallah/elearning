var express = require('express');
var router= express.Router();
var changePassService = require('../services/changePassService')

router.get('/list', async (req, res)=>{
    res.render('authentification/changePass',{
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});

router.post('/edit', async(req, res)=>{
    const {ancien, nouveau, confirme} =req.body;
    sessionUser= req.session.user.login;
    var userResult= await changePassService.getByLogin(sessionUser);
    user=userResult.shift();
    if(ancien!=user.motdepasse){
        req.flash('error', "Ancien mot de passe incorret");
        res.redirect('/change/list');
    }else{
        if(nouveau!=confirme){
            req.flash('error', "Les 02 mot de passe ne sont pas les mêmes");
            res.redirect('/change/list');
        }else{
            var rs= await changePassService.changePassword(sessionUser, nouveau);
            if (rs.rowCount==1) {
                req.flash('success', "Mot de passe changer avec succés");
                return res.redirect('/logout');
            }else{
                req.flash('error', "Erreur de changement de mot de passe");
                return res.redirect('/module1/list');
            }
        }
    }
})

module.exports=router;