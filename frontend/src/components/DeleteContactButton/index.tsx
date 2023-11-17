import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "../Modal";

interface Props {
  isEnabled: boolean;
}

const DeleteContactButton = () => {
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
        className="bg-red-400 text-white px-3 py-3 rounded-r-md hover:bg-red-500 focus:outline-none"
        onClick={handleOpenModal}
      >
        <Trash2 />
      </button>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div>
          <h2 className="">Delete Contact</h2>
        </div>
      </Modal>
    </>
  );
};

export default DeleteContactButton;
