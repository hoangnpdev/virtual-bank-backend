import {v4 as uuid} from 'uuid'
import { getRedisClient } from "@/configuration/database-configuration"
import * as userRepository from '@/domain/user/user-repository'
import bcrypt from "bcrypt";

// later



export async function autheticate(accountName, password) {
    /** @type {Array} */
    let result = await userRepository.findAccountByName(accountName, password);
    if (result.length !== 1) {
        throw Error('Authenticate failed')
    }
    if (!bcrypt.compareSync(password, result[0].account_pwd)) {
        throw Error('Authenticate failed')
    }
    let session = uuid()
    let redisClient = await getRedisClient();
    await redisClient.hSet('session', session, 'test-user');
    return session.toString();
}