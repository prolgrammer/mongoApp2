package org.example.services;

import org.springframework.data.mongodb.core.MongoTemplate;

public interface MongoService {

    MongoTemplate mongoTemplate(String name, String password);
}