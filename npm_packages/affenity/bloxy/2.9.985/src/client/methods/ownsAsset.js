
module.exports = async function (setup, self) {
    let newPromise = new Promise(async function(resolve, reject) {

        if (!setup || !self) return reject(`Did not provide setup or self`);

        let url = `https://api.roblox.com/ownership/hasasset?userId=${setup.userId}&assetId=${setup.assetId}`;

        self._request(url).then(({res})=>{
            if (res.statusCode !== 200) return reject(`Failed to check if user owns asset, code: ${res.statusCode}, message: ${res.statusMessage}`);

            resolve(res.body.includes('true'));
        })
    })
    return newPromise;
}