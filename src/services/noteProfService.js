const pool=require('./provider');

var list = (pro_module) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from v_notes where prof_module=$1',
             [pro_module],
             (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

var insert = (note) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'INSERT INTO public.note( examen, etudiant_section, prof_module) VALUES ($1, $2, $3)',
             [note.note, note.id_etudiant_section, note.prof_module],
             (error, results) => {
                console.log(error);
            if (error) {
                reject(error)
            }
            resolve(results);
        })
    })
}

var getByEtudiantSection = (section) =>{
    return new Promise((resolve, reject) => {
        pool.query(
            'select * from v_etudiant_section where id_section= $1',
            [section],
            (error, results)=>{
                if (error) {
                    reject(error)                    
                }
                resolve(results.rows);
            }
        )
    })
}

function isNoteValide (notes) {
    var test=true;
    for(var i=0; i<notes.length; i++){
        if(Number(notes[i])<0 || Number(notes[i])>20){
            test=false;
        }   
    }
    return test;
}

function fetchNote(notes, etudiants, prof_module){
    var notess=[];
    for(var i=0; i<notes.length; i++){
        not={
            note: notes[i],
            id_etudiant_section: etudiants[i],
            prof_module: prof_module
        }
        notess.push(not);
    }
return notess;
}

var getByNoteEtudiant = (note) => {
    return new Promise(function(resolve, reject) {
        pool.query(
            'select * from note where etudiant_section=$1 and prof_module=$2',
             [note.id_etudiant_section, note.prof_module],
             (error, results) => {
            if (error) {
                reject(error)
            }
            
            resolve(results);
        })
    })
}

module.exports={
    list,getByEtudiantSection,isNoteValide,fetchNote,insert,getByNoteEtudiant
}