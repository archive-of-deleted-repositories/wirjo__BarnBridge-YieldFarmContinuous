import * as deploy from '../test/helpers/deploy';
import { PoolSingle } from '../typechain';

const owner = '0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8';
const rewardToken = '***REMOVED***';
const poolToken = '***REMOVED***';

async function main () {
    const rewards = (
        await deploy.deployContract('PoolSingle', [owner, rewardToken, poolToken])
    ) as PoolSingle;

    console.log(`Pool deployed at: ${rewards.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

