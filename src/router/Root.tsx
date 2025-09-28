import "./root.css";
import { useUser } from "../hooks/useUser";
import { FloatingGhost } from "../components/FloatingGhost";

export const Root = () => {
  useUser();

  return (
    <div>
      <h1>Bouh !</h1>
      <p>
        <span>Pour gagner un maximum de points, trouve tous les fantômes…</span>
        <br />
        <span>
          Certains sont accompagnés d'une énigme pour te faire gagner encore
          plus de points !
        </span>
      </p>
      <p>
        <span>
          Tu peux accéder au <a href="/leaderboard">classement ici</a>.
        </span>
      </p>
      <FloatingGhost sizeFactor={2} />
    </div>
  );
};
