import { FloatingGhost } from "./FloatingGhost";

export const RetiredGhost = () => {
  return (
    <div>
      <h1>👻 Increvable, ce fantôme !</h1>
      <FloatingGhost sizeFactor={2} />
      <p>
        Il a survécu à toutes les traques depuis 2025, planqué quelque part
        dans le service.
      </p>
      <p>Trop tard pour marquer des points, la chasse est terminée depuis longtemps.</p>
      <p>
        Celui-ci, tu as carte blanche pour le décoller. Ceux de cette année,
        laisse-les où ils sont !
      </p>
      <p>
        Ramène-le à l'organisatrice du jeu et échange-le contre un bonbon 🍬
      </p>
    </div>
  );
};
