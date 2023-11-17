import React, { useState } from "react";
import { PlusSquare } from "lucide-react";
import { Modal } from "../Modal";

const AddContactButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    console.log("clicked");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-blue-400 hover:bg-blue-500 text-white flex font-bold h-fit py-3 items-center justify-between px-10 rounded"
        onClick={handleOpenModal}
      >
        <div className='border-2 w-full'>
        <PlusSquare />
        <p className="border-2">Add Contact</p>
        </div>
      </button>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div></div>
      </Modal>
    </>
  );
};

export default AddContactButton;
