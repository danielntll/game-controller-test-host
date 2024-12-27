import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
} from "@ionic/react";
import { text } from "./text";

import styles from "./LoginPage.module.css";

import { lockOpenOutline, logInOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { useContextLanguage } from "../../context/contextLanguage";
import { useAuthContext } from "../../context/auth/contextAuth";
import { useContextToast } from "../../context/systemEvents/contextToast";
import { route_RegistrazionePage } from "../../routes/singleRoute";

const LoginPage: React.FC = () => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { auth } = useAuthContext();
  const history = useHistory();
  const { toast } = useContextToast();
  //CONDITIONS -----------------------
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //FUNCTIONS ------------------------
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      toast("danger", text[l].error__login);
    }
  };

  const submitForgotPassword = async () => {
    if (email.length < 1) {
      toast("danger", text[l].error_forgot_no_email);
    } else {
      try {
        await sendPasswordResetEmail(auth, email);
        toast("success", text[l].success_forgot, 3000);
      } catch (error) {
        toast("danger", text[l].error_forgot_generic);
      }
    }
  };

  const handleGoToRegistrazione = () => {
    history.push(route_RegistrazionePage.path);
  };

  const handleForgotPassword = () => {
    setIsModalRecuperaOpen(true);
  };

  const openTutorial = () => {
    setIsModalTutorialOpen(true);
  };

  // EXTRA UI ------------------------
  // Modale recupera password
  const [isModalRecuperaOpen, setIsModalRecuperaOpen] =
    useState<boolean>(false);
  const [isModalTutorialOpen, setIsModalTutorialOpen] =
    useState<boolean>(false);
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content}>
          <div className={styles.container__login}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{text[l].pageTitle}</IonCardTitle>
                <IonCardSubtitle></IonCardSubtitle>
              </IonCardHeader>

              <form id="form_do_login" onSubmit={handleLogin}>
                <IonList inset>
                  <IonItem>
                    <IonInput
                      id="input_form_do_login"
                      name="input_form_do_login"
                      required
                      clearInput
                      label={text[l].input__email.label}
                      labelPlacement="stacked"
                      type="email"
                      placeholder={text[l].input__email.ph}
                      value={email}
                      onIonInput={(e) => {
                        setEmail(e.detail.value!);
                      }}
                    />
                  </IonItem>
                  <IonItem>
                    <IonInput
                      required
                      id="input_form_do_login_password"
                      name="input_form_do_login_password"
                      clearInput
                      label={text[l].input__password.label}
                      placeholder={text[l].input__password.ph}
                      labelPlacement="stacked"
                      type="password"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                    />
                  </IonItem>
                </IonList>
                <div className="ion-padding-horizontal ion-padding-top">
                  <IonButton
                    expand="block"
                    type="submit"
                    id="form_do_login_btn"
                  >
                    {text[l].btn__login}
                    <IonIcon icon={logInOutline} className="icon-margin-left" />
                  </IonButton>
                </div>
              </form>
              <div className="ion-margin-vertical">
                <IonButton
                  fill="clear"
                  expand="block"
                  color={"medium"}
                  onClick={handleForgotPassword}
                >
                  {text[l].pswForgot}
                </IonButton>
              </div>
            </IonCard>
            <div className="ion-padding-horizontal">
              <IonButton onClick={() => handleGoToRegistrazione()}>
                {text[l].btn__registrazione}
              </IonButton>
            </div>
          </div>
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
        {/* Modale recupera password */}
        <IonModal
          isOpen={isModalRecuperaOpen}
          initialBreakpoint={0.5}
          breakpoints={[0.5, 0.75, 0.9]}
          onDidDismiss={() => setIsModalRecuperaOpen(false)}
        >
          <IonContent>
            <IonLabel>
              <h2 className={"forgotTitle"}>{text[l].forgot_title}</h2>
            </IonLabel>
            <IonList inset>
              <IonItem>
                <IonInput
                  id="input_forgot_password"
                  name="input_forgot_password"
                  required
                  clearInput
                  label={text[l].input__email.label}
                  labelPlacement="stacked"
                  type="email"
                  placeholder={text[l].input__email.ph}
                  value={email}
                  onIonInput={(e) => setEmail(e.detail.value!)}
                />
              </IonItem>
            </IonList>
            <IonLabel>
              <p className="ion-padding-horizontal">
                {text[l].forgot_tutorial}
              </p>
            </IonLabel>
            <div className="ion-padding">
              <IonButton
                fill="solid"
                type="submit"
                color={"primary"}
                expand="block"
                onClick={submitForgotPassword}
              >
                {text[l].btn__forgot}
                <IonIcon icon={lockOpenOutline} className="icon-margin-left" />
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
