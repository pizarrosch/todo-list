import {useState} from "react";
import s from './ListItem.module.css';
import cx from 'classnames';

export default function ListItem() {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [hideDoneItem, setHideDoneItems] = useState(false);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function addTodo() {
    const id = Math.random();

    const newTodo = {
      id,
      text: input,
      done: false,
      time: new Date(),
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
    const part1 = items.slice(0, index);
    const part2 = items.slice(index + 1);
    setItems([...part1, ...part2]);
  }

  function handleClickDone(todo) {
    const index = items.findIndex((item) => item.id === todo.id);
    const part1 = items.slice(0, index);
    const part2 = items.slice(index + 1);

    setItems([...part1, {...todo, done: true}, ...part2]);

    if (todo.done === true) {
      setItems([...part1, {...todo, done: false}, ...part2]);
    }
  }

  return (
    <>
      <input
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={100}
      />

      <button className={s.addButton} onClick={addTodo}>
        Add
      </button>

      <ul className={s.root}>
        {items
          .filter(item => {
            if (hideDoneItem) return !item.done;
            return true;
          })
          .map((todo) => (
            <li
              key={todo.id}
              className={s.listPosition}
            >
              {todo.time.toLocaleString('de', {timeStyle: 'medium'})}
              <div className={cx(
                s.container,
                todo.done ? s.isDone : null
              )}              >
                <span className={s.text}>{todo.text}</span>
              </div>
              <button
                className={s.button}
                onClick={() => handleClickDone(todo)}
              >
                ✔
              </button>
              <button
                className={s.button}
                onClick={() => handleRemove(todo.id)}
              >
                🗑
              </button>
            </li>
          ))}
      </ul>
      {items.length > 0 && (
        <button onClick={() => setHideDoneItems(!hideDoneItem)}>
          {hideDoneItem ? 'Show done' : 'Hide done'}
        </button>
      )}
    </>
  )
}