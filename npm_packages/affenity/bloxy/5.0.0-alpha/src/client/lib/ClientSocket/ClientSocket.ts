import Client from "../../Client";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as SignalR from "signalr-client";
import { default as socketHandlers } from "./handlers";
import EventEmitter from "events";


export default class ClientSocket extends EventEmitter {
    public client: Client;
    public socket: any;
    public connected: boolean;

    constructor (client: Client) {
        super();

        this.client = client;
        this.socket = null;
        this.connected = false;
    }

    connect (): Promise<void> {
        return new Promise((resolve, reject) => {
            const connectSocket = (retries = 0): void => {
                this.socket = new SignalR.client("wss://realtime.roblox.com/notifications", ["usernotificationhub"], 3, true);
                this.socket.headers.Cookie = this.client.rest.cookieJar.getCookieStringSync("https://roblox.com");
                const maxRetries = this.client.options.setup?.websocket?.maxRetries ?? 3;

                const attemptReconnect = (): unknown => connectSocket(++retries);
                const onError = (error: Error): void => {
                    this.emit("error", error);
                    attemptReconnect();
                };

                if (retries >= maxRetries) {
                    this.socket.close();
                    reject(new Error(`Connection failed, attempted to establish a connection ${retries} times`));
                }

                this.socket.serviceHandlers.connectFailed = (error: Error): unknown => onError(error);
                this.socket.serviceHandlers.onerror = (error: Error): unknown => onError(error);
                this.socket.serviceHandlers.connected = (): void => {
                    this.emit("ready");
                    this.init();
                    resolve();
                };
                this.socket.serviceHandlers.reconnecting = (): void => {
                    this.emit("reconnecting");
                };

                // Start the attempt of connection
                this.socket.start();
            };

            connectSocket();
        });
    }

    /**
     * This is called after the connection of the socket has successfully been established
     */
    init (): void {
        this.socket.on("UserNotificationHub", "notification", (name: string, message: any) => {
            this.emit("event", {
                name,
                message
            });

            const parsedMessage = !(message instanceof Object) ? JSON.parse(message) : message;
            const messageType = parsedMessage.Type ? parsedMessage.Type.toLowerCase() : null;
            const socketHandler = socketHandlers.get(name.toLowerCase());

            if (socketHandler) {
                return socketHandler(this, messageType, parsedMessage);
            }
        });
    }
}
