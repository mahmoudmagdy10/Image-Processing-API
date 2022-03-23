import express from "express";
import routes from "./routes/index";
import images from "./routes/api/imagesHandler";

const app = express();
const port = 8000;

app.use("/api", routes);
app.use("/img", images);

app.listen(port, () => {
	console.log(`server started at localhost:${port}`);
});

export default app;