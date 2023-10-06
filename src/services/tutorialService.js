const pool=require('./provider');

var list = (prof, annee) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from v_module_section_prof_tutorial where codeProf=$1 and annee=$2',
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
        pool.query(
            'select * from v_module_section_prof where codeProf=$1 and annee=$2',
             [prof, annee],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}


var insert = (profModule, file, chemin_tutorial, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into tutorial (prof_module, tutorial, chemin_tutorial, who_done, when_done) values ($1,$2,$3,$4,$5)',
             [profModule, file, chemin_tutorial, who_done, when_done],
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
    list,insert, listByProfAndAnne
}