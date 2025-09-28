import { useParams } from "react-router-dom";
import { FloatingGhost } from "../components/FloatingGhost";
import { useGhost } from "../hooks/useGhost";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Ghost = () => {
  const { user, isLoading } = useUser();
  const { ghostId } = useParams();
  const { isValidGhost, markAsFound } = useGhost(ghostId);

  useEffect(() => {
    if (user) {
      markAsFound(user);
    }
  }, [markAsFound, user]);

  console.log({ isValidGhost, ghostId, user });

  const loading = isLoading || !user;
  if (loading) {
    return <FloatingGhost />;
  }

  if (!isValidGhost || !ghostId) {
    return <GhostNotFound />;
  }

  const isAlreadyFound = user.ghosts.includes(ghostId);
  if (isAlreadyFound) {
    return <GhostAlreadyFound />;
  }

  return (
    <div>
      <h1>Bravo !</h1>
      <h2>Tu as trouvé un fantôme !</h2>
      <FloatingGhost sizeFactor={3} />
      <p>
        Tu peux accéder au{" "}
        <Link to="/leaderboard">classement en cliquant ici</Link>.
      </p>
    </div>
  );
};

const GhostNotFound = () => {
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

const GhostAlreadyFound = () => {
  return (
    <div>
      <h1>Bouhouhou !</h1>
      <h2>Tu as déjà trouvé ce fantôme !</h2>
      <FloatingGhost sizeFactor={3} />
      <p>
        Tu peux accéder au{" "}
        <Link to="/leaderboard">classement en cliquant ici</Link>.
      </p>
    </div>
  );
};
