const knex = require("../config/knexfile");

const taskController = async (req, res) => {
  try {
    const task = await knex("sprint8.tarea").select("*");
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: "No se encontro la base de datos" });
  }
};

const taskAdd = async (req, res) => {
  const { id_tarea, titulo, completado, id_prioridad, id_usuario } = req.body;
  try {
    const validacion = await knex("sprint8.tarea")
      .select("id_tarea")
      .where("id_tarea", id_tarea)
      .first();
    if (validacion) {
      res.status(400).json({ error: "Ya existe un registro con ese id" });
      return;
    }
    await knex("sprint8.tarea").insert({
      titulo: titulo,
      completado: completado,
      id_prioridad: id_prioridad,
      id_usuario: id_usuario,
    });
    res.status(200).json({ mensaje: "Se inserto correctamente el registro" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const taskUpdate = async (req, res) => {
  const id_tarea = req.params.id;
  const { titulo, completado, id_prioridad, id_usuario } = req.body;
  try {
    const validacion = await knex("sprint8.tarea")
      .where("id_tarea", id_tarea)
      .first();
    if (!validacion) {
      res.status(404).json({ error: "No se encontró ningún registro con ese ID" });
      return;
    }
    await knex("sprint8.tarea").where("id_tarea", id_tarea).update({
      titulo: titulo,
      completado: completado,
      id_prioridad: id_prioridad,
      id_usuario: id_usuario,
    });
    res.status(200).json({ mensaje: "Se actualizó correctamente el registro" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { taskController, taskAdd, taskUpdate };
