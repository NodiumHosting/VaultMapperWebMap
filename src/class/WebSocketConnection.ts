import { WEBMAP_VERSION } from "../WEBMAP_VERSION";
import Data from "./Data";
import Canvas from "./Canvas";
import ClientConfig from "./ClientConfig";
import Utility from "./Utility";

export default class WebSocketConnection {
	private static ws: WebSocket | null = null;

	public static isDisconnected() {
		const isNull = this.ws == null;
		const isClosed = this.ws?.readyState === WebSocket.CLOSED;
		return isNull || isClosed;
	}

	public static tryConnectWebSocket() {
		if (this.ws == null || this.ws.readyState === WebSocket.CLOSED) {
			this.ws = new WebSocket(`ws://${Data.websocket_ip}:${Data.websocket_port}`);
	
			this.ws.onopen = () => {
				console.log("WebSocket connection established");
			};
	
			this.ws.onmessage = (event) => this.onMessage(event);
	
			this.ws.onclose = () => {
				console.log("WebSocket connection closed");
				this.ws = null;
				// setTimeout(this.tryConnectWebSocket, 1000);
			};
	
			this.ws.onerror = (error) => {
				console.error("WebSocket error:", error);
				this.ws!.close();
			};
		}
	}

	public static onMessage(event: MessageEvent) {
		const data: [PacketType, string] = event.data.split("|");
		const type: PacketType = data[0];
	
		switch (type) {
			case PacketType.VERSION:
				const version = parseInt(data[1]);
	
				if (version !== WEBMAP_VERSION) {
					console.error("WebMap version mismatch");
					Canvas.drawVersionMismatchMessage();
					this.ws!.close();
					return;
				}
				break;
			case PacketType.CONFIG:
				const config = JSON.parse(Utility.decompressBlob(Utility.base64ToBlob(data[1])));
				ClientConfig.setFromJSON(config);
				break;
			case PacketType.RESET:
				Data.clear();
				break;
			case PacketType.CELL:
				const cell = Utility.cellFromJSON(data[1]);
				Data.addOrUpdateCell(cell);
				break;
			case PacketType.ARROW:
				const arrow = Utility.arrowFromJSON(data[1]);
				Data.addOrUpdateArrow(arrow);
				break;
		}
	}
}
