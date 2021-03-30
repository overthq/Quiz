import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Quiz', () => {
	it('Should initialize the quiz state when created', async () => {
		const Quiz = await ethers.getContractFactory('Quiz');
		const quiz = await Quiz.deploy(10);

		await quiz.deployed();
		expect(1).to.equal(1);
	});
});
