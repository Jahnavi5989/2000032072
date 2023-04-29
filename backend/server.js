const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const app = express();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')


app.listen(5000,()=>{
    console.log('Server running...')
})
app.use(express.json())
app.use(cors({origin:"*"}))


//This is an API to register your company with the John Doe Railway Server.


const registeredCompanies = {};

app.post('/train/register', (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;

  // check if company has already registered
  if (registeredCompanies[companyName]) {
    return res.status(400).json({ error: 'Company already registered' });
  }

  // validate access code
  if (accessCode !== 'FKDLjg') {
    return res.status(401).json({ error: 'Invalid access code' });
  }

  // generate client ID and secret
  const clientId = uuidv4();
  const clientSecret = uuidv4();

  // store registration data
  registeredCompanies[companyName] = {
    ownerName,
    rollNo,
    ownerEmail,
    clientId,
    clientSecret,
  };

  // return success response
  res.json({
    companyName,
    clientId,
    clientSecret,
  });
});





// This would typically be stored in a database or config file
const clients = [
  {
    companyName: 'Train Central',
    clientID: 'd95bbbe7-3364-455d-a032-cf8c6ee42b78',
    clientSecret: 'acedd24c-312a-48cf-9b0f-b6c820724b58'
  }
];

// Authenticate the client and return a JWT
app.post('/train/auth', (req, res) => {
  const { companyName, clientID, ownerName, ownerEmail, rollNo, clientSecret } = req.body;

  // Find the client in the clients array
  const client =  clients.find(c => c.companyName === companyName && c.clientID === clientID && c.clientSecret === clientSecret);

  if (!client) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Generate a JWT for the client
  const token = jwt.sign({ companyName }, 'secret', { expiresIn: '1h' });

  // Send the JWT in the response
  res.json({
    token_type: 'Bearer',
    access_token: token,
    expires_in: 3600 // 1 hour in seconds
  });
});



const trains = [
    {
      trainName: 'Chennai Exp',
      trainNumber: '2344',
      departureTime: {
        Hours: 21,
        Minutes: 35,
        Seconds: 0,
      },
      seatsAvailable: {
        sleeper: 3,
        AC: 1,
      },
      price: {
        sleeper: 2,
        AC: 5,
      },
      delayedBy: 15,
    },
    {
      trainName: 'Hyderabad Exp',
      trainNumber: '2341',
      departureTime: {
        Hours: 23,
        Minutes: 55,
        Seconds: 0,
      },
      seatsAvailable: {
        sleeper: 6,
        AC: 7,
      },
      price: {
        sleeper: 554,
        AC: 1854,
      },
      delayedBy: 5,
    },
    {
      trainName: 'Delhi Door Hai Exp',
      trainNumber: '2343',
      departureTime: {
        Hours: 9,
        Minutes: 45,
        Seconds: 0,
      },
      seatsAvailable: {
        sleeper: 32,
        AC: 1,
      },
      price: {
        sleeper: 1,
        AC: 723,
      },
      delayedBy: 3,
    },
  ];
  
app.get('/train/trains', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not provided' });
  }
  
  //  validate the authorization token and proceed with the API logic if it's valid

 
  res.status(200).json(trains);
});


// Route for getting train details by trainNumber
app.get('/train/trains/:trainNumber', (req, res) => {
const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not provided' });
  }
    const train = trains.find((t) => t.trainNumber === req.params.trainNumber);
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  });
  

