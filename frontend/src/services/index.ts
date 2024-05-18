import { AuthService } from "./auth.service";
import { PostsService } from "./posts.service";


export const authService = new AuthService("//localhost:8080");
export const postsService = new PostsService("//localhost:8080");
