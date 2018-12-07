/**
 * 劇場検索
 */
const auth = require('./auth');
const client = require('../lib/index');

async function main() {
    const authClient = await auth.login();
    await authClient.refreshAccessToken();
    const loginTicket = authClient.verifyIdToken({});
    console.log('username is', loginTicket.getUsername());

    const theaterService = new client.service.Theater({
        endpoint: process.env.TEST_API_ENDPOINT,
        auth: authClient
    });

    const data = await theaterService.getTheaterList();
    console.log(data);
}

main().then(() => {
    console.log('success!');
}).catch(console.error);
