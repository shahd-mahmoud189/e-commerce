import { removeToken } from "@/server/auth.actions";
import { setAuthInfo } from "@/store/slices/auth.slice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useLogout() {
    const dispatch = useDispatch();
    const router = useRouter();

  const logout = async () => {
    await removeToken();
    dispatch(setAuthInfo({isAuthinticated: false, userInfo: null}))
    router.push('/')
    toast.success('Logged out successfully')
    router.refresh()
  };
  return {logout}
}
