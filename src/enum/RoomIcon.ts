import Canvas from "../class/Canvas";
import RoomName from "./RoomName";
import BlacksmithIcon from "../icons/blacksmith.png";
import CoveIcon from "../icons/cove.png";
import CrystalCavesIcon from "../icons/crystal_caves.png";
import CubeIcon from "../icons/cube.png";
import DigSiteIcon from "../icons/dig_site.png";
import DragonIcon from "../icons/dragon.png";
import FactoryIcon from "../icons/factory.png";
import LibraryIcon from "../icons/library.png";
import MineIcon from "../icons/mine.png";
import MushRoomIcon from "../icons/mush_room.png";
import PaintingIcon from "../icons/painting.png";
import VendorIcon from "../icons/vendor.png";
import VillageIcon from "../icons/village.png";
import WildWestIcon from "../icons/wild_west.png";
import XMarkIcon from "../icons/x_mark.png";

const RoomIcon: { [key in RoomName]: string } = {
	[RoomName.UNKNOWN]: "",
	[RoomName.BLACKSMITH]: BlacksmithIcon,
	[RoomName.COVE]: CoveIcon,
	[RoomName.CRYSTAL_CAVES]: CrystalCavesIcon,
	[RoomName.CUBE]: CubeIcon,
	[RoomName.DIG_SITE]: DigSiteIcon,
	[RoomName.DRAGON]: DragonIcon,
	[RoomName.FACTORY]: FactoryIcon,
	[RoomName.LIBRARY]: LibraryIcon,
	[RoomName.MINE]: MineIcon,
	[RoomName.MUSH_ROOM]: MushRoomIcon,
	[RoomName.PAINTING]: PaintingIcon,
	[RoomName.VENDOR]: VendorIcon,
	[RoomName.VILLAGE]: VillageIcon,
	[RoomName.WILD_WEST]: WildWestIcon,
	[RoomName.X_MARK]: XMarkIcon,
};

let RoomIconBitmaps: { [key in RoomName]: ImageBitmap } = {} as any; //fuck javascript

export async function initRoomIcons() {
	const promises = Object.values(RoomIcon).map(async (base64) => {
		const blob = Canvas.base64ToBlob(base64);
		return createImageBitmap(blob).catch(() => {});
	});

	const bitmaps = await Promise.all(promises);
	Object.keys(RoomName).forEach((key, index) => {
		if (!bitmaps[index]) {
			return;
		}
		RoomIconBitmaps[key as unknown as RoomName] = bitmaps[index];
	});
}

export default RoomIcon;
export { RoomIconBitmaps };
