package virlan.eu.blog.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import virlan.eu.blog.model.Post;
import virlan.eu.blog.model.User;
import virlan.eu.blog.repository.PostRepository;
import virlan.eu.blog.security.service.UserDetailsServiceImpl;
import virlan.eu.blog.service.PostService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/post")
@Slf4j
public class PostController {
    private final PostRepository postRepository;
    private final PostService postService;
    private final UserDetailsServiceImpl userDetailsService;

    public PostController(PostRepository postRepository, PostService postService, UserDetailsServiceImpl userDetailsService) {
        this.postRepository = postRepository;
        this.postService = postService;
        this.userDetailsService = userDetailsService;
    }


    @GetMapping("/")
    public ResponseEntity<List<Post>> getNewestPosts() {
        List<Post> createdOn = postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdOn"));
        return ResponseEntity.of(Optional.of(createdOn));
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Post> createPost(@RequestBody Post post, Principal principal) {
        String principalName = principal.getName();
        Optional<User> user = userDetailsService.findByUsername(principalName);
        log.info("Creating post: {} by Principal {} User Details = {}", post, principal, user);
        post.setAuthor(user.get());
        Optional<Post> saved = postService.createPost(post);
        log.info("Created post: {}", saved);
        return ResponseEntity.of(saved);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPost(@PathVariable("postId") Long postId) {
        log.info("Getting post by ID: {}", postId);
        return ResponseEntity.of(postRepository.findById(postId));
    }
}
