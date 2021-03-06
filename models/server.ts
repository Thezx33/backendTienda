import { asocioaciones } from './associations';
import express, { Application } from 'express';
import cors from 'cors';

// Rutas
import productRoutes from '../routes/product';
import userRoutes from '../routes/user';
import providerRoutes from '../routes/provider';
import authRoutes from '../routes/auth';
import categoryRoutes from '../routes/category';
import salesRoutes from '../routes/sales';
import detailSalesRoutes from '../routes/detail-sales';

// Conexión
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        products: '/api/products',
        users: '/api/users',
        providers: '/api/providers',
        auth: '/api/auth',
        categories: '/api/categories',
        sales: '/api/sales',
        detailSales: '/api/details'
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
            console.log( error );
            throw new Error( error );

        }

    }

    middlewares(): void {

        asocioaciones();
        db.sync();

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
        this.app.use( this.apiPaths.providers, providerRoutes );
        this.app.use( this.apiPaths.auth, authRoutes );
        this.app.use( this.apiPaths.categories, categoryRoutes );
        this.app.use( this.apiPaths.sales, salesRoutes );
        this.app.use( this.apiPaths.detailSales, detailSalesRoutes );

    }

    listen(): void {

        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });

    }

}

export default Server;