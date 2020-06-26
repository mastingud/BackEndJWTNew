const db = require("../models");
const Product =db.products;
const User = db.user;
const Op = db.Sequelize.Op;


//create and save
exports.create = (req, res) => {
    // validate request
    if (!req.body.title) {
        res.status(400).send({
            status : false,
            message : "Cannot be empty !"
        });

        return;
    }

    //create object field
    const product = {
        title :  req.body.title,
        description : req.body.description,
        brand : req.body.brand,
        published: req.body.published ? req.body.published : false,
        userId : req.body.userId
    };

    //save
    Product.create(product)
    .then(
        data => {

            res.send(data);
        })
    .catch(err => {
            res.status(500).send({
                status: false,
                message : err.message || "something error while creating data"
        });
    });

};


// retrieve all 
exports.findAll = (req, res) => {
    const title =  req.query.title;
    var condition = title ? {title : {[Op.like] : `%${title}%`}} :  null;

    Product.findAll({where : condition})
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            status : false,
            message : err.message || "something error while retrieving data"
        });
    });
};



//find a single
exports.findOne =  (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
    .then(data => {
        res.send(data);
        })
    .catch(err => {
        res.status(500).send({
            status:false,
            message : err.message || "something error while retrieving data with id = "+id
        });
    });

};

//update data
exports.update =  (req, res) => {
    const id = req.params.id;

    Product.update(req.body,{
        where : {id : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status : true,
                message : "Product was updated successfully !"
            });
        } else {
            res.send({
                status : false,
                message : `Cannot update Product with id= ${id}. 
                Maybe product was not found or request is empty.
                `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status : false,
            message : `Error updating Product with id = ${id}`
        });
    })
};

// delete single 
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where : {id : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status : true,
                message : "Product was deleted successfully !"
            });
        } else {
            res.send({
                status : false,
                message : `Cannot delete Product with id= ${id}. 
                Maybe product was not found or request is empty.
                `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status : false,
            message : `Error deleting Product with id = ${id}`
        });
    })
};

// delete single 
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where : {userId : id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                status : true,
                message : "Products  was deleted successfully !"
            });
        } else {
            res.send({
                status : false,
                message : `Cannot delete Product with id= ${id}. 
                Maybe product was not found or request is empty.
                `
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status : false,
            message : `Error deleting Product with id = ${id}`
        });
    })
};

// delete all 
exports.deleteAll =  (req, res) => {
    Product.destroy({
        where : {},
        truncate : false
    })
    .then(nums => {
        res.send({
            status : true,
            message : `${nums} Products were deleted successfully`
        });

    })
    .catch(err => {
        res.status(500).send({
            status :false,
            message : err.message || `Some error occured while removing all product`
        });
    });
};

//find all published
exports.findAllPublished = (req, res) => {
    User.hasMany(Product, {foreignKey: 'id'})
    Product.belongsTo(User, {foreignKey: 'userId'})
    Product.findAll({where : {published :  true}, include: [{ model: User, attributes: ['username'] }]},{raw: true})
    .then( data => {
        const dat = data.map(dt => {
            //tidy up the user data
            return Object.assign(
              {},
              {
                id: dt.id,
                title: dt.title,
                description: dt.description,
                brand: dt.brand,
                username :  dt.user.username,
                createdAt : new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: 'numeric', minute: 'numeric', second: 'numeric', 
                    timeZone: 'Asia/Jakarta',
                   
                    
                  }).format(dt.createdAt),
                updatedAt : new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: 'numeric', minute: 'numeric', second: 'numeric', 
                    timeZone: 'Asia/Jakarta',
                   
                  }).format(dt.updatedAt),
                published : dt.published
              });
            });
        res.send(dat);
    })
    .catch( err => {
        res.status(500).send({
            message :  err.message ||  `Some error occured while removing all products`
        });
    });
};

//find all by user
exports.findAllUser = (req, res) => {
    const userId = req.params.id;
    Product.findAll({where : {userId :  userId}})
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message :  err.message ||  `Some error occured while removing all products`
        });
    });
};