package net.xraze.xrz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import net.xraze.xrz.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class XrzApplication {

	public static void main(String[] args) {
		SpringApplication.run(XrzApplication.class, args);
	}

}
