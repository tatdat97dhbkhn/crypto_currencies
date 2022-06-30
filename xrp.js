import xrpl from 'xrpl';

export default async function getAccountTx(seed) {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net/")
    await client.connect()

    // const fund_result = await client.fundWallet()
    // const test_wallet = fund_result.wallet

    const test_wallet = xrpl.Wallet.fromSeed(seed)
    console.log(`Test Wallet: ${JSON.stringify(test_wallet)}`)

    const accountTxResponse = await client.request({
        "command": "account_tx",
        "account": test_wallet.address,
        "ledger_index_min": 27887250,
        "ledger_index_max": -1,
        "binary": false,
        "limit": 100,
        "forward": false
    })
    console.log(`Account Tx: ${JSON.stringify(accountTxResponse)}`)

    client.disconnect()

    return accountTxResponse;
}

export async function getTx(tx_hash) {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net/")
    await client.connect()

    const txResponse = await client.request({
        "command": "tx",
        "id": id,
        "transaction": tx_hash,
        "binary": false
    })
    console.log(`tx: ${JSON.stringify(txResponse)}`)

    client.disconnect()

    return txResponse;
}

const accountTx = await getAccountTx('sEdSksMYkzUNb8tvxG4ynUXvTQb5uwc');
const id = accountTx.id
const firstTx = accountTx.result.transactions[0].tx
const tx = getTx(firstTx.hash)
