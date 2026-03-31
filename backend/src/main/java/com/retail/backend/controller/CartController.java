package com.retail.backend.controller;

import com.retail.backend.dto.CartItemRequest;
import com.retail.backend.dto.CartResponse;
import com.retail.backend.dto.CheckoutResponse;
import com.retail.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addToCart(@RequestBody CartItemRequest request) {
        return ResponseEntity.ok(cartService.addToCart(request));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(@PathVariable Long cartItemId,
                                                       @RequestBody Map<String, Integer> payload) {
        return ResponseEntity.ok(cartService.updateCartItem(cartItemId, payload.get("quantity")));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponse> removeCartItem(@PathVariable Long cartItemId) {
        return ResponseEntity.ok(cartService.removeCartItem(cartItemId));
    }

    @PostMapping("/checkout/{userId}")
    public ResponseEntity<CheckoutResponse> checkout(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.checkout(userId));
    }
}
