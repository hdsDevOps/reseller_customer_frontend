// localStorage.ts
// import CustomError from 'main/CustomError.class';
import CustomError from '../customClass/CustomError.class';
import {
  LOCAL_STORAGE_CLEAN_ERROR,
  LOCAL_STORAGE_READ_ERROR,
  LOCAL_STORAGE_WRITE_ERROR,
} from '../constants/localStorageError.const';

async function setLocalStorage<T>(key: string, data: T): Promise<void> {
  try {
    const parsedResult = typeof data === 'object' ? JSON.stringify(data) : String(data);
    localStorage.setItem(key, parsedResult);
  } catch (error: any) {
    throw new CustomError(LOCAL_STORAGE_WRITE_ERROR, error.message);
  }
}

async function getLocalStorage<T>(key: string): Promise<T | CustomError> {
  try {
    const result = localStorage.getItem(key);
    if (result === null) {
      throw new CustomError(LOCAL_STORAGE_READ_ERROR, `Getting 'null' from ${key}`);
    }
    return JSON.parse(result) as T;
  } catch (error: any) {
    throw new CustomError(LOCAL_STORAGE_READ_ERROR, error.message);
  }
}

async function clearLocalStorage(): Promise<void> {
  try {
    localStorage.clear();
  } catch (error: any) {
    throw new CustomError(LOCAL_STORAGE_CLEAN_ERROR, error.message);
  }
}

export { getLocalStorage, setLocalStorage, clearLocalStorage };
