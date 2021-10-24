import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Category from '../models/category';
import Product from '../models/product';
import Provider from '../models/provider';
import User from '../models/user';

interface IProduct {
    name: string;
    price: number;
    description: string;
    barcode: string;
    stock: number;
    state?: boolean | number;
    providerId: number | string;
    userId?: number;
}

export const getProducts = async ( req: Request, res: Response ) => {

    const products = await Product.findAll({
        where: {
            state: true
        },
        include:[
            {
                model: User,
                attributes: ['name', 'email']
            },
            {
                model: Provider,
                attributes: ['name', 'email', 'phone']
            },
            {
                model: Category,
                attributes: ['name']
            }
        ],
        // attributes: ['id','name','email']
        attributes: [ 'id', 'name', 'price', 'barcode' ]
        
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
    
    // console.log( product );
    
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
    const { id: idProd, state, createdAt, updatedAt, ...productRest } = req.body;

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
            name: productRest.name
        }
    });

    if( nameExists ) {
        res.status(400).json({
            msg: `Ya existe un producto con el nombre ${ productRest.name }`
        });
        return;
    }

    const barcodeExists = await Product.findOne({
        where: {
            barcode: productRest.barcode
        }
    });

    if( barcodeExists ) {
        res.status(400).json({
            msg: `Ya existe un producto con el código ${ productRest.barcode }`
        });
        return;
    }
    
    await product.update( productRest );

    
    // TODO: Verificar que el proveedor exista

    res.json({
        product
    });

}

export const createProduct = async ( req: Request, res: Response ) => {

    const { id, state } = req.body;
    const { ...productRest }: IProduct = req.body;

    // console.log( req );
    // console.log( productRest );

    try {
        
        const nameExists = await Product.findOne({
            where: {
                name: productRest.name
            }
        });

        if( nameExists ) {
            res.status(400).json({
                msg: `Ya existe un producto con el nombre ${ productRest.name }`
            });

            return;
        }

        const barcodeExists = await Product.findOne({
            where: {
                barCode: productRest.barcode
            }
        });

        if( barcodeExists ) {
            res.status(400).json({
                msg: `Ya existe un producto con el código de barras ${ productRest.barcode }`
            });

            return;
        }

        delete productRest.state;

        productRest.userId = req.user;


        // TODO: Validaciones para comprobar que el id del proveedor existe.
        // TODO: Validaciones para comprobar que el id del usuario existe.


        const newProduct = await Product.create( productRest );
        
        // console.log( newProduct );

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

        return;
    }

    // Eliminación lógica
    await product.update({ state: false });

    res.json(product);

}