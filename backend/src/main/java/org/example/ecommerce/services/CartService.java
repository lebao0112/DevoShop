package org.example.ecommerce.services;

import jakarta.servlet.http.HttpSession;
import org.example.ecommerce.dto.CartItemDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private static final String SESSION_CART = "cart";

    public List<CartItemDTO> getCart(HttpSession session) {
        List<CartItemDTO> cart = (List<CartItemDTO>) session.getAttribute(SESSION_CART);
        return cart != null ? cart : new ArrayList<>();
    }

    public void addToCart(HttpSession session, CartItemDTO item) {
        List<CartItemDTO> cart = getCart(session);
        Optional<CartItemDTO> existing = cart.stream()
                .filter(c -> c.getProductId().equals(item.getProductId()))
                .findFirst();

        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + item.getQuantity());
        } else {
            cart.add(item);
        }
        session.setAttribute(SESSION_CART, cart);
    }

    public void removeFromCart(HttpSession session, Long productId) {
        List<CartItemDTO> cart = getCart(session);
        cart.removeIf(item -> item.getProductId().equals(productId));
        session.setAttribute(SESSION_CART, cart);
    }

    public void updateQuantity(HttpSession session, Long productId, int quantity) {
        List<CartItemDTO> cart = getCart(session);
        cart.stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));
        session.setAttribute(SESSION_CART, cart);
    }

    public void clearCart(HttpSession session) {
        session.removeAttribute(SESSION_CART);
    }
}
