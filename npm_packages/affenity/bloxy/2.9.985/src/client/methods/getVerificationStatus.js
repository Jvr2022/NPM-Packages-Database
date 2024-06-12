const classes = require('../../classes');
let performedRequests = 0;


module.exports = async function (setup, self) {
    let newPromise = new Promise(async function(resolve, reject) {
        if (performedRequests >= 60) return reject("You've hit the rate limit for using eryn's verification api. Please wait a few seconds");
        performedRequests++;

        setTimeout( () => {
            performedRequests = performedRequests -1
        }, 60000);

        let platform = setup.platform == 'discord' ? 'user' : 'roblox'
        let url = `https://verify.eryn.io/api/${platform}/${setup.userId}`;
        let options = {
            
        }

        self._request(url, options).then(({res})=>{
            if (res.statusCode !== 200) return reject(`Failed to get user's verification status with RoVer, code: ${res.statusCode}, message: ${res.statusMessage}`);
            let body = JSON.parse(res.body);
            if (platform == 'roblox') {
                resolve(new classes.User.RoVerResponseDiscord(body));
            } else {
                resolve(new classes.User.RoVerResponseRoblox(body, self));
            }
        }).catch(reject);
    })
    return newPromise;
}