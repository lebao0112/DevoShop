package org.example.ecommerce.services;

import org.example.ecommerce.models.OrderItem;
import org.example.ecommerce.repositories.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> getOrderItemById(Long id) {
        return orderItemRepository.findById(id);
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public OrderItem updateOrderItem(Long id, OrderItem orderItemDetails) {
        return orderItemRepository.findById(id).map(orderItem -> {
            orderItem.setQuantity(orderItemDetails.getQuantity());
            orderItem.setPrice(orderItemDetails.getPrice());
            return orderItemRepository.save(orderItem);
        }).orElseThrow(() -> new RuntimeException("Order Item not found"));
    }

    public void deleteOrderItem(Long id) {
        orderItemRepository.deleteById(id);
    }
}