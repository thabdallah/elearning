const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from anneescolaire where deleted=false',
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
            'select * from anneescolaire where  id_anneescolaire=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

var getByAnnee = (lib_anneescolaire) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from anneescolaire where  lib_anneescolaire=$1',
             [lib_anneescolaire],
             (error, results) => {
            if (error) {
                reject(error)
            }
            
            resolve(results);
        })
    })
}

var getAnneEnCours = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from anneescolaire where id_anneescolaire in (select lib_params from params where type_params=$1)',
             ['ANNEE'],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

var updateAnneeEnCours = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update params set lib_params=$1 where type_params=$2',
             [id, 'ANNEE'],
             (error, results) => {
                console.log(error);
            if (error) { 
                reject(error)
            }
            resolve(results);
        })
    })
}



var insert = (annee, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into anneescolaire (lib_anneescolaire, who_done, when_done) values ($1,$2,$3)',
             [annee, who_done, when_done],
             (error, results) => {
                console.log(error);
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (annee, who_done, when_done,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update anneescolaire set lib_anneescolaire=$1, who_done=$2, when_done=$3 where id_anneescolaire=$4',
             [annee, who_done, when_done, id],
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
            'update anneescolaire set who_done=$1, when_done=$2, deleted=$3 where id_anneescolaire=$4',
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
    list, insert,getById,edit,getAnneEnCours,updateAnneeEnCours,getByAnnee,delet
}