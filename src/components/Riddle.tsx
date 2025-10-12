import { useState } from "react";
import { type Enigma } from "../hooks/useEnigma";
import { sanitize } from "../utils/string";

export const Riddle = ({
  enigma,
  onSolved,
}: {
  enigma: Enigma;
  onSolved: () => void;
}) => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

  const validateAnswer = () => {
    const longestWord = answer
      .split(" ")
      .sort((w1, w2) => w2.length - w1.length)[0];

    if (sanitize(longestWord) === sanitize(enigma.answer)) {
      setIsCorrect(true);
      onSolved();
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <p>Répond à cette énigme pour gagner des points supplémentaires !</p>
      <h2>
        🎃 <em>{enigma.question}</em> 🎃
      </h2>
      {isCorrect === true && <p>✅ Bravo, c'est la bonne réponse !</p>}
      {isCorrect === false && <p>❌ Oups, ce n'est pas la bonne réponse.</p>}
      <p
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <input
          onChange={(e) => setAnswer(e.target.value)}
          type="text"
          name="answer"
          placeholder="Ta réponse ici"
        />
        <button onClick={validateAnswer} type="submit">
          Valider
        </button>
      </p>
    </div>
  );
};
