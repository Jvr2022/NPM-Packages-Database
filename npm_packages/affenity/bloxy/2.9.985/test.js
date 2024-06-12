const b = require('./src/index.js');
const c = new b();

c.ownsGamepass('18442032', '518191').then(owns=>{
    console.log(owns);
})
/*
setInterval( () => {
    let t = Date.now();
    c.getUser(username).then(u=>{
        console.log(`Spent ${Date.now() - t}`)
        console.log(u.username);
    })
}, 3000)*/