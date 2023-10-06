const pool = require('./provider');

var getByLogin = (login) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from utilisateur where login=$1',
             [login],
             (error, results) => {
            if (error) {
                reject(error)
            }
            
            resolve(results.rows);
        })
    })
}

var changePassword =(utilisateur, password)=>{
    return new Promise(function (resolve, reject){
        pool.query(
            'update utilisateur set motdepasse=$1 where login=$2',
            [password, utilisateur],
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
    changePassword, getByLogin
}