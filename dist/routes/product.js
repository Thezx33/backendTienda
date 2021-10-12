"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.get('/', product_1.getProducts);
router.get('/search', product_1.getProductsName);
router.get('/:id', product_1.getProductId);
router.put('/:id', product_1.updateProductId);
router.post('/', product_1.createProduct);
router.delete('/:id', product_1.deleteProductId);
exports.default = router;
//# sourceMappingURL=product.js.map