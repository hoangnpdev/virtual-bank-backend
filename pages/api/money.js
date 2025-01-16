import * as accountService from "@/domain/account/account-service";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default function transferMoney(req, res) {
    switch (req.method) {
        case 'POST':

            break;
        default:
            res.status(400).json({
                message: 'Unsupported method',
            })
    }
}