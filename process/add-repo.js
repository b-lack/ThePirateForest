import { promises as fs } from "fs";
import { exit } from 'process';
import minimist from "minimist";
import fetch from "node-fetch";
import { Octokit } from "@octokit/core";
import { nanoid } from 'nanoid'

/*
var argv = minimist(process.argv.slice(2));


let OWNER;
let REPO;

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

if(typeof argv.owner === "undefined") {
    console.warn('"--owner" repository URL attribute missing');
    process.exit(1);
}else if(typeof argv.repo === "undefined") {
    console.warn('"--repo" repository URL attribute missing');
    process.exit(1);
}else{
    OWNER = argv.owner;
    REPO = argv.repo;
}*/

const octokit = new Octokit();

const getRepoInfo = (data) => {
    let repoInfo = {
        "pirate_id": nanoid(),
        "added": (new Date()).getTime(),
        "id": data.id,
        "name": data.name,
        "full_name": data.full_name,
        "description": data.description,
        "html_url": data.html_url,
        "language": data.language,
        "topics": data.topics || [],
        "stargazers_count": data.stargazers_count,
        "license_name": data.license ? data.license.name : '',
        "owner_login": data.owner.login,
        "owner_avatar_url": data.owner.avatar_url,
        "owner_html_url": data.owner.html_url,
        "updated_at": data.updated_at,
        "homepage": data.homepage
    }

    return repoInfo;
}


const addRepo = async (owner, repo, topics) => {
    console.log('ADD REPO');
    try{
        const exists = await checkIfExists();
        const data = await getRepo(owner, repo)
       
        if(exists && data && data.status === 200 && data.data){

            //if(data.private === true || data.data.visibility !== 'public') throw 'repository is private';

            const rawdata = await fs.readFile("jekyll/_data/repositories.json");
            let repositories = JSON.parse(rawdata);

            const exists = await checkRepoExists(data.data.id, repositories);

            const newData = getRepoInfo(data.data);
            newData.topics = [...newData.topics, ...topics];
            
            
            
            if(exists){
                let veryNewData = {...exists, ...newData};
                veryNewData.added = exists.added;
                veryNewData.topics = [...exists.topics, ...topics];
                
                repositories = replaceRepo(repositories, veryNewData);
                console.log(veryNewData);

            }else{
                repositories.push(newData);
            }
            

            await fs.writeFile("jekyll/_data/repositories.json", JSON.stringify(repositories, null, 2));
            await fs.writeFile("jekyll/assets/repositories.json", JSON.stringify(repositories, null, 2));
            console.log('ADD REPO SUCCESS');
            
        }else{
            console.log('ADD REPO ERROR', data);
        }
        return {status: 200, response: {msg: 'Successfully added!'}}
    }catch(error){
        return {status: 400, response: {msg: error}}
    }
}

const checkIfExists =  async () => {
    try{
        const rawdata = await fs.readFile("jekyll/_data/repositories.json");
        JSON.parse(rawdata);
        return true;
    }catch(error){
        console.warn(error);
        //process.exit(1);
    }
}
const checkRepoExists = async (id, repositories) => {
    
    const repos = repositories.filter(d => d.id === id)

    return repos[0]
}
const replaceRepo = (repositories, newRepo) => {
    
    const key = repositories.findIndex(d => d.id === newRepo.id)

    repositories[key] = newRepo;

    return repositories
}

const getRepo = async (owner, repo) => {
    
    return await octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo
    }).catch(e => {
        console.log('ERROR', e);
    })
}

export default addRepo;