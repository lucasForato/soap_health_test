import httpClient from "../infrastructure/httpClient";
import { Contact } from "../types/Contact";

type Input = Contact;

type Output = void;

export const addContact = async (contact: Input): Promise<Output> => {
  try {
    await httpClient.post<void>("/v1/contacts/", contact);
  } catch (error: any) {
    throw new Error(error.response.data.message[0]);
  }
};
