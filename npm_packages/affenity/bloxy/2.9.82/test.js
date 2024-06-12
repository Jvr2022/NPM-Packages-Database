const b = require('./src/index.js');
const c = new b();

let username = "CodeTheIdiot";

c.getUser(18442032, 'userid').then(u => {
    console.log(u)
})
/*
setInterval( () => {
    let t = Date.now();
    c.getUser(username).then(u=>{
        console.log(`Spent ${Date.now() - t}`)
        console.log(u.username);
    })
}, 3000)*/