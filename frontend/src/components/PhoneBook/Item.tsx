import React from "react";
import UpdateContactButton from "../UpdateContactButton";
import DeleteContactButton from "../DeleteContactButton";

interface Props {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  id: string;
  setListHasUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PhoneBookItem: React.FC<Props> = ({
  firstName,
  lastName,
  phoneNumber,
  id,
  setListHasUpdated,
}) => {
  const formattedPhoneNumber = `${phoneNumber.slice(0, -8)} ${phoneNumber.slice(
    -8,
    -4
  )}-${phoneNumber.slice(-4)}`;

  return (
    <div className="flex mx-10 justify-between items-center bg-white p-4 rounded-lg mb-4 border-2 border-gray-200">
      <div>
        <p className="font-bold">{`${firstName} ${lastName}`}</p>
        <p className="text-gray-500 text-sm">{formattedPhoneNumber}</p>
      </div>
      <div>
        <UpdateContactButton setListHasUpdated={setListHasUpdated} id={id} />
        <DeleteContactButton setListHasUpdated={setListHasUpdated} id={id} />
      </div>
    </div>
  );
};
