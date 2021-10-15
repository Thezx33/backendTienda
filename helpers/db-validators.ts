import User from '../models/user';
import { Op } from 'sequelize';
import Provider from '../models/provider';


export const emailUserExists = async( email: string ): Promise<void> => {

    const emailExists = await User.findOne({
        where: {
            email
        }
    });

    if( emailExists ) {
        throw new Error( `El correo ${ email }, ya está registrado` );
    }

}

export const userExists = async ( id: number ): Promise<void> => {

    const userExists = await User.findOne( {
        where: {
            [Op.and]: [
                { id },
                { state: true }
            ]
        }
    } );
    
    if( !userExists ) {
        throw new Error( `El usuario con el id ${ id } no existe`);
    }

}

export const emailProviderExists = async( email: string ): Promise<void> => {

    const emailExists = await Provider.findOne({
        where: {
            email
        }
    });

    if( emailExists ) {
        throw new Error( `El correo ${ email }, ya está registrado` );
    }

}

export const providerExists = async ( id: number ): Promise<void> => {

    const providerExists = await Provider.findOne( {
        where: {
            [Op.and]: [
                { id },
                { state: true }
            ]
        }
    } );
    
    if( !providerExists ) {
        throw new Error( `El proveedor con el id ${ id } no existe`);
    }

}

export const phoneExists = async ( phoneNumber: string ): Promise<void> => {

    const phoneExists = await Provider.findOne({
        where: {
            phone: phoneNumber
        }
    });

    if( phoneExists ) {
        throw new Error( `El número ${ phoneNumber } ya existe` );   
    }

}