const path = require("path");

module.exports = env => {
	const client = env.client;
	const extraConfigs = client.src.prepareFunctions.byPath(env, path.join(__dirname, "./src"), true);
	const staticConfigs = require("./staticConfigs");
	const allConfigs = staticConfigs.concat(extraConfigs);
	return client.src.prepareFunctions.byConfigs(env, allConfigs);
};
