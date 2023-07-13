import * as fs from 'fs';

// https://www.npmjs.com/package/liquid
import Liquid  from 'liquid';
const engine = new Liquid.Engine()


const loadJson = () => {
    let rawdata = fs.readFileSync("../docs/_data/repositories.json");
    return JSON.parse(rawdata);
}

const jsonObj = loadJson();



const loadTemplate = () => {
    let rawdata = fs.readFileSync("../templates/treasures-template.md", "utf8", (err, data) => {
        console.log(err);
    });
    return rawdata;
}


const template = loadTemplate();

for (let i = 0; i < jsonObj.length; i++) {
    const element = jsonObj[i];
    engine
        .parseAndRender(template, element)
        .then(result => {
            fs.writeFileSync(`../docs/_treasure/${element.name}.md`, result);
     })
    
}

