import express, { Application } from 'express';
import cors from 'cors';

// Rutas
import productRoutes from '../routes/product';
import userRoutes from '../routes/user';

// Conexión
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        products: '/api/products',
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Base de datos
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Definir las rutas
        this.routes();

    }

    async dbConnection(){

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error: any) {
            
            throw new Error( error );

        }

    }

    middlewares(): void {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );
        
        // Carpeta pública
        this.app.use( express.static('public') );

    }

    routes(): void {

        this.app.use( this.apiPaths.products, productRoutes );
        this.app.use( this.apiPaths.users, userRoutes );

    }

    listen(): void {

        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        })

    }

}

export default Server;