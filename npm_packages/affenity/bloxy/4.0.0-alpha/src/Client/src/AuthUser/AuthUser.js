module.exports = class AuthUser {
	constructor (client, data) {
		this.client = client;
		this.id = data.userId;

		this._setupMethods();
	}

	_setupMethods () {
		const clientMethodsStore = require("./methods")(this);
		const clientMethodsRegister = clientMethodsStore.register;

		for (let [key, value] of Object.entries(clientMethodsRegister)) {
			if (!this[key]) {
				this[key] = value;
			} else {
				console.warn(this.client.errors.methodRegister.alreadyAssigned(key));
			}
		}
	}
};
