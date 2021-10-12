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
    
    res.json({
        msg: 'Product Id'
    });

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