import VaultCell from "class/VaultCell";
import Arrow from "class/Arrow";

export default class Data {
	public static cells: VaultCell[] = [];
	public static arrows: Arrow[] = [];

	public static save() {
		localStorage.setItem("cells", JSON.stringify(Data.cells));
		localStorage.setItem("arrows", JSON.stringify(Data.arrows));
	}

	public static load() {
		const cells = localStorage.getItem("cells");
		if (cells) {
			Data.cells = JSON.parse(cells);
		}

		const arrows = localStorage.getItem("arrows");
		if (arrows) {
			Data.arrows = JSON.parse(arrows);
		}
	}

	public static clear() {
		Data.cells = [];
		Data.arrows = [];
		Data.save();
	}
}