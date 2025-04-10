package org.example.ecommerce.controllers.customer;

import jakarta.servlet.http.HttpSession;
import org.example.ecommerce.dto.CartItemDTO;
import org.example.ecommerce.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<CartItemDTO> getCart(HttpSession session) {
        System.out.println(session.getAttribute("cart"));
        if (session.getAttribute("cart") == null) {
            session.setAttribute("cart", cartService.getCart(session)); // Create empty cart if no session cart
        }
        System.out.println(session.getId());
        return cartService.getCart(session);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartItemDTO item, HttpSession session) {
        cartService.addToCart(session, item);
        return ResponseEntity.ok("Đã thêm vào giỏ hàng");
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestBody CartItemDTO item, HttpSession session) {
        cartService.removeFromCart(session, item.getProductId());
        return ResponseEntity.ok("Đã xóa sản phẩm khỏi giỏ hàng");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateQuantity(@RequestBody CartItemDTO item, HttpSession session) {
        cartService.updateQuantity(session, item.getProductId(), item.getQuantity());
        return ResponseEntity.ok("Đã cập nhật số lượng");
    }

    @PostMapping("/clear")
    public ResponseEntity<String> clearCart(HttpSession session) {
        cartService.clearCart(session);
        return ResponseEntity.ok("Đã xóa giỏ hàng");
    }
}
