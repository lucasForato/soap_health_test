import { PenSquare } from "lucide-react";
import React, { useState } from "react";
import { Modal } from "../Modal";
import toast from "react-hot-toast";
import { updateContact } from "../../repositories/UpdateContact";

interface Props {
  setListHasUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const UpdateContactButton: React.FC<Props> = ({ setListHasUpdated, id }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    console.log("clicked");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { firstName, lastName, phoneNumber } = event.target.elements;

    const contact = {
      firstName: firstName?.value,
      lastName: lastName?.value,
      phoneNumber: phoneNumber?.value,
    };

    if (contact.firstName.includes(" ")) {
      toast.error("First name cannot contain spaces");
      return;
    }

    updateContact(contact, id)
      .then(() => {
        toast.success("Contact added successfully");
        setShowModal(false);
        setListHasUpdated(true);
      })
      .catch((error: any) => {
        toast.error(error.message);
      })
      .finally(() => {
        handleCloseModal();
      });
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
        <div className="flex flex-col items-center m-5">
          <h2 className="my-5 text-lg font-semibold">Update Contact</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mb-4"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mb-4"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mb-4"
            />
            <button
              type="submit"
              className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default UpdateContactButton;
