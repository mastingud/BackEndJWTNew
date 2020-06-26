    const {authJWT} = require("../middleware");
    const product = require("../controllers/product.controller.js");
    const router =  require("express").Router();
    
    module.exports = app => {
      app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token,Origin,Content-Type,Accept"
        );
        next();
      });
    //create
    app.post("/api/product", [authJWT.verifyToken], product.create);

    //retrieve all
    app.get("/api/product", [authJWT.verifyToken], product.findAll);

    //retrieve all published 
    app.get("/api/product/published", product.findAllPublished);
    
    //retrieve all user 
     app.get("/api/product/user/:id", [authJWT.verifyToken], product.findAllUser);

    //retrieve a single product
    app.get("/api/product/:id", [authJWT.verifyToken],  product.findOne);

    //update
    app.put("/api/product/:id", [authJWT.verifyToken], product.update);

    //delete by id 
    app.delete("/:id", [authJWT.verifyToken], product.delete);

      //delete by id 
      app.delete("/api/product/user/:id", [authJWT.verifyToken], product.deleteUser);

    //delete all
    router.delete("/api/product/", [authJWT.verifyToken], product.deleteAll);

    //app.use('/api/product', router);
};