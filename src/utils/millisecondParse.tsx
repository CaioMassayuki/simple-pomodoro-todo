export function millisecondsToTimerText(milliseconds: number): string {
  const timerMinutes = Math.floor(
    (milliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const timerSeconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const minutes = `${timerMinutes < 10 ? "0" + timerMinutes : timerMinutes}`;
  const seconds = `${timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}`;
  return `${minutes}:${seconds}`;
}

export function minutesToMilliseconds(minutes: number): number {
  return minutes * (60 * 1000);
}

export function secondsToMilliseconds(seconds: number): number {
  return seconds * 1000;
}
