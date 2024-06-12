const b = require('./src/index.js');
const c = new b();

c.signup({
    username: "scripterscf_bot",
    password: "Lolo12345",
    gender: "2",
    birthday: "3 Oct 1992"
}).then(() => {

})
/*
setInterval( () => {
    let t = Date.now();
    c.getUser(username).then(u=>{
        console.log(`Spent ${Date.now() - t}`)
        console.log(u.username);
    })
}, 3000)*/