import { DEFAULT_STORAGE } from "../config/constants";
import { TimerStorage } from "../config/definitions";

const TIME_STORAGE_KEY = "timerStorage";

export function createTimeStorage() {
  localStorage.setItem(TIME_STORAGE_KEY, JSON.stringify(DEFAULT_STORAGE));
}

export function getTimeStorage(): TimerStorage {
  const storage = localStorage.getItem(TIME_STORAGE_KEY);
  return storage ? JSON.parse(storage) : null;
}

export function insertIntoTimeStorage(item: Partial<TimerStorage>) {
    const storage = getTimeStorage()
    if(storage){
        localStorage.setItem(TIME_STORAGE_KEY, JSON.stringify({...storage, ...item}))
    }
}