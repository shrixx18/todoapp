"use client";
import { ITask } from '@/types/tasks'
import { FiEdit,FiTrash2 } from 'react-icons/fi'
import React, { FormEventHandler, useState } from 'react'
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';
interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({task}) => {
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

    const handleSubmitEditTodo : FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault()
        await editTodo({
          id: task.id,
          text: taskToEdit
        })
        
        setOpenModalEdit(false)
        router.refresh()
      }

    const handleDeleteTask = async (id:string) => {
        await deleteTodo(id)
        setOpenModalDelete(false)
        router.refresh()
    }

  return (
    <>
     <tr key={task.id}>        
        <td className='w-full'>{task.text}</td>
        <td className='flex gap-5'>
            <FiEdit onClick={()=> setOpenModalEdit(true)} cursor='pointer' className='text-blue-500' size={25}/>
            <Modal modalOpen={openModalEdit} setOpenModal={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit Task</h3>
            <div className='modal-action'>
              <input 
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              type="text"
              placeholder='Type here'
              className='input input-boarded w-full ' />
              <button type='submit' className='btn'>Submit</button>
            </div>
          </form>
        </Modal>
            <FiTrash2 onClick={()=> setOpenModalDelete(true)} cursor='pointer' className='text-red-500' size={25}/>
            <Modal modalOpen={openModalDelete} setOpenModal={setOpenModalDelete}>
              <h3 className='text-lg'>Delete Task ?</h3>
              <div className='modal-action'>
                <button onClick={() => handleDeleteTask(task.id)} className='btn'>Yes</button>
              </div>
            </Modal>
        </td>
    </tr>
    </>
  )
}

export default Task