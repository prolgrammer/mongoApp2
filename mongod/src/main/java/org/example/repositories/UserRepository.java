package org.example.Repositories;

import org.example.dto.UserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserDTO, String> {
    UserDTO findByUsername(String username);
}
