// src/localStorage/user.storage.ts
import { LS_KEY_AUTH_TOKEN } from '../constants/storageKeys.const';
import { getLocalStorage, setLocalStorage } from '../services/localStorage.service';

async function getUserTokenFromLocalStorage() {
  try {
    const result = await getLocalStorage<string>(LS_KEY_AUTH_TOKEN);
    return result;
  } catch (error) {
    throw error;
  }
}

async function saveUserTokenToLocalStorage(token: string) {
  try {
    const result = await setLocalStorage(LS_KEY_AUTH_TOKEN, token);
    return result;
  } catch (error) {
    throw error;
  }
}

export const userLocalStorage = {
  getUserTokenFromLocalStorage,
  saveUserTokenToLocalStorage,
};
