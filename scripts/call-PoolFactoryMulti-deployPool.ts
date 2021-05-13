import { contractAt } from '../test/helpers/helpers';
import { PoolFactoryMulti } from '../typechain';
import { BigNumber } from 'ethers';

const factoryAddr = '0x45785bbdb31587dC206F6FE58e2DcFaE71ac40a1';

const owner = '0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8';
const poolToken = '***REMOVED***';
const rewardTokens = [
    {
        tokenAddress: '***REMOVED***',
        rewardSource: '0xB56ccaD94c714c3Ad1807EB3f5d651C7633BB252',
        rewardRate: BigNumber.from('16534391534391534'),
    },
    {
        tokenAddress: '***REMOVED***',
        rewardSource: '0x0000000000000000000000000000000000000000',
        rewardRate: BigNumber.from(0),
    },
];

async function main () {
    const factory = (await contractAt('PoolFactoryMulti', factoryAddr)) as PoolFactoryMulti;

    await factory.deployPool(owner, poolToken, rewardTokens);

    const pool = await factory.pools((await factory.numberOfPools()).sub(1));
    console.log(`Deployed pool at address: ${pool}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
