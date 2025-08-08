import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { Role } from "../constants/common";
import { toast } from "sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const normalizePath = (path) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast.error(error?.payload?.message ?? 'Error not defined')
  }
}

const isBrowser = typeof window !== 'undefined';

const getAccessTokenFromLocalStorage = () => {
  if (isBrowser) {
    return localStorage.getItem('accessToken');
  }
  return null;
}

const getRefreshTokenFromLocalStorage = () => {
  if (isBrowser) {
    return localStorage.getItem('refreshToken');
  }
  return null;
}

const setAccessTokenToLocalStorage = (accessToken) => {
  if (isBrowser) {
    localStorage.setItem('accessToken', accessToken);
  }
}

const setRefreshTokenToLocalStorage = (refreshToken) => {
  if (isBrowser) {
    localStorage.setItem('refreshToken', refreshToken);
  }
}

const removeTokensFromLocalStorage = () => {
  if (isBrowser) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

const removeRefreshTokenFromLocalStorage = () => {
  if (isBrowser) {
    localStorage.removeItem('refreshToken');
  }
}

const checkAndRefreshToken = async (
  param
) => {
  // Không nên đưa logic lấy access và refresh token ra khỏi cái function `checkAndRefreshToken`
  // Vì để mỗi lần mà checkAndRefreshToken() được gọi thì chúng ta se có một access và refresh token mới
  // Tránh hiện tượng bug nó lấy access và refresh token cũ ở lần đầu rồi gọi cho các lần tiếp theo
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()
  // Chưa đăng nhập thì cũng không cho chạy
  if (!accessToken || !refreshToken) return
  const decodedAccessToken = jwt.decode(accessToken)
  const decodedRefreshToken = jwt.decode(refreshToken)
  // Thời điểm hết hạn của token là tính theo epoch time (s)
  // Còn khi dùng cú pháp new Date().getTime() thì nó sẽ trả về epoch time (ms)
  const now = Math.round(new Date().getTime() / 1000)
  // trường hợp refresh token hết hạn thì cho logout
  if (decodedRefreshToken.exp <= now) {
    removeTokensFromLocalStorage()
    return param?.onError && param.onError()
  }
  // Ví dụ access token của mình có thời gian hết hạn là 10s
  // thì mình sẽ kiểm tra còn 1/3 thời gian (3s) thì mình sẽ cho refresh token lại
  // Thời gian còn lại sẽ tính dựa trên công thức: decodedAccessToken.exp - now
  // Thời gian hết hạn của access token dựa trên công thức: decodedAccessToken.exp - decodedAccessToken.iat
  if (param?.force || decodedAccessToken.exp - now < (decodedAccessToken.exp - decodedAccessToken.iat) / 3) {
    // Gọi API refresh token
    try {
      const role = decodedRefreshToken.role
      const res =
        role === Role.Guest
          ? await guestApiRequest.refreshToken()
          : await authApiRequest.refreshToken()
      setAccessTokenToLocalStorage(res.payload.data.accessToken)
      setRefreshTokenToLocalStorage(res.payload.data.refreshToken)
      param?.onSuccess && param.onSuccess()
    } catch (error) {
      param?.onError && param.onError()
    }
  }
}

export { 
  getAccessTokenFromLocalStorage, 
  getRefreshTokenFromLocalStorage, 
  setAccessTokenToLocalStorage, 
  setRefreshTokenToLocalStorage, 
  removeTokensFromLocalStorage, 
  removeRefreshTokenFromLocalStorage, 
  checkAndRefreshToken 
}


