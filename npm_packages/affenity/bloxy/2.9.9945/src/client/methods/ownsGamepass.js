

exports.run = async function (userId, passId) {

	let response = await this._setup.request.request(`https://inventory.roblox.com/v1/users/${userId}/items/GamePass/${passId}`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to check if user owns gamepass ${response.status}`);

	if (response.body.data.length > 0) return true;
	return false;
};



exports.conf = {
	required: {
		params: 2
	},

	name: "ownsGamepass",
	description: "Checks if a user owns a gamepass",
	params: ["userId (Number)", "passId (Number)"]
};