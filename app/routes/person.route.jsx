module.exports = (app) => {
	const person = require("../controllers/person.controller.jsx");
	const router = require("express").Router();

	// Insert a new person
	router.post("/", person.insert);

	// Find all person
	router.get("/", person.findAll);

	// Find one person with an id
	router.get("/:id", person.findById);

	// Update a person with an id
	router.put("/:id", person.updateById);

	// Delete a person with an id
	router.delete("/:id", person.deleteById);

	// Delete all person
	router.delete("/", person.deleteAll);

	app.use("/api/person", router);
};

/*
const express = require("express");
const uuid = require("uuid");
const path = require("path");
const person = require("../models/person.model.jsx");
const router = express.Router();

// Get All Person
router.get("/", (req, res) => res.json(person));

// Get One person
router.get("/:id", (req, res) => {
	const found = person.some((per) => per.id === parseInt(req.params.id));
	found ? res.json(person.filter((per) => per.id === parseInt(req.params.id))) : res.status(400).json({ message: `No person with the id of ${req.params.id} was found` });
});

// Insert Person
router.post("/", (req, res) => {
	const newPerson = {
		id: uuid.v4(),
		name: req.body.name,
		gender: req.body.gender,
		age: req.body.age,
		address: req.body.address,
		phone: req.body.phone,
		status: req.body.status,
	};
	if (!newPerson.name || !newPerson.gender || !newPerson.age || !newPerson.address || !newPerson.phone) {
		return res.status(400).json({ message: "Please include name, gender, age, address, phone and Address" });
	}
	person.push(newPerson);
	res.json(person);
});

// Update Person
router.put("/:id", (req, res) => {
	const found = person.some((per) => per.id === parseInt(req.params.id));
	if (found) {
		const updatePerson = req.body;
		person.forEach((per) => {
			if (per.id === parseInt(req.params.id)) {
				per.name = updatePerson.name ? updatePerson.name : per.name;
				per.gender = updatePerson.gender ? updatePerson.gender : per.gender;
				per.age = updatePerson.age ? updatePerson.age : per.age;
				per.address = updatePerson.address ? updatePerson.address : per.address;
				per.phone = updatePerson.phone ? updatePerson.phone : per.phone;
				per.status = updatePerson.status ? updatePerson.status : per.status;
				res.json({ message: `Person with the id of ${req.params.id} was updated successfully`, person });
			}
		});
	} else {
		res.status(400).json({ message: `No person with the id of ${req.params.id} was found` });
	}
});

// Delete person
router.delete("/:id", (req, res) => {
	const found = person.some((per) => per.id === parseInt(req.params.id));
	if (found) {
		res.json({ message: `Person id ${req.params.id} was deleted`, person: person.filter((per) => per.id !== parseInt(req.params.id)) });
	} else {
		res.status(400).json({ message: `No person with the id of ${req.params.id} was found` });
	}
});


// get json object message
router.get("/", (req, res) => res.json({ message: "Welcome to Shaiye App." }));

// create string text with html tag
router.get("/hello", (req, res) => res.send("<h1>Hello World!</h1>"));

// send string data to a file
router.get("/index", (req, res) => res.sendFile(path.join(__dirname, "../public", "index.html")));
router.get("/about", (req, res) => res.sendFile(path.join(__dirname, "../public", "about.html")));

// get string data from static files
router.use(express.static(path.join(__dirname, "../public")));

module.exports = router;
*/
