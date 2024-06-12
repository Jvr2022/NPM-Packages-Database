

exports.run = async function (userId) {
	let response = await this._setup.request.request(`https://api.roblox.com/user/get-friendship-count?userId=${userId}`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to get numFriends. ${response.status}`);

	return parseInt(response.body.count);
};



exports.conf = {
	required: {
		params: 1
	},

	name: "getNumFriends",
	description: "Gets the amount of friends the user has",
	params: ["userId (Number)"]
};