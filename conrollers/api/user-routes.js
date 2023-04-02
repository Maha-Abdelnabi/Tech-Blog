//dependinces
const router = require("express").Router();
const {User, Post, Comment } =  require("../../models");

//routes
//get all users
router.get('/', (req,res) =>{
    User.findAll({
      // when the data is sent back, exclude the password
      attributes: { exclude: ["password"] },
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

//get a single user by id
router.get('./:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        // use id as the parameter for the request
        id: req.params.id,
      },
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: "can't find a yser with thid id" });
        return;
      }
      // if no user is found, return an error, otherwise, return the data for the requested user
      res.json(dbUserData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    })
 
})

// post..add a new user
router.post('/', (req, res)=>{
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password        
    })
    //send the data back
    .then(dbUserData =>{
        res.json(dbUserData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
})

//post..login route
router.post('/login', (req,res) =>{
  // findOne method by email to look for an existing user in the database with the email address entered
  User.findOne({
    where: {
        email: req.body.email
    }
  })
  .then(dbUserData =>{
    if (!dbUserData) {
      res.status(400).json({ message: "Can't find this email" });
      return;
    }
    // otherwise return the user object 
    res.json({user: dbUserData, message: 'You are now logged in'});

  })
}) 

//post..logout an existing user
router.post('/logout', (req,res) =>{
    if (req.session.loggedIn) {
        req.session.destroy(() =>{
            //204 status as success req
            res.status(204).end();
        });
    }else{
      // if there is no session, then the logout request will send back a no resource found status
      res.status(404).end();
    }
})

//put..update user
router.put('/:id', (req,res)=>{
    User.update(req.body, {
      // since there is a hook to hash only the password, the option is noted here, use the id as the parameter for the individual user to be updated
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    })
     .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

//delete..existing user
router.delete('./:id', (req,res) => {
    User.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData =>{
        if(!dbUserData){
           res.status(404).json({ message: "No user found with this id" });
           return;  
        }
        //otherwise
        res.json(dbUserData)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;

