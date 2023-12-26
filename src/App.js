import {useState} from "react";
import {useImmerReducer} from "use-immer";
import AddTask from "./components/AddTask";
import Task from "./components/Task";

let setId = 0;
const initialTasks = [];


function taskReducer(draft, action) {
  switch(action.type) {
    case "create": {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
        edit: false
      });
      break;
    }
    case "done": {
      const toggle = draft.find(t => t.id === action.id)
      toggle.done = !toggle.done;
      break;
    }
    case "edit": {
      const toggle = draft.find(t => t.id === action.id)
      toggle.edit = !toggle.edit;
      break;
    }
    case "delete": {
      return draft.filter(t => t.id !== action.id);
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};

  

function App() {
  const [tasks, dispatch] = useImmerReducer(taskReducer, initialTasks);

  const [form, setForm] = useState({
    text: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value
      };
    });
  };

  // const [editForm, setEditForm] = useState({
  //   editText: ""
  // });

  // const handleEditChange = (e) => {
  //   const {name, value} = e.target;

  //   setEditForm(prevForm => {
  //     return {
  //       ...prevForm,
  //       [name]: value
  //     };
  //   });
  // };

  const addTask = (e) => {
    e.preventDefault();

    dispatch({
      type: "create",
      id: setId++,
      text: form.text
    });

    setForm(prevForm => {
      return {
        ...prevForm,
        text: "",
      };
    });
  };

  const toggleDone = (taskId) => {
    dispatch({
      type: "done",
      id: taskId
    });
  };

  const deleteTask = (taskId) => {
    const answer = window.confirm('Do you want to proceed with this action?');
    if(answer) {
      dispatch({
        type: "delete",
        id: taskId
      });
    };
  };

  const editTask = (taskId) => {
    dispatch({
      type: "edit",
      id: taskId
    });
  };

  const allTasks = tasks.map(task => {
    return (
      <Task
      key={task.id}
      taskId={task.id}
      text={task.text}
      done={task.done}
      edit={task.edit}
      editTask={editTask}
      toggleDone={toggleDone}
      deleteTask={deleteTask}
      /> 
    );
  });

  // const pendingTasks = tasks.map(task => {
  //   return !task.done ? 
  //   <PendingTask
  //   key={task.id}
  //   taskId={task.id}
  //   text={task.text}
  //   done={task.done}
  //   edit={task.edit}
  //   editTask={editTask}
  //   toggleDone={toggleDone}
  //   deleteTask={deleteTask}
  //   /> :
  //   "";
  // });

  // const completedTasks = tasks.map(task => {
  //   return task.done ? 
  //   <PendingTask
  //   key={task.id}
  //   taskId={task.id}
  //   text={task.text}
  //   done={task.done}
  //   edit={task.edit}
  //   editTask={editTask}
  //   toggleDone={toggleDone}
  //   deleteTask={deleteTask}
  //   /> :
  //   "";
  // });

  return (
    <div id="app">
      <h1 id="heading">To-do List</h1>
      <AddTask
      text={form.text}
      handleChange={handleChange}
      addTask={addTask}
      />

      <div id="all-tasks-container">
        {allTasks}
      </div>
    </div>
  );
}

export default App;
