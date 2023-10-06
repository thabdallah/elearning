const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from filiere where deleted=false',
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
            'select * from filiere where  id_filiere=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}



var insert = (nomfiliere, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into filiere (lib_filiere, who_done, when_done) values ($1, $2, $3)',
             [nomfiliere, who_done, when_done],
             (error, results) => {
                console.log(error);
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (nomfiliere, who_done, when_done,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update filiere set lib_filiere=$1, who_done=$2, when_done=$3 where id_filiere=$4',
             [nomfiliere, who_done, when_done, id],
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
            'update filiere set who_done=$1, when_done=$2, deleted=$3 where id_filiere=$4',
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