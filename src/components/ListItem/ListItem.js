import {useState} from "react";
import s from './ListItem.module.css';

export default function ListItem() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function addTodo() {
    const id = Math.random();

    const newTodo = {
      id,
      text: input,
      done: false
    }

    setItems([...items, newTodo]);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      addTodo(input);
    }
  }

  function handleRemove(id) {
    const index = items.findIndex((item) => item.id === id);
    const part1 = items.slice(0,index);
    const part2 = items.slice(index + 1);
    setItems([...part1, ...part2]);
  }

  function handleClickDone(todo) {
    const index = items.findIndex((item) => item.id === todo.id);
    const part1 = items.slice(0,index);
    const part2 = items.slice(index + 1);
    setItems([...part1, {...todo, done: true}, ...part2]);
  }

  return (
    <>
      <input
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        className={s.spaceBetween}
        onClick={addTodo}
      >
        Add
      </button>

      <ul className={s.root}>
        {items.map((todo) => (
          <div className={s.container}>
            <li
              key={todo.id}
              className={s.listPosition}
            >
              <span className={todo.done ? s.isDone : null}>{todo.text}</span>
              <button
                className={s.checkedButton}
                onClick={() => handleClickDone(todo)}
              >
                &#10004;
              </button>
              <button className={s.spaceBetween} onClick={() => handleRemove(todo.id)}>
                &#128465;
              </button>
            </li>
          </div>
        ))}
      </ul>
    </>
  )
}