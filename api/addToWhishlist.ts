import { getToken } from "@/server/auth.actions";
import axios, { AxiosRequestConfig } from "axios";

export async function addToWhishlist({productId}:{productId:string}){

    
  const token = await getToken()
  if (token) {
    try {
      const options :AxiosRequestConfig= {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: { token },
        data: {productId}
      };

      const { data } = await axios.request(options);
      return data;
    } catch (error) {
        throw error
    }
  } else {
    throw new Error('Authintication required')
  }
}
