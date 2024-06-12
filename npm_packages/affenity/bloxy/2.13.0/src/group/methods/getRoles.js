const Group = require('../group.js');


module.exports = async function (groupId, self, overrideCache) {
    let newPromise = new Promise(async function(resolve, reject) {

        if (!groupId || !self) return reject(`Did not provide groupId or self`);

        let url = `https://www.roblox.com/api/groups/${groupId}/RoleSets/`;

        let options = {
            json: true
        }

        if (!overrideCache) {
            let find = await self._setup.cache.getCache('grouproles', groupId);
            if (find != null) return resolve(find.sort((a,b) => a.rank > b.rank).map(x=> new Group.GroupRole(x, groupId, self)));
        }
        self._request(url, options).then(({res})=>{
            if (res.statusCode !== 200) return reject(`Failed to get group roles, code: ${res.statusCode}, message: ${res.statusMessage}`);
            self._setup.cache.cache('grouproles', groupId, res.body);
            resolve(res.body.map(x=>new Group.GroupRole(x, groupId, self)).reverse())
        }).catch(reject);
    });
    return newPromise;
}