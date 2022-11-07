import { useQuery } from "@tanstack/react-query";
import { useHistory, useLocation } from "react-router";
import useUserStore from "./user";

const twentyMinutesInMs = 20 * 60 * 1000;

const Refresh = (): JSX.Element => {
  const user = useUserStore();
  const history = useHistory();
  const location = useLocation()

  useQuery({
    queryKey: ["refetch"],
    queryFn: async () => {
      if (!user.isAuthenticated) {
        console.log("User is not authenticated");
        if (location.pathname !== "/") history.push("/")
        return null;
      }

      const now = new Date();
      const validTo = new Date(user.user?.TokenInfo.ValidTo || "");

      if (now > validTo) {
        console.log("Users Token expired");
        history.push("/");
        return null;
      }

      const timeLeft = validTo.getTime() - now.getTime();

      if (timeLeft > twentyMinutesInMs) {
        console.log("Users Token is still valid");
        return null;
      }

      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/refreshtoken`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.user?.UserLogin.Username,
            password: user.user?.UserLogin.Password,
            token: user.user?.TokenInfo.Token,
          }),
        }
      );

      // Throw onError
      if (!res.ok) {
        console.log("Could not refresh token");
        return null;
      }

      const data = await res.json();

      console.log("New token: " + JSON.stringify(data));

      return { ...user.user, ...data };
    },
    onSuccess: async (data) => {
      if (!data) return;

      console.log("Success");
      user.authenticate(data);
    },
    retry: false,
    retryOnMount: false,
    //staleTime: 15 * 60 * 1000,
    cacheTime: 0,
    refetchInterval: 5 * 1000,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

  });

  return <></>;
};

export default Refresh;
