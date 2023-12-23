import {useState, useReducer} from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

const initialTasks = [];
let setId = 0;

function tasksReducer(state, action) {
  switch(action.type) {
    case "create": {
      state.push({
        id: action.id,
        text: action.text,
        done: false,
        edit: false
      });
      break;
    }
    case "delete": {
      return state.filter(t => t.id !== action.id);
    }
    case "done": {
      const toggle = state.find(t => t.id === action.id);
      toggle.done = !toggle.done;
      break;
    }
    case "edit": {
      const toggle = state.find(t => t.id === action.id);
      toggle.edit = !toggle.edit;
      break;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const toggleDone = taskId => {
    dispatch({
      type: "done",
      id: taskId
    });
  };

  const editTask = taskId => {
    dispatch({
      type: "edit",
      id: taskId
    });
  };

  const addTask = e => {
    e.preventDefault();

    dispatch({
      type: "create",
      id: setId++,
      text: ""
    });
  };

  const deleteTask = taskId => {
    dispatch({
      type: "delete",
      id: taskId
    });
  };

  const [form, setForm] = useState({
    text: ""
  });


  const handleChange = e => {
    const {name, value} = e.target;

    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value
      };
    });
  };

  const pendingTasks = tasks.filter(t => !t.done).map(task => {
    return (
      <Task
      text={task.text}
      taskId={task.id}
      done={task.done}
      edit={task.edit}
      editTask={editTask}
      toggleDone={toggleDone}
      deleteTask={deleteTask}
      />
    );
  });

  const completedTasks = tasks.filter(t => t.done).map(task => {
    return (
      <Task
      text={task.text}
      taskId={task.id}
      done={task.done}
      edit={task.edit}
      editTask={editTask}
      toggleDone={toggleDone}
      deleteTask={deleteTask}
      />
    );
  });

  return (
    <div>
      <AddTask
      text={form.text}
      addTask={addTask}
      handleChange={handleChange}
      />
      <div>
        <h1>Pending</h1>
        {pendingTasks}
      </div>
      <div>
        <h1>Completed</h1>
        {completedTasks}
      </div>
    </div>
  )
};



export default App;