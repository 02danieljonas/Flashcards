const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ")
    if (scheme.trim() === "Bearer") {
      return token
    }
  }
  return undefined
}

const updateLastServerPing = (req, res, next) => {
  try {
    return true;
    // to_timestamp(${Date.now()} / 1000.0
    
    // console.log(req, res, next)
  }catch{

  }
}

const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req)
    if (token){
      res.locals.user = jwt.verify(token, SECRET_KEY)
      updateLastServerPing()
    }
    return next()
  } catch(error) {
    return next()
  }
}


const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals
    if (!user?.email) {
        throw new UnauthorizedError()
    }
    return next()
  } catch (error) {
    return next(error)
  }
}
  
module.exports = {
  updateLastServerPing,
  extractUserFromJwt,
  requireAuthenticatedUser,
}