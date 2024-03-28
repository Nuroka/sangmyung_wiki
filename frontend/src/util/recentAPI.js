import { defaultInstance } from "./api";

export async function fetchRecent() {
  const url = "/recent";

  try {
    const response = await defaultInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}
