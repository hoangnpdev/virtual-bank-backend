import { z } from 'zod'
import * as userService from '@/domain/account/account-service'


/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function signUp(req, res) {
    const accountNameSchema = z.string().regex(/^[a-zA-Z0-9_]+$/, {message: 'Account name is invalid'});
    const passwordSchema = z.string().regex(/^[a-zA-Z0-9_]+$/, {message: 'Password name is invalid'});
    let jsonBody = JSON.parse(req.body)
    let accountName = jsonBody.accountName;
    let password = jsonBody.password;
    try {
        accountNameSchema.parse(accountName);
        passwordSchema.parse(password);
    } catch (e) {
        res.status(400).send({
            message: e.errors[0].message
        })
    }
    try {
        let accountNameCreated = await userService.createAccount({accountName: accountName, password: password});
        res.status(200).send({
            accountName: accountNameCreated
        });
    } catch (e) {
        res.status(400).send({
            message: e.message
        })
    }

}