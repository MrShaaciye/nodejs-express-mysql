const Person = require("../models/person.model.jsx");

// Insert and Save a new Person
exports.insert = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({ message: `Contents can't be an empty` });
	}

	// Insert a person
	const person = new Person({
		name: req.body.name,

		gender: req.body.gender,
		age: req.body.age,
		address: req.body.address,
		phone: req.body.phone,
		status: req.body.status || false,
	});

	// Save person in the database
	Person.insert(person, (err, data) => {
		err ? res.status(500).send({ message: `Error occurred while inserting the new person.` }) : res.send(data);
	});
};

// Find all person from the database (with condition)
exports.findAll = (req, res) => {
	const name = req.query.name;
	const gender = req.query.gender;
	const age = req.query.age;
	const address = req.query.address;
	const phone = req.query.phone;
	const status = req.query.status;
	Person.findAll(name, gender, age, address, phone, status, (err, data) => {
		err ? res.status(500).send({ message: err.message || `Error occurred while retrieving person.` }) : res.send(data);
	});
};

// Find one person with an id
exports.findById = (req, res) => {
	Person.findById(req.params.id, (err, data) => {
		err ? (err.kind === "not_found" ? res.status(404).send({ message: `Not found person with the id ${req.params.id}.` }) : res.status(500).send({ message: `Error retrieving person with the id ${req.params.id}` })) : res.send(data);
	});
};

// Update a person identified by the id in the request
exports.updateById = (req, res) => {
	// Validate request
	!req.body ? res.status(400).send({ message: `Content can't be an empty` }) : console.log(req.body);
	Person.updateById(req.params.id, new Person(req.body), (err, data) => {
		err ? (err.kind === "not_found" ? res.status(404).send({ message: `Not found person with the id ${req.params.id}.` }) : res.status(500).send({ message: `An error occurred while updating person with the id ${req.params.id}` })) : res.send(data);
	});
};

// Delete a person with the specified id in the reqeust
exports.deleteById = (req, res) => {
	Person.deleteById(req.params.id, (err, data) => {
		err ? (err.kind === "not_found" ? res.status(404).send({ message: `Not found persion with the id ${req.params.id}` }) : res.status(500).send({ message: `Couldn't delete person with the id ${req.params.id}` })) : res.send({ message: `Person was deleted successfully!` });
	});
};

// Delete all person from the database
exports.deleteAll = (req, res) => {
	Person.deleteAll((err, data) => {
		err ? res.status(500).send({ message: `Error occurred while removing all person.` }) : res.send({ message: `All person were deleted successfully!` });
	});
};
