package org.example.services;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.example.Conf.ParamsConf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class MongoServiceImpl implements MongoService{

    private final ParamsConf paramsConf;

    public MongoServiceImpl(ParamsConf paramsConf) {
        this.paramsConf = paramsConf;
    }

    public MongoTemplate mongoTemplate(String name, String password) {
        String connectionString = paramsConf.getDb() + name + ":" + password + paramsConf.getHost() + paramsConf.getDbName();
        System.out.println(connectionString);
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .build();
        MongoClient mongoClient = MongoClients.create(mongoClientSettings);
        return new MongoTemplate(mongoClient, "MarketDB");
    }
}
