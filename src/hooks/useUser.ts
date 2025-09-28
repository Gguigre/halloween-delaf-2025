import { collection, doc, getDocs, setDoc } from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FirebaseCollections, useFirebase } from "./useFirebase";
import { POINTS_PER_GHOST } from "./useGhost";
import { POINTS_PER_ENIGMA, type EnigmaDTO } from "./useEnigma";
import { logEvent } from "firebase/analytics";

export type UserDTO = {
  name: string;
  id: string;
  ghosts: string[];
  enigmas: EnigmaDTO[];
};

export const totalScore = (user: UserDTO) => {
  const numberOfFoundGhosts = user.ghosts.length;
  const numberOfFoundEnigmas = user.enigmas.filter((e) => e.found).length;
  const numberOfSolvedEnigmas = user.enigmas.filter((e) => e.solved).length;

  return (
    numberOfFoundGhosts * POINTS_PER_GHOST +
    numberOfFoundEnigmas * POINTS_PER_GHOST +
    numberOfSolvedEnigmas * POINTS_PER_ENIGMA
  );
};

export const useUser = () => {
  const { firestore, analytics } = useFirebase();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserDTO | null>(null);

  const fetchUser = useCallback(async () => {
    let userName = localStorage.getItem("userName");
    if (!userName) {
      while (!userName) {
        userName = prompt("Enter your name")?.trim() || "";
      }
      const userId = uuidv4();
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
      const newUser = doc(firestore, FirebaseCollections.USERS, userId);
      await setDoc(newUser, { name: userName, ghosts: [], enigmas: [] });

      logEvent(analytics, "new_user", {
        user_name: userName,
        user_id: userId,
      });
    }
    const users = await getDocs(
      collection(firestore, FirebaseCollections.USERS)
    );
    const userDoc = users.docs.find((doc) => doc.data().name === userName);
    if (userDoc) {
      console.log(userDoc);
      setUser({ id: userDoc.id, ...userDoc.data() } as UserDTO);
    }
    setIsLoading(false);
  }, [firestore, analytics]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { isLoading, user };
};
