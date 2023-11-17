import React from "react";
import useHttpClient from "../../infrastructure/httpClient";
import AddContactButton from "../AddContactButton";
import UpdateContactButton from "../UpdateContactButton";
import SearchBar from "../Search";
import { PhoneBookItem } from "./Item";
import { listContacts } from "../../repositories/ListContacts";
import { Contact } from "../../types/Contact";

interface Props {}

export const PhoneBook: React.FC<Props> = () => {
  const [items, setItems] = React.useState<Contact[]>([]);
  const [listHasUpdated, setListHasUpdated] = React.useState(false);

  async function loadData() {
    try {
      const contacts = await listContacts();
      setItems(contacts);
    } catch (error) {
      console.log(error);
    } finally {
      setListHasUpdated(false);
    }
  }

  React.useEffect(() => {
    loadData();
  }, [listHasUpdated]);

  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col items-center lg:m-5 h-32 lg:h-fit justify-around">
        <h2 className="text-xl">Contacts</h2>
        <AddContactButton setListHasUpdated={setListHasUpdated} />
      </div>

      <div className="flex flex-row m-5 mt-10 justify-center">
        <SearchBar />
      </div>

      {items.map((item) => {
        return (
          <PhoneBookItem
            firstName={item.firstName}
            lastName={item.lastName}
            phoneNumber={item.phoneNumber}
            id={item.id!}
            key={item.id}
          />
        );
      })}
    </div>
  );
};
