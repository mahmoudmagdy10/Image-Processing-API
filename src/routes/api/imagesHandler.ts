import express from "express";
import path from "path";
import validate from "./../middlewares/middleware";
import check from "../../functions/images-processing";
import sharp from "../../functions/sharp";

const images: express.Router = express.Router();

images.get(
	"/images",
	validate.validatePIP,
	async (req, res): Promise<void> => {
		if (!(req.query.width && req.query.height)) {
			const OimagesFullPath = path.resolve(
				`images/full/${req.query.fileName}.jpg`
			);
			const validationMessage: boolean = await check.isFileFounded(
				OimagesFullPath
			);

			if (validationMessage == true) {
				res.sendFile(OimagesFullPath);
			} else {
				res.send("Image not Founded");
			}
		} else {
			const PimagesFullPath = path.resolve(
				`images/thumb/${req.query.fileName}-${req.query.width}X${req.query.height}.jpg`
			);
			const validationMessage: boolean = await check.isFileFounded(
				PimagesFullPath
			);

			if (validationMessage == true) {
				res.sendFile(PimagesFullPath);
			} else {
				const filename = req.query.fileName as string;
				const width = Number(req.query.width);
				const height = Number(req.query.height);

				console.log(width);
				console.log(height);
				console.log(isNaN(width));
				console.log(isNaN(height));

				if((isNaN(width) && isNaN(height))==false){
					const proccessedFile = await sharp.resize(filename, width, height);
					res.sendFile(PimagesFullPath);
				}else {
					res.send("Error, Width and Height should be Numbers");
				}
			}
		}
	}
);
export default images;
