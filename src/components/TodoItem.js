import React from "react";

function TodoItem({
  id,
  title,
  completed,
  setId,
  setTitle,
  setCompleted,
  deleteTodo,
  setIsEdit,
}) {
  const handleEdit = () => {
    setId(id);
    setTitle(title);
    setCompleted(completed);
    setIsEdit(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  return (
    <li id={id} className={completed ? "checked" : ""}>
      {title}
      <span className="update" onClick={handleEdit}>
        Edit
      </span>
      <span className="close" onClick={handleDelete}>
        Delete
      </span>
    </li>
  );
}

export default TodoItem;
