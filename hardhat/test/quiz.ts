import { ethers } from 'hardhat';

describe('Quiz', function () {
	it("Should return the new greeting once it's changed", async function () {
		const Quiz = await ethers.getContractFactory('Greeter');
		const quiz = await Quiz.deploy('Hello, world!');

		await quiz.deployed();
	});
});
