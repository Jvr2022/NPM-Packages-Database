


module.exports = async function (userId, self) {
    let newPromise = new Promise(async function(resolve, reject) {

        let url = `https://api.roblox.com/user/unfriend?friendUserId=${userId}`;

        let options = {
            json: true,
            method: "POST"
        }

        self._request(url, options).then(({res})=>{
            if (res.statusCode !== 200) return reject(`Failed to unfriend user, code: ${res.statusCode}, message: ${res.statusMessage}`);

            resolve(Boolean(res.body.success == true));
        }).catch(reject);
    })
    return newPromise;
}