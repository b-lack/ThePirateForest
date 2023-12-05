#!/usr/bin/env node
import { promises as fs } from "fs";
import inquirer from 'inquirer';

const questions = [
    {
        type: 'input',
        name: 'author',
        message: "Author: "
    },{
        type: 'input',
        name: 'title',
        message: "What's the title: "
    }, {
        type: 'input',
        name: 'description',
        message: "What's the description: "
    },
    {
        type: 'input',
        name: 'url',
        message: "What's the URL: "
    },
    {
        type: 'input',
        name: 'image-embed',
        message: "Add image URL: "
    },
    {
        type: 'input',
        name: 'video-embed',
        message: "Add video URL: "
    }
];

inquirer.prompt(questions).then(answers => {
  addnews(answers);
});


const loadNewsJson = async () => {
    const rawdata = await fs.readFile("/Users/b-mac/sites/thepirateforest/ThePirateForest/jekyll/_data/news.json");
    return JSON.parse(rawdata);
};

const addnews = async (newNews) => {
    loadNewsJson().then((news) => {
        newNews = {...newNews, datetime: Math.round((new Date()).getTime()/1000) };
        // add at the beginning of the array
        news.unshift(newNews);
        fs.writeFile("/Users/b-mac/sites/thepirateforest/ThePirateForest/jekyll/_data/news.json", JSON.stringify(news, null, 2));
    });
};