import * as userRepository from '@/domain/account/account-repository'
import * as authenticationService from '@/domain/account/authentication-service'



test('valid sign in', async() => {
    await expect(authenticationService.authenticate('hoang', '123456')).resolves.toEqual(expect.stringMatching(/.*/))
})

test('invalid sign in, wrong password', async () => {
    await expect(authenticationService.authenticate('hoang', '1234567')).rejects.toThrow(Error("Authenticate failed"))
})

test('invalid sign in, wrong account_name',async () => {
    await expect(authenticationService.authenticate('5hoang', '123456')).rejects.toThrow(Error("Authenticate failed"))
})

