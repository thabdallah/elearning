const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from niveau',
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
            'select * from niveau where  id_niveau=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}



var insert = (nomNiveau, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into niveau (lib_niveau, who_done, when_done) values ($1,$2,$3)',
             [nomNiveau, who_done, when_done],
             (error, results) => {
                console.log(error);
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (nomNiveau, who_done, when_done,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update niveau set lib_niveau=$1, who_done=$2, when_done=$3 where id_niveau=$4',
             [nomNiveau, who_done, when_done, id],
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
            'update niveau set who_done=$1, when_done=$2, deleted=$3 where id_niveau=$4',
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
    list, insert,getById,edit,delet
}