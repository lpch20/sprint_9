const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");


/**ENCRIPTACION DE CONTRASEÑA**/

// Se realizara una funcion para registrar al usuario. 

const register = async (req, res) =>{
    const {email, username, password} = req.body;

    //encriptar contraseña que coloque el usuario.

    const salt = await bcrypt.genSalt(10)
    console.log(salt)

    const passwordEncrypted = await bcrypt.hash(password, salt)


    //ahora se verifica en la base de datos si no existe en la base de datos el usuario a registrar

    try {
        const usuarios = await knex("public.usuarios").where('email', email)

        if(usuarios.length){
            res.status(400).json({error: "Ya existe un usuario con este email"})
            return;
        }

        await knex("public.usuarios").insert({
           email: email,
           username: username,
           password: passwordEncrypted 
        })

        res.status(200).json({message: "Registo correcto"})

    } catch (error) {
        
        // res.status(400).json({error: error.message})

    }
}


module.exports = {register};