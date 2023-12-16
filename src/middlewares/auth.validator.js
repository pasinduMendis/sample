const verifySignUpParams = (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (!name || name === '' || !email || email === '' || !password || password === '') {
      res.status(400).send({ message: "Missing required fields!" })
    }
  
    next()
  }
  
  const verifySignInParams = (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || email === '' || !password || password === '') {
      res.status(400).send({ message: "Missing required fields!" })
    }
  
    next()
  }

  const authValidator = {
    verifySignInParams,
    verifySignUpParams,
  }
  
  module.exports = authValidator;