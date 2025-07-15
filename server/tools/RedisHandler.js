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
    static async getCachedValue(key) {
        const value = await redisClient.get(key);
        return value;
    }

    // Method for adding a (key:value) element with expire period to cache
    static async setCachedValue(key, value, ttl = 300) {
        await redisClient.set(key, value, { EX: ttl }); // expire after ttl seconds
    }

    // Method for deleting a (key:value) element
    static async delete(key) {
        const exists = await redisClient.exists(key);
        if (exists) {
            await redisClient.del(key);
        }
    }

    // Method for getting key existance
    static async exists(key){
        return await redisClient.exists(key);
    }
}

export default RedisHandler;