import { collection, getDocs } from "@firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { FirebaseCollections, useFirebase } from "./useFirebase";
import type { UserDTO } from "./useUser";

export const useAllUsers = () => {
  const { firestore } = useFirebase();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<Array<UserDTO> | null>(null);

  const fetchUsers = useCallback(async () => {
    const users = await getDocs(
      collection(firestore, FirebaseCollections.USERS)
    );
    const usersData = users.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as UserDTO)
    );
    setUsers(usersData);
    setIsLoading(false);
  }, [firestore]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { isLoading, users };
};
