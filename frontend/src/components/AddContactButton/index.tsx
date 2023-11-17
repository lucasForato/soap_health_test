import { PlusSquare } from "lucide-react";
import { useState } from "react";
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
        className="bg-blue-400 hover:bg-blue-500 text-white flex font-bold h-fit py-2 items-center justify-between px-10 rounded"
        onClick={handleOpenModal}
      >
        <PlusSquare style={{ paddingRight: "0.3rem" }} />
        Add Contact
      </button>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div>
          <h2 className="">Add contact</h2>
        </div>
      </Modal>
    </>
  );
};

export default AddContactButton;
