const express = require("express");
const app = express();
const db = require("./connections/connections");
const router = require("./routers/mainRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use("/mediaFiles", express.static("mediaFiles"));

app.use(cookieParser());

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.get("", (req, res) => {
  return res.send({ message: "error", status: 403 });
});
app.use(router);

const PORT = 9000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is Running on Port : ${PORT}`);
});
