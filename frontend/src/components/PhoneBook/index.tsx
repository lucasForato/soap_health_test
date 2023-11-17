import React from "react";
import AddContactButton from "../AddContactButton";
import SearchBar from "../Search";
import { PhoneBookItem } from "./Item";
import { listContacts } from "../../repositories/ListContacts";
import { Contact } from "../../types/Contact";

interface Props {}

export const PhoneBook: React.FC<Props> = () => {
  const [items, setItems] = React.useState<Contact[]>([]);
  const [listHasUpdated, setListHasUpdated] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState<{
    name: string;
    phoneNumber: string;
  }>({ name: "", phoneNumber: "" });

  async function loadData() {
    try {
      const contacts = await listContacts(searchParams);
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
        <SearchBar
          setListHasUpdated={setListHasUpdated}
          setSearchParams={setSearchParams}
        />
      </div>

      {items.map((item) => {
        return (
          <PhoneBookItem
            firstName={item.firstName}
            lastName={item.lastName}
            phoneNumber={item.phoneNumber}
            id={item.id!}
            key={item.id}
            setListHasUpdated={setListHasUpdated}
          />
        );
      })}
    </div>
  );
};
