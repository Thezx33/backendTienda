import { Request, Response } from 'express';
import { Op } from 'sequelize';
import bcryptjs from 'bcryptjs';
import User from '../models/user';

export const getUsers = async ( req: Request, res: Response ) => {

    const users = await User.findAll({
        where: { state: true }
    })

    res.json( users );

}

export const getUserId = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    const userIsNotDeleted = await User.findOne({
        where: {
            [Op.and]: [
                { id },
                { state: true }
            ]
        }
    });

    if( !userIsNotDeleted ) {

        res.status(400).json({
            msg: `El usuario con el id ${ id } ha sido eliminado`
        });
        return;
    }

    res.json( userIsNotDeleted );

}

export const getUsersName = async ( req: Request, res: Response ) => {

    res.json({
        msg: 'get Users Names'
    });

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

    res.json({
        msg: 'update User Id'
    });

}

export const deleteUserId = async ( req: Request, res: Response ) => {

    res.json({
        msg: 'delete User Id'
    });

}