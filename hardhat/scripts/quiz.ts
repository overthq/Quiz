import { run, ethers } from 'hardhat';

async function main() {
  await run('compile');
  const Quiz = await ethers.getContractFactory("Quiz");
  const quiz = await Quiz.deploy("Hello, Hardhat!");

  await quiz.deployed();

  console.log("Quiz deployed to:", quiz.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
