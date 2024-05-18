import PostDetailsComponent from "@/components/PostDetailsComponent";
import Post from "@/model/Post";
import { postsService } from "@/services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostDetailsPage() {
    const router = useRouter();
    const {postId} = router.query;
    const [post, setPost] = useState<Post | undefined>(undefined);
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
      setLoading(true);
      if (postId) {
      getPosts();
      }
    }, [postId]);

  

    // if (!postId) {
    //     return <p>Loading...</p>;
    //   }

      const getPosts = () => {
        console.log("Got postId in Page: "+postId);
        const postIdNumber: number = typeof postId === 'string' ? parseInt(postId, 10) : 0;
        console.log("Calling POSTS");
        postsService
          .getPost(0, postIdNumber)
          .then((data) => {
            setPost(data);
            setLoading(false);
            // Chain additional calls here
            return data;
          })
          .catch((error) => {
            console.error("THIS IS ERROR: (sources) " + error);
            setPost(undefined);
          });
      };

  
    
    
    return (
        <PostDetailsComponent post={post}></PostDetailsComponent>
    )
}