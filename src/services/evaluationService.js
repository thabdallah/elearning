const pool=require('./provider');

var list = (prof, annee) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from v_module_section_prof_evaluation where codeProf=$1 and annee=$2',
             [prof, annee],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}
 var listByProfAndAnne = (prof, annee) => {
    return new Promise(function(resolve, reject) {
        pool.query (
            'select * from v_module_section_prof where codeProf=$1 and annee=$2',
            [prof, annee],
            (error, results) => {
                if(error){
                    reject(error)
                }
                resolve(results.rows);
                // resolve(results.rows);
            })
    })
 }

 var insert = (file, profModule, who_done, when_done, chemin_evaluation) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into evaluation (evaluation, prof_module, who_done, when_done, chemin_evaluation) values ($1,$2,$3,$4,$5)',
             [file, profModule, who_done, when_done, chemin_evaluation],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}




module.exports={
    list, listByProfAndAnne,insert
}