package org.example.controllers;

import org.bson.Document;
import org.example.models.Order;
import org.example.models.Product;
import org.example.models.User;
import org.example.models.reportModels.*;
import org.example.services.MongoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

@RestController
public class Controller {
    public static MongoTemplate mongoTemplate;
    @Autowired
    MongoServiceImpl mongoService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        mongoTemplate = mongoService.mongoTemplate(username, password);
        System.out.println(mongoTemplate.getCollectionNames());
        return ResponseEntity.ok("Аунтефикация прошла успешно");
    }
    @PostMapping("/api/orders")
    public Order createOrder(@RequestBody Order order) {
        return mongoTemplate.save(order);
    }

    @GetMapping("/api/orders/{id}")
    public Order getOrderById(@PathVariable String id) {
        return mongoTemplate.findById(id, Order.class);
    }

    @GetMapping("/api/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> list = mongoTemplate.findAll(Order.class);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/api/orders/{id}")
    public Order updateOrder(@PathVariable String id, @RequestBody Order order) {
        order.setId(id);
        return mongoTemplate.save(order);
    }

    @DeleteMapping("/api/orders/{id}")
    public void deleteOrder(@PathVariable String id) {
        Order order = mongoTemplate.findById(id, Order.class);
        if (order != null) {
            mongoTemplate.remove(order);
        }
    }

    @GetMapping("/api/orders/search")
    public List<Order> searchOrders(@RequestParam String query) {
        // Example of a simple search query using MongoTemplate
        return mongoTemplate.find(
                Query.query(Criteria.where("buyerName").regex(query, "i")), // Case-insensitive regex search on the 'name' field
                Order.class
        );
    }

    @PostMapping("/api/products")
    public Product createProduct(@RequestBody Product product) {
        return mongoTemplate.save(product);
    }

    @GetMapping("/api/products/{id}")
    public Product getProductById(@PathVariable String id) {
        return mongoTemplate.findById(id, Product.class);
    }

    @GetMapping("/api/products")
    public List<Product> getAllProducts(@RequestParam(required = false) String sortBy,
                                        @RequestParam(required = false) String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order != null && order.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(direction, sortBy != null ? sortBy : "_id"); // Default sort by "_id" field if sortBy is not provided
        return mongoTemplate.find(org.springframework.data.mongodb.core.query.Query.query(new org.springframework.data.mongodb.core.query.Criteria()).with(sort), Product.class);
    }

    @PutMapping("/api/products/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
        product.setId(id);
        return mongoTemplate.save(product);
    }

    @DeleteMapping("/api/products/{id}")
    public void deleteProduct(@PathVariable String id) {
        Product product = mongoTemplate.findById(id, Product.class);
        if (product != null) {
            mongoTemplate.remove(product);
        }
    }
    @PostMapping("/api/users")
    public User createSeller(@RequestBody User seller) {
        return mongoTemplate.save(seller);
    }

    @GetMapping("/api/users/{id}")
    public User getSellerById(@PathVariable String id) {
        return mongoTemplate.findById(id, User.class, "users");
    }

    @GetMapping("/api/users")
    public List<User> getAllSellers(@RequestParam(required = false) String query) {
        //System.out.println("Current Database URL: " + env.getProperty("spring.data.mongodb.uri"));
        if (query != null) {
            mongoTemplate.find(Query.query(Criteria.where("name").regex(query, "i")), User.class);
            System.out.println(mongoTemplate.find(Query.query(Criteria.where("name").regex(query, "i")), User.class));
            return mongoTemplate.find(Query.query(Criteria.where("name").regex(query, "i")), User.class); // Placeholder, returns all sellers for demonstration
        }
        return mongoTemplate.findAll(User.class);
    }

    @PutMapping("/api/users/{id}")
    public User updateSeller(@PathVariable String id, @RequestBody User seller) {
        seller.setId(id);
        return mongoTemplate.save(seller);
    }

    @DeleteMapping("/api/users/{id}")
    public void deleteSeller(@PathVariable String id) {
        User seller = mongoTemplate.findById(id, User.class);
        if (seller != null) {
            mongoTemplate.remove(seller);
        }
    }

    @GetMapping("api/reports/average-price")
    public Double getAveragePrice() {
        Aggregation aggregation = newAggregation(
                Aggregation.group().avg("Price").as("averagePrice")
        );

        AggregationResults<Document> result = mongoTemplate.aggregate(aggregation, "products", Document.class);
        List<Document> documents = result.getMappedResults(); // Получаем список документов

        if (!documents.isEmpty()) {
            Document firstDocument = documents.get(0); // Берем первый документ из списка
            if (firstDocument.containsKey("averagePrice")) {
                double averagePrice = firstDocument.getDouble("averagePrice");
                System.out.println("Average Price of All Products: " + averagePrice);
                return averagePrice;
            } else {
                System.out.println("Field 'averagePrice' not found in the result.");
                return null;
            }
        } else {
            System.out.println("No results found.");
            return null;
        }
    }

    @GetMapping("api/reports/most-popular-order-name")
    public List<String> getMostPopularOrderName() {
        Aggregation aggregation = newAggregation(
                Aggregation.group("buyerName").count().as("orderCount")
        );

        AggregationResults<Document> result = mongoTemplate.aggregate(aggregation, "orders", Document.class);
        List<Document> documents = result.getMappedResults();

        System.out.println(result.getRawResults());

        int max = 0;
        for(Document doc : documents){
            if(doc.getInteger("orderCount") > max){
                max = doc.getInteger("orderCount");
            }
        }


        List<String> mostPopularOrderName = new ArrayList<>();

        if (!documents.isEmpty()) {
            for(Document doc : documents){
                if(doc.getInteger("orderCount") == max)
                    mostPopularOrderName.add(doc.getString("_id"));
            }
            System.out.println("Most popular order name: " + mostPopularOrderName);
            return mostPopularOrderName;
        } else {
            System.out.println("No orders found.");
            mostPopularOrderName.add("No orders found.");
            return mostPopularOrderName;
        }
    }


    @GetMapping("/api/reports/get-len-users")
    public AggregationCount getLenUsers() {
        // Corrected aggregation query
        Aggregation aggregation = Aggregation.newAggregation(Aggregation.count().as("total"));
        AggregationResults<AggregationCount> result = mongoTemplate.aggregate(aggregation, "users", AggregationCount.class);

        // Assuming the result contains a single document with the count
        AggregationCount aggregationCount = result.getUniqueMappedResult();
        if (aggregationCount!= null) {
            System.out.println("Total Users Count: " + aggregationCount.getTotal());
        }
        return aggregationCount;
    }


    @GetMapping("/api/reports/get-len-products")
    public AggregationCount getLenProducts() {
        Aggregation aggregation = Aggregation.newAggregation(Aggregation.count().as("total"));
        AggregationResults<AggregationCount> result = mongoTemplate.aggregate(aggregation, "products", AggregationCount.class);

        AggregationCount aggregationCount = result.getUniqueMappedResult();
        if (aggregationCount!= null) {
            System.out.println("Total Products Count: " + aggregationCount.getTotal());
        }
        return aggregationCount;
    }

    @GetMapping("/api/reports/get-len-orders")
    public AggregationCount getLenOrders() {
        Aggregation aggregation = Aggregation.newAggregation(Aggregation.count().as("total"));
        AggregationResults<AggregationCount> result = mongoTemplate.aggregate(aggregation, "orders", AggregationCount.class);

        AggregationCount aggregationCount = result.getUniqueMappedResult();
        if (aggregationCount!= null) {
            System.out.println("Total Orders Count: " + aggregationCount.getTotal());
        }
        return aggregationCount;
    }


}