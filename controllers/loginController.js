const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");


/** SE HACE UNA FUNCION PARA LOGEARSE, SE OBTIENE LA CONTRASEÑA ENCRIPTADA Y SE DESENCRIPTA **/

const login = async (req, res) =>{
    const {email, password} = req.body


    try {
        
        //Chequear si el mail se encouentra en la base de datos.
        
        const usuario = await knex("public.usuarios").where("email", email).first()

        if(!usuario){
            res.status(400).json({error: "El email no esta registrado, porfavor registrate para continuar"})
        }

        //Compara la password encriptada con la password que va a pasar el usuario.
        //Compara la password que se pasa por body y se compara con la password que esta en la base de datos.

        const validatePassword = await bcrypt.compare(password, usuario.password)

        console.log(validatePassword, password, usuario.password)


        if(!validatePassword){
            res.status(400).json({error: "Contraseña incorrecta"})
        }


        //Generar el Json Web Token.

        const token = jsonwebtoken.sign(
            {
               email: usuario.email,
               password: usuario.password
            },
            'mi firma'
        )

        res.status(200).json({message: "Ingreso correcto", token: token})

    } catch (error) {

        

    }

}


module.exports = {login};
