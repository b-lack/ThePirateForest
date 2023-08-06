import * as fs from 'fs';

// https://www.npmjs.com/package/liquid
import Liquid  from 'liquid';
import renderer from 'hexo-renderer-liquid';
//const engine = new Liquid.Engine("../docs")

var engine = new Liquid.Engine(new Liquid.LocalFileSystem("../jekyll/_includes"));

engine.registerFileSystem(new Liquid.LocalFileSystem("../jekyll/_includes"));
  

/*
const engine = renderer.Engine;
engine.registerFileSystem(new Liquid.LocalFileSystem("../docs"));
*/

const loadJson = () => {
    let rawdata = fs.readFileSync("../jekyll/_data/repositories.json");
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
    element.repository = jsonObj[i];
    engine
        .parseAndRender(template, element)
        .then(result => {
            fs.writeFileSync(`../jekyll/_treasure/${element.name}.md`, result);
     })
    
}

