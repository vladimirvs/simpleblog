package virlan.eu.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import virlan.eu.blog.model.Post;
import virlan.eu.blog.model.User;

public interface PostRepository  extends JpaRepository<Post, Long> {

}
