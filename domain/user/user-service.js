import * as userRepository from './user-repository';
import bcrypt from 'bcrypt';


export async function createAccount(userInfo) {
    if (!userInfo.accountName) {
        throw new Error('Account name is required');
    }
    if (!userInfo.password) {
        throw new Error('Password is required');
    }
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(userInfo.password, salt);
    return await userRepository.createAccount(userInfo.accountName, hashedPassword);
}