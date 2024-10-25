import Data from "./class/Data";
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

let lastClick = 0;
document.addEventListener("click", (e) => {
	// ignore if click was on input element
	if (e.target instanceof HTMLInputElement) return;

	document.getElementById("ws-input")?.remove();

	const now = Date.now();
	if (now - lastClick < 500) {
		// double click
		// add input element for ws ip:port
		const input = document.createElement("input");
		input.id = "ws-input";
		input.type = "text";
		input.placeholder = "ip:port";
		input.value = `${Data.websocket_ip}:${Data.websocket_port}`;
		input.style.position = "absolute";
		input.style.top = `${e.clientY}px`;
		input.style.left = `${e.clientX}px`;
		document.body.appendChild(input);
		input.focus();
		input.addEventListener("keyup", (e) => {
			if (e.key === "Enter") {
				Data.websocket_ip = input.value.split(":")[0];
				Data.websocket_port = parseInt(input.value.split(":")[1]);
				Data.clear();
				Canvas.hasChanged = true;
				WebSocketConnection.forceReconnect();

				document.body.removeChild(input);
			}
		});

		lastClick = 0;
		return;
	}
	lastClick = now;
});
