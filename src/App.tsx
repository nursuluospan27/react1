import { useState } from 'react'
import './App.css'

type Product = {
    name: string,
    price: number
}

function App() {
  const [taskValue, setTaskValue] = useState('');

  const [tasks, setTasks] = useState<string[]>([]);


  function handleSubmit(e: React.SubmitEvent) {
      e.preventDefault();
      console.log(taskValue);
      setTasks([...tasks, taskValue]);

      setTaskValue('');
  }

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <input type="text" value={taskValue} onChange={(e) => setTaskValue(e.target.value)} />
              <button>Save</button>
          </form>

          <ul>
              {tasks.map(task => (
                  <li>{task}</li>
              ))
              }
          </ul>
      </div>

  )
}

export default App
