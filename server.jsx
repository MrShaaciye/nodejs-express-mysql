const express = require("express");
const cors = require("cors");
const logger = require("./app/middleware/logger.middleware.jsx");
const app = express();

const corsOption = {
	origin: "http:localhost:3000",
};

app.use(logger);
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./app/routes/person.route.jsx')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
