package org.example.ecommerce.controllers.customer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.ecommerce.dto.OrderItemDTO;
import org.example.ecommerce.enums.OrderStatus;
import org.example.ecommerce.enums.PaymentMethod;
import org.example.ecommerce.enums.PaymentStatus;
import org.example.ecommerce.models.*;
import org.example.ecommerce.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/customer/payments")
public class PaymentController {
    @Autowired
    private VNPAYService vnPayService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @GetMapping({"", "/"})
    public String home(){
        return "createOrder";
    }


//    @PostMapping("/create-payment")
//    public ResponseEntity<?> submidOrder(@RequestBody Map<String, String> data,
//                                      HttpServletRequest request){
////        String userId = data.get("userId");
//        String userEmail = request.getAttribute("email").toString();
////        String orderItems =  data.get("orderItems");
////        System.out.println(orderItems);
//        String orderAmount = data.get("orderAmount").toString();
//        String orderItemsEncoded = data.get("orderItemsEncoded");
//        String orderStatus = String.valueOf(OrderStatus.PENDING);
//
//        String orderInfo = userEmail + "&" + orderAmount + "&" + orderStatus + "&" + orderItemsEncoded;
//
////        String orderInfo = userEmail + "&" + orderAmount + "&"  + orderStatus;
//
//        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
//        String vnpayUrl = vnPayService.createVnpayOrder(request, Integer.parseInt(orderAmount), orderInfo, baseUrl);
//        return ResponseEntity.ok(Map.of("vnpayUrl", vnpayUrl));
//    }
@PostMapping("/create-payment")
public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> data,
                                       HttpServletRequest request) {
    String userEmail = request.getAttribute("email").toString();
    BigDecimal orderAmount = new BigDecimal(data.get("orderAmount").toString());

    ObjectMapper mapper = new ObjectMapper();
    List<OrderItemDTO> orderItemDTOs = mapper.convertValue(data.get("orderItems"),
            new TypeReference<>() {});

    Optional<User> userOpt = userService.getUserByEmail(userEmail);
    if (userOpt.isEmpty()) {
        return ResponseEntity.badRequest().body("User not found");
    }
    User user = userOpt.get();

    // 1. Tạo đơn hàng
    Order order = new Order();
    order.setId(generateOrderId());
    order.setUser(user);
    order.setStatus(OrderStatus.PENDING);
    order.setTotalPrice(orderAmount);

    List<OrderItem> orderItems = new ArrayList<>();
    for (OrderItemDTO dto : orderItemDTOs) {
        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setProduct(productService.getProductById(dto.getProductId()));
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        orderItems.add(item);
    }

    order.setOrderItems(orderItems);
    orderService.create(order); // sẽ cascade lưu OrderItem

    // 2. Gửi sang VNPAY
    String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
    String vnpUrl = vnPayService.createVnpayOrder(request, orderAmount.intValue(), order.getId(), baseUrl);

    return ResponseEntity.ok(Map.of("vnpayUrl", vnpUrl));
}


