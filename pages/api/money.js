/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default function transferMoney(req, res) {
    switch (req.method) {
        case 'GET':

            break;
        case 'POST':

            break;
        default:
            res.status(400).send({
                message: 'Unsupported method',
            })
    }
}