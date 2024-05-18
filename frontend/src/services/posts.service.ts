import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import Post from "@/model/Post";

export class PostsService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  getPosts = async (page : number, categoryId:number) => {
    console.log(`Getting posts ${categoryId}`);
    return await this.instance
      .get(`/api/post/?page=${page}&categoryId=${categoryId}`, {
        headers: {
          //...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  getPost = async (page : number, postId:number) => {
    console.log("Getting post from server "+postId);
    return await this.instance
      .get(`/api/post/${postId}`, {
        headers: {
        //  ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  addToMySource = async (sourceId: number) => {
    return await this.instance
      .post(`/api/source/addtomine`, sourceId, {
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return {
          res,
        };
      });
  };

  removeFromMySource = async (sourceId: number) => {
    return await this.instance
      .post(`/api/source/removefrommine`, sourceId, {
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return {
          res,
        };
      });
  };

  deleteSource = async (sourceId: number) => {
    return await this.instance
      .delete(`/api/source/${sourceId}`,  {
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return {
          res,
        };
      });
  };

  getSources = async (page : number, categoryId:number) => {
    return await this.instance
      .get(`/api/source/?page=${page}&categoryId=${categoryId}`, {
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  getSourceCategories = async () => {
    return await this.instance
    .get(`/api/source/sourcecategories`, {
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "text/plain",
      },
    })
    .then((res) => {
      return res.data;
    });
  };

  getPrivateSources = async (page : number) => {
    return await this.instance
      .get(`/api/source/private?page=${page}`, {
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  getUsersActiveSources = async (page : number, categories : number[]) => {
    return await this.instance
      .get(`/api/source/myactive?page=${page}&selectedCategories=${categories}`, {
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
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
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return {
          newAvatar: res.data.data.url,
        };
      });
  };

  createPost = async (post: Post) => {
    const res = await this.instance
        .post("/api/post/", post, {
          headers: {
            ...getAuthorizationHeader(),
            "Content-Type": "application/json",
          },
        });
    return {
      res,
    };
  };

  getSourceDetails = async (sourceId:number) => {
    return await this.instance
      .get(`/api/source/${sourceId}`, {
        headers: {
          ...getAuthorizationHeader(),
          "Content-Type": "text/plain",
        },
      })
      .then((res) => {
        return res.data;
      });
  };
}
