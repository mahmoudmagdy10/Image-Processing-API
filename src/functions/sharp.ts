import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import check from "../functions/images-processing";

const resize = async (
	imageName: string,
	widthImg: number,
	heightImg: number
): Promise<null | string> => {
	const fileName = imageName;
	const width = Number(widthImg);
	const height = Number(heightImg);
	const proImagesPath = path.resolve(
		`images/thumb/${fileName}-${width}X${height}.jpg`
	);
	const oriImagesPath = path.resolve(`images/full/${fileName}.jpg`);
	const filePath = path.resolve("images/thumb");
	const validationImage: boolean = await check.isFileFounded(proImagesPath);
	const original: boolean = await check.isFileFounded(oriImagesPath);
	const validationFile: boolean = await check.isFileFounded(filePath);

	if (validationFile == true) {
		if (validationImage == true) {
			return proImagesPath;
		} else {
			if (original == true) {
				try {
					await sharp(`images/full/${fileName}.jpg`)
						.resize(width, height)
						.toFile(`images/thumb/${fileName}-${width}X${height}.jpg`)
						.then(() => console.log("Success"))
						.catch(error => console.log("Error occured"));

					return null;
				} catch (error) {
					return `There is no original image with this name`;
				}
			} else {
				return "Image is not found";
			}
		}
		console.log("OK");
	} else {
		await fs.mkdir(filePath, { recursive: true });
		if (original == true) {
			try {
				await sharp(`images/full/${fileName}.jpg`)
					.resize(width, height)
					.toFile(`images/thumb/${fileName}-${width}X${height}.jpg`)
					.then(() => console.log("Success"))
					.catch(error => console.log("Error occured"));
				return null;
			} catch (error) {
				return `There is no original image with this name`;
			}
		} else {
			return "Image is not found";
		}
		console.log("F");
	}
};

export default { resize };
