const express = require("express");
const db = require("./backend/config/connection");
const colors = require("colors");
const path = require("path");
const publicPath = path.join(process.cwd(), "frontend", "dist");

const cwd = process.cwd();

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicPath));

app.use("/api/thoughts", require("./backend/routes/thoughtRoute"));
app.use("/api/user", require("./backend/routes/userRoute"));

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`.rainbow);
  });
});
