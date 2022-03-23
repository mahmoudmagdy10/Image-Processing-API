import express from "express";
import func from "../../functions/images-processing";

// validate Processed Image Params
const validatePIP = async (
	req: express.Request,
	res: express.Response,
	next: () => void
) => {
	let fileName: string;
	let width: number;
	let height: number;

	if (!req.query.fileName) {
		return res.status(400).send("Can't proceed without File name");
	} else {
		const checkingOriginal = await func.isFileFounded(
			`images/full/${req.query.fileName}.jpg`
		);
		const checkingThumb = await func.isFileFounded(
			`images/thumb/${req.query.fileName}-${req.query.width}X${req.query.height}.jpg`
		);
		if (checkingOriginal == true || checkingThumb == true) {
			fileName = req.query.fileName as string;
		} else {
			return res.send("Invalid \"fileName\" value , Image Is Not Found");
		}
	}

	if (req.query.width && Number(req.query.width) <= 0) {
		return res.status(400).send(`Invalid "width" value: ${req.query.width}`);
	} else {
		width = Number(req.query.width) as number;
	}

	if (req.query.height && Number(req.query.height) <= 0) {
		return res.status(400).send(`Invalid "height" value: ${req.query.height}`);
	} else {
		
		height = Number(req.query.width) as number;
	}
	if (Number.isNaN(req.query.width || Number.isNaN(req.query.height))) {
		return res.status(400).send(`Invalid "height or width" value`);
	} else {
		width = Number(req.query.width) as number;
		height = Number(req.query.width) as number;
	}

	next();
};

export default { validatePIP };
