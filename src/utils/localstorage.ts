import { Preferences } from "@capacitor/preferences";

// keys ----------
export const LOCAL_KEY_ATTIVITA = "attivita";

// functions -----
export const setLocalstorageData = async (key: string, objectToSet: any) => {
  try {
    await Preferences.set({
      key: key,
      value: JSON.stringify(objectToSet),
    });
    return true;
  } catch (error) {
    console.error("setData() - error : ", error);
    return false;
  }
};

export const getLocalstorageData = async (key: string) => {
  try {
    const { value } = await Preferences.get({ key: key });
    return value;
  } catch (error) {
    console.error("getLocalstorageData() - error : ", error);
    return null;
  }
};
