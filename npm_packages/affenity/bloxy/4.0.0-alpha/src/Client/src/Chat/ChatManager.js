module.exports = class ChatManager {
	constructor (env) {
		this.client = env.client;

		this._setupMethods();
	}

	_setupMethods () {
		const chatMethodsStore = require("./methods")(this);
		const chatMethodsRegister = chatMethodsStore.register;

		for (let [key, value] of Object.entries(chatMethodsRegister)) {
			if (!this[key]) {
				this[key] = value;
			} else {
				console.warn(this.client.errors.methodRegister.alreadyAssigned(key));
			}
		}
	}
};
