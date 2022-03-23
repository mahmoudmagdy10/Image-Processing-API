import fs from "fs";
import { promises as fileSys } from "fs";
import supertest from 'supertest';
import app from '../index';
import sharpImage from "../functions/sharp";
import img from "../functions/images-processing";


const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test endpoint responses', ():void => {
	describe('endpoint: /api', (): void => {
		it('/api', async (): Promise<void> => {
		  const response: supertest.Response = await request.get('/api');
		  expect(response.status).toBe(200);
		});
	});

	  describe('endpoint: /api/images', (): void => {
		it('gets (valid params) => /api/images?fileName=fjord', async (): Promise<void> => {
		  const response: supertest.Response = await request.get(
			'/api/images?fileName=fjord'
		  );
		  expect(response.status).toBe(200);
		});
	});

    it('gets (valid params) =>  /api/images?fileName=fjord&width=199&height=199', async (): Promise<void> => {
		const response: supertest.Response = await request.get(
		  '/api/images?fileName=fjord&width=199&height=199'
		);
  
		expect(response.status).toBe(200);
	  });
  
	  it('gets (invalid params) => /api/images?fileName=fjord&width=-200&height=200', async (): Promise<void> => {
		const response: supertest.Response = await request.get(
		  '/api/images?fileName=fjord&width=-200&height=200'
		);
  
		expect(response.status).toBe(400);
	  });
});

beforeAll(done => {
	fs.rmdir("images/thumb/", { recursive: true }, () => {
		done();
	});
});

afterAll(done => {
	fs.rmdir("images/thumb/", { recursive: true }, () => {
		done();
	});
});

describe("Sharp", async () => {
	it("should return an error message if file does not exist in original File", async () => {
		const filename = "fjord";
		const originalePath = `./images/full/${filename}.jpg`;
		const found = await img.isFileFounded(originalePath);
		if (found == false) {
			expect(fileSys.access(originalePath)).toThrowError("Image is not found");
		}
	});

	it("should resize the image if exists in original File", async () => {
		const filename = "fjord";
		const height = 100;
		const width = 100;
		const resizePath = `./images/thumb/${filename}-${width}x${height}.jpg`;
		await sharpImage.resize(filename, height, width);
		expect(fs.existsSync(resizePath)).toBeTruthy();
	});
});
