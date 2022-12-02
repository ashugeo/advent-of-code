const fs = require("fs");

fs.readFile("./data.md", "utf8", (_, data) => {
  console.clear();
  data = data.trim();

  const rounds = data.split("\n");

  let score = 0;

  // A Rock
  // B Paper
  // C Scissors

  // X Lose
  // Y Draw
  // Z Win

  for (const round of rounds) {
    const [them, me] = round.split(" ");

    if (me === "X") {
      if (them === "A") score += 3;
      else if (them === "B") score += 1;
      else if (them === "C") score += 2;
    } else if (me === "Y") {
      score += 3;

      if (them === "A") score += 1;
      else if (them === "B") score += 2;
      else if (them === "C") score += 3;
    } else if (me === "Z") {
      score += 6;

      if (them === "A") score += 2;
      else if (them === "B") score += 3;
      else if (them === "C") score += 1;
    }
  }

  console.log(score);
});
