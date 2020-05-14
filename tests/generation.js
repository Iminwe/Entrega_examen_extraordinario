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
    return path.join(path_assignment, 'user.json');
}

Generation = {};

let enunciados = fs.readFileSync(path.join(__dirname, "tests-data"))
    .toString('utf-8')
    .split('\n').reduce((obj, line) => {
        let tokens = line.split(":");
        if(tokens.length < 2) {
            return obj;
        }
        let model = (new Buffer.from(tokens[0], 'base64')).toString('utf-8').trim();
        let value = new Buffer.from(tokens[1], 'base64');
        return Object.assign(obj, {[model]: value});
}, {});


Generation.enunciados = enunciados;

const secret = 2;

Generation.model_for_user = function(email) {
    var id = secret;
    for(const ix in email){
        id += email.charCodeAt(ix);
    }

    // JS is stupid and it can't easily work with keys
    let keys = Object.keys(enunciados);
    id = id % keys.length;

    return keys[id];
};

Generation.model = async function() {
    let user_email = JSON.parse((await readFile(user_data())).toString('utf8'))['email'].toLowerCase();
    console.log(`El e-mail proporcionado es "${user_email}".`)
    return Generation.model_for_user(user_email);
};

Generation.modelSync = function() {
    let user_email = JSON.parse((fs.readFileSync(user_data())).toString('utf8'))['email'].toLowerCase();
    return Generation.model_for_user(user_email);
};


Generation.prepare = async function(email) {
    const model = Generation.model_for_user(email);

    // Ahora usamos user.json, así que este paso no es necesario
    // await writeFile(user_data(), email);

    fs.writeFileSync(path.join(path_assignment, 'Enunciado.pdf'), enunciados[model]);

    return ;
};

Generation.main = async function(myArgs){
    if((myArgs.length < 1) || (myArgs[0] != '--force')) {
        try{
            Generation.model();
            return;
        }catch(e) {};
    } 
    Generation.generate();
}

Generation.generate = async function() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // TODO: comprobar que sea @upm.es
    const email = await new Promise((resolve, reject) => {
        readline.question('¿Cuál es tu dirección de e-mail (@alumnos.upm.es)? ', email => resolve(email.toLowerCase()))
    });
    readline.close();
    return Generation.prepare(email);
};

if (require.main === module) {
    Generation.main(process.argv.slice(2));
}

module.exports = Generation;
