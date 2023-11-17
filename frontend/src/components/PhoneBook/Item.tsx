import React from "react";
import UpdateContactButton from "../UpdateContactButton";

interface Props {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  id: string;
}

export const PhoneBookItem: React.FC<Props> = ({
  firstName,
  lastName,
  phoneNumber,
  id,
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
      <UpdateContactButton />
    </div>
  );
};
