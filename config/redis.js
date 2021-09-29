const redis = require('redis')

const redisClient= redis.createClient({
 host: `localhost`,
 port: 6379
})
redisClient.on('error', function(err){
  console.error("redis error ", err);
  process.exit(1)
})
module.exports= redisClient