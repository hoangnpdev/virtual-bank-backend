import * as accountRepository from './account-repository';
import * as authenticationService from './authentication-service';
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
    return await accountRepository.createAccount(userInfo.accountName, hashedPassword);
}

export async function transferMoney(transaction) {
    let currentUser = await authenticationService.currentUser();
    await accountRepository.updateBalance(currentUser, transaction.destination, transaction.amount);
    return {
        origin: currentUser,
        destination: transaction.destination,
        amount: transaction.amount
    }
}

export async function checkBalance() {

}

export async function checkAccountExistent(accountName) {

}