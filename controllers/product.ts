import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/product';


export const getProducts = async ( req: Request, res: Response ) => {

    const products = await Product.findAll({
        where: {
            state: true
        }
    });

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
    const product = await Product.findOne({
        where:{
            [Op.and]: [
                { state: true },
                { id }
            ]
        }
    });

    if( !product ) {
        res.status(404).json({
            msg: `No existe un producto con el id ${ id }`
        });
        return;
    }
    
    console.log( product );
    
    res.json( product );

}

export const getProductsName = async( req: Request, res: Response ) => {

    const { search } = req.query;

    const products = await Product.findAll({
        where: {
            // [Op.and]: [
            //     {
            //         state: true
            //     }
                
            // ],
            state: true,
            name: {
                [Op.like]: `%${search}%`
            }
        }
    });

    if( products.length === 0 ){
        res.status(404).json({
            msg: `No hay productos que coincidan con su búsqueda`
        });
        
        return;
    }

    res.json( products );

}

export const updateProductId = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { id: idProd, state, createdAt, updatedAt, ...rest } = req.body;

    // const product = await Product.findByPk( id );
    const product = await Product.findOne({
        where:{
            [Op.and]: [
                { state: true },
                { id }
            ]
        }
    });

    if( !product ) {
        res.status(404).json({
            msg: `Producto con el id ${ id } no existe`
        });
        return;
    }

    const nameExists = await Product.findOne({
        where: {
            name: rest.name
        }
    });

    if( nameExists ) {
        res.status(400).json({
            msg: `Ya existe un producto con el nombre ${ rest.name }`
        });
        return;
    }

    const barcodeExists = await Product.findOne({
        where: {
            barcode: rest.barcode
        }
    });

    if( barcodeExists ) {
        res.status(400).json({
            msg: `Ya existe un producto con el código ${ rest.barcode }`
        });
        return;
    }
    
    await product.update( rest );

    
    // TODO: Verificar que el proveedor exista

    res.json({
        product
    });

}

export const createProduct = async ( req: Request, res: Response ) => {

    const { name, price, description='', barcode, userId, providerId } = req.body;

    const product = {
        name,
        price,
        description,
        barcode,
        userId,
        providerId
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

    const { id } = req.params;

    // const product = await Product.findByPk( id );
    const product = await Product.findOne({
        where:{
            [Op.and]: [
                { state: true },
                { id }
            ]
        }
    });

    if( !product ) {
        res.status(404).json({
            msg: `Producto con el id ${ id } no existe`
        });
    }

    // Eliminación lógica
    await product?.update({ state: false });

    res.json(product);

}