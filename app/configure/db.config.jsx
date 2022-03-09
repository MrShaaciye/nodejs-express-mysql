const mysql = require("mysql");

// Configure Database
const dbConfig = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "",
	DB: "persondb",
};

// Create a connection to the database
const connection = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
});

// Open the MySQL connection
connection.connect((error) => {
	if (error) throw error;
	console.log("Connected database successfully!");
});

module.exports = connection;
