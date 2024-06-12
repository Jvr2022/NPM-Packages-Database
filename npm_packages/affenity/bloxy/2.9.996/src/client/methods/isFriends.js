

exports.run = async function (userId1, userId2) {
	let response = await this._setup.request.request(`https://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=IsFriendsWith&playerId=${userId1}&userId=${userId2}`);
	if (response.statusCode !== 200) throw new Error(`Failed to check if two users are friends. ${response.status}`);

	return response.body.includes("true");
};



exports.conf = {
	required: {
		params: 2
	},

	name: "isFriends",
	description: "Checks if two users are friends",
	params: ["userId1 (Number)", "userId2 (Number)"]
};