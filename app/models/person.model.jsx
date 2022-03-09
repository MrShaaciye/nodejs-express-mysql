const mysql = require("../configure/db.config.jsx");

// Create person constructor model
const Person = function (person) {
	this.name = person.name;
	this.gender = person.gender;
	this.age = person.age;
	this.address = person.address;
	this.phone = person.phone;
	this.status = person.status;
};

// Insert new Person
Person.insert = (newPerson, result) => {
	mysql.query(`INSERT INTO person SET ?`, newPerson, (err, res) => {
		if (err) {
			console.log(`error: ${err}`);
			result(err, null);
			return;
		}
		console.log(`Inserted new person: ${{ id: res.insertId, ...newPerson }}`);
		result(null, { id: res.insertId, ...newPerson });
	});
};

// Find all Person
Person.findAll = (name, gender, age, address, phone, status, result) => {
	let query = `SELECT * FROM person `;
	name
		? (query += `WHERE name LIKE '%${name}%'`)
		: gender
		? (query += `WHERE gender LIKE '%${gender}%'`)
		: age
		? (query += `WHERE age LIKE '%${age}%'`)
		: address
		? (query += `WHERE address LIKE '%${address}%'`)
		: phone
		? (query += `WHERE phone LIKE '%${phone}%'`)
		: status
		? (query += `WHERE status LIKE '%${status}%'`)
		: query;
	mysql.query(query, (err, res) => {
		if (err) {
			console.log(`error: ${err}`);
			result(null, err);
			return;
		}
		console.log(`person: ${res}`);
		result(null, res);
	});
};

// Find Person By id
Person.findById = (id, result) => {
	mysql.query(`SELECT * FROM person WHERE id = ${id}`, (err, res) => {
		if (err) {
			console.log(`error: ${err}`);
			result(err, null);
			return;
		}
		if (res.length) {
			console.log(`found person ${res[0]}`);
			result(null, res[0]);
			return;
		}
		// Not found person with the id
		result({ kind: `not_found` }, null);
	});
};

// Update Person by id
Person.updateById = (id, person, result) => {
	mysql.query(`UPDATE person SET name = ?, gender = ?, age = ?, address = ?, phone = ?, status = ? WHERE id = ?`, [person.name, person.gender, person.age, person.address, person.phone, person.status, id], (err, res) => {
		if (err) {
			console.log(`error: ${err}`);
			result(null, err);
			return;
		}
		if (res.affectedRows == 0) {
			// not found person with the id
			result({ kind: `not_found` }, null);
			return;
		}
		console.log(`updated person: ${{ id: id, ...person }}`);
		result(null, { id: id, ...person });
	});
};

// Delete person by id
Person.deleteById = (id, result) => {
	mysql.query(`DELETE FROM person WHERE id = ?`, id, (err, res) => {
		if (err) {
			console.log(`error: ${err}`);
			result(null, err);
			return;
		}
		if (res.affectedRows == 0) {
			// not found person with the id
			result({ kind: `not_found` }, null);
			return;
		}
		console.log(`deleted person with id ${id}`);
		result(null, res);
	});
};

// Delete all person
Person.deleteAll = (result) => {
	mysql.query(`DELETE FROM person`, (err, res) => {
		if (err) {
			console.log(`Error: ${err}`);
			result(null, err);
			return;
		}
		console.log(`deleted ${res.affectedRows} person`);
		result(null, res);
	});
};

module.exports = Person;
