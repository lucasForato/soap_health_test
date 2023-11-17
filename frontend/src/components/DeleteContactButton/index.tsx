import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { deleteContact } from "../../repositories/DeleteContact";
import { Modal } from "../Modal";

interface Props {
  setListHasUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const DeleteContactButton: React.FC<Props> = ({ setListHasUpdated, id }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    deleteContact(id)
      .then(() => {
        toast.success("Contact deleted successfully");
        setListHasUpdated(true);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        handleCloseModal();
      });
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
        <div className="flex flex-col items-center m-5">
          <h2 className="my-5 text-lg font-semibold">Delete contact</h2>
          <p className="text-gray-600 mb-5">
            Are you sure you want to delete this contact?
          </p>
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded-lg w-1/2 hover:bg-blue-500 focus:outline-none"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteContactButton;
