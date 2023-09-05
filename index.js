const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require("./routes/router")

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", router)

module.exports = app;