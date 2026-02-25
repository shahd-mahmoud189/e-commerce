import "./globals.css";
import Nav from "./_components/nav/Nav";
import Footer from "./_components/footer/Footer";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { Bounce, ToastContainer } from "react-toastify";
import { Exo } from "next/font/google";
import Providers from "@/providers/Providers";
import { getToken, verifyToken } from "@/server/auth.actions";
import { getCartItems } from "@/api/getCartItems";
import { CartState, setCartItems } from "@/store/slices/cart.slice";
import { WhishlistState } from "@/store/slices/whishlist.slice";
import { getWhishlistItems } from "@/api/getWhishlist";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  

  const authValues = await verifyToken();

  const defaultCartValues: CartState = {
    numberOfCartItems: 0,
    products: [],
    totalPrice: 0,
    cartId: null,
  };

  let cartValues = defaultCartValues

  if(authValues.isAuthinticated){
    try {
      const response = await getCartItems()
    cartValues = {
      numberOfCartItems: response.numOfCartItems,
      cartId: response.cartId,
      products: response.data.products,
      totalPrice: response.data.totalCartPrice
    }
    } catch (error) {
      cartValues = defaultCartValues
    }
  }

  const defaultWhishlistValues : WhishlistState = {
    numberOfWhishlistItems: 0,
    products: []
  }

  let whishlistValues = defaultWhishlistValues

  if(authValues.isAuthinticated){
    try {
      const response = await getWhishlistItems()
      console.log(response);
      whishlistValues = {
        numberOfWhishlistItems: response.count,
        products: response.data
      }
    } catch (error) {
      whishlistValues = defaultWhishlistValues
    }
  }

  return (
    <html lang="en">
      <Providers preloadedState={{ auth: authValues, cart: cartValues, whishlist: whishlistValues }}>
        <body className={`${exo.className} font-medium`}>
          <Nav />
          {children}
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </body>
      </Providers>
    </html>
  );
}
