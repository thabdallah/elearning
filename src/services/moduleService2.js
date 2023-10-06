const pool=require('./provider');

var list = (prof, annee) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from v_module_section_prof_cours where codeProf=$1 and annee=$2',
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
            'select * from v_module_section_prof where codeProf=$1 and annee=$2 and id_prof_module not in(select prof_module from cours)',
             [prof, annee],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

var listByProfAndAnneandNote = (prof, annee) => {
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

var insert = (profModule, file, chemin_absolu, who_done, when_done) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'insert into cours (prof_module, fichier, chemin_absolu, who_done, when_done) values ($1,$2,$3,$4,$5)',
             [profModule, file, chemin_absolu, who_done, when_done],
             (error, results) => {
                console.log(error);
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

var getByProf =(nom, prenom)=>{
    return new Promise(function (resolve, reject){
        pool.query(
            'select * from professeur where nom_professeur=$1 and prenom_professeur=$2 and deleted=$3',
            [nom, prenom, 'false'],
            (error, results) =>{
                if (error) {
                    reject(error)
                }
                resolve(results)
            }
        )
    })
}





module.exports={
    list,insert, listByProfAndAnne, listByProfAndAnneandNote,getByProf
}