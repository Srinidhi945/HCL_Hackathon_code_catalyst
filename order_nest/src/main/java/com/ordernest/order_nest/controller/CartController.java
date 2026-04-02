package com.ordernest.order_nest.controller;

import com.ordernest.order_nest.model.Cart;
import com.ordernest.order_nest.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }

    @GetMapping("/{userId}")
    public List<Cart> getUserCart(@PathVariable Long userId) {
        return cartService.getCartByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartService.removeItem(id);
    }
}