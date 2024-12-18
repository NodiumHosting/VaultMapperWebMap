import { WEBMAP_VERSION } from "../WEBMAP_VERSION";
import Data from "./Data";
import Canvas from "./Canvas";
import ClientConfig from "./ClientConfig";
import Utility from "./Utility";
import PacketType from "../enum/PacketType";
import { createVaultCell } from "./VaultCell";
import { createArrow } from "./Arrow";

export default class WebSocketConnection {
	private static ws: WebSocket | null = null;

	public static isDisconnected() {
		const isNull = this.ws == null;
		const isClosed = this.ws?.readyState === WebSocket.CLOSED;
		return isNull || isClosed;
	}

	public static forceReconnect() {
		if (this.ws != null) {
			this.ws.close();
		}
		this.tryConnectWebSocket();
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

	public static async onMessage(event: MessageEvent) {
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
				const json = await Utility.decompressBlob(Utility.base64ToBlob(data[1]));
				ClientConfig.setFromJSON(json);

				Canvas.hasChanged = true;
				break;
			case PacketType.RESET:
				Data.clear();

				Canvas.hasChanged = true;
				break;
			case PacketType.CELL:
				const cell = await createVaultCell(data[1]);
				Data.addOrUpdateCell(cell);

				Canvas.hasChanged = true;
				break;
			case PacketType.ARROW:
				const arrow = await createArrow(data[1]);
				Data.addOrUpdateArrow(arrow);

				Canvas.hasChanged = true;
				break;
			case PacketType.REMOVEARROW:
				Data.removeArrow(data[1]);

				Canvas.hasChanged = true;
				break;
		}
	}
}
