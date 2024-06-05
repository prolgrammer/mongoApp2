//package org.example.controllers;
//
//import org.example.models.Product;
//import org.example.models.reportModels.AveragePriceBySeller;
//import org.example.models.reportModels.PriceRange;
//import org.example.models.reportModels.ProductCountBySeller;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.aggregation.Aggregation;
//import org.springframework.data.mongodb.core.aggregation.AggregationResults;
//import org.springframework.web.bind.annotation.GetMapping;
//
//import java.util.List;
//
//import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
//import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
//
//public class ReportController {
//    MongoTemplate mongoTemplate = Controller.mongoTemplate;
//
//    @GetMapping("api/reports/average-price-by-seller")
//    public List<AveragePriceBySeller> getAveragePriceBySeller() {
//        Aggregation aggregation = newAggregation(
//                group("sellerId")
//                        .avg("price").as("averagePrice")
//        );
//
//        AggregationResults<AveragePriceBySeller> result = mongoTemplate.aggregate(aggregation, Product.class, AveragePriceBySeller.class);
//        result.getMappedResults().forEach(item -> System.out.println(item.getSellerId() + ": " + item.getAveragePrice()));
//        return result.getMappedResults();
//    }
//
//    @GetMapping("api/reports/product-count-by-seller")
//    public List<ProductCountBySeller> getProductCountBySeller() {
//        Aggregation aggregation = newAggregation(
//                group("sellerId")
//                        .count().as("productCount")
//        );
//
//        AggregationResults<ProductCountBySeller> result = mongoTemplate.aggregate(aggregation, Product.class, ProductCountBySeller.class);
//        result.getMappedResults().forEach(item -> System.out.println(item.getSellerId() + ": " + item.getProductCount()));
//        return result.getMappedResults();
//    }
//
//    @GetMapping("api/reports/product-price-range")
//    public PriceRange getProductPriceRange() {
//        Aggregation aggregation = newAggregation(
//                group()
//                        .min("price").as("minPrice")
//                        .max("price").as("maxPrice")
//        );
//
//        AggregationResults<PriceRange> result = mongoTemplate.aggregate(aggregation, Product.class, PriceRange.class);
//        PriceRange priceRange = result.getUniqueMappedResult();
//        if (priceRange != null) {
//            System.out.println("Min Price: " + priceRange.getMinPrice() + ", Max Price: " + priceRange.getMaxPrice());
//        }
//        return priceRange;
//    }
//}
