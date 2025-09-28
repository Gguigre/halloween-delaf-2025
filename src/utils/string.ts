export const sanitize = (input: string) => {
  return input
    .trim()
    .toLowerCase() // Convertit tout en minuscules
    .normalize("NFD") // Sépare les lettres accentuées de leurs accents
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9]/g, ""); // Supprime tout ce qui n'est pas une lettre ou un chiffre
};
