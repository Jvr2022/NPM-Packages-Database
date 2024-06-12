const cookie = require("./getCookie");

(async () => {
    const Bloxy = require("../dist");
    const client = new Bloxy.Client({
        credentials: {
            cookie
        }
    });
    await client.login();
})();
