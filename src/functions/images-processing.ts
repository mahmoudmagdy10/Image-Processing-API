import { promises as fs } from "fs";
import path from "path";

const isFileFounded = async (filePath = ""): Promise<boolean> => {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
		console.log("not found");
	}
};
const isOriginalFounded = async (
	imagePath: string,
	fileName: string
): Promise<boolean> => {
	const imagesFullPath = path.resolve(`images/full/${fileName}.jpg`);
	try {
		await fs.access(imagesFullPath);
		return true;
	} catch {
		return false;
		console.log("not found");

	}
};
export default { isFileFounded, isOriginalFounded };
