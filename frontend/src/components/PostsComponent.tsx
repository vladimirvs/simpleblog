import Post from "@/model/Post";
import { postsService } from "@/services";
import { Container, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";
import { useLogout } from "../hooks/auth/useLogout";
import PostComponent from "./PostComponent";

export default function PostsComponent() {
  const [editMode, setEditMode] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const { user: currentUser, refetchUser } = useCurrentUser();
  const { logout } = useLogout();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [allPosts, setAllPosts] = useState<Post[]>();

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, [page]);

  const getPosts = () => {
    console.log("Calling POSTS");
    postsService
      .getPosts(page, 0)
      .then((data) => {
        setAllPosts(data);
        setLoading(false);
        // Chain additional calls here
        return data;
      })
      .catch((error) => {
        console.error("THIS IS ERROR: (posts) " + error);
      });
  };

  const getNewAvatarUrl = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditMode(true);
      setNewAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getData = async () => {
    console.log("Current user is " + JSON.stringify(currentUser));
    const user = await refetchUser(
      currentUser?.id == null ? "1" : currentUser?.id
    );
    console.log("USer not from cookies is %s", JSON.stringify(user));
  };

  // const post: Post = {
  //   title: "Test",
  //   contents: "Hello World!",
  //   id: 0,
  //   createdOn: new Date().toDateString(),
  //   updatedOn: "",
  //   category: "",
  //   author: {
  //     username: ""
  //   }
  // }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {allPosts &&
              allPosts.map((p) => {
                return <PostComponent post={p} key={p.id}></PostComponent>;
              })}
          </Paper>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
     
      </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
