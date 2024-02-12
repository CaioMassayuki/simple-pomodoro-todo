import Timer from "./components/Timer";
import TodoList from "./components/TodoList";
import { createTimeStorage, getTimeStorage } from "./utils/timerStorage";
import { DEFAULT_STORAGE } from "./config/constants";

function App() {
  const storage = getTimeStorage() ?? DEFAULT_STORAGE;
  if (!getTimeStorage()) {
    createTimeStorage();
  }
  return (
    <main className="w-screen h-screen text-white bg-neutral-800 p-12 flex justify-center">
      <TodoList items={storage.todoList} />
      <Timer storageTimeConfig={storage.timerConfig} />
    </main>
  );
}

export default App;
