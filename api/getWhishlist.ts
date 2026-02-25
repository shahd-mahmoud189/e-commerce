import { getToken } from "@/server/auth.actions";
import CartResponseType, { CartProductType } from "@/types/cartItem.type";
import { WishlistResponse } from "@/types/whishlist.type";
import axios, { AxiosRequestConfig } from "axios";

export async function getWhishlistItems() :Promise<WishlistResponse>{
    const token = await getToken()
    if(token){
        try {
            const options : AxiosRequestConfig = {
                url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
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
