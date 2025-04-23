const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'aldkfsdlfksdlfkdsdklfasakdfj';


router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

router.get('/user-link', (req, res) => {
    const data = {
        name: 'barry',
        appDate: Date.now()
    };

    const token = jwt.sign(data, secret);
    res.send('http://localhost:3000/user-link?token=' + token);

});

router.get('/validate-link', (req, res) => {
    const token =req.query.token;
    if(!token){
        return res.status(400).send('Link is not valid');
    };
   const decodedData = jwt.verify(token, secret,);

   res.send(decodedData)
});


module.exports = router;