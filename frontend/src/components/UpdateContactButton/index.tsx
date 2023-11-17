import { PenSquare } from "lucide-react";
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
        className="bg-blue-400 text-white px-3 py-3 rounded-l-md hover:bg-blue-500 focus:outline-none"
        onClick={handleOpenModal}
      >
        <PenSquare />
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
