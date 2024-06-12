/* eslint-disable no-console */
const bloxy = require("../index");

let client = new bloxy({
	cookie: ""
});


client.on("ready", function () {
	client.getIdByUsername("CodeTheIdiot").then(userId=>{
		console.log(userId);
	});

	
	client.getGroup(3544434).then(async group=>{
		/*group.getRole({name:"customers"}).then(role=>{
			console.log(role);
		});
		group.getFunds().then(f=>{
			console.log("Funds:", f)
		});
		let user = await client.getUser("9nt9kfx9i_9nl");
		console.log(user);

		console.log("\n");*/

		group.isMember(18442032).then(ismember=>{
			//console.log(ismember);
		})

		//console.log(group);

		let onChange = group.onChange();

		onChange.on('ready', function () {
			console.log("onChange is ready");
		})

		onChange.on('shout', function (update) {
			console.log(update);
		})

	});
});

client.login();