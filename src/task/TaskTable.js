import React, { useEffect, useState } from 'react';
import {AiFillCloseCircle,AiFillEdit} from "react-icons/ai";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {format} from 'date-fns'


function TaskTable() {
    const [tasks, setTasks] = React.useState(
        localStorage.getItem("tasks")
          ? JSON.parse(localStorage.getItem("tasks"))
          : []
      );
      useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
      },[tasks])
      const [addmodel,setAddModel]= useState(false);
      const defaultValue = {
        date: new Date(),
        task: "",
        description: "",
        status: "Completed",
        developedBy: "Naveen",
        updatedAt: new Date(),
        assignee: "Naveen",
      };
      
      const[defValue,setDefValue]= useState(defaultValue);
    const columns = [
        {
            accessorKey : 'date',
            header: "DATE",
            cell:(props)=><p>{format(new Date(props.getValue()), "dd-MMM-yyyy  hh:mm a") }</p>
        },
        {
            accessorKey : 'task',
            header: "TASK",
            cell:(props)=><p>{props.getValue() || '-'}</p>
        },
        {
            accessorKey : 'description',
            header: "Description",
            cell:(props)=><p>{props.getValue() || '-'}</p>
        },
        {
            accessorKey : 'status',
            header: "STATUS",
            cell:(props)=><p>{props.getValue() || '-'}</p>
        },
        {
            accessorKey : 'developedBy',
            header: "Developed By",
            cell:(props)=><p>{props.getValue() || '-'}</p>
        },
        {
            accessorKey : 'updatedAt',
            header: "Updated At",
            cell:(props)=><p>{format(new Date(props.getValue()), "dd-MMM-yyyy  hh:mm a") }</p>
        },
        {
            accessorKey : 'assignee',
            header: "Assignee",
            cell:(props)=><p>{props.getValue() || '-'}</p>
        },
        {
            accessorKey:'id',
            header: 'action',
            cell: (props)=><button   onClick={editHandle} id={props.getValue()}><AiFillEdit/></button>

        }
    ]

    const table =useReactTable({
        data:tasks,
        columns:columns,
        getCoreRowModel:getCoreRowModel()
    });
   const addItem =(event)=>{
    event.preventDefault();
    console.log(tasks);
    setTasks((tasks)=>[
        ...tasks,
        {
        id:  Math.floor(1000 + Math.random() * 9000),
        date:  new Date(),
        task: defValue.task,
        description: defValue.description,
        status: defValue.status,
        developedBy: defValue.developedBy,
        updatedAt:  new Date(),
        assignee: defValue.assignee, 
        },
    ]);
    setDefValue(defaultValue);
   }

   const editHandle =(event)=>{
    //console.log(event.target.id);
    event.preventDefault();
    let valnew = tasks;

    const res = valnew.find((e)=>{
        return e.id == event.currentTarget.id
    })
    setDefValue(res);
    setAddModel(true);

   }
  return (
  <>
  <div  className='container mx-auto p-[50px]'>
    {addmodel ?(
    <div className='fixed inset-0 bg-black z-1 bg-opacity-75 flex justify-center items-end lg:items-center'>
    
        <form className=' flex flex-col bg-gray-300 rounded-md overflow-hidden  w-full lg:w-[50vw] lg:h-[80vh]'>
        <div className="flex items-center justify-between px-4 py-4 bg-zinc-900 text-white">
              <div className="flex items-center">
                <h1 className="font-bold">Add New Task</h1>
              </div>
              <button className='text-2xl' onClick= {()=>{setAddModel(!addmodel)}}>
                <AiFillCloseCircle/>
              </button>
            </div>
            <div className='overflow-y-auto'>
            <div className='grid grid-cols-3 pt-6 pb-3 px-3  align-center'>
            <label className='flex justify-end items-center mr-2'>Enter Task: </label>
            <input type='text' value={defValue.task} onChange={(e)=>{setDefValue({...defValue,task:e.target.value})}} className='rounded-sm h-[40px] col-span-2 bg-slate-200 outline-none px-2'/>
        </div>
        <div className='grid grid-cols-3 pb-3 px-3 align-center'>
            <label className='flex justify-end items-center mr-2'>Description:</label>
            <textarea value={defValue.description} onChange={(e)=>{setDefValue({...defValue,description:e.target.value})}} className='rounded-sm h-[40px] col-span-2 bg-slate-200 outline-none px-2'/>
        </div>
        <div className='grid grid-cols-3 pb-3 px-3 align-center'>
            <label className='flex justify-end items-center mr-2'>Developed By:</label>
            <input type='text' value={defValue.developedBy} onChange={(e)=>{setDefValue({...defValue,developedBy:e.target.value})}} className='rounded-sm h-[40px] col-span-2 bg-slate-200 outline-none px-2'/>
        </div>
        <div className='grid grid-cols-3 pb-3 px-3 align-center'>
            <label className='flex justify-end items-center mr-2'>Assignee:</label>
            <input type='text' value={defValue.assignee} onChange={(e)=>{setDefValue({...defValue,assignee:e.target.value})}} className='rounded-sm h-[40px] col-span-2 bg-slate-200 outline-none px-2'/>
        </div>
        <div className='grid grid-cols-3 pb-3 px-3 align-center'>
            <label className='flex justify-end items-center mr-2'>Status:</label>
            <select onChange={(e)=>{setDefValue({...defValue,status:e.target.value})}} value={defValue.status} className='rounded-sm h-[40px] col-span-2 bg-slate-200 outline-none px-2'>
                <option value="In-Progress">Inprogress</option>
                <option value="Todo">Todo</option>
                <option value= "Completed">Completed</option>
            </select>
        </div>
        <div className='w-full text-center my-5'>
        <button onClick={addItem} className='w-[150px]  p-3 bg-red-500 text-white rounded-md font-[600]'>Add</button>
        </div>
        
            </div>
        
        </form>
    </div>
    ) : null
    
}
   
  <button onClick= {()=>{setDefValue(defaultValue);setAddModel(!addmodel)}} className='w-[100px] rounded-sm bg-red-600 p-[10px] text-white hover:bg-red-500'>Add Task</button>
  <div className='tableArea  mt-6'>
  <table className='w-full border-collapse'>
    <thead>
    {table.getHeaderGroups().map((headerGroup)=><tr className='text-white bg-[#362F4B] ' key={headerGroup.id}>
        {headerGroup.headers.map(
            header =><th  className='p-3 text-center first:rounded-tl-md last:rounded-tr-md'  key={header.id}>
                {header.column.columnDef.header}
            </th>
        )}
    </tr>
  )}
  </thead>
  <tbody>
    {console.log("table",table.getRowModel().rows)}
     {table.getRowModel().rows.map((row)=>(
        <tr className="odd:bg-white even:bg-[#eaeaea]" key={row.id}>
            {row.getVisibleCells().map((cell)=>(
                <td className=' p-3 text-center ' key={cell.id}>
                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                </td>
            ))}
        </tr>
    ))}
  </tbody>
  </table>
  </div>
  </div>
 
  
  </>
  )
}

export default TaskTable