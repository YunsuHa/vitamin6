// LIBRARIES NEEDED
const express = require('express');
const app = express();
const mysql = require('mysql2');
const mongoose = require('mongoose');

// SQL CONNECTION
// TODO: connect to mysql with the host, database, user, and password
const connection = mysql.createConnection({
    host: 'localhost',    // MySQL host
    user: 'root',         // MySQL username
    password: 'Dimo1402', // MySQL password (use your password)
    database: 'company_db' // MySQL database
});

// MySQL Connection Verification
function verifyMySQLConnection() {
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('MySQL connected as id ' + connection.threadId);
    });
}

// MONGOOSE CONNECTION
// TODO: connect to your localhost MongoDB server on the companyDB collection
mongoose.connect('mongodb://localhost:27017/companyDB');

// TODO: Mongoose Schema and Model
const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    budget: { type: Number, required: true }
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

// MongoDB Connection Verification 
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// ENDPOINTS
// Endpoint to get all projects from MongoDB
app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find({});
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Endpoint to get all employees from MySQL
app.get('/employees', function (req, res) {
    connection.query('SELECT * FROM employees', function (error, results) {
        if (error) throw error;
        res.json(results);
    });
});

// RUNNING THE SERVER
app.listen(3000, function () {
    console.log('Server is running on port 3000!');
    verifyMySQLConnection();
});
