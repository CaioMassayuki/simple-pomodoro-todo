import { TimerInputs } from "../config/definitions";

function TimerFormItem({
  title,
  time,
  handleTimerForm,
}: {
  title: string;
  time: TimerInputs
  handleTimerForm: Function;
}) {
  return (
    <div className="flex flex-col">
      <p className="text-center">{title}</p>
      <div className="flex items-center border rounded-md">
        <input
          className="w-24 h-10 text-center px-2 bg-transparent"
          value={time.minutes}
          placeholder="Minutes"
          type="number"
          onChange={(e) => {
            let parsedTime = parseInt(e.target.value);
            if (parsedTime < 0) {
              parsedTime = 0;
            } else if (parsedTime > 59) {
              parsedTime = 59;
            }
            handleTimerForm({ ...time, minutes: parsedTime });
          }}
        />
        :
        <input
          className="w-24 h-10 text-center px-2 bg-transparent"
          value={time.seconds}
          placeholder="Seconds"
          type="number"
          onChange={(e) => {
            let parsedTime = parseInt(e.target.value);
            if (parsedTime < 0) {
              parsedTime = 0;
            } else if (parsedTime > 59) {
              parsedTime = 59;
            }
            handleTimerForm({ ...time, seconds: parsedTime });
          }}
        />
      </div>
    </div>
  );
}

export default TimerFormItem;
