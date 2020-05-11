// Separamos este código de checks.js para poder lanzarlo limpiamente en preinstall (sin dependencias)
//

// We won´t use fs promises because in windows 10 and Ubuntu writefile breaks promises in node 12
// we will use the standard callback version and promisify it
// const fs = require('fs').promises;
const fs = require("fs");
const path = require("path");

const {promisify} = require("util");
const access = promisify(fs.access);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);


const path_assignment = path.resolve(path.join(__dirname, ".."));


function user_data() {
    return path.join(path_assignment, 'tests', "datos-usuario");
}

Generation = {};

Generation.models = fs.readdirSync(__dirname)
    .filter(fn => fn.endsWith('.md'))
    .map( fn => fn.replace(/\.[^/.]+$/, "")); // remove extension

const secret = 2;

Generation.user_id = function(email) {
    var id = secret;
    for(const ix in email){
        id += email.charCodeAt(ix);
    }
    return id % Generation.models.length;
};

Generation.model = async function() {
    let user_email = (await readFile(user_data())).toString('utf8').toLowerCase();
    console.log(`El e-mail proporcionado es "${user_email}".`)
    let id = Generation.user_id(user_email);
    return Generation.models[id];
};

Generation.modelSync = function() {
    let user_email = fs.readFileSync(user_data()).toString('utf8').toLowerCase();
    let id = Generation.user_id(user_email);
    return Generation.models[id];
};


Generation.generate = async function(email) {
    const id = Generation.user_id(email);
    console.log(id);
    await writeFile(user_data(), email);
    let model = await Generation.model();

    try{
    await copyFile(path.join(path_assignment, 'tests', `${ model }.md`),
                   path.join(path_assignment, 'Enunciado.md'));
    }catch(e){
        throw Error("No se pudo copiar el enunciado. La causa:");
        console.log(e);
    }
    return Generation.models[id];
};

Generation.main = async function(){
    try {
        await Generation.model();
        return
    } catch(_) {};
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // TODO: comprobar que sea @upm.es
    const email = await new Promise((resolve, reject) => {
        readline.question('¿Cuál es tu dirección de e-mail (@alumnos.upm.es)? ', email => resolve(email.toLowerCase()))
    });
    readline.close();
    return Generation.generate(email);
};

if (require.main === module) {
    Generation.main();
}

module.exports = Generation;
