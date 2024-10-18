import Canvas from "./class/Canvas";
import WebSocketConnection from "./class/WebSocketConnection";

WebSocketConnection.tryConnectWebSocket();
requestAnimationFrame(Canvas.doRender);
