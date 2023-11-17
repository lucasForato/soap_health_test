import httpClient from "../infrastructure/httpClient";

type Input = string;

type Output = void;

export const deleteContact = async (id: Input): Promise<Output> => {
  try {
    await httpClient.delete<void>(`/v1/contacts/${id}`);
  } catch (error: any) {
    throw new Error(error.response.data.message[0]);
  }
};
