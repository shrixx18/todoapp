import React from 'react'
interface ModalProps {
    modalOpen: boolean;
    setOpenModal: (open : boolean)=>boolean | void;
    children: React.ReactNode
}
const Modal: React.FC<ModalProps> = ({ modalOpen , setOpenModal, children}) => {
  return (
    <div>
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
  <div className="modal-box relative">
    <label onClick={() => setOpenModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    {children}
  </div>
</div>
    </div>
  )
}

export default Modal