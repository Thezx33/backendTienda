import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Provider from '../models/provider';

const pattern: RegExp = /(\(\d{3}\)[.-]?|\d{3}[.-]?)?\d{3}[.-]?\d{4}/;

export const getProviders = async ( req: Request, res: Response ) => {

    const providers = await Provider.findAll({
        where: { state: true }
    });

    if( providers.length === 0 ) {
        res.status(404).json({
            msg: `No hay proveedores registrados`
        });
        return;
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

    if( providerRest.email ) {
        const emailExists = await Provider.findOne({
            where: {
                email: providerRest.email
            }
        });
    
        if( emailExists ) {
            res.status(400).json({
                msg: `El correo ${ providerRest.email } ya existe`
            });
            return;
        }
    }

    if( providerRest.phone ) {
        
        if( providerRest.phone.length < 10 ) {
            
            res.status(400).json({
                msg: 'El teléfono tiene que tener mínimo 10 caracteres'
            });

            return;
        }

        if (providerRest.phone.length > 16 ){

            res.status(400).json({
                msg: 'El teléfono tiene que tener máximo 16 caracteres'
            });

            return;

        }

        const phonePattern = new RegExp(pattern, 'g');

        if( !phonePattern.test( providerRest.phone ) ) {

            res.status(400).json({
                msg: 'El formato del teléfono no es válido'
            });
            return;

        }


        const phoneExists = await Provider.findOne({
            where: {
                phone: providerRest.phone
            }
        });

        if( phoneExists ) {
            res.status(400).json({
                msg: `El teléfono ${ providerRest.phone } ya existe`
            });
            return;
        }
    }


    await Provider.update( providerRest, {
        where: {
            id
        }
    });

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