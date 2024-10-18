import Canvas from "./class/Canvas";
import WebSocketConnection from "./class/WebSocketConnection";

WebSocketConnection.tryConnectWebSocket();

// had to move here instead of leaving it as setTimeout onError because the script would just decide to stop running after a while
setInterval(() => {
	if (WebSocketConnection.isDisconnected()) {
		WebSocketConnection.tryConnectWebSocket();
	}
}, 1000);

window.onload = () => {
	Canvas.init();
};