const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from v_section where deleted=false',
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
            'select * from section where  id_section=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
           
            resolve(results.rows);
        })
    })
}


var getByNiveauAndFiliere = (filiere, niveau) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from section where  filiere=$1 and niveau=$2',
             [filiere, niveau],
             (error, results) => {
            if (error) {
                reject(error)
            }
            
            resolve(results);
        })
    })
}



var insert = (filiere, niveau, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into section (filiere, niveau, who_done, when_done) values ($1, $2, $3, $4)',
             [filiere, niveau, who_done, when_done],
             (error, results) => {
               
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (filiere, niveau, who_done, when_done,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update section set filiere=$1, niveau=$2, who_done=$3, when_done=$4 where id_section=$5',
             [filiere, niveau, who_done, when_done, id],
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
            'update section set who_done=$1, when_done=$2, deleted=$3 where id_section=$4',
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
    list, insert,getById,edit,getByNiveauAndFiliere,delet
}