package virlan.eu.blog.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import virlan.eu.blog.model.User;
import virlan.eu.blog.repository.UserRepository;

import java.security.Principal;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("/api/user")
@Slf4j
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<User> getUser(@PathVariable String userId, Principal principal) {

        if (principal == null) {
            log.error("Not logged in!");
        }

        assert principal != null;
        log.info("User is {}", principal.getName());

        Optional<User> byUsername = userRepository.findByUsername(principal.getName());

        if (byUsername.isPresent()) {
            User user = byUsername.get();
            user.setPassword(""); // for security reasons
            return ResponseEntity.ok(user);
        }

        // not found
        return ResponseEntity.notFound().build();


    }

}
