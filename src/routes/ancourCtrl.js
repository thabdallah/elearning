var anneeService=require('../services/anneeService');
var ancour=require('../services/ancourService');
var express=require('express');
var router=express.Router();

router.get('/list/:viewMode/:id?', async (req, res)=>{
    var annees= await ancour.list();
    var annee = await anneeService.getAnneEnCours();

    if(req.params.id !=null){
        annee= await anneeService.getById(req.params.id);
    }
    
    res.render('annees/ancour',{
        annees: annees,
        viewMode:req.params.viewMode,
        annee:annee.shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
       })
});

router.post('/edit', async (req, res)=>{
    const {annee, id}=req.body;
    var rs=await anneeService.edit(annee,id);
    console.log(rs);
    if(rs.rowCount==1){
        req.flash('success', "Année modifer avec success");
        res.redirect('/annee/list/CREATE');
    }else{
        req.flash('error', "Année non modifie");
        res.redirect('/annee/list/CREATE');
    }
});

module.exports=router;