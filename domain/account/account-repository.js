
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

export async function updateBalance(origin_account, destination_account, amount) {
    const client = databaseConfig.getPostgresClient();
    await client.connect();
    try {
        await client.query('begin');
        await client.query(`
            update virtual_bank.account 
            set balance = balance - $1 
            where account_name=$2`,
            [amount, origin_account]);
        await client.query(`
            update virtual_bank.account 
            set balance = balance + $1 
            where account_name=$2`,
            [amount, destination_account]);
        await client.query(`commit`);
    } catch (err) {
        await client.query('rollback');
        throw err;
    } finally {
        await client.end();
    }
}