package com.ordernest.order_nest.controller;

import com.ordernest.order_nest.model.Order;
import com.ordernest.order_nest.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place/{userId}")
    public Order placeOrder(@PathVariable Long userId){
        return orderService.placeOrder(userId);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId){
        return orderService.getOrdersByUser(userId);
    }
}