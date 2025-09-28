import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FloatingGhost } from "../components/FloatingGhost";
import { useEnigma, type Enigma } from "../hooks/useEnigma";
import { useUser } from "../hooks/useUser";
import { Riddle } from "../components/Riddle";
import { Link } from "react-router-dom";

export const EnigmaScreen = () => {
  const { user, isLoading } = useUser();
  const { enigmaId } = useParams();
  const { enigma, markAsFound, markAsSolved } = useEnigma(enigmaId);

  useEffect(() => {
    if (user) {
      markAsFound(user);
    }
  }, [markAsFound, user]);

  const loading = isLoading || !user;
  if (loading) {
    return <FloatingGhost />;
  }

  if (!enigma || !enigmaId) {
    return <EnigmaNotFound />;
  }

  const onSolved = () => {
    markAsSolved(user);
  };

  const isAlreadyFound = user.enigmas.some((e) => e.id === enigmaId && e.found);
  const isAlreadySolved = user.enigmas.some(
    (e) => e.id === enigmaId && e.solved
  );

  if (isAlreadyFound && isAlreadySolved) {
    return <EnigmaAlreadySolved />;
  }

  if (isAlreadyFound && !isAlreadySolved) {
    return (
      <EnigmaAlreadyFoundButNotSolved enigma={enigma} onSolved={onSolved} />
    );
  }

  return <EnigmaNeverFound enigma={enigma} onSolved={onSolved} />;
};

const EnigmaNotFound = () => {
  return (
    <div>
      <h1>Ce n'est pas un fantôme !</h1>
      <h2>
        Ce fantôme n'est pas reconnu par nos experts…
        <br />
        Contacte-nous pour obtenir de l'aide.
      </h2>
      <FloatingGhost sizeFactor={2} />
    </div>
  );
};

const EnigmaAlreadySolved = () => {
  return (
    <div>
      <h1>Bravo !</h1>
      <h2>Tu as déjà répondu à cette énigme !</h2>
      <FloatingGhost sizeFactor={2} />
      <p>
        Tu peux accéder au{" "}
        <Link to="/leaderboard">classement en cliquant ici</Link>.
      </p>
    </div>
  );
};

const EnigmaAlreadyFoundButNotSolved = ({
  enigma,
  onSolved,
}: {
  enigma: Enigma;
  onSolved: () => void;
}) => {
  return (
    <div>
      <h1>Bouhouhou !</h1>
      <p>Tu as déjà trouvé ce fantôme mais…</p>
      <Riddle enigma={enigma} onSolved={onSolved} />
      <p>
        Tu peux accéder au{" "}
        <Link to="/leaderboard">classement en cliquant ici</Link>.
      </p>
    </div>
  );
};

const EnigmaNeverFound = ({
  enigma,
  onSolved,
}: {
  enigma: Enigma;
  onSolved: () => void;
}) => {
  return (
    <div>
      <h1>Bravo !</h1>
      <h2>Tu as trouvé un fantôme !</h2>
      <FloatingGhost sizeFactor={4} />

      <Riddle enigma={enigma} onSolved={onSolved} />

      <p>
        Tu peux accéder au{" "}
        <Link to="/leaderboard">classement en cliquant ici</Link>.
      </p>
    </div>
  );
};
