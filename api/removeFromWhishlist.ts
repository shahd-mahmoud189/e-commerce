import { getToken } from "@/server/auth.actions";
import CartResponseType from "@/types/cartItem.type";
import axios, { AxiosRequestConfig } from "axios";

export async function removeFromWhishlist(id: string) :Promise<CartResponseType>{
  const token = await getToken();
  if (token) {
    try {
      const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: { token },
      };

      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("Authintication required");
  }
}
