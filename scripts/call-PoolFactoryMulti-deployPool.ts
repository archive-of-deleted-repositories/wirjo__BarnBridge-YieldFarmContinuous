import { calcRate, contractAt } from '../test/helpers/helpers';
import { PoolFactoryMulti } from '../typechain';
import { BigNumber } from 'ethers';

const zero = BigNumber.from(0);
const zeroAddress = '0x0000000000000000000000000000000000000000';

const factoryAddr = '0x33c3De5B470D196e4936847E999d9fE3296Ad7Cc';
const owner = '0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8';

const pools = [
    {
        poolToken: '***REMOVED***',
        rewardTokens: [
            {
                tokenAddress: '***REMOVED***',
                rewardSource: '0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8',
                rewardRate: calcRate(1000),
            },
            {
                tokenAddress: '***REMOVED***',
                rewardSource: zeroAddress,
                rewardRate: zero,
            },
        ],
    },
    {
        poolToken: '***REMOVED***',
        rewardTokens: [
            {
                tokenAddress: '***REMOVED***',
                rewardSource: '0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8',
                rewardRate: calcRate(1000),
            },
            {
                tokenAddress: '***REMOVED***',
                rewardSource: zeroAddress,
                rewardRate: zero,
            },
        ],
    },
];

async function main () {
    const factory = (await contractAt('PoolFactoryMulti', factoryAddr)) as PoolFactoryMulti;

    for (const p of pools) {
        await factory.deployPool(owner, p.poolToken, p.rewardTokens);
        const poolAddr = await factory.pools((await factory.numberOfPools()).sub(1));
        console.log(`Deployed pool for token ${p.poolToken} at address: ${poolAddr}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
