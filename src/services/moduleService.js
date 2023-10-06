const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from module',
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
            'select * from module where  id_module=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}


var insert = (nom, duree, coeficient, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into module (lib_module, duree_module, coef_module, who_done, when_done) values ($1,$2,$3,$4,$5)',
             [nom, duree, coeficient, who_done, when_done],
             (error, results) => {
                console.log(error);
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (nom, duree, coeficient, who_done, when_done, id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update module set lib_module=$1 , duree_module=$2, coef_module=$3, who_done=$4, when_done=$5 where id_module=$6',
             [nom, duree, coeficient, who_done, when_done,  id],
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
    list, insert,getById,edit
}