import Utility from "./Utility";
import CellType from "../enum/CellType";
import RoomType from "../enum/RoomType";
import RoomName from "../enum/RoomName";

export default interface VaultCell {
	x: number;
	z: number;
	explored: boolean; // @SerializedName("e")
	marked: boolean; // @SerializedName("m")
	inscripted: boolean; // @SerializedName("i")
	cellType: CellType; // @SerializedName("c")
	roomType: RoomType; // @SerializedName("r")
	roomName: RoomName; // @SerializedName("n")
}

export async function createVaultCell(base64: string): Promise<VaultCell> {
	const json = await Utility.decompressBlob(Utility.base64ToBlob(base64));
	return Utility.cellFromJSON(json);
}
