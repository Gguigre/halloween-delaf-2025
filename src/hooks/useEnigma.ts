import { doc, setDoc } from "@firebase/firestore";
import { logEvent } from "firebase/analytics";
import enigmas from "../assets/enigmas.json";
import { FirebaseCollections, useFirebase } from "./useFirebase";
import { useUser } from "./useUser";

export const POINTS_PER_ENIGMA = 10;

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

  const { user } = useUser();

  const markAsFound = () => {
    if (!isValidEnigma) return false;
    if (!user) return false;

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

  const markAsSolved = () => {
    if (!isValidEnigma) return false;
    if (!user) return false;

    console.log(
      "Marking enigma as solved",
      enigmaId,
      "for user",
      user.id,
      user
    );
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
