import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";

export type typeRoute<TPath extends string = string> = {
  path: TPath; // Path template (e.g., "/users/:userId/posts/:postId")
  pathBase?: string;
  tab: typeAvailableLanguagesModel;
  icons: {
    active: string;
    notActive: string;
  };
  getPath?: (params: PathParams<TPath>) => string;
};

type PathParams<T> = T extends `${string}:${infer Param}/${infer Rest}`
  ? Record<Param, string> & PathParams<Rest>
  : T extends `${string}:${infer Param}`
  ? Record<Param, string>
  : {};
