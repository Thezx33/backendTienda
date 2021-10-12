import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = async ( req: Request, res: Response ) => {

    const products = await Product.findAll();

    if( products.length === 0 ) {
        res.json({
            msg: 'No hay datos en la base de datos'
        });
        return;
    }

    res.json( products );

}

export const getProductId = async( req: Request, res: Response ) => {
    
    const { id } = req.params;
    const product = await Product.findByPk( id );

    if( !product ) {
        res.status(404).json({
            msg: `No existe un producto con el id ${ id }`
        });
        return;
    }
    
    res.json( product );

}

export const getProductsName = async( req: Request, res: Response ) => {

    res.json({
        msg: 'Products name'
    });

}

export const updateProductId = async( req: Request, res: Response ) => {

    res.json({
        msg: 'Update Id'
    });

}

export const createProduct = async( req: Request, res: Response ) => {

    res.json({
        msg: 'Create Product'
    })

}

export const deleteProductId = async( req: Request, res: Response ) => {

    res.json({
        msg: 'Delete Id'
    });

}