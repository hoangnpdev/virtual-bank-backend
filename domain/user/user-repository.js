import pg from 'pg'

const { Client } = pg
const config = {
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5433,
    database: 'postgres'

}

export async function findAllAccount() {
    const client = new Client(config)
    await client.connect();
    const res = await client.query('select * from virtual_bank.account');
    await client.end();
    return res.rows;
}


export async function findAccountByName(accountName) {
    const client = new Client(config)
    await client.connect();
    const res = await client.query('select account_name , account_pwd from virtual_bank.account where account_name=$1', [accountName]);
    await client.end()
    return res.rows;
}