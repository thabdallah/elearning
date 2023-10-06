const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from professeur where deleted=false',
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
            'select * from professeur where  id_professeur=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

var getByProfesseur = (nom, prenom, adresse, diplome, mail, specialite) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from professeur where nom_professeur=$1 and prenom_professeur=$2 and adresse_professeur=$3 and diplome=$4 and mail_professeur=$5 and specialite=$6',
             [nom, prenom, adresse, diplome, mail, specialite],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

var insert = (nom, prenom, adresse, diplome, mail, specialite, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into professeur (nom_professeur, prenom_professeur, adresse_professeur, diplome, mail_professeur, specialite, who_done, when_done) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id_professeur',
             [nom, prenom, adresse, diplome, mail, specialite, who_done, when_done],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (nom, prenom, adresse, diplome, mail, specialite, who_done, when_done, id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update professeur set nom_professeur=$1 , prenom_professeur=$2, adresse_professeur=$3, diplome=$4, mail_professeur=$5, specialite=$6, who_done=$7, when_done=$8 where id_professeur=$9',
             [nom, prenom, adresse, diplome, mail, specialite, who_done, when_done, id],
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
            'update professeur set who_done=$1, when_done=$2, deleted=$3 where id_professeur=$4',
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

module.exports={
    list, insert,getById,edit,delet,getByProfesseur
}