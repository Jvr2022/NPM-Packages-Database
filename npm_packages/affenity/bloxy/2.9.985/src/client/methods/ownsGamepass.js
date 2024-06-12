
module.exports = async function (setup, self) {
    let newPromise = new Promise(async function(resolve, reject) {

        if (!setup || !self) return reject(`Did not provide setup or self`);

        let url = `https://inventory.roblox.com/v1/users/${setup.userId}/items/GamePass/${setup.passId}`;

        self._request(url).then(({res})=>{
            if (res.statusCode !== 200) return reject(`Failed to check if user owns asset, code: ${res.statusCode}, message: ${res.statusMessage}`);

            let data = JSON.parse(res.body);
            if (data.data.length > 0) return resolve(true);
            resolve(false);
        })
    })
    return newPromise;
}