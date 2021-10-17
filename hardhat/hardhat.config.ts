import '@nomiclabs/hardhat-waffle';
import dotenv from 'dotenv';
dotenv.config();

export default {
	solidity: '0.8.4',
	defaultNetwork: 'ropsten',
	networks: {
		// localhost: {
		// 	url: ''
		// },
		// hardhat: {},
		// rinkeby: {
		// 	url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
		// 	accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
		// },
		ropsten: {
			url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
			accounts: { mnemonic: process.env.ROPSTEN_MNEMONIC }
		}
		// binanceTestnet: {
		// 	url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
		// 	accounts: { mnemonic: process.env.BINANCE_TESTNET_MNEMONIC }
		// },
		// binanceMainnet: {
		// 	url: 'https://bsc-dataseed.binance.org/',
		// 	accounts: { mnemonic: process.env.BINANCE_MAINNET_MNEMONIC }
		// },
		// mainnet: {
		// 	url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
		// 	accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`]
		// }
	}
};
