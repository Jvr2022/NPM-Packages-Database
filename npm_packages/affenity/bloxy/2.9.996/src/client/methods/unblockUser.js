

exports.run = async function (userId) {
    
	let response = await this._setup.request.request(`https://api.roblox.com/userblock/unblock?userId=${userId}`, { json: true, method: "POST" });
	if (response.statusCode !== 200) throw new Error(`Failed to unblock user. ${response.status}`);

	return {
		success: response.body.success === true,
		userId: userId
	};
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "unblockUser",
	description: "Unblocks a user from the authenticated user",
	params: ["userId (Number)"]
};