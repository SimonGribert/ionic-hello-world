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
import { useHistory } from "react-router";
import useUserStore, { UserType } from "../context/user";
import { FetchError } from "../utils/fetchJson";

interface onSubmitValues {
  username: string;
  password: string;
}

const Home = (): JSX.Element => {
  let history = useHistory();
  const authenticate = useUserStore((state) => state.authenticate);

  const { data, isError, error, mutateAsync } = useMutation({
    mutationFn: async (values: onSubmitValues) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/createtoken`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      // Throw onError
      if (!res.ok) {
        throw new FetchError({ message: "Unauthorized", status: res.status });
      }

      const data = await res.json();

      return {
        ...data,
        UserLogin: { Username: values.username, Password: values.password },
      };
    },
    onSuccess: (data: UserType) => {
      console.log({ message: "Success", data });
      authenticate(data);
      history.push("/dashboard/");
    },
    onError: (error) => {
      console.log({ message: "Error", error });
    },
  });

  console.log(data, isError, error, "Hello");

  const onSubmit = async (values: onSubmitValues): Promise<void> => {
    await mutateAsync(values);
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
                    {error instanceof FetchError && <p>{error.message}</p>}
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
