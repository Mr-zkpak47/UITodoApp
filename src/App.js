import React, { useState } from 'react'
import "./App.css"

export default function App() {
  let [complete, setComplete] = useState(1)
  let [tasksLength, setTasksLength] = useState(0)
  const updateComplete = (newComplete) => {
    setComplete(newComplete);
  };

  const updateTasksLength = (newTasksLength) => {
    setTasksLength(newTasksLength);
  };

  return (
    <>
    <p className="logo">
      <span>DAILY</span>&nbsp;
      <span style={{color:"orangered"}}>TODO</span>
    </p>
      <div className="container">
        <div className="infoContainer">
          <div className="info">
            <h1>Todo Done</h1>
            <p>&nbsp;keep it up.</p>
          </div>
          <div className="counterTrack">
            {complete}/{tasksLength}
          </div>
        </div>
        <div className="todoContainer">
          <Todos complete={complete} setComplete={setComplete} tasksLength={tasksLength} setTasksLength={setTasksLength} />
        </div>
      </div>
    </>
  )
}

function Todos({ complete, setComplete, tasksLength, setTasksLength }) {
  // let nextId = 0
  const [text, setText] = useState("Task")
  let [nextId, setNextId] = useState(0);
  let initialTasks = [
    { text: "Task 1", id: nextId++, state: false, isEditing: false, isChecked: false, isDelete: false },
    { text: "Task 2", id: nextId++, state: false, isEditing: false, isChecked: true, isDelete: false },
    { text: "Task 3", id: nextId++, state: false, isEditing: false, isChecked: false, isDelete: false },
  ]
  const [tasks, setTasks] = useState(initialTasks)
  setTasksLength(tasks.length)
  /*  const handleCheckBoxChange = (taskId) => {
     const updatedTasks = tasks.map((task) => {
       if (taskId === task.id) {
         return ({
           ...task,
           isChecked: !task.isChecked
         })
       }
       return task
     })
     setTasks(updatedTasks)
     const updatedComplete = updatedTasks.filter((task) => task.isChecked).length;
     setComplete(updatedComplete);
     console.log(complete)
     return updatedTasks;
   } */
  const handleCheckBoxChange = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (taskId === task.id) {
          return {
            ...task,
            isChecked: !task.isChecked,
          };
        }
        return task;
      });

      const updatedComplete = updatedTasks.filter((task) => task.isChecked).length;
      setComplete(updatedComplete);
      return updatedTasks;
    });
    setTasksLength(tasks.length);
  };
  const handleEditClick = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return ({
          ...task,
          isEditing: !task.isEditing
        })
      }
      return task
    })
    setTasks(updatedTasks)
  }
  const handleSaveClick = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return ({
          ...task,
          isEditing: !task.isEditing
        })
      }
      return task
    })
    setTasks(updatedTasks)
    console.log(tasks)
  }
  const handleDeleteClick = (taskId) => {
    const updatedTasks = tasks.filter((task) => taskId !== task.id)
    setTasks(updatedTasks)
    setComplete(updatedTasks.filter((task) => task.isChecked).length);
    setTasksLength(tasks.length)
  }
  const handleEditText = (taskId, e) => {
    const updatedTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return ({
          ...task,
          text: e.target.value
        })
      }
      return task
    })
    setTasks(updatedTasks)
  }
  const handleAddTask = () => {
    setTasks((tasks) => [
      ...tasks,
      { text: text, id: nextId, state: false, isEditing: false, isChecked: false, isDelete: false }
    ])
    setNextId((id) => id + 1)
    setTasksLength(tasks.length)
    document.body.querySelectorAll("input")[0].value = ""
  }
  const handleAddTaskText = (e) => {
    setText(e.target.value)
  }
  return (
    <>
      <div className="inputFlex">
        <input type="text" name="Todo" id="todoInput" placeholder='write your next task' onChange={(e) => handleAddTaskText(e)} />
        <button className='addBtn' onClick={() => handleAddTask()}><i className='fa-solid fa-plus fa-lg'></i></button>
      </div>
      {
        tasks.map(task => {
          if (task.isDelete) {
            return null;
          }
          return (
            <div className="todo" key={task.id}>
              {task.isEditing
                ?
                (<>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleEditText(task.id, e)}
                    className='editInputBox'
                  />
                  <button className='save' onClick={() => handleSaveClick(task.id)}>Save</button>
                </>)
                :
                (
                  <>
                    <label htmlFor={task.id} className='taskTxt'>
                      <input type="checkbox" name="Todo" id={task.id} checked={task.isChecked}
                        onChange={() => handleCheckBoxChange(task.id)}
                      />
                      {task.isChecked ?
                        <s>
                          &nbsp;{task.text}&ensp;
                        </s>
                        :
                        <div>&nbsp;
                          {task.text}
                        </div>
                      }
                    </label>
                    <div className="btns">
                      <button type="button" className='Edit btn' onClick={() => handleEditClick(task.id)}><i className="fa-regular fa-pen-to-square fa-xl"></i></button>
                      <button type="button" className='Delete btn' onClick={() => handleDeleteClick(task.id)}><i className="fa-regular fa-trash-can fa-xl"></i></button>
                    </div>
                  </>
                )
              }
            </div>
          )
        }
        )
      }
    </>
  )
}