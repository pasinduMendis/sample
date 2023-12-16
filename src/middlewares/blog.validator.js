const blogValidatorParams = (req, res, next) => {
    const { title, body,authorName } = req.body;
  
    if (!title || title === '' || !body || body === '' || !authorName ||  authorName === '') {
      res.status(400).send({ message: "Missing required fields!" })
    }
  
    next()
  }
  

  const blogValidator = {
    blogValidatorParams
  }
  
  module.exports = blogValidator;