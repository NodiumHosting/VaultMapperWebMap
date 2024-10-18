import Utility from "./Utility";

export default interface Arrow {
	x: number;
	z: number;
	yaw: number;
	username: string;
	color: string;
}

export async function createArrow(base64: string): Promise<Arrow> {
	const json = await Utility.decompressBlob(Utility.base64ToBlob(base64));
	return Utility.arrowFromJSON(json);
}
