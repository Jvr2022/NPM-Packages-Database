/* eslint-disable */

const memUsage = () => {
    let mem = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Use: ${mem} MB`);
};
const bloxy = require("./");
const client = new bloxy.Client();

const responses = ["hi", "hello there", "how are you?"];

console.log("Logging in to bloxy");
client.login({
    cookie: ""
}).then(async clientUser => {
    console.log(`Logged in as ${clientUser.id}`);
    console.log("Owns asset:", await client.userOwnsAsset(clientUser.id, 1362437900));
});
