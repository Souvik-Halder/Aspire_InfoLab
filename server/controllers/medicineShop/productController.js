const Product=require('../../models/medicineShop/productModel')
const Errorhandler =require('../../utils/errorhandler');

const Apifeatures = require('../../utils/apifeatures');

const cloudinary=require('cloudinary')

//Create Product --Admin

exports.createProduct = async (req, res, next) => {
    // let images = [];
  
    // if (typeof req.body.images === "string") {
    //   images.push(req.body.images);
    // } else {
    //   images = req.body.images;
    // }
  
    // const imagesLinks = [];
  
    // for (let i = 0; i < images.length; i++) {
    //   const result = await cloudinary.v2.uploader.upload(images[i], {
    //     folder: "products",
    //   });
  
    //   imagesLinks.push({
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   });
    // }
  
    // req.body.images = imagesLinks;
    req.body.user = req.user._id;
  
    const product = await Product.create(req.body);
//   console.log(product)
    res.status(201).json({
      success: true,
      product,
    });
  }

//get All Products

exports.getAllProducts= async(req,res,next)=>{

    const resultPerPage=8;
    const productCount=await Product.countDocuments();
   const apiFeature=new Apifeatures(Product.find(),req.query)
   .search()
   .filter()


   apiFeature.pagination(resultPerPage)
  let  product = await apiFeature.query;


    res.status(200).json({
        success:true,
        product,
        productCount,
        resultPerPage,
    })
}


//Update Product --Admin

exports.updateProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    console.log(product)
    if(!product){
        return next(new Errorhandler("Product Not Found",505))
    }
    
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
}

//Delete product --Admin
exports.deleteProduct= async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("Product Not Found",404))
    }
    //Delting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        
    }
    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
}

//Get Product Details
exports.getProductDetails=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        product,
        message:"Successfully find the product"
    })
}



//Create new review or update the review
exports.createProductReview=async(req,res,next)=>{
    const {rating,comment,productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    };
    const product=await Product.findById(productId);

    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id)//it check that the id of the user in the review matches the id of the logged in user or not if matches then review is done previously otherwise not


    
    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev=>rev.user.toString()===req.user._id)
            rev.rating=Number(rating),
            rev.comment=comment
        });
    }else{
      product.reviews.push(review)  ;
      product.numOfReviews=product.reviews.length
    }
    let avg=0;
    //Here we need to provide the overall rating which is the (total of all ratings)/  num of reviews
    product.reviews.forEach(
        rev=>{
            avg+=rev.rating
        });
        product.ratings=avg/product.reviews.length;
//So here we calculated the review
        await product.save({validateBeforeSave:false})
        res.status(200).json({
            success:true,
            message:"Review Provided Successfully"
        })
    }
// Get All Reviews of a product
exports.getProductReviews = async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new Errorhandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  };

//Delte Review
exports.delteReiview=async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
   
    if(!product){
        return next(new Errorhandler('Product Not Found',404))
    }
    const reviews=product.reviews.filter(rev=> rev._id.toString()!== req.query.id.toString())
    //This is used to store all the reviews which I don't want to delete and rest of them we need to delete
    let avg=0;
    //Here we need to provide the overall rating which is the (total of all ratings)/  num of reviews
    reviews.forEach(
        rev=>{
            avg+=rev.rating
        });
        const ratings=avg/reviews.length;
        const numOfReviews=reviews.length
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,ratings,numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success: true,
        message:"Review Delted Successfully"
      });
}



//get All Products -(admin)

exports.getAdminProducts=async(req,res,next)=>{

   const products=await Product.find();


    res.status(200).json({
        success:true,
        products,
        
    })
}
