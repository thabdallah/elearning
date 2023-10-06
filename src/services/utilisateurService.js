const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from utilisateur',
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
            'select * from utilisateur where  id_utilisateur=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}
var insert = (nom, prenom, login, motdepasse, profile, who_done, when_done, code) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into utilisateur (nom_utilisateur, prenom_utilisateur, login, motdepasse, profil, who_done, when_done, code) values ($1,$2,$3,$4,$5,$6,$7,$8)',
             [nom, prenom, login, motdepasse, profile, who_done, when_done, code],
             (error, results) => {
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}
var edit = (login, motdepasse, profile, who_done, when_done,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update utilisateur set login=$1 ,motdepasse=$2, profil=$3, who_done=$4, when_done=$5 where id_utilisateur=$6',
             [login, motdepasse, profile, who_done, when_done,id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}
var active = (who_done, when_done, active,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update utilisateur set who_done=$1, when_done=$2, is_active=$3 where id_utilisateur=$4',
             [ who_done, when_done, active, id],
             (error, results) => {
            if (error) {

                reject(error)
            }
            resolve(results);
        })
    })
}

var reinitialise = (motdepasse, who_done, when_done,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update utilisateur set  motdepasse=$1, who_done=$2, when_done=$3 where id_utilisateur=$4',
             [motdepasse, who_done, when_done,id],
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
    list, insert,getById,edit,active,reinitialise
}