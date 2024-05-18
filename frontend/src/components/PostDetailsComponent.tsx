import Post from "@/model/Post";
import {Container, Grid, Link, Paper} from "@mui/material";
import {useRouter} from "next/router";
import {useState} from "react";
import {useCurrentUser} from "../hooks/auth/useCurrentUser";
import {useLogout} from "../hooks/auth/useLogout";
import {RichTextReadOnly} from "mui-tiptap";
import StarterKit from "@tiptap/starter-kit";
import Layout from "@/components/layout/Layout";

interface PostDetailsProps {
    post: Post | undefined;
}

const PostDetailsComponent: React.FC<PostDetailsProps> = ({post}) => {

    const [editMode, setEditMode] = useState(false);
    const [newAvatarUrl, setNewAvatarUrl] = useState("");
    const {user: currentUser, refetchUser} = useCurrentUser();
    const {logout} = useLogout();
    const router = useRouter();

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Layout title='Create'>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
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
                                <Link href="" title="ABC">
                                    {post.title}
                                </Link>
                                <p className="font-bold text-2xl bold"><b>{post.title}</b></p>
                                <p className="font-bold text-2xl">Created On: <i>{post.createdOn}</i></p>
                                <p className="font-bold text-2xl">Author: <i>{post.author.username}</i></p>

                                <RichTextReadOnly content={post.contents} extensions={[StarterKit]}/>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default PostDetailsComponent;
