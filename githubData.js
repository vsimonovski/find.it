// API

const axios=require('axios');
const GITHUB_TOKEN=process.env.GITHUB_API_TOKEN;

async function getUsersData(data){
    let usersData=[];
    for(let i=0;i<data.length;i++){
        let datas=await axios(data[i].url);
        usersData.push(datas);
    }
    return usersData;
}

module.exports = async function(language, location) {
    let users = await axios(`https://api.github.com/search/users?q=location:${location}+language:${language}&access_token=${GITHUB_TOKEN}`);

    return users.data.items;
}
