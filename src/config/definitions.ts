export type Timer = {
  milliseconds: number;
  pomodoros: number;
  stage: PomodoroStages,
  text: string;
};

export type TimerInputs = {
  minutes: number;
  seconds: number;
}

export type TimerNumbers = {
  milliseconds: number;
  minutes: number;
  seconds: number;
}

export type TimerConfigForm = {
  task: TimerInputs
  short: TimerInputs
  long: TimerInputs
};

export type TimerConfig = {
  task: TimerNumbers
  short: TimerNumbers
  long: TimerNumbers
};

export type PomodoroStages = 'task' | 'short' | 'long'

export type TodoItemType = {
    id: number;
    text: string;
    checked: boolean;
  };

export type TimerStorage = {
  todoList: TodoItemType[],
  timerConfig: TimerConfig
}