
import * as accountService from '@/domain/account/account-service'
import * as authenticateService from "../domain/account/authentication-service";
jest.mock("../domain/account/authentication-service");


test('transfer money, success', async() => {
    authenticateService.currentUser.mockImplementationOnce(() => Promise.resolve('hoang1'));
    console.log(authenticateService.currentUser());
    await expect(accountService.transferMoney({destination: 'hoang1', amount: 5000000})).resolves.toBeTruthy();
})


test('transfer money, balance not enough ', async() => {
    authenticateService.currentUser.mockImplementationOnce(() => Promise.resolve('hoang1'));
    await expect(accountService.transferMoney({destination: 'hoang1', amount: 5000000000})).resolves.toBeFalsy();
})

test('transfer money, wrong account name', async() => {
    authenticateService.currentUser.mockImplementationOnce(() => Promise.resolve('hoang1'));
    await expect(accountService.transferMoney({destination: 'hoang999', amount: 5000})).toThrow(expect.anything());
})


test('check account, success', async() => {
    authenticateService.currentUser.mockImplementationOnce(() => Promise.resolve('hoang1'));
    await expect(accountService.checkAccountExistent('hoang1')).resolves.toBeTruthy();
})

test('check account, account not existent', async() => {
    authenticateService.currentUser.mockImplementationOnce(() => Promise.resolve('hoang1'));
    await expect(accountService.checkAccountExistent('hoang999')).resolves.toBeFalsy()
})


test('check balance, success', async() => {
    authenticateService.currentUser.mockImplementationOnce(() => Promise.resolve('hoang1'));
    expect(typeof await accountService.checkBalance()).toBe('number');
})