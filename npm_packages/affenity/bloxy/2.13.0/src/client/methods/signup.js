
module.exports = async function (setup, self) {
    let newPromise = new Promise(async function(resolve, reject) {

        if (!setup || !self) return reject(`Did not provide setup or self`);

        if (!setup.username || !setup.password || !setup.gender || !setup.birthday) return reject(`Must provide username, password, gender and birthday!`)
        
        self._request('https://www.roblox.com/').then(({res})=>{
            let xcsrfToken = res.body.match(/\.setToken\(\'(.*?)\'\)/);
            if (xcsrfToken && xcsrfToken[1]) xcsrfToken = xcsrfToken[1]; else xcsrfToken = null;


            if (!xcsrfToken) return reject(`Failed to get X-CSRF-TOKEN`);

            self._setup.updateXcsrf(xcsrfToken);

            self._request(`https://auth.roblox.com/v2/signup`, {
                method: "POST",
                json: {
                    "isEligibleForHideAdsAbTest": false,
                    "username": setup.username,
                    "password": setup.password,
                    "gender": setup.gender,
                    "birthday": setup.birthday,
                    "isTosAgreementBoxChecked": true,
                    "context": "RollerCoasterSignupForm"
                },
            }).then(({res}) => {
                console.log(res.statusCode)
                console.log(res.statusMessage)
                console.log(res.request.headers)
                console.log(res.body)
            })
        })

    })
    return newPromise;
}