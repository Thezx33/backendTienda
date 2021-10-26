import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Category from '../models/category';

export const getCategories = async ( req: Request, res: Response ) => {

    try {
        const categories = await Category.findAll({
            where: {
                state: true
            },
            attributes: ['id', 'name', 'createdAt']
        });
    
        if( categories.length === 0 ) {
    
            res.status(404).json({
                msg: 'No hay categorias'
            });
    
            return;
    
        }
    
        res.status(200).json( { categories } );

    } catch (error: any) {

        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }

}

export const createCategory = async ( req: Request, res: Response ) => {

    const { id, state, ...restCategory } = req.body;

    try {
        
        restCategory.name = restCategory.name.toUpperCase();

        const nameExists = await Category.findOne({
            where: {
                name: restCategory.name
            }
        });

        if( nameExists ) {
            res.status(400).json({
                msg: `La categoría ${ restCategory.name } ya existe`
            });
            
            return;

        }

        const category = await Category.create( restCategory );
        
        res.status(201).json( category );

    } catch ( error: any ) {
        
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

}

export const updateCategory = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { id: bodyId, state, ...restCategory } = req.body;

    try {
     
        const category = await Category.findOne({
            where: {
                [Op.and]: [
                    { id },
                    { state: true }
                ]
            }
        });
    
        if( !category ) {
            res.status(404).json({
                msg: `La categoría con el id ${ id } no existe`
            });
    
            return;
    
        }

        const existsCategory = await Category.findOne({
            where: {
                name: restCategory.name
            }
        });
    
        if( existsCategory ) {
            res.status(400).json({
                msg: `La categoría ${ restCategory.name }, ya existe`
            });

            return;
        }

        restCategory.name = restCategory.name.toUpperCase();

        await category.update( restCategory );
    
        res.status(200).json({
            msg: 'Categoría actualizada'
        });
        
    } catch ( error: any ) {
        
    }

}

export const deleteCategory = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const category = await Category.findOne({
        where: {
            [Op.and]: [
                { id },
                { state: true }
            ]
        }
    });

    if( !category ) {
        res.status(404).json({
            msg: `La categoría con el id ${ id } no existe`
        });
        return;
    }

    await category.update( { state: false } )

    res.json({
        msg: 'Categoría eliminada'
    });

}