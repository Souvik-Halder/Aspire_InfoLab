const express=require('express');
const isAuth = require('../middlewares/isAuth');
const { createPost, getDoctorConnections, getPatientConnections, getChemistConnections, getAllPosts, sendConnectionRequest, getAllConnectionRequest, acceptConnection, getAcceptedConnection } = require('../controllers/userController');
const router=express.Router();
 
router.route('/create-post').post(isAuth,createPost)
router.route('/connections/getDoctors').get(isAuth,getDoctorConnections);
router.route('/connections/getPatients').get(isAuth,getPatientConnections);
router.route('/connections/getChemists').get(isAuth,getChemistConnections);
router.route('/allPosts').post(isAuth,getAllPosts)

//send connection request
router.route('/sendRequest/:userId').post(isAuth,sendConnectionRequest)
router.route('/allConnection-requests').get(isAuth,getAllConnectionRequest)
router.route('/accept-connection/:requestId').post(isAuth,acceptConnection)
router.route('/getaccepted-connection').get(isAuth,getAcceptedConnection);

module.exports=router