import Utility from "./Utility";

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

export function createVaultCell(base64: string): VaultCell {
	return Utility.cellFromJSON(Utility.decompressBlob(Utility.base64ToBlob(base64)));
}
