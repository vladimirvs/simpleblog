package virlan.eu.blog.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import virlan.eu.blog.model.User;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByEmail(String email);


    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
