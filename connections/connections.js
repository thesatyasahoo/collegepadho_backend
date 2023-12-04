const mongoose = require("mongoose");

// mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.uk4ped7.mongodb.net/wear365?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("*******Database Connected*******");
  })
  .catch(() => {
    console.log(
      "Sorry, Unable to Connect Database, Check Atlas Drive Connection!!"
    );
  });

module.exports = mongoose;
