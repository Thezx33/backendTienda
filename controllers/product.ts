import { Request, Response } from 'express';

export const getProduct = async ( req: Request, res: Response ) => {

    // const product = await

    res.json({
        msg: 'ok'
    });

}