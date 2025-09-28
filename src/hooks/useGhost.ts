import { doc, setDoc } from "@firebase/firestore";
import ghosts from "../assets/ghosts.json";
import { FirebaseCollections, useFirebase } from "./useFirebase";
import { type UserDTO } from "./useUser";
import { logEvent } from "firebase/analytics";

export const POINTS_PER_GHOST = 10;

export const useGhost = (ghostId?: string) => {
  const isValidGhost = ghosts.includes(ghostId as string);
  const { firestore, analytics } = useFirebase();

  const markAsFound = (user: UserDTO) => {
    if (!isValidGhost) return false;

    // Mark the ghost as found in the database
    if (!user.ghosts.includes(ghostId as string)) {
      setDoc(doc(firestore, FirebaseCollections.USERS, user.id), {
        ...user,
        ghosts: [...user.ghosts, ghostId as string],
      });

      logEvent(analytics, "ghost_found", {
        user_name: user.name,
        user_id: user.id,
        ghost_id: ghostId,
      });

      return true;
    }
    return false;
  };

  return { isValidGhost, markAsFound };
};
