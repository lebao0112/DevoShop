package org.example.ecommerce.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.github.cdimascio.dotenv.Dotenv;
import java.util.HashMap;
import java.util.Map;

// This configuration class sets up the Cloudinary service for image uploads.
@Configuration
public class CloudinaryConfig {
    Dotenv dotenv = Dotenv.load();

    @Bean
    public Cloudinary cloudinary(){
        final Map<String, String> config = new HashMap<>();
        config.put("cloud_name", dotenv.get("CLOUDINARY_CLOUD_NAME"));
        config.put("api_key", dotenv.get("CLOUDINARY_API_KEY"));
        config.put("api_secret", dotenv.get("CLOUDINARY_API_SECRET"));

        return new Cloudinary(config);
    }
}
