import axios from "axios";
import { user_base } from ".";

export const getUserListFilmViewed = async (userId: string) => {
  const response = await axios.get(
    `${user_base}/vu/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          "MediaHub-Token"
        )}`,
      },
    }
  );
  return response.data;
};