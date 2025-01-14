import * as userRepository from '@/domain/user/user-repository'
import * as authenticationService from '@/domain/user/authentication-service'



test('node pg select *', async() => {
    await expect(userRepository.findAllAccount()).resolves.toHaveLength(3);
});


test('valid sign in', async() => {
    await expect(authenticationService.autheticate('hoang', '123456')).resolves.toEqual(expect.stringMatching(/.*/))
})

test('invalid sign in, wrong password', async () => {
    await expect(authenticationService.autheticate('hoang', '1234567')).rejects.toThrow(Error("Authenticate failed"))
})

test('invalid sign in, wrong account_name',async () => {
    await expect(authenticationService.autheticate('5hoang', '123456')).rejects.toThrow(Error("Authenticate failed"))
})

