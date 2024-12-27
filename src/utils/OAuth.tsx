import React, { useState, useEffect } from "react";

interface OAuth2AccessResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

const useOAuth2Access = (clientId: string, clientSecret: string, scope: string): OAuth2AccessResponse | null => {
  const [accessToken, setAccessToken] = useState<any>(null);

  useEffect(() => {
    const getAccessToken = async () => {
      const authorizationURL = new URL("https://oauth2.example.com/authorize");
      authorizationURL.searchParams.append("client_id", clientId);
      authorizationURL.searchParams.append("client_secret", clientSecret);
      authorizationURL.searchParams.append("scope", scope);

      const popup = window.open(authorizationURL.toString(), "_blank", "width=600,height=400");

      const listenForPopupMessage = async () => {
        const message: any = await popup!.postMessage("hello");

        if (message.type === "auth_code") {
          const authCode = message.data;

          const tokenResponse = await fetch("https://oauth2.example.com/token", {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=authorization_code&code=${authCode}`,
          });

          const tokenResponseData = await tokenResponse.json();

          setAccessToken(tokenResponseData?.access_token);

          popup!.close();
        }
      };

      window.addEventListener("message", listenForPopupMessage);

      return () => {
        window.removeEventListener("message", listenForPopupMessage);
      };
    };

    getAccessToken();
  }, []);

  return accessToken;
};

export default useOAuth2Access;
