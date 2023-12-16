const Blog=require("../models/blog.model");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

//create blog
exports.createBlog = async (req, res) => {
  console.log("create")
  const { title, body, authorName,image } = req.body;
  const userId = req.userId
  try {
    
      var blog = {
        title:title,
        body:body,
        image:image,
        blogId:uuidv4(),
        author: {
            name:authorName ,
            authorId:userId ,
        },

      };

      console.log("blog :",blog)

      const blogObj=new Blog(blog)
      blogObj
      .save()
      .then((result) => {
        res
      .status(200)
      .send({ message: "successfully added!" });
        return;
      })
      .catch((err) => {
        console.log(err);
        res
      .status(500)
      .send({ message: "An unexpected error occured!", error: err });
        return;
      });
     
    
  } catch (error) {
    console.log("An unexpected error occured!", error);
    res
      .status(500)
      .send({ message: "An unexpected error occured!", error: error });
      return;
  }
};


//get all blogs with filter and without filter
exports.getBlog = async (req, res) => {
    const { blogId, author,title } =req.body

    const filter={}
    if(blogId){
      filter['blogId']=blogId
    }
    if(author){
      filter['author.name']=author
    }
    if(title){
      filter['title']=title
    }
  try {
    const allBlogs=await Blog.find(filter).catch((err) => {
        res
        .status(500)
        .send({ message: "An unexpected error occured!", error: err });
        return;
      });

      res
      .status(200)
      .send({ message: "success!", blogs: allBlogs });
      return;
    
  } catch (error) {
    console.log("Debugger error", error);
    res
      .status(500)
      .send({ message: "An unexpected error occured!", error: error });
      return;
  }
};

exports.getBlogSingal = async (req, res) => {
  const { blogId } =req.body

try {
  const blogItem=await Blog.findOne({blogId:blogId}).catch((err) => {
      res
      .status(500)
      .send({ message: "An unexpected error occured!", error: err });
      return;
    });

    res
    .status(200)
    .send({ message: "success!", blog: blogItem });
    return;
  
} catch (error) {
  console.log("Debugger error", error);
  res
    .status(500)
    .send({ message: "An unexpected error occured!", error: error });
    return;
}
};