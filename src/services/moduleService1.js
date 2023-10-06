const pool=require('./provider');

var list = (section, annee) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from v_etudiant_download where codesect=$1 and annee=$2',
             [section, annee],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}



// var getBySection =(codesect, annee)=>{
//     return new Promise(function (resolve, reject){
//         pool.query(
//             'select * from section where section=$1 and annee=$2 and deleted=$3',
//             [codesect, annee, 'false'],
//             (error, results) =>{
//                 if (error) {
//                     reject(error)
//                 }
//                 resolve(results)
//             }
//         )
//     })
// }







module.exports={
    list,
}