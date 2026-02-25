import { getToken } from "@/server/auth.actions";
import CartResponseType, { CartProductType } from "@/types/cartItem.type";
import axios, { AxiosRequestConfig } from "axios";

export async function getCartItems() :Promise<CartResponseType>{
    const token = await getToken()
    if(token){
        try {
            const options : AxiosRequestConfig = {
                url: 'https://ecommerce.routemisr.com/api/v2/cart',
                method: 'Get',
                headers: {token}
            }
            const {data} = await axios.request(options)
            return data;
        } catch (error) {
            throw error
        }
    }else{
        throw new Error("Authintication required")
    }
}


export async function addToCart({productId}:{productId:string}){

    
  const token = await getToken()
  if (token) {
    try {
      const options :AxiosRequestConfig= {
        url: "https://ecommerce.routemisr.com/api/v2/cart",
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

export async function removeFromCart(id: string) :Promise<CartResponseType>{
  const token = await getToken();
  if (token) {
    try {
      const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
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

export async function updateCart(id: string, count:number) :Promise<CartResponseType>{
  const token = await getToken();
  if (token) {
    try {
      const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
        method: "PUT",
        headers: { token },
        data: {count}
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