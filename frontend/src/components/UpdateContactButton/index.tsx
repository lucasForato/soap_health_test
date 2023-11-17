import { PlusSquare } from "lucide-react";
import { useState } from "react";
import { Modal } from "../Modal";

interface Props {
  isEnabled: boolean;
}

const UpdateContactButton = () => {
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
        className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 focus:outline-none"
        onClick={handleOpenModal}
      >
        Update Contact
      </button>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div>
          <h2 className="">Update Contact</h2>
        </div>
      </Modal>
    </>
  );
};

export default UpdateContactButton;
