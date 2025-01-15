import {v4 as uuid} from 'uuid'
import { getRedisClient } from "@/configuration/database-configuration"
import * as userRepository from '@/domain/account/account-repository'
import { cookies } from 'next/headers'
import bcrypt from "bcrypt";

// later



export async function authenticate(accountName, password) {
    /** @type {Array} */
    let result = await userRepository.findAccountByName(accountName);
    if (result.length !== 1) {
        console.log("User not found");
        throw Error('Authenticate failed')
    }
    if (!bcrypt.compareSync(password, result[0].account_pwd)) {
        console.log("Wrong password");
        throw Error('Authenticate failed')
    }
    let session = uuid()
    let redisClient = await getRedisClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    await redisClient.hSet('session', session, accountName);
    await redisClient.quit();
    return session.toString();
}

export async function currentUser() {
    let cookie = (await cookies()).get('session').value;
    let redisClient = await getRedisClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    let currentUser = await redisClient.hGet('session', session);
    await redisClient.quit();
    return currentUser;
}