import React, { useEffect, useState } from 'react';
import {AiFillCloseCircle,AiFillEdit,AiOutlineDelete,AiOutlineSearch,AiFillHeart} from "react-icons/ai";
import {MdImportExport} from "react-icons/md"
import { BiCaretLeft,BiCaretRight} from "react-icons/bi";
import {flexRender, getCoreRowModel, useReactTable, getPaginationRowModel,getSortedRowModel} from "@tanstack/react-table";

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
        type:"",
      };
      
      const[defValue,setDefValue]= useState(defaultValue);
    const columns = [
        {
            accessorKey : 'date',
            header: "DATE",
            cell:(props)=><p>{props.getValue()}</p>
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
            cell:(props)=><p>{props.getValue()}</p>
        },
        {
            accessorKey : 'assignee',
            header: "Assignee",
            cell:(props)=><p>{props.getValue() || '-'}</p>
        },
        {
            accessorKey:'id',
            header: 'Action',
            enableSorting: false, 
            cell: (props)=>(
              <div className='flex justify-evenly'>
            <button   onClick={()=>editHandle (props.getValue())} id={props.getValue()}><AiFillEdit/></button>
            <button   onClick={()=>deleteHandle (props.getValue())} id={props.getValue()}><AiOutlineDelete/></button>
            </div>
            )
        },
        {
            accessorKey:'id',
            enableSorting: false, 
            cell: (props)=><span  className='text-[#dbd9d9] flex justify-center text-2xl' onClick={()=>favHandle (props.getValue())} id={props.getValue()}><AiFillHeart/></span>
        }
    ]

    const table =useReactTable({
        data:tasks,
        columns:columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
              pageSize: 10,
            },
            sorting: [
              {
                id: "date",
                desc: true,
              },
            ],
          },
    });
   const addItem =(event)=>{
    
    event?.preventDefault();
    if(defValue.id){

      setTasks(tasks.map((value)=>
        value.id === defValue.id ? {
            ...defValue,
            updatedAt:  new Date().toLocaleString(),
        }: value))
//console.log(va);
        
    }
    else{
        setTasks((tasks)=>[
            ...tasks,
            {
            id:  Math.floor(1000 + Math.random() * 9000),
            date:  new Date().toLocaleString(),
            task: defValue.task,
            description: defValue.description,
            status: defValue.status,
            developedBy: defValue.developedBy,
            updatedAt:  new Date().toLocaleString(),
            assignee: defValue.assignee, 
            },
        ]);
    }
    setDefValue(defaultValue);
    setAddModel(false);
  
   }

   const editHandle =(idValue)=>{
    //console.log(event.target.id);
   // event.preventDefault();
    let valnew = tasks;

    const res = valnew.find((e)=>{
        return e.id == idValue
    })
    setDefValue(res);
    setAddModel(true);

   }
   const deleteHandle = (idValue)=>{

    let valnew = tasks;
    const res = valnew.filter(item=> item.id !== idValue);
    console.log(res);
    setTasks(res);
   }
   const favHandle = ()=>{
    alert("Fav click pannita")
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
  <div className='lg:w-[300px] float-right relative hidden'>
  <input type='text' className=' w-full rounded-lg outline-none  p-[10px]  border border-gray-300'/>
  <AiOutlineSearch className='absolute top-[12px] right-[10px] text-[18px]'/>
  </div>
  <div className='tableArea  mt-6'>
  <table className='w-full border-collapse'>
    <thead>
    {table.getHeaderGroups().map((headerGroup)=><tr className='text-white bg-[#362F4B] ' key={headerGroup.id}>
        {headerGroup.headers.map(
            header =><th  className='p-3 text-center first:rounded-tl-md last:rounded-tr-md cursor-pointer'  key={header.id}>
                 <div className='flex justify-center items-center' onClick={header.column.getToggleSortingHandler()}>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <span className='text-[20px]'><MdImportExport/></span>
                  )}
                  </div>
            </th>
        )}
    </tr>
  )}
  </thead>
  <tbody>
     {table.getRowModel().rows.map((row)=>(
        <tr className="odd:bg-white even:bg-[#eaeaea]" key={row.id}>
            {row.getVisibleCells().map((cell)=>(
                <td className='p-3 text-center ' key={cell.id}>
                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                </td>
            ))}
        </tr>
    ))}
  </tbody>
  </table>
  </div>
  <div className='my-5'>
      <p className='flex items-center'>
      <button className='p-2  bg-gray-200 text-[20px] rounded-tl-lg rounded-bl-lg'
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {<BiCaretLeft/>}
        </button>
        <span className='p-2 bg-gray-200  border-x-2 border-white'>  Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}</span>
      
        <button className=' p-2  bg-gray-200 text-[20px] rounded-tr-lg rounded-br-lg'
          onClick={() => {
            if(table.getCanNextPage()) table.nextPage();
        //   isDisabled={!table.getCanNextPage()}
          }}
        >
           {<BiCaretRight/>}</button>
      </p>
    
      </div>
  </div>
 
  
  </>
  )
}

export default TaskTable