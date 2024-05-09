package virlan.eu.blog.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import virlan.eu.blog.model.Post;
import virlan.eu.blog.repository.PostRepository;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class PostService {
    private final PostRepository postRepository;
    private final Clock clock = Clock.systemDefaultZone();

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Optional<Post> createPost(Post post) {
        log.info("Creating post: {}", post);
        post.setCreatedOn(LocalDateTime.now(clock));


        Post saved = postRepository.save(post);
        log.info("Created post: {}", saved);
        return Optional.of(saved);
    }
}
