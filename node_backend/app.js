const express = require("express");

const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("Hello World");
//   res.send("Hello World");
// });
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
