import { Button, Container, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";
import { useLogout } from "../hooks/auth/useLogout";

export default function ProfileComponent() {
  const [editMode, setEditMode] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const { user: currentUser, refetchUser } = useCurrentUser();
  const { logout } = useLogout();
  const router = useRouter();

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
            <div className="w-screen h-screen flex flex-col items-center justify-center">
              <p className="font-bold text-2xl">
                Welcome back, {currentUser?.username}, emails is: {currentUser?.email}
              </p>

              {currentUser?.avatar && (
                <img
                  alt=""
                  className="max-w-120 max-h-80"
                  src={currentUser.avatar}
                />
              )}

              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                Logout
              </Button>
              <Button variant="contained" size="small" onClick={
                () => {
                  getData();
                }
              }>Fetch</Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
