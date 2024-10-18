import Utility from "./Utility";

export default interface Arrow {
	x: number;
	z: number;
	yaw: number;
	player: string;
	color: string;
}

export function createArrow(base64: string): Arrow {
	return Utility.arrowFromJSON(Utility.decompressBlob(Utility.base64ToBlob(base64)));
}
