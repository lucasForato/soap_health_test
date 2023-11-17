import React from "react";
import useHttpClient from "../../infrastructure/httpClient";
import AddContactButton from "../AddContactButton";
import UpdateContactButton from "../UpdateContactButton";
import SearchBar from "../Search";
import { PhoneBookItem } from "./Item";

interface Props {}

interface ItemProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  id: string;
}

export const PhoneBook: React.FC<Props> = () => {
  const [items, setItems] = React.useState<ItemProps[]>([]);
  const { httpClient } = useHttpClient();

  async function loadData() {
    try {
      const response = await httpClient.get<ItemProps[]>(
        "http://localhost:5000/api/v1/contacts/"
      );
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col items-center lg:m-5 h-32 lg:h-fit justify-around">
        <h2 className="text-xl">Contacts</h2>
        <AddContactButton />
      </div>

      <div className="flex flex-row m-5 mt-10 justify-center">
        <SearchBar />
      </div>

      {items.map((item) => {
        return <PhoneBookItem {...item} />;
      })}
    </div>
  );
};
