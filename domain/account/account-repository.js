
import * as databaseConfig from '@/configuration/database-configuration'


export async function findAllAccount() {
    const client = databaseConfig.getPostgresClient();
    await client.connect();
    try {
        const res = await client.query('select * from virtual_bank.account');
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        await client.end();
    }
}


export async function findAccountByName(accountName) {
    const client = databaseConfig.getPostgresClient();
    await client.connect();
    try {
        const res = await client.query('select account_name , account_pwd from virtual_bank.account where account_name=$1', [accountName]);
        return res.rows;
    } catch (err) {
        throw err;
    } finally {
        await client.end();
    }

}

export async function createAccount(accountName, password) {
    const client = databaseConfig.getPostgresClient();
    await client.connect();
    try {
        const res = await client.query('insert into virtual_bank.account(account_name, account_pwd) values($1, $2)', [accountName, password]);
        return accountName;
    } catch (err) {
        throw err;
    } finally {
        await client.end();
    }
}