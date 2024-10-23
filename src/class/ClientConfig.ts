import VaultCell from "./VaultCell";
import RoomType from "../enum/RoomType";

export default class ClientConfig {
	public static ROOM_COLOR: string = "#0000FF";
	public static START_ROOM_COLOR: string = "#FF0000";
	public static MARKED_ROOM_COLOR: string = "#FF00FF";
	public static INSCRIPTION_ROOM_COLOR: string = "#FFFF00";
	public static OMEGA_ROOM_COLOR: string = "#55FF55";
	public static CHALLENGE_ROOM_COLOR: string = "#F09E00";
	public static SHOW_INSCRIPTIONS: boolean = true;
	public static SHOW_ROOM_ICONS: boolean = true;

	public static setFromJSON(json: string) {
		const obj = JSON.parse(json);

		if (obj.ROOM_COLOR !== undefined) {
			ClientConfig.ROOM_COLOR = obj.ROOM_COLOR;
		}
		if (obj.START_ROOM_COLOR !== undefined) {
			ClientConfig.START_ROOM_COLOR = obj.START_ROOM_COLOR;
		}
		if (obj.MARKED_ROOM_COLOR !== undefined) {
			ClientConfig.MARKED_ROOM_COLOR = obj.MARKED_ROOM_COLOR;
		}
		if (obj.INSCRIPTION_ROOM_COLOR !== undefined) {
			ClientConfig.INSCRIPTION_ROOM_COLOR = obj.INSCRIPTION_ROOM_COLOR;
		}
		if (obj.OMEGA_ROOM_COLOR !== undefined) {
			ClientConfig.OMEGA_ROOM_COLOR = obj.OMEGA_ROOM_COLOR;
		}
		if (obj.CHALLENGE_ROOM_COLOR !== undefined) {
			ClientConfig.CHALLENGE_ROOM_COLOR = obj.CHALLENGE_ROOM_COLOR;
		}
		if (obj.SHOW_INSCRIPTIONS !== undefined) {
			ClientConfig.SHOW_INSCRIPTIONS = obj.SHOW_INSCRIPTIONS;
		}
		if (obj.SHOW_ROOM_ICONS !== undefined) {
			ClientConfig.SHOW_ROOM_ICONS = obj.SHOW_ROOM_ICONS;
		}
	}
}

export function getCellColor(cell: VaultCell): string {
	return fixColor(_getCellColor(cell));
}

function _getCellColor(cell: VaultCell): string {
	if (cell.roomType == RoomType.START) {
		return ClientConfig.START_ROOM_COLOR;
	}
	if (cell.marked) {
		return ClientConfig.MARKED_ROOM_COLOR;
	}
	if (cell.inscripted) {
		return ClientConfig.INSCRIPTION_ROOM_COLOR;
	}
	if (cell.roomType == RoomType.OMEGA) {
		return ClientConfig.OMEGA_ROOM_COLOR;
	}
	if (cell.roomType == RoomType.CHALLENGE) {
		return ClientConfig.CHALLENGE_ROOM_COLOR;
	}
	return ClientConfig.ROOM_COLOR;
}

export function fixColor(color: string): string {
	if (!color.startsWith("#")) {
		color = "#" + color;
	}
	if (color.length != 7) {
		//ARGB
		if (color.length == 8) {
			color = "#" + color.substring(2) + color.substring(0, 2);
		} else if (color.length == 9) {
			color = "#" + color.substring(3) + color.substring(1, 3);
		} else {
			color = "#000000";
		}
	}
	return color;
}