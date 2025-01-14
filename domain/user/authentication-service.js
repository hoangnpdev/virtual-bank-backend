import {v4 as uuid} from 'uuid'
import { getRedisClient } from "@/configuration/database-configuration"
import * as userRepository from '@/domain/user/user-repository'
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
    let redisClient = await getRedisClient();
    await redisClient.hSet('session', session, 'test-user');
    return session.toString();
}