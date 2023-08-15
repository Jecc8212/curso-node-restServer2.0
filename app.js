require('dotenv').config();

// const dotenv = require('dotenv')
// const buf = Buffer.from('BASICO=basico')
// const config = dotenv.parse(buf) // devolverá un objeto
// console.log(typeof config, config) // objeto { BASICO : 'basico' }



const Server = require('./models/server');


const server = new Server();



server.listen();