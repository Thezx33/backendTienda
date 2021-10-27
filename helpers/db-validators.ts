import User from '../models/user';
import Provider from '../models/provider';
import Product from '../models/product';
import Category from '../models/category';
import Sales from '../models/sales';


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

    const userExists = await User.findByPk( id );
    
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

    const providerExists = await Provider.findByPk( id );
    
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

export const productExists = async ( id: number ): Promise<void> => {

    const productExists = await Product.findByPk( id );

    if( !productExists ) {
        throw new Error( `El producto con el id ${ id } no existe` );
    }

}

export const categoryExists = async ( id: number ): Promise<void> => {

    const categoryExits = await Category.findByPk( id );

    if( !categoryExists ) {
        throw new Error( `La categoría con el id ${ id } no existe` );
        
    }

}

export const saleExists = async ( id: number ): Promise<void> => {

    const saleExists = await Sales.findByPk( id );

    if( !saleExists ) {
        throw new Error( `La venta con el id ${ id } no existe` );
    }

}