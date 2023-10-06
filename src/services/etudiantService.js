const { Pool } = require('pg');
const pool=require('./provider');


var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from etudiant where deleted=false',
             [],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

var listEtudiantBySection = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from etudiant where deleted=false and id_etudiant not in(select etudiant from etudiant_section)',
             [],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}


var getById = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from etudiant where  id_etudiant=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

var getByEtudiant = (matricule, nom, prenom, age, nationalite, mail) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from etudiant where matricule_etudiant=$1 and nom_etudiant=$2 and prenom_etudiant=$3 and age_etudiant=$4 and nationalite=$5 and mail_etudiant=$6',
             [matricule, nom, prenom, age, nationalite, mail],
             (error, results) => {
            if (error) {
                reject(error)
            }
            
            resolve(results);
        })
    })
}

var insert = (matricule, nom, prenom, age, nationnalite, mail, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into etudiant (matricule_etudiant, nom_etudiant, prenom_etudiant, age_etudiant, nationalite, mail_etudiant, who_done, when_done) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id_etudiant',
             [matricule, nom, prenom, age, nationnalite, mail, who_done, when_done],
             (error, results) => {
                console.log(error);
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (matricule, nom, prenom, age, nationnalite, mail, who_done, when_done,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update etudiant set matricule_etudiant=$1 ,nom_etudiant=$2, prenom_etudiant=$3, age_etudiant=$4, nationalite=$5, mail_etudiant=$6, who_done=$7, when_done=$8 where id_etudiant=$9',
             [matricule, nom, prenom, age, nationnalite, mail, who_done, when_done,id],
             (error, results) => {
                console.log(error);
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var delet = (who_done, when_done, deleted,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update etudiant set who_done=$1, when_done=$2, deleted=$3 where id_etudiant=$4',
             [ who_done, when_done, deleted, id],
             (error, results) => {
                console.log(error);
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var downloadCours = (id) =>{
    return new Promise(function (resolve, reject) {
        pool.query(
            'select chemin_absolu from v_etudiant_download where id_module=$1',
            [id],
            (error, results)=>{  
                if (error) {
                    reject(error);  
                } 
                resolve(results.rows.shift().chemin_absolu)
                // resolve(results.rows.shift().chemin_absolu)  
            }
        )       
   })
}

var downloadEvaluation = (id) =>{
    return new Promise(function (resolve, reject) {
        pool.query(
            'select chemin_evaluation from v_etudiant_download where id_module=$1',
            [id],
            (error, results)=>{  
                if (error) {
                    reject(error);  
                } 
                resolve(results.rows.shift().chemin_evaluation)
                // resolve(results.rows.shift().chemin_absolu)  
            }
        )       
   })
}

var downloadTutorial = (id) =>{
    return new Promise(function (resolve, reject) {
        pool.query(
            'select chemin_tutorial from v_etudiant_download where id_module=$1',
            [id],
            (error, results)=>{  
                if (error) {
                    reject(error);  
                } 
                resolve(results.rows.shift().chemin_tutorial)
                // resolve(results.rows.shift().chemin_absolu)  
            }
        )       
   })
}

module.exports={
    list,insert,getById,edit,getByEtudiant,delet,downloadCours,downloadEvaluation,downloadTutorial,listEtudiantBySection
}