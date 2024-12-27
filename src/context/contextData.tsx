import React, { useContext, useEffect, useState } from "react";
import { ContextLanguage, useContextLanguage } from "./contextLanguage";
import { ContextToast, useContextToast } from "./systemEvents/contextToast";
import { useAuthContext } from "./auth/contextAuth";

type dataContext = {};

export const DataContext = React.createContext<dataContext>({});

export const useDataContext = () => React.useContext(DataContext);

export const DataContextProvider = ({ children }: any) => {
  // VARIABLES ------------------------------
  const { l } = useContextLanguage();
  const { authenticateUser } = useAuthContext();
  const { toast } = useContextToast();
  // USE STATE -----------------------------

  // USE EFFECT ------------------------------
  useEffect(() => {
    if (authenticateUser !== undefined) {
      initData();
    }
  }, [authenticateUser]);
  // FUNCTIONS ------------------------------

  // ---  initData
  /**
   *
   */
  const initData = async () => {};

  // RETURN ---------------------------------
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
