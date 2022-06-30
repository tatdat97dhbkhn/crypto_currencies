import axios from 'axios';

export default async function zcashRpc(method, params) {
    return await (
        await axios.post(
            'http://44.242.135.63:18232/',
            `{"jsonrpc": "1.0", "id":"curltest", "method": "${method}", "params": ${params}}`,
            {
                headers: {
                    'content-type': 'text/plain;',
                },
                auth: {
                    username: 'admin',
                    password: 'Sotatek@2020',
                },
            },
        )
    ).data;
}

const block = await zcashRpc("getblock", '["1924700", 2]')
console.log(`block: ${JSON.stringify(block)}`)

const transaction = await zcashRpc("gettransaction", `["${block.result.tx[0].txid}"]`)
console.log(`transaction: ${JSON.stringify(transaction)}`)
