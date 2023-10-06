const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from anneescolaire',
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
            console.log(results);
            resolve(results.rows);
        })
    })
}



var edit = (annee,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update anneescolaire set lib_anneescolaire=$1 where id_anneescolaire=$2',
             [annee, id],
             (error, results) => {
                console.log(error);
            if (error) {
              frgvf  
                reject(error)
            }
            resolve(results);
        })
    })
}



module.exports={
    list,getById,edit
}