import { Request, Response } from 'express';
import { Op } from 'sequelize';
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

    const { search } = req.query;

    const products = await Product.findAll({
        where: {
            name: {
                [Op.like]: `%${search}%`
            }
        }
    });

    res.json({
        products
    });

}

export const updateProductId = async( req: Request, res: Response ) => {

    const { id, state, createdAt, updatedAt, ...product } = req.body;

    const productExists = await Product.findByPk( id );

    if( !productExists ) {
        res.status(400).json({
            msg: `Producto con el id ${ id } no existe`
        });
    }

    const nameExists = await Product.findOne({
        where: {
            name: product.name
        }
    });

    if( nameExists ) {
        res.status(400).json({
            msg: `Ya existe un producto con el nombre ${ product.name }`
        });
    }

    const barcodeExists = await Product.findOne({
        where: {
            barcode: product.barcode
        }
    });

    if( barcodeExists ) {
        res.status(400).json({
            msg: `Ya existe un producto con el código ${ product.barcode }`
        });
    }

    // TODO: Verificar que el proveedor exista

    res.json({
        product
    });

}

export const createProduct = async ( req: Request, res: Response ) => {

    const { body } = req;

    const product = {
        name: body.name,
        price: body.price,
        description: body.description || '',
        barcode: body.barcode,
        userId: body.userId,
        providerId: body.providerId
    }

    console.log( product );

    try {
        
        const nameExists = await Product.findOne({
            where: {
                name: product.name
            }
        });

        if( nameExists ) {
            res.status(400).json({
                msg: `Ya existe un producto con el nombre ${ product.name }`
            });

            return;
        }

        const barcodeExists = await Product.findOne({
            where: {
                barCode: product.barcode
            }
        });

        if( barcodeExists ) {
            res.status(400).json({
                msg: `Ya existe un producto con el código de barras ${ product.barcode }`
            });

            return;
        }


        // TODO: Validaciones para comprobar que el id del proveedor existe.
        // TODO: Validaciones para comprobar que el id del usuario existe.


        const newProduct = await Product.create( product );

        res.json( newProduct );
        
    } catch (error: any) {
        console.log( error );
        res.json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteProductId = async( req: Request, res: Response ) => {

    res.json({
        msg: 'Delete Id'
    });

}