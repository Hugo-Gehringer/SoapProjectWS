const soap = require('soap');

// URL du WSDL
const url = 'http://localhost:8000/wsdl?wsdl';

// Créer le client SOAP
soap.createClient(url, function (err, client) {
    if (err) {
        console.error('Error creating SOAP client:', err);
        return;
    }

    // Créer une nouvelle tâche avec assignation
    const newTodo = { title: 'Acheter du lait', description: 'Acheter du lait à l\'épicerie', assignation: 'Hugo' };
    client.addTask(newTodo, function (err, result) {
        if (err) {
            console.error('Error creating todo:', err);
            return;
        }
        console.log('Todo created:', result);

        // Lire la tâche créée
        const todoId = { id: result.id };
        client.getTask(todoId, function (err, result) {
            if (err) {
                console.error('Error reading todo:', err);
                return;
            }
            console.log('Todo read:', result);

            // Mettre à jour la tâche
            const updateTask = { id: result.id, title: 'Acheter du lait et du pain', description: 'Acheter du lait et du pain à l\'épicerie', assignation: 'Hugo et Maxime' };
            client.updateTask(updateTask, function (err, result) {
                if (err) {
                    console.error('Error updating todo:', err);
                    return;
                }
                console.log('Todo updated:', result);

                // Lister toutes les tâches
                client.getAllTasks({}, function (err, result) {
                    if (err) {
                        console.error('Error listing todos:', err);
                        return;
                    }
                    console.log('Todos list:', (result));
                });

                // Supprimer la tâche
                client.deleteTask(todoId, function (err, result) {
                    if (err) {
                        console.error('Error deleting todo:', err);
                        return;
                    }
                    console.log('Todo deleted:', result);
                });
            });
        });
    });
});
