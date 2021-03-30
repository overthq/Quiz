import '@nomiclabs/hardhat-waffle';

export default {
	solidity: '0.7.3',
	defaultNetwork: process.env.NODE_ENV === 'production' ? 'mainnet' : 'ropsten',
	networks: {
		localhost: {
			url: ''
		},
		hardhat: {},
		rinkeby: {
			url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
			accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
		},
		ropsten: {
			url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
			accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`]
		},
		binanceTestnet: {
			url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
			accounts: { mnemonic: process.env.BINANCE_TESTNET_MNEMONIC } 
		},
		binanceMainnet: {
			url: 'https://bsc-dataseed.binance.org/',
			accounts: { mnemonic: process.env.BINANCE_MAINNET_MNEMONIC } 
		},
		mainnet: {
			url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
			accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`]
		}
	}
};
