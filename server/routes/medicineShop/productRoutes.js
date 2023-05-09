const express=require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getAdminProducts } = require('../../controllers/medicineShop/productController');
const isAuth = require('../../middlewares/isAuth');
const isCompany = require('../../middlewares/isCompany');

const router=express.Router();


router.route('/products').get(getAllProducts)
router.route('/company/product/new').post(isAuth ,isCompany,createProduct)
router.route('/company/products').get(isAuth,isCompany,getAdminProducts)
router.route("/company/product/:id").put(isAuth ,isCompany,updateProduct).delete(isAuth,deleteProduct)
router.route('/product/:id').get(getProductDetails)

module.exports=router