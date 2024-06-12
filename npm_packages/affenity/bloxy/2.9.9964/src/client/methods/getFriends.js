

exports.run = async function (identifier, page) {


	let userId = this.misc.getUserId(identifier);
	if (typeof(userId) === "undefined") throw new Error("Did not provide a valid user or userId");


	page = (page || 1) <= 0 ? 1: page||1;


	let response = await this._setup.request.request(`https://api.roblox.com/users/${userId}/friends?page=${page}`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Could not get user's friends. ${response.status}`);

	return (response.body.map(x=>new this._setup.classes.PartialUser(x, this)));
};


exports.conf = {
	required: {
		params: 1
	},

	name: "getFriends",
	description: "Gets a user's friends",
	params: ["userId (Number)"]
};