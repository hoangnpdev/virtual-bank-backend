import * as accountService from "@/domain/account/account-service";

export default async function balance(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                let balance = await accountService.checkBalance();
                res.status(200).json({
                    balance: balance,
                })
            } catch (e) {
                res.status(400).send({
                    message: e.message
                })
            }
            break;
        default:
            res.status(405).send('Method Not Allowed');
    }
}