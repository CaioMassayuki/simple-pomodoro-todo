import { useEffect, useState } from "react";
import TimerFormItem from "./TimerFormItem";
import {
  PomodoroStages,
  Timer,
  TimerConfig,
  TimerConfigForm,
  TimerInputs,
} from "../config/definitions";
import Bonk from "../assets/Bonk.mp3";
import ByTheEmperor from "../assets/ByTheEmperor.mp3";
import Yippie from "../assets/Yippie.mp3";
import { configToTimer, formToConfig } from "../adapter/timer";
import clsx from "clsx";
import { insertIntoTimeStorage } from "../utils/timerStorage";

const taskAudio = new Audio(ByTheEmperor);
const shortRestAudio = new Audio(Bonk);
const longRestAudio = new Audio(Yippie);

function TimerComponent({
  storageTimeConfig,
}: {
  storageTimeConfig: TimerConfig;
}) {
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>(
    configToTimer(storageTimeConfig.task.milliseconds, 0, "task")
  );
  const [timerForm, setTimerForm] =
    useState<TimerConfigForm>(storageTimeConfig);

  const [timerConfig, setTimerConfig] =
    useState<TimerConfig>(storageTimeConfig);

  const handleTimerFormChange = (
    type: PomodoroStages,
    changes: TimerInputs
  ) => {
    setTimerForm({
      ...timerForm,
      [type]: { ...timerForm[type], ...changes },
    });
  };

  const switchTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (resetConfig: TimerConfig = timerConfig) => {
    setIsTimerRunning(false);
    setTimer(configToTimer(resetConfig.task.milliseconds, 0, "task"));
  };

  const handleTimerConfigSave = () => {
    setTimerConfig(formToConfig(timerForm));
    resetTimer(formToConfig(timerForm));
  };

  const nextPomodoro = () => {
    let countPomodoro = timer.pomodoros;
    let nextStage = "task";
    if (timer.stage === "task" && timer.pomodoros === 3) {
      nextStage = "long";
      countPomodoro = 0;
    } else if (timer.stage === "task") {
      nextStage = "short";
      countPomodoro += 1;
    }
    switch (nextStage) {
      case "task":
        taskAudio.play();
        break;
      case "short":
        shortRestAudio.play();
        break;
      case "long":
        longRestAudio.play();
        break;
      default:
        return;
    }
    setTimer(
      configToTimer(
        timerConfig[nextStage].milliseconds,
        countPomodoro,
        nextStage
      )
    );
  };

  const tickTimer = () => {
    const timeoutId = setTimeout(() => {
      setTimer((prevTimer) => {
        const timerMilli = prevTimer.milliseconds - 1000;
        return configToTimer(timerMilli, prevTimer.pomodoros, prevTimer.stage);
      });
    }, 1000);
    return timeoutId;
  };

  useEffect(() => {
    insertIntoTimeStorage({ timerConfig });
  }, [timerConfig]);

  useEffect(() => {
    let timeoutId: number | null = null;
    if (timer.milliseconds < 0) {
      nextPomodoro();
    }
    if (isTimerRunning && timer.milliseconds > -1000) {
      timeoutId = tickTimer();
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timer, isTimerRunning]);

  return (
    <section className="border w-4/12 p-4 my-4 flex flex-col items-center">
      <p
        className={clsx("text-lg font-semibold", {
          "text-blue-500": timer.stage === "long",
          "text-green-500": timer.stage === "short",
        })}
      >
        {timer.stage.toUpperCase()}
      </p>
      <h1
        className={clsx("text-8xl", {
          "text-blue-500": timer.stage === "long",
          "text-green-500": timer.stage === "short",
        })}
      >
        {timer.text}
      </h1>
      <p className="text-lg">Pomodoros: {timer.pomodoros}</p>
      <div className="flex my-2">
        <button className="w-24 h-8 border-2 rounded-md" onClick={switchTimer}>
          {`${isTimerRunning ? "Pause" : "Play"}`}
        </button>
        <button
          className="w-24 h-8 border-2 rounded-md"
          onClick={() => resetTimer()}
        >
          Reset
        </button>
      </div>
      <form className="grid grid-flow-row gap-2">
        <TimerFormItem
          title="Task Time:"
          time={timerForm.task}
          handleTimerForm={(changes: TimerInputs) =>
            handleTimerFormChange("task", changes)
          }
        />
        <TimerFormItem
          title="Short Break Time:"
          time={timerForm.short}
          handleTimerForm={(changes: TimerInputs) =>
            handleTimerFormChange("short", changes)
          }
        />
        <TimerFormItem
          title="Long Break Time:"
          time={timerForm.long}
          handleTimerForm={(changes: TimerInputs) =>
            handleTimerFormChange("long", changes)
          }
        />
        <button
          className="w-24 h-8 ml-auto border border-green-500 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            handleTimerConfigSave();
          }}
        >
          Save
        </button>
      </form>
    </section>
  );
}

export default TimerComponent;
