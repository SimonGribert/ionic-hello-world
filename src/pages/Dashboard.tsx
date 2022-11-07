import { IonPage } from "@ionic/react";
import useUserStore from "../context/user";

const Dashboard = (): JSX.Element => {
  const user = useUserStore((state) => state.user);

  console.log({ user });
  return (
    <IonPage>
      <div>Dashboard</div>
    </IonPage>
  );
};

export default Dashboard;
