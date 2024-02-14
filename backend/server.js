const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const conn = require("./db/connect");
const noteRoute = require("./routes/note");
const authRoute = require("./routes/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// routing
app.use("/api/notes", noteRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  conn();
  console.log(`Server is running on port: ${port}`);
});
