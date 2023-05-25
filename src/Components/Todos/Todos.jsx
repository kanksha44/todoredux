import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos } from "../../redux/Reducer";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    // inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      props.updateTodo({ id, item: value });
      // inputRef.current.disabled = true;
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  console.log(props, "prop from store");
  return (
    <div className="addTodos">
      <input
        type="text"
        className="todo-input"
        value={todo}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => update(props.todos.id, inputRef.current.value, e)}
      />
      <button
        onClick={() =>
          props.addTodo({
            id: Math.floor(Math.random() * 1000),
            item: todo,
            completed: false,
          })
        }
      >
        Add
      </button>
      <br />

      <ul>
        {props.todos.map((item) => {
          return (
            <li key={item.id}>
              <textarea
                ref={inputRef}
                disabled={inputRef}
                defaultValue={item.item}
              ></textarea>

              <button onClick={() => changeFocus(item.id)}> Edit</button>
              <button onClick={() => props.removeTodo(item.id)}> Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
