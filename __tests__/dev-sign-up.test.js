import * as userService from '@/domain/user/user-service'

test ('create new user, normal case', async() => {
    await expect(userService.createAccount({accountName: "creating_user", password: "123456"})).resolves.toEqual(expect.stringMatching('creating_user'))
})

test ('create new user, account name is used before', async() => {
    await expect(userService.createAccount({accountName: "hoang", password: "123456"})).rejects.toThrowError(expect.anything())
})

test ('create new user, account name is undefined', async() => {
    await expect(userService.createAccount({accountName: undefined, password: "123456"})).rejects.toThrowError(expect.anything())
})
