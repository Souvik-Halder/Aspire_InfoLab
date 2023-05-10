const { create, index, show } = require("../controllers/rooms-controller");
const isAuth = require("../middlewares/isAuth")
const router=require('express').Router()

router.route('/rooms').post(isAuth,create).get(isAuth,index)
router.route('/rooms/:roomId').get(isAuth,show)

module.exports=router;