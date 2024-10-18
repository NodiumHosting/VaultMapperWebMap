import VaultCell from "./VaultCell";
import Arrow from "./Arrow";

export default class Utility {
	public static base64ToBlob(base64: string): Blob {
		const byteCharacters = atob(base64);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		return new Blob([byteArray]);
	}

	public static decompressBlob(blob: Blob): string {
		const ds = new DecompressionStream("gzip");
		const decompressedStream = blob.stream().pipeThrough(ds);
		const reader = decompressedStream.getReader();
		let result = "";
		const decoder = new TextDecoder();
		reader.read().then(function processText({ done, value }) {
			if (done) {
				return;
			}
			result += decoder.decode(value, { stream: true });
			reader.read().then(processText);
		});
		return result;
	}

	public static cellFromJSON(json: string): VaultCell {
		const obj = JSON.parse(json);

		const cell: VaultCell = {
			x: obj.x,
			z: obj.z,
			explored: obj.e,
			marked: obj.m,
			inscripted: obj.i,
			cellType: obj.c,
			roomType: obj.r,
			roomName: obj.n,
		};

		return cell;
	}

	public static arrowFromJSON(json: string): Arrow {
		const obj = JSON.parse(json);

		const arrow: Arrow = {
			x: obj.x,
			y: obj.z,
			yaw: obj.y,
			player: obj.p,
			color: obj.c,
		};

		return arrow;
	}
}
