import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Category from '../models/category';

interface ICategory {
    id?: number;
    name: string;
    state?: number;
}

export const getCategories = async ( req: Request, res: Response ) => {

    try {
        const categories = await Category.findAll({
            where: {
                state: true
            }
        });
    
        if( categories.length === 0 ) {
    
            res.status(404).json({
                msg: 'No hay categorias'
            });
    
            return;
    
        }
    
        res.json( categories );
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
        
        res.json( category );

    } catch (error: any) {
        
        console.log( error );
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }

}

export const updateCategory = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { id: bodyId, state, ...restCategory }: ICategory  = req.body;

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

    restCategory.name = restCategory.name.toUpperCase();

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
    
    await category.update( restCategory );

    res.json({
        msg: 'Categoría actualizada'
    });
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