import { TimerConfig, TimerStorage } from "./definitions";

export const DEFAULT_TIMER_CONFIG: TimerConfig = {
  task: {
    milliseconds: 900000,
    minutes: 15,
    seconds: 0,
  },
  short: {
    milliseconds: 300000,
    minutes: 5,
    seconds: 0,
  },
  long: {
    milliseconds: 600000,
    minutes: 10,
    seconds: 0,
  },
};

export const DEFAULT_STORAGE: TimerStorage = {
  todoList: [],
  timerConfig: DEFAULT_TIMER_CONFIG,
};
