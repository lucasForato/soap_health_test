import React, { useState } from "react";

interface Props {
  setListHasUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchParams: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phoneNumber: string;
    }>
  >;
}

const SearchBar: React.FC<Props> = ({ setListHasUpdated, setSearchParams }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setSearchParams({ name: event.target.value, phoneNumber });
    setListHasUpdated(true);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
    setSearchParams({ name, phoneNumber: event.target.value });
    setListHasUpdated(true);
  };

  return (
    <div className="flex flex-col lg:flex-row w-10/12 lg:w-11/12 items-center h-40 justify-around">
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 lg:pr-16 w-2/3 rounded-l-md rounded-r-md lg:rounded-r-none border-l-none text-sm lg:w-2/5 focus:outline-none"
        type="search"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 lg:pr-16 w-2/3 rounded-md lg:rounded-none text-sm lg:w-2/5 focus:outline-none"
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
    </div>
  );
};

export default SearchBar;
