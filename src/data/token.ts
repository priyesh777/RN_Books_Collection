import * as SecureStore from "expo-secure-store";

export const setToken = (token: string) => {
  return SecureStore.setItemAsync("token", token);
};

export const getToken = () => {
  return SecureStore.getItemAsync("token");
};
