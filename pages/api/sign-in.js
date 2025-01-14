import { serialize } from 'cookie'
import { z } from 'zod'
import * as authenticationService from '../../domain/user/authentication-service'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/
export default (req, res) => {
    const accountNameSchema = z.string().regex(/^[a-zA-Z0-9_]+$/, {message: 'Account name is invalid'});
    const passwordSchema = z.string().regex(/^[a-zA-Z0-9_]+$/, {message: 'Password name is invalid'});
    let body = JSON.parse(req.body);
    let accountName = body.accountName;
    let password = body.password;
    try {
        accountNameSchema.parse(accountName);
        passwordSchema.parse(password);
    } catch (error) {
        res.status(400).send({
            message: error.errors[0].message
        })
    }
    authenticationService.autheticate(accountName, password)
        .then(session => {
            const cookie = serialize('session', session, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 24 * 7, // One week
                path: '/',
            })
            res.setHeader('Set-Cookie', cookie);
            res.status(200)
                .json({ session: session });
        }).catch(error => {
            res.status(400)
                .json({
                    message: error.message
                })
        })
}