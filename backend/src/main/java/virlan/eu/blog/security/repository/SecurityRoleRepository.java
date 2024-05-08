package virlan.eu.blog.security.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import virlan.eu.blog.model.Role;
import virlan.eu.blog.security.model.ERole;

import java.util.Optional;

public interface SecurityRoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole role);
}
