let performedRequests = 0;



exports.run = async function (userId, platform) {
	if (performedRequests >= 60) throw new Error("You've hit the rate limit for eryn's verification api. Please wait some seconds before trying again.");
	performedRequests++;

	setTimeout( () => {
		performedRequests = performedRequests - 1;
	}, 60000);

	platform = (platform || "").toString() === "discord" ? "user": "roblox";

	let response = await this._setup.request.request(`https://verify.eryn.io/api/${platform}/${userId}`, { json: true });
	if (response.statusCode !== 200) throw new Error(`Failed to get user's verification. ${response.status}`);
    
	if (platform === "roblox") {
		return new this._setup.classes.RoVerResponseDiscord(response.body);
	} else {
		return new this._setup.classes.RoVerResponseRoblox(response.body, this);
	}
};



exports.conf = {
	required: {
		params: 2
	},

	name: "getVerificationStatus",
	description: "Gets another user's verification status using eryn's verification api",
	params: ["userId (Number)", "platform (String)"]
};