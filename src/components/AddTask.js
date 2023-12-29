function AddTask(props) {
  return (
    <div id="form-container">
      <form id="form">
        <input name="text" id="text" type="text" value={props.text} placeholder="Add task" onChange={props.handleChange}/>
        <button id="add-task" onClick={props.addTask}>Add task</button>
      </form>
    </div>
  );
};

export default AddTask;