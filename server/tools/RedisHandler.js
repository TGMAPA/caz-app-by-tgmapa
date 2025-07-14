// Modules
import { createClient } from 'redis';  // Redis for cache memory storage 

// Redis Url
import { REDIS_URL } from "../config.js";

// Connect redis cache client
const redisClient = createClient({ url: REDIS_URL });
redisClient.on('error', (err) => console.error('Redis error', err)); // Handle redis error

(async () => {
  await redisClient.connect(); // Single Connection for entire app
})();

// Class for Redis handling
export class RedisHandler{

    // Method for getting any value from cache
    async getCachedValue(key) {
        const value = await redisClient.get(key);
        return value;
    }

    // Method for adding a (key:value) element with expire period to cache
    async setCachedValue(key, value, ttl = 60) {
        await redisClient.set(key, value, { EX: ttl }); // expire after ttl seconds
    }
}

export default RedisHandler;