import { doc, setDoc } from "@firebase/firestore";
import enigmas from "../assets/enigmas.json";
import { FirebaseCollections, useFirebase } from "./useFirebase";
import { type UserDTO } from "./useUser";
import { logEvent } from "firebase/analytics";

export const POINTS_PER_ENIGMA = 25;

export type EnigmaDTO = {
  id: string;
  found: boolean;
  solved: boolean;
};

export type Enigma = {
  id: string;
  question: string;
  answer: string;
};

export const useEnigma = (enigmaId?: string) => {
  const enigma = enigmas.find((e) => e.id === enigmaId);
  const isValidEnigma = !!enigma;
  const { firestore, analytics } = useFirebase();

  const markAsFound = (user: UserDTO) => {
    if (!isValidEnigma) return false;

    const userEnigma = user.enigmas.find((e) => e.id === enigmaId);
    if (userEnigma) return false;

    setDoc(doc(firestore, FirebaseCollections.USERS, user.id), {
      ...user,
      enigmas: [
        ...user.enigmas,
        {
          id: enigmaId as string,
          found: true,
          solved: false,
        },
      ],
    });

    logEvent(analytics, "enigma_found", {
      user_name: user.name,
      user_id: user.id,
      enigma_id: enigmaId,
    });

    return true;
  };

  const markAsSolved = (user: UserDTO) => {
    if (!isValidEnigma) return false;

    setDoc(doc(firestore, FirebaseCollections.USERS, user.id), {
      ...user,
      enigmas: user.enigmas.map((e) =>
        e.id === enigmaId ? { ...e, solved: true, found: true } : e
      ),
    });

    logEvent(analytics, "enigma_solved", {
      user_name: user.name,
      user_id: user.id,
      enigma_id: enigmaId,
    });

    return true;
  };

  return { enigma, markAsFound, markAsSolved };
};
