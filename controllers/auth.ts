import User from "../models/user";
import { generateJWT } from '../helpers/generar-jwt';
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';


export const login = async( req: Request, res: Response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar si el email existe
        const user = await User.findOne({
            where: {
                email
            }
        });

        if( !user ) {
            return res.status(200).json({
                msg: `Usuario / password no son correctos - email`
            });
        }

        const userPassword: any = user.get('password');
        const userId: any = user.get('id');

        // Verificar si el usuarios esta activo
        if( !user.get('state') ) {
            return res.status(200).json({
                msg: `Usuario / password no son correctos - password`
            });
        }


        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, userPassword )
        if( !validPassword ) {
            return res.status(400).json({
                msg: `Usuario / Password no son correctos - password`
            });
        }

        // Generar JWT
        const token = await generateJWT( userId );

        res.json({
            user,
            token
        });

    } catch (error: any) {
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}