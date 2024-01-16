import { createContext, useContext, useEffect, useState } from "react";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const response = await fetch("http://localhost:8080/profile", {
      credentials: "include",
    });
    const data = await response.json();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};
