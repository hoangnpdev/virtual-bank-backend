
import { createClient } from 'redis';

/**@type {import('redis').RedisClientType} */
export async function getRedisClient() {
        return await createClient()
                .on('error', err => console.log('Redis Client Error', err))
                .connect();
}

