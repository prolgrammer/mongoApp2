//package org.example.controllers;
//
//import org.example.models.Order;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//public class OrdersController {
//    MongoTemplate mongoTemplate = Controller.mongoTemplate;
//
//    @PostMapping("/api/orders")
//    public Order createOrder(@RequestBody Order order) {
//        return mongoTemplate.save(order);
//    }
//
//    @GetMapping("/api/orders/{id}")
//    public Order getOrderById(@PathVariable String id) {
//        return mongoTemplate.findById(id, Order.class);
//    }
//
//    @GetMapping("/api/orders")
//    public ResponseEntity<List<Order>> getAllOrders() {
//        List<Order> list = mongoTemplate.findAll(Order.class);
//        return ResponseEntity.ok(list);
//    }
//
//    @PutMapping("/api/orders/{id}")
//    public Order updateOrder(@PathVariable String id, @RequestBody Order order) {
//        order.setId(id);
//        return mongoTemplate.save(order);
//    }
//
//    @DeleteMapping("/api/orders/{id}")
//    public void deleteOrder(@PathVariable String id) {
//        Order order = mongoTemplate.findById(id, Order.class);
//        if (order != null) {
//            mongoTemplate.remove(order);
//        }
//    }
//
//    @GetMapping("/api/orders/search")
//    public List<Order> searchOrders(@RequestParam String query) {
//        // Example of a simple search query using MongoTemplate
//        return mongoTemplate.find(
//                Query.query(Criteria.where("buyerName").regex(query, "i")), // Case-insensitive regex search on the 'name' field
//                Order.class
//        );
//    }
//}
