import { getCellColor } from "./ClientConfig";
import VaultCell from "./VaultCell";
import Arrow from "./Arrow";
import Data from "./Data";

export default class Canvas {
	private static canvas: HTMLCanvasElement = document.getElementById("map") as HTMLCanvasElement;
	private static ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

	private static width = this.canvas.width;
	private static height = this.canvas.height;
	private static middle = Math.floor(this.width / 2);
	private static cellSize = Math.floor(this.width / 49);

	public static drawVersionMismatchMessage() {
		this.ctx.fillStyle = "red";
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.fillStyle = "black";
		this.ctx.font = "20px Arial";
		this.ctx.fillText("WebMap version mismatch", this.middle - 100, this.middle);
	}

	public static drawCell(cell: VaultCell) {
		const x = cell.x + 24;
		const z = cell.z + 24;

		const color = getCellColor(cell);
		this.ctx.fillStyle = color;

		switch (cell.cellType) {
			case CellType.ROOM:
				this.ctx.fillRect(x * this.cellSize, z * this.cellSize, this.cellSize, this.cellSize);
				break;
			case CellType.TUNNEL_X:
				this.ctx.fillRect(x * this.cellSize, z * this.cellSize + this.cellSize / 4, this.cellSize, (this.cellSize / 4) * 2);
				break;
			case CellType.TUNNEL_Z:
				this.ctx.fillRect(x * this.cellSize + this.cellSize / 4, z * this.cellSize, (this.cellSize / 4) * 2, this.cellSize);
				break;
		}
	}

	public static drawArrow(arrow: Arrow) {
		const x = arrow.x + 24 + 1.5;
		const z = arrow.z + 24 + 0.5;
		const yaw = arrow.yaw;
		const player = arrow.player;
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

		this.ctx.fillStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo((x + x1r) * this.cellSize, (z + z1r) * this.cellSize);
		this.ctx.lineTo((x + x2r) * this.cellSize, (z + z2r) * this.cellSize);
		this.ctx.lineTo((x + x3r) * this.cellSize, (z + z3r) * this.cellSize);
		this.ctx.fill();
	}

	public static doRender() {
		this.ctx.clearRect(0, 0, this.width, this.height);

		Data.getCells().forEach(this.drawCell);
		Data.getArrows().forEach(this.drawArrow);

		requestAnimationFrame(this.doRender);
	}
}
