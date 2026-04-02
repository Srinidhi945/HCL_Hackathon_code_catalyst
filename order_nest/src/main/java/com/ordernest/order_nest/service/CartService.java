package com.ordernest.order_nest.service;

import com.ordernest.order_nest.model.Cart;
import com.ordernest.order_nest.repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getCartByUser(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeItem(Long id) {
        cartRepository.deleteById(id);
    }
}