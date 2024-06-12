const cheerio = require('cheerio');


module.exports = async function (userId1, userId2, self) {
    let newPromise = new Promise(async function(resolve, reject) {
        if (!userId1 || !userId2 || !self) return reject(`Did not provide userId1, userId2, or self`);

        let url = `https://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsFriendsWith&playerId=${userId1}&userId=${userId2}`;

        self._request(url).then(({res})=>{
            if (res.statusCode !== 200) return reject(`Failed to get request, code: ${res.statusCode}, message: ${res.statusMessage}`);

            return resolve(res.body.indexOf('true')>=0);
        })

    })
    return newPromise;
}