const jwt = require('jsonwebtoken');
// const {User} = require('../models/model');



const auth = async(req,res,next)=>{


    try {
        const getCookie = req.cookies.authToken;
        console.log(getCookie)
        if(getCookie.length>=10){
            next();
        }else{
            res.status(200).send({message:'unauthorized'});    
        }
    } catch (error) {
        res.status(200).send({message:'unauthorized'});
        console.log('Token Not Received')
        // next()
    }


    // try {
    //     const tokenExtracted = await jwt.verify(req.cookies.authToken, 'iambunnyandiloveblackcolorbecauseihateblackcolorbecauseiaminwhiteandiamsinglecoreprocessortaskcapable')
    //     const userData = await User.findOne({_id:tokenExtracted.id});
    //     req.USER_ID = userData._id;
    //     req.ROOT_USER = userData;
    //     next();
    // } catch (error) {
    //     res.status(200).send({message:'unauthorized'});
    //     console.log('Token Not Received')
    //     // next()
    // }
}

module.exports = auth