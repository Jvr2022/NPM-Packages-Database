

exports.run = async function (userId) {
	let groups = await this.getUserGroups(userId);
	return (groups.find(x=>x.isPrimary===true));
};



exports.conf = {
	required: {
		params: 1
	},

	name: "getUserPrimaryGroup",
	description: "Gets a user's primary group (if any)",
	params: ["userId (Number)"]
};