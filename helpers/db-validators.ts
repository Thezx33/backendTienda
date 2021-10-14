import User from '../models/user';
import { Op } from 'sequelize';


export const emailExists = async( email: string ): Promise<void> => {

    const emailExists = await User.findOne({
        where: {
            email
        }
    });

    if( emailExists ) {
        throw new Error( `El email ${ email }, ya está registrado` );
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