import React from "react";
import useHttpClient from "../../infrastructure/httpClient";
import AddContactButton from "../AddContentModal";

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
      <div className="flex flex-row items-center justify-around">
        <h2 className="text-xl py-5">Contacts</h2>
        <AddContactButton />
      </div>

      <div>{/* ADD A SEARCH BAR AROUND HERE */}</div>

      {items.map((item) => {
        // EACH ITEM HAS TO BE SELECTABLE AND UPDATABLE AFTER SELECTION IS DONE
        return <p>{item.firstName}</p>;
      })}
    </div>
  );
};
