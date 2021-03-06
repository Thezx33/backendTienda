"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const associations_1 = require("./associations");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Rutas
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const provider_1 = __importDefault(require("../routes/provider"));
const auth_1 = __importDefault(require("../routes/auth"));
const category_1 = __importDefault(require("../routes/category"));
const sales_1 = __importDefault(require("../routes/sales"));
const detail_sales_1 = __importDefault(require("../routes/detail-sales"));
// Conexión
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            products: '/api/products',
            users: '/api/users',
            providers: '/api/providers',
            auth: '/api/auth',
            categories: '/api/categories',
            sales: '/api/sales',
            detailSales: '/api/details'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // Base de datos
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Definir las rutas
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        });
    }
    middlewares() {
        (0, associations_1.asocioaciones)();
        connection_1.default.sync();
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.products, product_1.default);
        this.app.use(this.apiPaths.users, user_1.default);
        this.app.use(this.apiPaths.providers, provider_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.categories, category_1.default);
        this.app.use(this.apiPaths.sales, sales_1.default);
        this.app.use(this.apiPaths.detailSales, detail_sales_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map