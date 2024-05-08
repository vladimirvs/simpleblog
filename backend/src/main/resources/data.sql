insert into role(name) values ('ROLE_USER');
insert into role(name) values ('ROLE_MODERATOR');
insert into role(name) values ('ROLE_ADMIN');

commit;

INSERT INTO users (email,password,username) VALUES ('acv@acv.com','$2a$10$LulkaiGQgJo8fN4cIe6o1eyaLjviLepTQg9TYlf4yvyRahhyJqUOK','user');
insert into users_to_roles (user_id, role_id) values (1, 1);


