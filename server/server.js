const express=require('express');
const app=express();
const PORT =process.env.PORT||4000
const cookieSession=require('cookie-session')
const dBconfig=require('./config/dataBase')
require('dotenv').config({path:'config/config.env'});
const passport=require('passport')
const cors=require('cors')
const errorMiddleware=require('./middlewares/error');
const authRoutes=require('./routes/authRoutes')
//Database
dBconfig();
const corsOptions={
    
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials:true

}
app.use(cors(corsOptions))

//cookie session for passport
app.use(
    cookieSession({
      name: 'session',
      keys: ['profile', 'email'],
      maxAge: 24 * 60 * 60 * 100,
     
    
    })
  );
    
  app.use(passport.initialize());
  app.use(passport.session());
require('./passport');
app.use(express.json())


const productRoutes=require('./routes/medicineShop/productRoutes')
const userRoutes=require('./routes/userRoutes')
app.use('/api/v1',authRoutes)
app.use('/api/v1',productRoutes)
app.use('/api/v1',userRoutes)

app.listen(PORT,(err)=>{
    console.log(`Server listening at the port ${PORT}`);
})

app.use(errorMiddleware) 
