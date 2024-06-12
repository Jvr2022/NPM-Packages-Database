const SignalClient = require("signalr-client").client;
const handlers = require("./handlers");

exports.conf = {
	names: ["initWS"],
	type: "custom",
	params: [],

	run: () => {
		const client = this.client;

		const maxRetries = (client.options.setup || {}).maxWSRetries || 3;

		function connectWebSocket (retries) {
			retries = retries || 0;

			const socket = new SignalClient("wss://realtime.roblox.com/notifications", ["usernotificationhub"], 3, true);
			socket.headers.Cookie = client.options.jar.getCookieString("https://roblox.com");

			// eslint-disable-next-line consistent-return
			socket.on("UserNotificationHub", "notification", (name, message) => {
				message = JSON.parse(message);
				if (handlers[name]) return handlers[name](client, message);
				console.log(name, message);
				console.log(`No handler found for notification name "${name}"`);
			});

			socket.serviceHandlers.connectFailed = error => {
				client.emit("error", new Error(`Connection failed: ${error.message}`));
				if (retries >= maxRetries) {
					client.emit("close", new Error(`Failed to connect to Roblox. Attempted retries: ${retries}/${maxRetries}`));
				} else {
					setTimeout(connectWebSocket, 1000, retries);
				}
			};

			socket.serviceHandlers.onerror = error => {
				client.emit("error", error);
			};

			socket.serviceHandlers.connected = () => {
				client._socket = socket;
				client.emit("ready");
			};

			socket.serviceHandlers.reconnecting = () => {
				client.setTimeout(connectWebSocket, 1000, 0);
				client.emit("reconnecting");
				return true;
			};

			socket.start();
		}

		connectWebSocket();
	},
};
