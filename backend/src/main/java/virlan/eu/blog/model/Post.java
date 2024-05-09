package virlan.eu.blog.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String contents;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id")
    private User author;

    @OneToMany
    private List<Comment> comments;

    @ManyToMany
    @JoinTable(
            name = "post_tags", // Name of the join table
            joinColumns = @JoinColumn(name = "post_id"), // Foreign key column for Post
            inverseJoinColumns = @JoinColumn(name = "tag_id") // Foreign key column for Tag
    )
    private List<Tag> tags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
