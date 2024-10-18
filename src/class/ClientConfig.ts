import VaultCell from "./VaultCell";
import RoomType from "../enum/RoomType";

export default class ClientConfig {
	public static POINTER_COLOR: string = "#00FF00";
	public static ROOM_COLOR: string = "#0000FF";
	public static START_ROOM_COLOR: string = "#FF0000";
	public static MARKED_ROOM_COLOR: string = "#FF00FF";
	public static INSCRIPTION_ROOM_COLOR: string = "#FFFF00";
	public static OMEGA_ROOM_COLOR: string = "#55FF55";
	public static CHALLENGE_ROOM_COLOR: string = "#F09E00";
	public static SHOW_INSCRIPTIONS: boolean = true;

	public static setFromJSON(json: string) {
		const obj = JSON.parse(json);

		if (obj.POINTER_COLOR) {
			ClientConfig.POINTER_COLOR = obj.POINTER_COLOR;
		}
		if (obj.ROOM_COLOR) {
			ClientConfig.ROOM_COLOR = obj.ROOM_COLOR;
		}
		if (obj.START_ROOM_COLOR) {
			ClientConfig.START_ROOM_COLOR = obj.START_ROOM_COLOR;
		}
		if (obj.MARKED_ROOM_COLOR) {
			ClientConfig.MARKED_ROOM_COLOR = obj.MARKED_ROOM_COLOR;
		}
		if (obj.INSCRIPTION_ROOM_COLOR) {
			ClientConfig.INSCRIPTION_ROOM_COLOR = obj.INSCRIPTION_ROOM_COLOR;
		}
		if (obj.OMEGA_ROOM_COLOR) {
			ClientConfig.OMEGA_ROOM_COLOR = obj.OMEGA_ROOM_COLOR;
		}
		if (obj.CHALLENGE_ROOM_COLOR) {
			ClientConfig.CHALLENGE_ROOM_COLOR = obj.CHALLENGE_ROOM_COLOR;
		}
		if (obj.SHOW_INSCRIPTIONS) {
			ClientConfig.SHOW_INSCRIPTIONS = obj.SHOW_INSCRIPTIONS;
		}
	}
}

export function getCellColor(cell: VaultCell): string {
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
