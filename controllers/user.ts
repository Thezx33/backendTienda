import { Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../models/user';

export const getUsers = async ( req: Request, res: Response ) => {

    res.json({
        msg: 'get User'
    });

}

export const getUserId = async ( req: Request, res: Response ) => {

    res.json({
        msg: 'get User Id'
    });

}

export const getUsersName = async ( req: Request, res: Response ) => {

    res.json({
        msg: 'get Users Names'
    });

}

export const createUser = async ( req: Request, res: Response ) => {

    res.json({
        msg: 'user created'
    });

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