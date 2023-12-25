import {useState, useReducer} from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

const initialTasks = [];
let setId = 0;

function tasksReducer(tasks, action) {
  switch(action.type) {
    case "create": {
      return [
        ...tasks, {
          id: action.id,
          text: action.text,
          done: false,
          edit: false
        }
      ];
    }
    case "delete": {
      return tasks.filter(t => t.id !== action.id);
    }
    case "done": {
      return tasks.map(task => {
        return task.id === action.id ? {...task, done: !task.done} : task;
      });
    }
    case "edit": {
      return tasks.map(task => {
        return task.id === action.id ? {...task, edit: !task.edit} : task;
      });
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

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

  const [pendingTasks, setPendingTasks] = useState(tasks);
  const [completedTasks, setCompletedTasks] =useState(tasks);

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

    setPendingTasks(prevTasks => {
      return prevTasks.filter(task => task.done === false);
    });

    setCompletedTasks(prevTasks => {
      return prevTasks.filter(task => task.done === true);
    });
  };

  const addTask = e => {
    e.preventDefault();

    dispatch({
      type: "create",
      id: setId++,
      text: form.text
    });

    setForm(prevForm => {
      return {
        ...prevForm,
        text: ""
      };
    });

    setPendingTasks(prevTasks => {
      return prevTasks.filter(task => !task.done);
    });

    setCompletedTasks(prevTasks => {
      return prevTasks.filter(task => task.done);
    });
  };

  const deleteTask = taskId => {
    dispatch({
      type: "delete",
      id: taskId
    });
  };

  const mapppedPendingTasks = pendingTasks.map(task => {
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

  const mappedCompletedTasks = completedTasks.map(task => {
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
      <form>
        <input name="text" id="text" type="text" value={form.text} placeholder="Add task" onChange={handleChange} />
        <button onClick={addTask}>Add task</button>
      </form>

      <AddTask
      text={form.text}
      addTask={addTask}
      handleChange={handleChange}
      />

      <div>
        <h1>Pending</h1>
        {mapppedPendingTasks}
      </div>

      <div>
        <h1>Completed</h1>
        {mappedCompletedTasks}
      </div>
    </div>
  )
};

export default App;