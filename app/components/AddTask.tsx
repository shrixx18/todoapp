"use client";
import React, { FormEventHandler, useState } from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Modal from './Modal'
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setOpenModal] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault()
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue("")
    setOpenModal(false)
    router.refresh()
  }
  return (
    <div>
        <button onClick={()=> {setOpenModal(true)}} className='btn btn-primary w-full'>Add New Task <AiOutlinePlus className='ml-2' size={18}/></button>
        <Modal modalOpen={modalOpen} setOpenModal={setOpenModal}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className='font-bold text-lg'>Add New Task</h3>
            <div className='modal-action'>
              <input 
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder='Type here'
              className='input input-boarded w-full ' />
              <button type='submit' className='btn'>Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask