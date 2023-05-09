const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy=require('passport-local').Strategy;
const passport=require('passport');
const bcrypt=require('bcryptjs')
const UserModel=require('./models/userModel');
//config of dotenv
const dotenv=require('dotenv');


const ErrorHandler = require('./utils/errorhandler');
dotenv.config({path:"config/config.env"}); 




const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;


passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/google/callback", 
      },
     async function (accessToken, refreshToken, profile, done) {
  
        const user=await UserModel.findOne({email:profile._json.email});
   
        if(user){
          done(null, user);
        }
        else{
         const newuserGoogle=await new UserModel({
      
          name:profile.displayName,
          email:profile._json.email
        })
      const savedUser=  await newuserGoogle.save()
        done(null, savedUser);
      }
    }
      
    )
  );

//Local Strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match user
    UserModel.findOne({
      email: email
    }).then(user => {
      if (!user) {
        return done(null, false, { message: 'That email is not registered' });
      }

      // Match password
      bcrypt.compare(password, user.password).then(match => {
        if(match) {
            return done(null, user, { message: 'Logged in succesfully' })
        }
        return done(null, false, { message: 'Wrong username or password' })
    }).catch(err => {
        return done(null, false, { message: 'Something went wrong' })
    })
    });
  })
);


//To serialize and deserializeuser in the browser
passport.serializeUser((user, done) => {
  
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);  
  }); 