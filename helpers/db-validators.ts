import User from "../models/user"


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