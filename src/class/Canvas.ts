import { getCellColor } from "./ClientConfig";
import VaultCell from "./VaultCell";
import Arrow from "./Arrow";
import Data from "./Data";
import CellType from "../enum/CellType";
import RoomIcon, { initRoomIcons, RoomIconBitmaps } from "../enum/RoomIcon";
import RoomName from "../enum/RoomName";

export default class Canvas {
	public static async init() {
		await initRoomIcons();
		requestAnimationFrame(Canvas.doRender);
		Canvas.canvas = document.getElementById("map") as HTMLCanvasElement;
	}

	public static hasChanged: boolean = false;

	private static canvas: HTMLCanvasElement = document.getElementById("map") as HTMLCanvasElement;
	private static ctx: CanvasRenderingContext2D = Canvas.canvas.getContext("2d") as CanvasRenderingContext2D;

	private static width: number = Canvas.canvas.width;
	private static height: number = Canvas.canvas.height;
	private static middle: number = Math.floor(Canvas.width / 2);
	private static cellSize: number = Math.floor(Canvas.width / 49);

	public static base64ToBlob(base64Input: string): Blob {
		const parts = base64Input.split(";base64,");
		const base64 = parts[1];
		const mimeType = parts[0].split(":")[1];

		try {
			const byteCharacters = atob(base64);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			return new Blob([byteArray], { type: mimeType });
		} catch (e) {
			return new Blob();
		}
	}

	public static drawVersionMismatchMessage() {
		Canvas.ctx.fillStyle = "red";
		Canvas.ctx.fillRect(0, 0, Canvas.width, Canvas.height);
		Canvas.ctx.fillStyle = "black";
		Canvas.ctx.font = "20px Arial";
		Canvas.ctx.fillText("WebMap version mismatch", Canvas.middle - 100, Canvas.middle);
	}

	public static async drawCell(cell: VaultCell) {
		const x = cell.x + 24;
		const z = cell.z + 24;

		const color = getCellColor(cell);
		Canvas.ctx.fillStyle = color;

		switch (
			true // absolutely cursed workaround for enums
		) {
			case cell.cellType == CellType.ROOM:
				Canvas.ctx.fillRect(x * Canvas.cellSize, z * Canvas.cellSize, Canvas.cellSize, Canvas.cellSize);
				break;
			case cell.cellType == CellType.TUNNEL_X:
				Canvas.ctx.fillRect(x * Canvas.cellSize, z * Canvas.cellSize + Canvas.cellSize / 4, Canvas.cellSize, (Canvas.cellSize / 4) * 2);
				break;
			case cell.cellType == CellType.TUNNEL_Z:
				Canvas.ctx.fillRect(x * Canvas.cellSize + Canvas.cellSize / 4, z * Canvas.cellSize, (Canvas.cellSize / 4) * 2, Canvas.cellSize);
				break;
		}

		if (cell.roomName === RoomName.UNKNOWN || !RoomIconBitmaps[cell.roomName]) {
			return;
		}

		const half = Canvas.cellSize / 2;

		Canvas.ctx.drawImage(RoomIconBitmaps[cell.roomName], x * Canvas.cellSize - half, z * Canvas.cellSize - half, Canvas.cellSize * 2, Canvas.cellSize * 2);
	}

	public static async drawArrow(arrow: Arrow) {
		const x = arrow.x + 24 + 1.5;
		const z = arrow.z + 24 + 0.5;
		const yaw = arrow.yaw;
		const username = arrow.username;
		const color = arrow.color;

		//make a rotated triangle
		const x1 = -1;
		const z1 = -0.66;
		const x2 = -1;
		const z2 = 0.66;
		const x3 = 1;
		const z3 = 0;

		const cx = -1;
		const cz = 0;
		const radangle = (yaw + 90) * (Math.PI / 180);

		const x1r = cx + (x1 - cx) * Math.cos(radangle) - (z1 - cz) * Math.sin(radangle);
		const z1r = cz + (x1 - cx) * Math.sin(radangle) + (z1 - cz) * Math.cos(radangle);
		const x2r = cx + (x2 - cx) * Math.cos(radangle) - (z2 - cz) * Math.sin(radangle);
		const z2r = cz + (x2 - cx) * Math.sin(radangle) + (z2 - cz) * Math.cos(radangle);
		const x3r = cx + (x3 - cx) * Math.cos(radangle) - (z3 - cz) * Math.sin(radangle);
		const z3r = cz + (x3 - cx) * Math.sin(radangle) + (z3 - cz) * Math.cos(radangle);

		Canvas.ctx.fillStyle = color;
		Canvas.ctx.beginPath();
		Canvas.ctx.moveTo((x + x1r) * Canvas.cellSize, (z + z1r) * Canvas.cellSize);
		Canvas.ctx.lineTo((x + x2r) * Canvas.cellSize, (z + z2r) * Canvas.cellSize);
		Canvas.ctx.lineTo((x + x3r) * Canvas.cellSize, (z + z3r) * Canvas.cellSize);
		Canvas.ctx.fill();
	}

	public static doRender() {
		if (!Canvas.hasChanged) {
			requestAnimationFrame(Canvas.doRender);
			return;
		}
		Canvas.hasChanged = false;

		Canvas.ctx.clearRect(0, 0, Canvas.width, Canvas.height);

		Data.getCells().forEach(Canvas.drawCell);
		Data.getArrows().forEach(Canvas.drawArrow);

		requestAnimationFrame(Canvas.doRender);
	}
}
