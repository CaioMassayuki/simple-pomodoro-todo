import { ReactNode } from "react";

function TodoItem({
  children,
  handleDelete,
  handleCheck,
  checked,
}: //   handleEdit,
{
  children: ReactNode;
  handleDelete: Function;
  handleEdit?: Function;
  handleCheck: Function;
  checked: boolean;
}) {
  return (
    <li className="w-full p-1 flex items-start border-b">
      <input
        className="mr-1 size-6"
        type="checkbox"
        defaultChecked={checked}
        onClick={() => handleCheck()}
      />
      <p className="w-full">{checked ? <s>{children}</s> : children}</p>
      <div className="grid grid-flow-col gap-1">
        {/* <button className="size-9 rounded-md border">EDIT</button> */}
        <button
          className="size-6 rounded-md border border-red-600"
          onClick={() => handleDelete()}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
