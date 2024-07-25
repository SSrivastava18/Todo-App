import { useState, useEffect } from 'react'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
    
  }, [])
  


  const savetoLS = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  
  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo);
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    savetoLS()


  }

  const handleDelete = (e, id)=>{
    let index =  todos.findIndex(item=>{
      return item.id === id;
    })
    console.log(index)
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    savetoLS()

  }

  const handleAdd = ()=>{
    settodos([...todos, {id: uuidv4(), todo,isCompleted: false}])
    settodo("")
    savetoLS()

  }

  const handleChange = (e)=>
    {
       settodo(e.target.value)
    

    }

  const handleCheckbox = (e) =>{
    let id = e.target.name;
    let index =  todos.findIndex(item=>{
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    savetoLS()
     
  }
  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2 " >
      <h1 className='font-bold text-center text-xl'>Manage Your Tasks At One Place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'> Add a Todo </h2>
          <input  onChange={handleChange} value={todo} type="text" className ='w-full px-5 py-1 rounded-full my-4'/>
          <button onClick={handleAdd} disabled={todo.length<=1 }  className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 p-2 py-1 text-sm font-bold text-white rounded-md '>Add</button>
        </div>
        
          <h1 className='text-x1 font-bold'>Your Todos</h1> 
          <div className="todos">
            {todos.length === 0 && <div className='m-5'> No Todos to display</div>}
            {todos.map(item=>{

            
            return <div key={item.id} className="todo flex  my-3 justify-between">
              <div className='flex gap-5'>
              <input name = {item.id} onChange={handleCheckbox} type="checkbox" value={todo}  />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>

            </div>
            })}

          </div>
        </div>
      
    </>
  )
}

export default App
