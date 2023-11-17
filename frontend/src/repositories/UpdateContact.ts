import httpClient from "../infrastructure/httpClient";
import { Contact } from "../types/Contact";

type Input = Contact;

type Output = void;

export const updateContact = async (
  contact: Input,
  id: string
): Promise<Output> => {
  try {
    await httpClient.patch<void>(`/v1/contacts/${id}`, contact);
  } catch (error: any) {
    throw new Error(error.response.data.message[0]);
  }
};
