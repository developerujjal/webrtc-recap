const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'aldkfsdlfksdlfkdsdklfasakdfj';
const { v4: uuidv4 } = require('uuid');


const professionalAppointments = [];


// router.set('professionalAppointments', professionalAppointments);



router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

router.get('/user-link', (req, res) => {

    const uuid = uuidv4();  // unique identifier for the user/primary key


    const data = {
        name: 'barry',
        appDate: Date.now(),
        uuid,
        clientName: 'Allen'
    };

    professionalAppointments.push(data);

    const token = jwt.sign(data, secret);
    res.send({ token });

});

router.get('/validate-link', (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).send('Link is not valid');
    };
    const decodedData = jwt.verify(token, secret,);

    res.send(decodedData)

});


router.get('/pro-link', (req, res) => {

    const userData = {
        name: 'barry',
        proId: 12345
    };
    const token = jwt.sign(userData, secret);
    res.send({ token });
})


module.exports = router;