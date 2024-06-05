package org.example.Conf;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class ParamsConf {
    @Value("${DB}")
    private String db;
    @Value("${DB_HOST}")
    private String host;
    @Value("${DB_NAME}")
    private String dbName;
}
