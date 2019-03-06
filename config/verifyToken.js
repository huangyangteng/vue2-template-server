var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var keys = require('./keys'); // get our config file

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'] || req.query.token || req.params.token
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, keys.secretOrKey, function(err, decoded) {      
    if (err){
      if(err.name=='TokenExpiredError'){//如果过期就更新
        return res.status(401).send({ auth: false, message: 'Token Expired Error' });      
      }
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
    } 
      
    // console.log(decoded,decoded.id)
    // if everything is good, save to request for use in other routes
    //重新获取一个token返回
    
    req.token=jwt.sign({id:decoded.id},keys.secretOrKey,{expiresIn:3600*24})
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;