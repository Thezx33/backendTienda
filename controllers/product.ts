import { Request, Response } from 'express';
import { Model, Op } from 'sequelize';
import Category from '../models/category';
import Product from '../models/product';
import Provider from '../models/provider';
import User from '../models/user';

interface IProduct extends Model {
    name?: string;
    price: number;
    description?: string;
    barcode?: string;
    stock: number;
    state?: boolean;
    providerId?: number;
    userId?: number;
    categoryId?: number;
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

    res.json( { products } );

}

export const getProductId = async( req: Request, res: Response ) => {
    
    const { id } = req.params;
    const product = await Product.findOne({
        where:{
            [Op.and]: [
                { state: true },
                { id }
            ]
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
        
        attributes: ['id','name']
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

// export const getProductsName = async( req: Request, res: Response ) => {

//     const { search } = req.query;

//     const products = await Product.findAll({
//         where: {
//             // [Op.and]: [
//             //     {
//             //         state: true
//             //     }
                
//             // ],
//             state: true,
//             name: {
//                 [Op.like]: `%${search}%`
//             }
//         }
//     });

//     if( products.length === 0 ){
//         res.status(404).json({
//             msg: `No hay productos que coincidan con su búsqueda`
//         });
        
//         return;
//     }

//     res.json( products );

// }

export const updateProductId = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const { id: idProd, state, createdAt, updatedAt, ...productRest } = req.body;

    try {
        
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
    
        if( productRest.name ) {
            const nameExists = await Product.findOne({
                where: {
                    [Op.and]: [
                        { name: productRest.name },
                        { id: !id }
                    ]
                }
            });
        
            if( nameExists ) {
                res.status(400).json({
                    msg: `Ya existe un producto con el nombre ${ productRest.name }`
                });
    
                return;
            
            }   
        }
    
        if( productRest.barcode ) {
            const barcodeExists = await Product.findOne({
                where: {
                    [Op.and]: [
                        { barcode: productRest.barcode },
                        { id: !id }
                    ]
                }
            });
        
            if( barcodeExists ) {
                res.status(400).json({
                    msg: `Ya existe un producto con el código ${ productRest.barcode }`
                });
    
                return;
    
            }
        }

        if( productRest.price ) {

            if( productRest.price <= 0 ) {

                res.status(400).json({
                    msg: 'El precio no puede ser menor o igual a 0'
                });

                return;

            }

        }

        if( productRest.providerId ) {

            const providerExists = await Provider.findOne({
                where:{
                    [Op.and]: [
                        { id: productRest.providerId },
                        { state: true }
                    ]
                }
            });
    
            if( !providerExists ) {
    
                res.status(400).json({
                    msg: `No existe un proveedor con el id ${ productRest.providerId }`
                });
                
                return;
            }

        }

        if( productRest.categoryId ) {

            const categoryExists = await Category.findOne({
                where:{
                    [Op.and]: [
                        { id: productRest.categoryId },
                        { state: true }
                    ]
                }
            });
    
            if( !categoryExists ) {
    
                res.status(400).json({
                    msg: `No existe una categoría con el id ${ productRest.categoryId }`
                });
                
                return;
            }

        }
        
        await product.update( productRest );
    
        
        // TODO: Verificar que el proveedor exista
    
        res.json({
            msg: `Producto actualizado`
        });

    } catch ( error: any ) {
        
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

}

export const createProduct = async ( req: Request, res: Response ) => {

    const { id, state, ...productRest } = req.body;

    // console.log( req );
    // console.log( productRest );

    delete productRest.state;

    try {
        
        // Verificar que el nombre del producto no exista
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
        
        // Verificar que el código de barras sea único
        const barcodeExists = await Product.findOne({
            where: {
                barCode: productRest.barcode
            }
        });

        // Error por si existe el código de barras
        if( barcodeExists ) {
            res.status(400).json({
                msg: `Ya existe un producto con el código de barras ${ productRest.barcode }`
            });

            return;
        }

        productRest.userId = req.user;

        // TODO: Validaciones para comprobar que el id del proveedor existe.

        const providerExists = await Provider.findOne({
            where:{
                [Op.and]: [
                    { id: productRest.providerId },
                    { state: true }
                ]
            }
        });

        if( !providerExists ) {

            res.status(400).json({
                msg: `No existe un proveedor con el id ${ productRest.providerId }`
            });
            
            return;
        }
        
        // TODO: Validaciones para comprobar que el id de la categoría existe.

        const categoryExists = await Category.findOne({
            where:{
                [Op.and]: [
                    { id: productRest.categoryId },
                    { state: true }
                ]
            }
        });

        if( !categoryExists ) {

            res.status(400).json({
                msg: `No existe una categoría con el id ${ productRest.categoryId }`
            });
            
            return;
        }

        const minStock = productRest.stock;
        if( minStock < 0) {

            res.status(400).json({
                msg: `La cantidad tiene que ser mayor a 0`
            });

            return;
        }

        const minPrice = productRest.price;
        if( minPrice <= 0 ) {
            
            res.status(400).json( {
                msg: `El precio  no puede ser negativo.`
            });

            return;

        }

        const newProduct = await Product.create( productRest );
        
        res.status(201).json( newProduct );
        
    } catch (error: any) {

        console.log( error );
        res.json({
            msg: 'Hable con el administrador'
        });

    }
}

export const deleteProductId = async( req: Request, res: Response ) => {

    const { id } = req.params;

    console.log ( id );

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

    res.json({
        msg: 'Producto eliminado'
    });

}