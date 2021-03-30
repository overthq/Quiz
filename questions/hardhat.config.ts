import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';

task('accounts', 'Prints the list of accounts', async (_, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

export default {
	solidity: '0.7.3',
	defaultNetwork: process.env.NODE_ENV === 'production' ? 'mainnet' : 'ropsten',
	networks: {
		hardhat: {},
		rinkeby: {},
		ropsten: {
			url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
			accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`]
		},
		binance: {},
		mainnet: {}
	}
};
