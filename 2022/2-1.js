const fs = require("fs");

fs.readFile("./data.md", "utf8", (_, data) => {
  console.clear();
  data = data.trim();

  const rounds = data.split("\n");

  let score = 0;

  // A Rock
  // B Paper
  // C Scissors

  // X Rock
  // Y Paper
  // Z Scissors

  for (const round of rounds) {
    const [them, me] = round.split(" ");

    if (me === "X") {
      score += 1;

      if (them === "A") score += 3;
      else if (them === "C") score += 6;
    } else if (me === "Y") {
      score += 2;

      if (them === "A") score += 6;
      else if (them === "B") score += 3;
    } else if (me === "Z") {
      score += 3;

      if (them === "B") score += 6;
      else if (them === "C") score += 3;
    }
  }

  console.log(score);
});
