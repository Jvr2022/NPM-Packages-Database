const fs = require("fs");
const path = require("path");
const PreparedFunction = require("./src/PreparedFunction");
const FunctionStore = require("./src/FunctionStore");

exports.byConfigs = (env, configs) => {
	if (!Array.isArray(configs)) configs = [configs];
	const preparedFunctions = [];

	for (let num = 0; num < configs.length; num++) {
		const config = configs[num];
		const thisFunction = new PreparedFunction(env, config, env);
		// Console.log(`Read function "${config.names[0]}", and it's now prepared.`);
		preparedFunctions.push(thisFunction);
	}

	return new FunctionStore(env, preparedFunctions);
};

exports.byPath = (env, filePath, returnConfigs) => {
	let files = fs.readdirSync(filePath);
	const fileConfigs = [];

	for (let num = 0; num < files.length; num++) {
		try {
			const required = require(path.join(filePath, files[num]));
			if (required && required.conf) {
				fileConfigs.push(required.conf);
			} else {
				console.warn(`Warning, did not append ${files[num]} to the fileConfigs list since it did not export "conf"`);
			}
		} catch (error) {
			console.warn(`An error occurred while preparing files when requiring them. File name: ${files[num]}.\n${error}`);
		}
	}

	if (returnConfigs) return fileConfigs;
	return exports.byConfigs(env, fileConfigs);
};
