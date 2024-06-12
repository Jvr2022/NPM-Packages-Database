

exports.run = async function (userId) {
    
	let options = {
		method: "POST",
		json: true
	};

	let response = await this._setup.request.request(`https://api.roblox.com/user/unfriend?friendUserId=${userId}`, options);
	if (response.statusCode !== 200) throw new Error(`Failed to unfriend user. ${response.status}`);

	return {
		success: response.body.success === true,
		userId : userId
	};
};



exports.conf = {
	required: {
		params: 1,
		auth: true
	},

	name: "unfriendUser",
	description: "Unfriends a user on Roblox",
	params: ["userId (Number)"]
};