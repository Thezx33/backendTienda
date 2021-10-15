import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Provider from '../models/provider';

export const getProviders = async ( req: Request, res: Response ) => {

    const providers = await Provider.findAll({
        where: { state: true }
    });

    if( providers.length === 0 ) {
        res.status(404).json({
            msg: `No hay proveedores registrados`
        });
    }

    res.json( providers );

}

export const getProviderId = async ( req: Request, res: Response ) => {
    
    const { id } = req.params;

    const provider = await Provider.findByPk( id );

    res.json( provider );

}

export const getProvidersName = async ( req: Request, res: Response ) => {

    const { name: query } = req.query;

    const providers = await Provider.findAll({
        where: {
            state: true,
            name: {
                [Op.like]: `%${ query }%`
            }
        }
    });

    if( providers.length === 0 ) {
        res.status(404).json({
            msg: `No hay proveedores que coincidan con ${ query }`
        });

        return;
    }

    res.json( providers );

}

export const createProvider = async ( req: Request, res: Response ) => {

    const { id, state, createdAt, updatedAt, ...providerRest } = req.body;

    const provider = await Provider.create( providerRest );

    res.json( provider );

}

export const updateProviderId = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { id: providerId, state, createdAt, updatedAt, ...providerRest } = req.body;

    res.json({
        msg: `Proveedor actualizado`
    })


}

export const deleteProviderId = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    await Provider.update({ state: false }, { where: { id } })

    res.json({
        msg: `Proveedor eliminado`
    });
}