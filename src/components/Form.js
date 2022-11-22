import React from "react";

function Form({
  id,
  title,
  completed,
  setId,
  setTitle,
  setCompleted,
  addTodo,
  editTodo,
  isEdit,
  setIsEdit,
}) {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      editTodo(id, title, completed);
      setIsEdit(false);
    } else {
      addTodo(title, completed);
    }
    setId(0);
    setTitle("");
    setCompleted(false);
  };

  return (
    <form>
      <input
        type="text"
        id="myInput"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
      />
      <select
        value={completed}
        onChange={(e) => {
          "true" === e.target.value ? setCompleted(true) : setCompleted(false);
        }}
        name="completed"
      >
        <option disabled>Status</option>
        <option value="false">False</option>
        <option value="true">True</option>
      </select>
      <span className="addBtn" onClick={handleOnSubmit}>
        {isEdit ? "Update" : "Add"}
      </span>
    </form>
  );
}

export default Form;
