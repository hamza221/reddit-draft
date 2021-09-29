const cors = require('cors')
 
const whitelist = ['http://localhost:3000'] // list of approved domains 
//when you load the page from the same origin the origin value is undefined
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true//accept cookies from cross origin domain
  //you need to also set it to the client when u're fetching data (in this case we don't need it )
  //axios has withCredentials option
}

module.exports = cors(corsOptions); 