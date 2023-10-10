const express = require('express')
const {taskController, taskAdd, taskUpdate} = require('../controllers/tareasController')
const {runValidation} = require('../middlewares/validators/indexValidator')
const {validatorTaskAdd} = require('../middlewares/validators/tareasValidator')

const app = express.Router();

app.get("/task", taskController, runValidation)
app.post("/task/add",  validatorTaskAdd, runValidation , taskAdd)
app.put("/task/update/:id",  validatorTaskAdd, runValidation , taskUpdate)

module.exports = app;