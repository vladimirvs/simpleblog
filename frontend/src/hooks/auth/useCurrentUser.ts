import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { authService } from "../../services";
import { User } from "../../types/user";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    console.log("Getting user from cookies: "+currentUser);
    if (currentUser) {
      console.log("GOT user from cookies: "+currentUser);
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const refetchUser = async (userId: string) => {
    const userInfo = await authService.getMe(userId);
    const currentUser = Cookies.get("currentUser");
    let newUser;

    if (userInfo && currentUser) {
      newUser = {
        ...JSON.parse(currentUser),
        username: userInfo.username,
        avatar: userInfo.avatar,
        email: userInfo.email
      };
      Cookies.set("currentUser", JSON.stringify(newUser));
      setUser(newUser);
    }
    return newUser;
  };

  return { user, refetchUser };
};