const pool=require('./provider');

var list = () => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from v_etudiant_section where deleted=false',
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
            'select * from etudiant_section where  id_etudiant_section=$1',
             [id],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

var getByEtudiantAndSection = (etudiant) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from etudiant_section where  etudiant=$1',
             [etudiant],
             (error, results) => {
            if (error) {
                reject(error)
            }
            
            resolve(results);
        })
    })
}

var insert = (etudiant, section, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into etudiant_section (etudiant, section, who_done, when_done) values ($1, $2, $3, $4)',
             [etudiant, section, who_done, when_done],
             (error, results) => {
               
            if (error) {
                
                reject(error)
            }
            resolve(results);
        })
    })
}

var edit = (etudiant, section, who_done, when_done,id) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'update etudiant_section set etudiant=$1, section=$2, who_done=$3, when_done=$4 where id_etudiant_section=$5',
             [etudiant, section, who_done, when_done, id],
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
            'update etudiant_section set who_done=$1, when_done=$2, deleted=$3 where id_etudiant_section=$4',
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
    list, insert,getById,edit,getByEtudiantAndSection,delet
}