import Layout from "@/components/layout/Layout";
import PostsComponent from "@/components/PostsComponent";
import {Button, Grid, Input} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useRef, useState} from "react";
import StarterKit from "@tiptap/starter-kit";
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {height} from "@mui/system";

import {
    MenuButtonBold, MenuButtonBulletedList, MenuButtonCode, MenuButtonCodeBlock,
    MenuButtonItalic, MenuButtonOrderedList, MenuButtonTaskList,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditor, RichTextEditorRef
} from "mui-tiptap";
import {black} from "next/dist/lib/picocolors";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {postsService} from "@/services";
import Post from "@/model/Post";


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: 'black',
}));

export default function Home() {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const rteRef = useRef<RichTextEditorRef>(null);

    const submitPost = () => {
        console.log("Calling Submit POSTS");

        postsService
            .createPost({
                title: title,
                contents: rteRef.current?.editor?.getHTML(),
                id: 0,
                summary: "",
                createdOn: "",
                updatedOn: "",
                category: null,
                tags: [],
                author: {
                    username: ""
                }
            })
            .then((data) => {
             //   setAllPosts(data);
              //  setLoading(false);
                // Chain additional calls here
                return data;
            })
            .catch((error) => {
                console.error("THIS IS ERROR: (posts) " + error);
            });
    };

    return (
        <Layout title='Create'>

            <Box sx={{flexGrow: 0}} margin={2}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item>Create new blog post</Item>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={8}>
                        <form>
                            <Item>

                                <TextField
                                    id="outlined-basic-name"
                                    label="Title"
                                    margin="dense"
                                    variant="outlined"
                                    value={title}
                                    sx={{ width: "18em" }}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setTitle(event.target.value);
                                    }}
                                />

                            </Item>
                            <Item>
                                <div>
                                    <RichTextEditor
                                        ref={rteRef}
                                        extensions={[StarterKit]} // Or any Tiptap extensions you wish!
                                        content="<p>Hello world</p>" // Initial content for the editor
                                        // Optionally include `renderControls` for a menu-bar atop the editor:
                                        renderControls={() => (
                                            <MenuControlsContainer>
                                                <MenuSelectHeading/>
                                                <MenuDivider/>
                                                <MenuButtonBold/>
                                                <MenuButtonItalic/>
                                                <MenuDivider />
                                                <MenuButtonOrderedList />

                                                <MenuButtonBulletedList />


                                                <MenuDivider />
                                                <MenuButtonCode />
                                                <MenuButtonCodeBlock />
                                                <MenuDivider />
                                                {/* Add more controls of your choosing here */}
                                            </MenuControlsContainer>
                                        )}
                                    />

                                    {/*<Button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>*/}
                                    {/*    Log HTML*/}
                                    {/*</Button>*/}
                                </div>
                            </Item>
                            <Item><Button onClick={() => submitPost()}>Submit</Button></Item>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Layout>

    )
}