import { Request, Response } from 'express';
import { Model } from 'sequelize';
import DetailSales from '../models/detail-sales';
import Product from '../models/product';
import Sales from '../models/sales';
import User from '../models/user';

interface IDetailSales {
    id?: number;
    quanitty: number;
    priceArticle: number;
    idSale: number;
    idProduct: number;
    createdAt?: string;
}

interface ISale extends Model {
    id?: number;
    total?: number;
    createdAt?: string;
}

export const getDetailSales = async ( req: Request, res: Response ) => {

    try {

        const sales = await DetailSales.findAll({
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'price']
                },
                {
                    model: Sales,
                    attributes: ['id'],
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ],
            attributes: ['quantity', 'unitPrice', 'createdAt']
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

        const sales = await DetailSales.findAll({
            where: {
                saleId: id
            },
            include: [
                {
                    model: Product,
                    attributes: ['name', 'price']
                },
                {
                    model: Sales,
                    attributes: ['total'],
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ],
                }
            ],
            attributes: ['id', 'quantity', 'unitPrice']
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

export const createSale = async ( req: Request, res: Response ) => {

    const { id, state, ...restSale } = req.body;

   
    try {
        
        let total: number = 0;

        // restSale.forEach( async ( sale: IDetailSales ) => {
           
        //     total += sale.quanitty * sale.priceArticle;

        // });

        // Obtener el total de las ventas
        for (const key in restSale) {
            total = restSale[ key ].quantity * restSale[ key ].unitPrice;
        }

        const sale = {
            total: total,
            userId: req.user
        }

        // Añadir el total a la tabla sales
        const newSale: ISale = await Sales.create( sale );

        // restSale.forEach( async ( sale: IDetailSales ) => {
        //     sale.idSale = newSale.id!;
        //     await DetailSales.create( sale );

        // });

        // Por cada producto hacer una inserción con el id de la venta
        for (const key in restSale) {
            restSale[ key ].saleId = newSale.id;
            await DetailSales.create( restSale[ key ] );
        }

        
        res.status(201).json( { newSale } );

    } catch ( error: any ) {
        
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

}