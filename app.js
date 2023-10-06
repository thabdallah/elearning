const express =require('express');
const app =express();
const bodyParder = require('body-parser');
const session = require('express-session');
const utilisateurCtrl =require('./src/routes/utilisateurCtrl');
const etudiantCtrl =require('./src/routes/etudiantCtrl');
const professeurCtrl =require('./src/routes/professeurCtrl');
const filiereCtrl =require('./src/routes/filiereCtrl');
const niveauCtrl =require('./src/routes/niveauCtrl');
const anneeCtrl =require('./src/routes/anneeCtrl');
const sectionCtrl =require('./src/routes/sectionCtrl');
const moduleCtrl =require('./src/routes/moduleCtrl');
const ancourCtrl =require('./src/routes/ancourCtrl');
const prof_moduleCtrl =require('./src/routes/prof_moduleCtrl');
const etudiantSectionCtrl =require('./src/routes/etudiantSectionCtrl');
const moduleCtrl1 =require('./src/routes/moduleCtrl1');
const moduleCtrl2 =require('./src/routes/moduleCtrl2');
const noteCtrl =require('./src/routes/noteCtrl');
const noteProfCtrl =require('./src/routes/noteProfCtrl');
const evaluationCtrl =require('./src/routes/evaluationCtrl');
const tutorialCtrl=require('./src/routes/tutorialCtrl');
const authentifierCtrl=require('./src/routes/authentifierCtrl');
const changePassCtrl=require('./src/routes/changePassCtrl');
const changePassEtudiantCtrl=require('./src/routes/changePassEtudiantCtrl');
const changePassProfesseurCtrl=require('./src/routes/changePassProfesseurCtrl');
const forumCtrl=require('./src/routes/forumCtrl');
const flash =require('connect-flash');
const fileUpload=require('express-fileupload');
const { json } = require('body-parser');
const port=3700;

app.set('view engine', 'twig');
app.set('views', './src/vues');
app.use(express.static('public'));
app.use(bodyParder.json());
app.use(bodyParder.urlencoded({extended:true}));

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767klll",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(flash());
app.use('/', authentifierCtrl);
app.get('/logout', (req, res)=>{
    res.render('./authentification/form');
});
app.use(function(req, res, next) {
    req.session.user={login: 'Test', profil: 'admin', nom_prenom:'Test test'};
    req.session.etudiant_section={ codesect: '19'};
    req.session.prof_annee={codeprof:'2'};

    next();
    if (req.session.user){
        next();        
    }else{
        return res.redirect('/logout');
    } 
});

app.use(fileUpload());
app.use('/utilisateur', utilisateurCtrl);
app.use('/etudiant', etudiantCtrl);
app.use('/professeur', professeurCtrl);
app.use('/filiere', filiereCtrl);
app.use('/niveau', niveauCtrl);
app.use('/annee', anneeCtrl);
app.use('/section', sectionCtrl);
app.use('/module', moduleCtrl);
app.use('/ancour', ancourCtrl);
app.use('/etudiant_section', etudiantSectionCtrl);
app.use('/profmodule', prof_moduleCtrl);
app.use('/module1', moduleCtrl1);
app.use('/module2', moduleCtrl2);
app.use('/note', noteCtrl);
app.use('/noteProf', noteProfCtrl);
app.use('/evaluation', evaluationCtrl);
app.use('/tutorial', tutorialCtrl);
app.use('/change', changePassCtrl);
app.use('/changeE', changePassEtudiantCtrl);
app.use('/changeP', changePassProfesseurCtrl);
app.use('/forum', forumCtrl);



// app.post('/calcul', (req, res)=>{
   
//     const {n1, n2, operation} = req.body;
//     let resultat;  
//     if(operation=="+"){
//         resultat = Number(n1)+Number(n2);
//     }else if(operation=="-"){
//         resultat = Number(n1)-Number(n2);
//     }else if(operation=="*"){
//         resultat = Number(n1)*Number(n2);;
//     }else if(operation=='/'){
//         resultat = Number(n1)/Number(n2);
//     }else{
//         resultat = Number(n1)%Number(n2);
//     }
//     res.render('index', {result:resultat})  
// });
// app.get('/',(req, res)=>{
//     res.render('index');
// })

app.listen(port, ()=>{
    console.log(`App is starting on port ${port}`);
})

// npm install pm2;
// installer node json
// installer posgresql