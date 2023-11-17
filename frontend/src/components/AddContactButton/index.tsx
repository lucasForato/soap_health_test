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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Add your logic to create the contact here
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
        <div className="flex flex-col items-center m-5">
          <h2 className="my-5 text-lg font-semibold">Add contact</h2>
          <form onSubmit={handleSubmit} className='flex flex-col'>
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

export default AddContactButton;
