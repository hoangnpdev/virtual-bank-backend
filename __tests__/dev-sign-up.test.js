import * as userService from '@/domain/account/account-service'

test ('create new account, normal case', async() => {
    await expect(userService.createAccount({accountName: "creating_user", password: "123456"})).resolves.toEqual(expect.stringMatching('creating_user'))
})

test ('create new account, account name is used before', async() => {
    await expect(userService.createAccount({accountName: "hoang", password: "123456"})).rejects.toThrowError(expect.anything())
})

test ('create new account, account name is undefined', async() => {
    await expect(userService.createAccount({accountName: undefined, password: "123456"})).rejects.toThrowError(expect.anything())
})
