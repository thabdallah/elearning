const pool = require('./provider');


var check =(utilisateur, password)=>{
    return new Promise(function (resolve, reject){
        pool.query(
            'select * from utilisateur where login=$1 and motdepasse=$2 and is_active=$3',
            [utilisateur, password,'true'],
            (error, results) =>{
                if (error) {
                    reject(error)
                }
                resolve(results)
            }
        )
    })
}

var getEtudiantSection =(etudiant)=>{
    return new Promise(function (resolve, reject){
        pool.query(
            'select * from etudiant_section where etudiant=$1',
            [etudiant],
            (error, results) =>{
                if (error) {
                    reject(error)
                }
                resolve(results)
            }
        )
    })
}

var getProfByAnnee =(professeur, annee)=>{
    return new Promise(function (resolve, reject){
        pool.query(
            'select * from v_module_section_prof where codeprof=$1 and annee=$2',
            [professeur, annee],
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
    check,getEtudiantSection,getProfByAnnee
}