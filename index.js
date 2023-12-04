require("./connections/connections");
const express = require("express");
const app = express();
app.use("/mediaFiles", express.static("mediaFiles"));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
const router = require("./routers/mainRouter");
app.use(router);
const PORT = 9000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is Running on Port : ${PORT}`);
});
