
import { createClient } from 'redis';

/**@type {import('redis').RedisClientType} */
export function getRedisClient() {
        return createClient();

}



import pg from 'pg'

const { Client } = pg
const config = {
        user: 'postgres',
        password: '123456',
        host: 'localhost',
        port: 5433,
        database: 'postgres'

}

export function getPostgresClient() {
        return new Client(config);
}

