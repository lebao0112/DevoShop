package org.example.ecommerce.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private FreeMarkerConfigurer freemarkerConfigurer;


    public void sendVerificationEmail(String to, String verificationLink, String firstName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Xác minh tài khoản của bạn");
            String templateContent = loadEmailTemplate(firstName, "Devo Shop", verificationLink);

            helper.setText(templateContent, true); // Set HTML content
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Gửi email thất bại!", e);
        }
    }
    private String loadEmailTemplate(String firstName, String companyName, String verificationLink) throws MessagingException {
        try {
            // Load and fill the template
            StringWriter writer = new StringWriter();
            Map<String, Object> model = new HashMap<>();
            model.put("first_name", firstName);
            model.put("company_name", companyName);
            model.put("verification_link", verificationLink);

            freemarkerConfigurer.getConfiguration().getTemplate("verify_email.html").process(model, writer);

            return writer.toString();  // Return the processed template as a string
        } catch (Exception e) {
            throw new MessagingException("Error processing email template", e);
        }
    }
}
