import VaultCell from "./VaultCell";
import Arrow from "./Arrow";

export default class Data {
	public static websocket_ip: string = "localhost";
	public static websocket_port: number = 58008;

	private static cells: VaultCell[] = localStorage.getItem("cells") ? JSON.parse(localStorage.getItem("cells") as string) : [];
	private static arrows: Arrow[] = localStorage.getItem("arrows") ? JSON.parse(localStorage.getItem("arrows") as string) : [];

	private static save() {
		localStorage.setItem("cells", JSON.stringify(Data.cells));
		localStorage.setItem("arrows", JSON.stringify(Data.arrows));
	}

	public static getCells() {
		return Data.cells;
	}

	public static addOrUpdateCell(cell: VaultCell) {
		if (Data.cells.find((c: VaultCell) => c.x === cell.x && c.z === cell.z)) {
			Data.cells.splice(
				Data.cells.findIndex((c: VaultCell) => c.x === cell.x && c.z === cell.z),
				1,
			);
		}
		Data.cells.push(cell);
		Data.save();
	}

	public static getArrows() {
		return Data.arrows;
	}

	public static addOrUpdateArrow(arrow: Arrow) {
		if (Data.arrows.find((a: Arrow) => a.username === arrow.username)) {
			Data.arrows.splice(
				Data.arrows.findIndex((a: Arrow) => a.username === arrow.username),
				1,
			);
		}
		Data.arrows.push(arrow);
		Data.save();
	}

	public static removeArrow(username: string) {
		Data.arrows = Data.arrows.filter((a: Arrow) => a.username !== username);
		Data.save();
	}

	public static clear() {
		Data.cells = [];
		Data.arrows = [];
		Data.save();
	}
}
