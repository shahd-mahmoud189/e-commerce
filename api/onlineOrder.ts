import { paymentForm } from "@/schema/payment.schema";
import { getToken } from "@/server/auth.actions";
import axios, { AxiosRequestConfig } from "axios";

export default async function onlineOrder({shippingAddress,cartId, url}:{shippingAddress:paymentForm, cartId:string, url:string}) {
  const token = await getToken();
  if (token) {
    try {
      const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        method: "POST",
        headers: { token },
        data: { shippingAddress },
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
