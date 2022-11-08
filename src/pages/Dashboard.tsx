import { IonContent, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "../context/user";
import { FetchError } from "../utils/fetchJson";

const Dashboard = (): JSX.Element => {
  const user = useUserStore((state) => state.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      if (!user?.TokenInfo.Token) return;

      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/listdomains/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": user.TokenInfo.Token,
          },
        }
      );

      // Throw onError
      if (!res.ok) {
        throw new FetchError({ message: "Unauthorized", status: res.status });
      }

      const data = await res.json();
      return data;
    },
    enabled: !!user?.TokenInfo.Token,
  });

  console.log({ user, data, isLoading, isError });

  return (
    <IonPage>
      <IonContent>
        {isLoading || isError ? (
          <p>Loading... or something went wrong!</p>
        ) : data ? (
          <IonList>
            {data?.map((item: any, i: number) => (
              <IonItem key={i}>
                <IonLabel>{item?.Name}</IonLabel>
                <IonLabel>{item?.Description}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
