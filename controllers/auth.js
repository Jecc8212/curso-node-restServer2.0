const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');


const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });

        }


        //si el usuario esta activo

        if(!usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
            
        }


        //verificar la contraseña

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });  
        }

        //generar el JWT

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    

    } catch (error) {
        console.log(error)
        return response.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


  

}

module.exports = {
    login
}