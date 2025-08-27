'use client'
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/src/store/auth.store";
import authApiRequest from "@/src/api/request/auth";
import { jwtDecode } from "jwt-decode";

const UNAUTHENTICATED_PATHS = ["/login", "/register", "/refresh-token"];
const RefreshToken = () => {
   const pathname = usePathname();
   const router = useRouter();
   const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useAuthStore();
   useEffect(() => {
      if (UNAUTHENTICATED_PATHS.includes(pathname) || (!accessToken || !refreshToken)) return;
      let interval = null;
      const onRefreshToken = () => {
         checkAndRefreshToken({
            accessToken,
            refreshToken,
            setAccessToken,
            setRefreshToken,
            onError: () => {
               clearInterval(interval);
               router.push('/login');
            }
         });
      }
      onRefreshToken();
      const TIMEOUT = 1000;
      interval = setInterval(onRefreshToken, TIMEOUT);
      return () => {
         clearInterval(interval);
      }

   }, [pathname, accessToken, refreshToken]);

   useEffect(() => {
      if (UNAUTHENTICATED_PATHS.includes(pathname) || (accessToken && refreshToken)) return;
      const getToken = async () => {
         try {
            const { payload } = await authApiRequest.refreshToken();
            if (payload.status == 200) {
               setAccessToken(payload.data.accessToken);
               setRefreshToken(payload.data.refreshToken);
            }
         } catch (error) {
            if (pathname != '/') {
               router.push('/login');
            }
         }
      }
      getToken();
   }, [pathname, accessToken, refreshToken]);



   const checkAndRefreshToken = async (params) => {
      const { accessToken, refreshToken, setAccessToken, setRefreshToken, onError } = params;
      try {
         const decodedAccessToken = jwtDecode(accessToken);
         const decodedRefreshToken = jwtDecode(refreshToken);
         const now = Math.round(new Date().getTime() / 1000);
         if (decodedRefreshToken.exp <= now) return onError();
         if (decodedAccessToken.exp - now < (decodedAccessToken.exp - decodedAccessToken.iat) / 3) {

            const { payload } = await authApiRequest.refreshToken({ force: true });
            setAccessToken(payload.data.accessToken);
            setRefreshToken(payload.data.refreshToken);

         }
      } catch (error) {
         console.log(error);
         onError();
      }
   }
}

export default RefreshToken;