//    @GetMapping("/vnpay-payment-return")
//    public void  paymentCompleted(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
//        int paymentStatus =vnPayService.orderReturn(request);
//
//        String orderInfo = request.getParameter("vnp_OrderInfo");
//        String paymentTime = request.getParameter("vnp_PayDate");
//        String transactionId = request.getParameter("vnp_TransactionNo");
//        String totalPrice = request.getParameter("vnp_Amount");
//
//        String[] parts = orderInfo.split("&", 4);
//        String userEmail = parts[0];
//        BigDecimal totalAmount = new BigDecimal(parts[1]);
//        String encodedItems = parts[3];
//
//        String orderItemsJson = new String(Base64.getDecoder().decode(encodedItems));
//        ObjectMapper mapper = new ObjectMapper();
//        List<OrderItemDTO> cartItems = mapper.readValue(orderItemsJson, new TypeReference<>() {});
//
//
//
//        Optional<User> userOptional = userService.getUserByEmail(userEmail);
//        User user;
//        if(!userOptional.isEmpty()){
//            user = userOptional.get();
//        } else {
//            response.sendRedirect("http://localhost:5173/payment-result?status=fail&massage=Thanh%20toan%20that%20bai");
//            return;
//        }
//
//        Order newOrder = new Order();
//
//        newOrder.setUser(user);
//        newOrder.setId(generateOrderId());
//        newOrder.setStatus(OrderStatus.CONFIRMED);
//        newOrder.setTotalPrice(totalAmount);
//        List<OrderItem> orderItems = new ArrayList<>();
//        for (OrderItemDTO item : cartItems) {
//            OrderItem orderItem = new OrderItem();
//            orderItem.setOrder(newOrder);
//
//            Optional<Product> productOptional = productService.getProductById(item.getProductId());
//            if(!productOptional.isEmpty()){
//                orderItem.setProduct(productOptional.get());
//            } else {
//                response.sendRedirect("http://localhost:5173/payment-result?status=fail&massage=Thanh%20toan%20that%20bai");
//                return;
//            }
//            orderItem.setQuantity(item.getQuantity());
//            orderItem.setPrice(item.getPrice());
//            orderItems.add(orderItem);
//        }
//        newOrder.setOrderItems(orderItems);
//        Order createdOrder =  orderService.createOrder(newOrder);
//
////        List<OrderItem> orderItems = new ArrayList<>();
////
////        for(OrderItemDTO item : cartItemsFromFrontend){
////            OrderItem orderItem = new OrderItem();
////            orderItem.setOrder(createdOrder);
////            orderItem.setProduct(productService.getProductById(item.getProductId())); // cần load Product
////            orderItem.setQuantity(item.getQuantity());
////            orderItem.setPrice(item.getPrice());
////            orderItems.add(orderItem);
////        }
//
//        Payment newPayment = new Payment();
//        newPayment.setId(transactionId);
//        newPayment.setOrder(createdOrder);
//        newPayment.setPaymentMethod(PaymentMethod.VNPAY);
//        newPayment.setStatus(PaymentStatus.COMPLETED);
//        paymentService.createPayment(newPayment);
////
////        if(paymentStatus == 1){
////            Order newOrder = new Order();
////            newOrder.setStatus(OrderStatus.PENDING);
////            newOrder.setTotalPrice(BigDecimal.valueOf(Long.parseLong(totalPrice)));
////            newOrder.setUser();
////
////
////            paymentService.createPayment();
////        }
////
////        return paymentStatus == 1 ? "ordersuccess" : "orderfail";
//        if(paymentStatus == 1){
//            response.sendRedirect("http://localhost:5173/cart?status=success&massage=Thanh%20toan%20thanh%20cong");
//        } else {
//            response.sendRedirect("http://localhost:5173/cart?status=fail&massage=Thanh%20toan%20that%20bai");
//        }
//    }
@GetMapping("/vnpay-payment-return")
public void paymentCompleted(HttpServletRequest request, HttpServletResponse response) throws IOException {
    int paymentStatus = vnPayService.orderReturn(request);

    String orderId = request.getParameter("vnp_OrderInfo");
    String transactionId = request.getParameter("vnp_TransactionNo");

    Order order = orderService.getOrderById(orderId);


    if (paymentStatus == 1) {
        order.setStatus(OrderStatus.CONFIRMED);
        orderService.create(order);

        Payment payment = new Payment();
        payment.setId(transactionId);
        payment.setOrder(order);
        payment.setPaymentMethod(PaymentMethod.VNPAY);
        payment.setStatus(PaymentStatus.COMPLETED);
        paymentService.createPayment(payment);

        response.sendRedirect("http://localhost:5173/cart?status=success&message=Thanh%20toan%20thanh%20cong");
    } else {
        response.sendRedirect("http://localhost:5173/cart?status=fail&message=Thanh%20toan%20that%20bai");
    }
}


    public static String generateOrderId() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

}
