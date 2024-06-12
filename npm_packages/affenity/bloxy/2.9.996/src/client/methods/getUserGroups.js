

exports.run = async function (userId) {

	let response = await this._setup.request.request(`https://api.roblox.com/users/${userId}/groups`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to get user's groups. ${response.status}`);

	return response.body.map(x=> new this._setup.classes.UserGroup(x, this));
};



exports.conf = {
	required: {
		params: 1
	},

	name: "getUserGroups",
	description: "Gets a user's groups",
	params: ["userId (Number)"]
};