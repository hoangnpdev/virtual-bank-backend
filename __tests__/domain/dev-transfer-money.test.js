
import * as accountService from '@/domain/account/account-service'
import * as authenticateService from "@/domain/account/authentication-service";
jest.mock("@/domain/account/authentication-service");


test('transfer money, success', async() => {
    authenticateService.currentUser.mockImplementation(() => Promise.resolve('hoang'));
    await expect(accountService.transferMoney({destination: 'hoang1', amount: 5000000})).resolves.toBeTruthy();
})


test('transfer money, balance not enough ', async() => {
    authenticateService.currentUser.mockImplementation(() => Promise.resolve('hoang'));
    await expect(accountService.transferMoney({destination: 'hoang1', amount: 5000000000})).rejects.toThrow(expect.anything());
})

test('transfer money, wrong account name', async() => {
    authenticateService.currentUser.mockImplementation(() => Promise.resolve('hoang'));
    await expect(accountService.transferMoney({destination: 'hoang999', amount: 5000})).rejects.toThrow(expect.anything());
})


test('check account, success', async() => {
    authenticateService.currentUser.mockImplementation(() => Promise.resolve('hoang1'));
    await expect(accountService.checkAccountExistent('hoang')).resolves.toBeTruthy();
})

test('check account, account not existent', async() => {
    authenticateService.currentUser.mockImplementationOnce(() => Promise.resolve('hoang1'));
    await expect(accountService.checkAccountExistent('hoang999')).resolves.toBeFalsy()
})


test('check balance, success', async() => {
    authenticateService.currentUser.mockImplementation(() => Promise.resolve('hoang1'));
    expect(typeof await accountService.checkBalance()).toBe('number');
})