


module.exports = async function (setup, self) {
    let newPromise = new Promise(async function(resolve, reject) {

        let url = `https://groups.roblox.com/v1/groups/${setup.groupId}/wall/users/${setup.userId}/posts`;

        let options = {
            method: "DELETE"
        }

        self._request(url, options).then(({res})=>{
            if (res.statusCode !== 200) return reject(`Failed to delete wall posts by user, code: ${res.statusCode}, message: ${res.statusMessage}`);
            resolve(true);
        }).catch(reject);
    })
    return newPromise;
}