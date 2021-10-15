import { Request, Response } from 'express';
import { Op } from 'sequelize';
import bcryptjs from 'bcryptjs';
import User from '../models/user';

export const getUsers = async ( req: Request, res: Response ) => {

    const users = await User.findAll({
        where: { state: true }
    })

    if( users.length === 0) {
        res.status(404).json({
            msg: `No hay usuarios registrados`
        });
        return;
    }
    
    res.json( users );

}

export const getUserId = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await User.findByPk( id );

    // const userIsNotDeleted = await User.findOne({
    //     where: {
    //         [Op.and]: [
    //             { id },
    //             { state: true }
    //         ]
    //     }
    // });

    // if( !userIsNotDeleted ) {

    //     res.status(400).json({
    //         msg: `El usuario con el id ${ id } ha sido eliminado`
    //     });
    //     return;
    // }

    res.json( user );

}

export const getUsersName = async ( req: Request, res: Response ) => {

    const { name: query } = req.query;

    const users = await User.findAll({
        where: {
            // [Op.and]: [
            //     { state: true }
            // ],
            state: true,
            name: {
                [Op.like]: `%${ query }%`
            }
        }
    });

    if( users.length === 0 ){
        res.status(404).json({
            msg: `No hay usuarios que coincidan con su búsqueda`
        });
        return;
    }

    res.json( users );

}

export const createUser = async ( req: Request, res: Response ) => {

    const { id, state, ...userRest } = req.body;

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    userRest.password = bcryptjs.hashSync( userRest.password, salt );

    const user = await User.create( userRest );

    res.json( user );

}

export const updateUserId = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { id: userId, state, ...userRest } = req.body;

    if ( userRest.email ) {
        
        const emailExists = await User.findOne({
            where: {
                email: userRest.email
            }
        });

        if( emailExists ) {
            res.status(400).json({
                msg: `El correo ${ userRest.email } ya está registrado`
            });
            
            return;
        }

    }


    if( userRest.password ) {

        const salt = bcryptjs.genSaltSync();
        userRest.password = bcryptjs.hashSync( userRest.password, salt );

    }

    await User.update( userRest, {
        where: {
            id
        }
    });

    res.json({
        msg: `Usuario actualizado`
    });

}

export const deleteUserId = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    
    await User.update({state: false}, { where: { id  }});

    res.json({
        msg: `Usuario eliminado`
    });

}