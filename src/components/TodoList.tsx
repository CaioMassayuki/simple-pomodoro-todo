import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import TodoItem from "./TodoItem";
import { TodoItemType } from "../config/definitions";
import { insertIntoTimeStorage } from "../utils/timerStorage";

function TodoList({ items }: { items: TodoItemType[] }) {
  const [todoList, setTodoList] = useState<TodoItemType[]>(items ?? []);
  const todoInputRef = useRef<HTMLInputElement | null>(null);

  const addTodoItem = () => {
    if (todoInputRef.current) {
      const newTodoList: TodoItemType[] = [
        ...todoList,
        {
          id: uuid(),
          text: todoInputRef.current.value,
          checked: false,
        },
      ];
      setTodoList(newTodoList);
      todoInputRef.current.value = "";
    }
  };

  const handleCheck = (id: string) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemDelete = (id: string) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  useEffect(() => {
    insertIntoTimeStorage({ todoList });
  }, [todoList]);

  return (
    <section className="border w-8/12 p-4 my-4 flex flex-col items-center">
      <h2 className="text-5xl">TODO</h2>
      <input
        ref={todoInputRef}
        className="border w-96 px-2 my-4 bg-transparent"
        placeholder="Type a task and press Enter"
        onKeyDown={(e) => {
          if (e.code === "Enter") addTodoItem();
        }}
      />
      <ul className="flex flex-col w-full">
        {todoList.map((item, index) => (
          <TodoItem
            key={`todo-${index}-${item.text.slice(0, 3)}`}
            handleDelete={() => handleTodoItemDelete(item.id)}
            handleCheck={() => handleCheck(item.id)}
            checked={item.checked}
          >
            {item.text}
          </TodoItem>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
