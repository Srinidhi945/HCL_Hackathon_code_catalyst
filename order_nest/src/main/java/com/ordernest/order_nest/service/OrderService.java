package com.ordernest.order_nest.service;

import com.ordernest.order_nest.model.*;
import com.ordernest.order_nest.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order placeOrder(Long userId) {

        List<Cart> cartItems = cartRepository.findByUserId(userId);

        if(cartItems.isEmpty()){
            throw new RuntimeException("Cart is empty");
        }

        double total = 0;

        for(Cart cart : cartItems){
            total += cart.getProduct().getPrice() * cart.getQuantity();
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setTotalPrice(total);
        order.setStatus("PLACED");

        order = orderRepository.save(order);

        for(Cart cart : cartItems){

            Product product = cart.getProduct();

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(cart.getQuantity());
            item.setPrice(product.getPrice());

            orderItemRepository.save(item);

            product.setStock(product.getStock() - cart.getQuantity());
            productRepository.save(product);
        }

        cartRepository.deleteAll(cartItems);

        return order;
    }

    public List<Order> getOrdersByUser(Long userId){
        return orderRepository.findByUserId(userId);
    }
}