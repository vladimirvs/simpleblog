package virlan.eu.blog.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import virlan.eu.blog.security.model.ERole;


@Entity
@Table(name = "role")
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column
    private ERole name;

    public ERole getName() {
        return name;
    }

}

