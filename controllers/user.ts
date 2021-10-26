import { Request, Response } from 'express';
import { Model, Op } from 'sequelize';
import bcryptjs from 'bcryptjs';
import User from '../models/user';

interface IUser extends Model {
    state?: boolean;
    id?: number;
    name?: number;
    email?: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const getUsers = async ( req: Request, res: Response ) => {

    try {
     
        // Encontrar a todos los usuarios que esten activos
        const users: IUser[] = await User.findAll({
            where: { state: true },
            attributes: [
                'id',
                'name',
                'email',
                'createdAt',
                'updatedAt'
            ]
        })
    
        if( users.length === 0) {
            res.status(404).json({
                msg: `No hay usuarios registrados`
            });
            return;
        }
        
        res.status(200).json( { users } );
        
    } catch ( error: any ) {
        
        console.log( error );

        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getUserId = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    try {

        // Obtener al usuario con el id y con el estado en true.
        const user: IUser | null = await User.findOne(
            {
                where: {
                    [Op.and]: [
                        { id },
                        { state: true }
                    ]
                },
                attributes: [
                    'id',
                    'name',
                    'email',
                    'createdAt',
                    'updatedAt'
                ]
            }
        );
    
        res.status(200).json( { user } );
        
    } catch ( error: any ) {
        
        console.log( error );

        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

// export const getUsersName = async ( req: Request, res: Response ) => {

//     const { name: query } = req.query;

//     const users = await User.findAll({
//         where: {
//             // [Op.and]: [
//             //     { state: true }
//             // ],
//             state: true,
//             name: {
//                 [Op.like]: `%${ query }%`
//             }
//         }
//     });

//     if( users.length === 0 ){
//         res.status(404).json({
//             msg: `No hay usuarios que coincidan con su búsqueda`
//         });
//         return;
//     }

//     res.json( users );

// }

export const createUser = async ( req: Request, res: Response ) => {

    const { id, state, ...userRest }: IUser = req.body;

    try {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        userRest.password = bcryptjs.hashSync( userRest.password!, salt );

        const user: IUser = await User.create( userRest );

        res.status(201).json( { user } );

    } catch (error: any) {
        
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el adminsitrador'
        });

    }


}

export const updateUserId = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { id: userId, state, ...userRest }: IUser = req.body;

    try {

        // Verificar si el usuario existe | state = true
        const userExists = await User.findOne({
            where: {
                [Op.and]: [
                    { id },
                    { state: true }
                ]
            }
        });
    
        if( !userExists ) {

            res.status(400).json({
                msg: `El usuario con el id ${ id } está eliminado`
            });

            return;

        }

        // Verifica si viene el correo
        if ( userRest.email ) {
        
            // Buscar si el correo ya esta registrado
            const emailExists = await User.findOne({
                where: {
                    email: userRest.email
                }
            });
    
            // Si el correo ya está registrado manda un error
            if( emailExists ) {
                res.status(400).json({
                    msg: `El correo ${ userRest.email } ya está registrado`
                });
                
                return;
            }
    
        }
    
        // Verifica si viene la contraseña
        if( userRest.password ) {
    
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            userRest.password = bcryptjs.hashSync( userRest.password, salt );
    
        }
    
        // Actualizar la información del usuario
        await User.update( userRest, {
            where: { id }
        } );
        
        res.json({
            msg: `Usuario actualizado`
        });
            
    } catch ( error: any ) {
        
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}


export const deleteUserId = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    try {
        
        await User.update(
            { state: false },
            { 
                where: { id }
            });

    } catch ( error: any ) {
        
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

    res.json({
        msg: `Usuario eliminado`
    });

}