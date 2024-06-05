//package org.example.controllers;
//
//import org.example.models.User;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//public class UserController {
//    MongoTemplate mongoTemplate = Controller.mongoTemplate;
//
//    @PostMapping("/api/users")
//    public User createSeller(@RequestBody User seller) {
//        return mongoTemplate.save(seller);
//    }
//
//    @GetMapping("/api/users/{id}")
//    public User getSellerById(@PathVariable String id) {
//        return mongoTemplate.findById(id, User.class);
//    }
//
//    @GetMapping("/api/users")
//    public List<User> getAllSellers(@RequestParam(required = false) String query) {
//        //System.out.println("Current Database URL: " + env.getProperty("spring.data.mongodb.uri"));
//        if (query != null) {
//            System.out.println(123);
//            mongoTemplate.find(Query.query(Criteria.where("name").regex(query, "i")), User.class);
//            System.out.println(mongoTemplate.find(Query.query(Criteria.where("name").regex(query, "i")), User.class));
//            return mongoTemplate.find(Query.query(Criteria.where("name").regex(query, "i")), User.class); // Placeholder, returns all sellers for demonstration
//        }
//        return mongoTemplate.findAll(User.class);
//    }
//
//    @PutMapping("/api/users/{id}")
//    public User updateSeller(@PathVariable String id, @RequestBody User seller) {
//        seller.setId(id);
//        return mongoTemplate.save(seller);
//    }
//
//    @DeleteMapping("/api/users/{id}")
//    public void deleteSeller(@PathVariable String id) {
//        User seller = mongoTemplate.findById(id, User.class);
//        if (seller != null) {
//            mongoTemplate.remove(seller);
//        }
//    }
//}
