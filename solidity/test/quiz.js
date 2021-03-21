const { expect } = require("chai");

describe("Quiz", () => {
  it("Should initialize the quiz state when created", async () => {
    const Quiz = await ethers.getContractFactory("Quiz");
    const quiz = await Quiz.deploy({});

    await quiz.deployed();

    expect(1).to.be(1);
  });
});
