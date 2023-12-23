import {useState, useReducer} from "react";
import Task from "./components/Task";

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
      }
    })
  }
};



export default App;