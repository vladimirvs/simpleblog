import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (username: string, password: string) => {
    return this.instance
      .post("/api/auth/signin", {
        username,
        password,
      })
      .then((res) => {
        return {
          username: res.data.username,
          avatar: res.data.avatar,
          id: res.data.userId,
          token: res.data.token,
          expiredAt: res.data.expiredAt,
          roles: res.data.roles
        };
      });
  };

  getMe = (userId: string) => {
    return this.instance
      .get(`/api/user/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };

  uploadAvatar = (userId: string, newAvatar: File) => {
    const formData = new FormData();
    formData.append("file", newAvatar);
    return this.instance
      .post(`/api/user/${userId}/upload`, formData, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return {
          newAvatar: res.data.data.url,
        };
      });
  };
}