


module.exports = async function (messageIds, self) {
    let newPromise = new Promise(async function(resolve, reject) {

        if (!messageIds || typeof(messageIds) !== 'object' || !self) return reject(`Did not provide messageIds or self`);


        let url = `https://www.roblox.com/messages/api/unarchive-messages`;

        let options = {
            method: "POST",
            form: {
                messageIds: messageIds
            }
        }

        self._request(url, options).then(({res})=>{
            if (res.statusCode !== 200) return reject(`Failed to move messages to inbox, code: ${res.statusCode}, message: ${res.statusMessage}`);
            resolve(true);
        })
    })
    return newPromise;
}