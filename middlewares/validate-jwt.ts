import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';


export const validateJWT = async ( req: Request, res: Response, next: NextFunction ) => {

    const token = req.header('x-token');
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const uid = jwt.verify( token, process.env.SECRETORPRIVATEKEY!);
        // Leer el usuario que corresponde al id
        const user = await User.findByPk( uid.toString() );
    
        // Verificar que el usuario exista
        if( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la base de datos'
            });
        }
    
        // Verificar si el uid tiene estado true
    
    
        if( !user.getDataValue('state') ) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado: false'
            });
        }
    
        req.user = user;
    
        next();
        
    } catch (error: any) {
        console.log( error );
        res.status(401).json({
            msg: 'Token no válido'
        });
    }


}