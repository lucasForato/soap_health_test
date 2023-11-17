import httpClient from "../infrastructure/httpClient";
import { Contact } from "../types/Contact";

type Input = { name?: string; phoneNumber?: string };

type Output = Contact[];

export const listContacts = async (input?: Input): Promise<Output> => {
  try {
    const response = await httpClient.get<Output>("/v1/contacts/", {
      params: input,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message[0]);
  }
};
