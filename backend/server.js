const config = require('config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
console.log(config.get('PrivateKey'));
if (!config.get('PrivateKey')) {
  console.log('FATAL ERROR: PrivateKey not defined.');
  process.exit(1);
}
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

/*
app.get('/', (req, res) => {
    res.send('Hello World!')
})
*/

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const teamRouter = require('./routes/team');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/team', teamRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
