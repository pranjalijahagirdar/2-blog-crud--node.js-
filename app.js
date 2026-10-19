const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const healthRoutes = require('./routes/healthRoutes');

const app = express();

app.use(express.json());
app.use("/api/blogs", blogRoutes);
app.use('/api/health', healthRoutes);

module.exports = app;
