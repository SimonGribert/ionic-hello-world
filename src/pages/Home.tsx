import { Form, Field } from "react-final-form";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { useMutation } from "@tanstack/react-query";

interface onSubmitValues {
  username: string;
  password: string;
}

const Home = (): JSX.Element => {
  const { data, mutate } = useMutation({
    mutationFn: async (values: onSubmitValues) => {
      const res = await fetch("https://apitest.enegic.com/createtoken", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      return data;
    },
  });

  console.log(data);

  const onSubmit = (values: onSubmitValues): void => {
    mutate(values)
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonCard style={{ width: "420px" }}>
            <IonCardHeader>
              <IonCardTitle style={{ textAlign: "center" }}>Login</IonCardTitle>
              <IonCardSubtitle style={{ textAlign: "center" }}>
                Admin
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="username"
                      render={({ input }) => (
                        <IonItem>
                          <IonLabel position="stacked">Username</IonLabel>
                          <IonInput
                            name={input.name}
                            value={input.value}
                            onIonChange={input.onChange}
                          />
                        </IonItem>
                      )}
                    />
                    <Field
                      name="password"
                      render={({ input }) => (
                        <IonItem>
                          <IonLabel position="stacked">Password</IonLabel>
                          <IonInput
                            type="password"
                            name={input.name}
                            value={input.value}
                            onIonChange={input.onChange}
                          />
                        </IonItem>
                      )}
                    />
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "32px",
                      }}
                    >
                      <IonButton type="submit">Login</IonButton>
                    </div>
                  </form>
                )}
              />
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
