import { Request, Response } from 'express';
import { Model } from 'sequelize';
import DetailSales from '../models/detail-sales';
import Product from '../models/product';
import Sales from '../models/sales';
import User from '../models/user';

interface ISale extends Model {
    id?: number;
    total?: number;
    createdAt?: string;
}

export const getSales = async ( req: Request, res: Response ) => {

    try {

        const sales = await Sales.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
            attributes: ['id','total']
        });
    
        if( sales.length === 0 ) {

            res.status(404).json({
                msg: 'No hay ventas'
            });

            return;

        }

        res.status(200).json( { sales } );

    } catch (error: any) {

        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }

}

export const getSale = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    try {
        
        // const sales = await Sales.findAll( {
        //     where: {
        //         id
        //     }
        // } );

        const sales = await Sales.findAll({
            where: {
                id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
            attributes: ['id','total','createdAt']
        });

        if( sales.length === 0 ) {

            res.status(404).json({
                msg: `No existen ventas con el id ${ id }`
            });

            return;

        }

        res.status(200).json({ sales });

    } catch ( error: any ) {
        
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

}

