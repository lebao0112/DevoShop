package org.example.ecommerce.services;


import org.example.ecommerce.enums.OrderStatus;
import org.example.ecommerce.models.Order;
import org.example.ecommerce.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }



    public Order create(Order order) {
        return orderRepository.save(order);
    }
    public Order getOrderById(String id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if(orderOptional.isEmpty()){
            throw new RuntimeException("Order not found");
        }
        return orderOptional.get();
    }

    public Order updateOrder(String id, Order orderDetails) {
        return orderRepository.findById(id).map(order -> {
            order.setStatus(orderDetails.getStatus(OrderStatus.PENDING.toString()));
            order.setTotalPrice(orderDetails.getTotalPrice());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}