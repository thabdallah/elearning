const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from v_prof_module where deleted=false',
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
            'select * from prof_module where  id_prof_module=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
           
            resolve(results.rows);
        })
    })
}


var getByProfesseurAndModuleandAnnee = (professeur, module, annee) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from prof_module where  professeur=$1 and module=$2 and annee=$3',
             [professeur, module, annee],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}



var insert = (professeur, module, annee, who_done, when_done, section) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into prof_module (professeur, module, annee, who_done, when_done, section) values ($1, $2, $3, $4, $5, $6)',
             [professeur, module, annee, who_done, when_done, section],
             (error, results) => {
               
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (professeur, module, annee, who_done, when_done, section, id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update prof_module set professeur=$1, module=$2, annee=$3, who_done=$4, when_done=$5, section=$6 where id_prof_module=$7',
             [professeur, module, annee, who_done, when_done, section, id],
             (error, results) => {
                
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
            'update prof_module set who_done=$1, when_done=$2, deleted=$3 where id_prof_module=$4',
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
    list, insert,getById,edit,getByProfesseurAndModuleandAnnee,delet
}