import * as accountService from "@/domain/account/account-service";

export default async function account(req, res) {
    let accountNameToCheck = JSON.parse(req.body).accountName;
    switch (req.method) {
        case 'GET':
            try {
                let accountName = await accountService.checkAccountExistent(accountNameToCheck);
                res.status(200).json({
                    accountName: accountName,
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