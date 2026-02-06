// const bcrypt = require("bcryptjs")
const db = require("../config/db")

const Tasks = {
    createTask: async (title, description, createdBy, callback) => {
    db.run(
        `INSERT INTO tasks (title, description, createdBy) VALUES (?, ?, ?)`,
        [title, description || null, createdBy],
        function(err) {
            callback(err, { id: this.lastID });
        }
    );
    },

    getAllTasks:(callback)=>{
        db.all(`SELECT * FROM tasks`,[],callback);
    },

    getTaskById:(id,callback) => {
        db.get(`SELECT * FROM tasks WHERE id=${id}`,
            function(err,task){
                callback(err,task)
            }
        )
    },

    updateTaskById:async (id,title, description, createdBy, callback) => {
        const tasksQuery = `UPDATE tasks SET title='${title}', description='${description}', createdBy='${createdBy}' WHERE id=${id}`;
        db.run(tasksQuery,function(err,newTask){
            callback(err,newTask)
        })
    },

    deleteById:(id,callback) => {
        db.get(`DELETE FROM tasks WHERE id=${id}`,
            function(err,task){
                callback(err,task)
            }
        )
    }
}
    
module.exports = Tasks;