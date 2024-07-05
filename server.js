const express = require('express');
const soap = require('soap');
const db = require('./database');

const todoService = {
    ToDoListService: {
        ToDoListPort: {
            addTask(args, callback) {
                let sql = `INSERT INTO tasks (title, description, assignation) VALUES (?, ?, ?)`;
                let params = [args.title, args.description, args.assignation];
                db.run(sql, params, function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    callback({
                        id: this.lastID
                    });
                });
            },
            getTask(args, callback) {
                db.get(`SELECT * FROM tasks WHERE id = ?`, [args.id], (err, row) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    callback(row);
                });
            },
            getAllTasks(args, callback) {
                db.all(`SELECT * FROM tasks`, [], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        callback(null, {error: err.message});
                        return;
                    }
                    callback({tasks: rows});
                });
            },
            updateTask(args, callback) {
                db.run(`UPDATE tasks SET title = ?, description = ?, assignation = ? WHERE id = ?`,
                    [args.title, args.description, args.assignation, args.id], function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        callback({
                            result: "Task updated successfully."
                        });
                    });
            },
            deleteTask(args, callback) {
                db.run(`DELETE FROM tasks WHERE id = ?`, [args.id], function(err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    callback({
                        result: "Task deleted successfully."
                    });
                });
            }
        }
    }
};

const xml = require('fs').readFileSync('TodoService.wsdl', 'utf8');

const app = express();
const port = 8000;

app.listen(port, function() {
    console.log('Server is running on port ' + port);
    soap.listen(app, '/wsdl', todoService, xml);
});
