import {
  PomodoroStages,
  Timer,
  TimerConfig,
  TimerConfigForm,
  TimerNumbers,
} from "../config/definitions";
import {
  millisecondsToTimerText,
  minutesToMilliseconds,
  secondsToMilliseconds,
} from "../utils/millisecondParse";

export function formToConfig(timerForm: TimerConfigForm): TimerConfig {
  const newConfig: TimerConfig = {
    task: {
      seconds: timerForm.task.seconds,
      minutes: timerForm.task.minutes,
      milliseconds:
        minutesToMilliseconds(timerForm.task.minutes) +
        secondsToMilliseconds(timerForm.task.seconds),
    },
    short: {
      seconds: timerForm.short.seconds,
      minutes: timerForm.short.minutes,
      milliseconds:
        minutesToMilliseconds(timerForm.short.minutes) +
        secondsToMilliseconds(timerForm.short.seconds),
    },
    long: {
      seconds: timerForm.long.seconds,
      minutes: timerForm.long.minutes,
      milliseconds:
        minutesToMilliseconds(timerForm.long.minutes) +
        secondsToMilliseconds(timerForm.long.seconds),
    },
  };
  return newConfig;
}

export function configToTimer(
  milliseconds: number,
  pomodoros: number,
  stage: PomodoroStages
): Timer {
  return {
    stage,
    pomodoros,
    milliseconds: milliseconds,
    text: millisecondsToTimerText(milliseconds),
  };
}
