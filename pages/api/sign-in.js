import { serialize } from 'cookie'
import * as authenticationService from '../../domain/user/authentication-service'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/
export default (req, res) => {
    let accountName = req.body.account_name;
    let password = req.body.password;
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