import ListItem from "../ListItem/ListItem";

export default function ToDoList(props) {
  return (
    <>
      <p>{props.title}</p>
      <ListItem/>
    </>
  )
}