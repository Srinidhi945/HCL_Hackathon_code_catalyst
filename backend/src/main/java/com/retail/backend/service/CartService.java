package com.retail.backend.service;

import com.retail.backend.dto.CartItemRequest;
import com.retail.backend.dto.CartItemResponse;
import com.retail.backend.dto.CartResponse;
import com.retail.backend.dto.CheckoutResponse;
import com.retail.backend.dto.OrderRequest;
import com.retail.backend.dto.OrderResponse;
import com.retail.backend.entity.CartItem;
import com.retail.backend.entity.Product;
import com.retail.backend.entity.User;
import com.retail.backend.repository.CartItemRepository;
import com.retail.backend.repository.ProductRepository;
import com.retail.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderService orderService;

    @Transactional
    public CartResponse addToCart(CartItemRequest request) {
        validateCartRequest(request);

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        CartItem cartItem = cartItemRepository.findByUser_UserIdAndProduct_ProductId(
                        request.getUserId(), request.getProductId())
                .orElseGet(CartItem::new);

        cartItem.setUser(user);
        cartItem.setProduct(product);
        int existingQuantity = cartItem.getQuantity() == null ? 0 : cartItem.getQuantity();
        cartItem.setQuantity(existingQuantity + request.getQuantity());
        cartItemRepository.save(cartItem);

        return getCartByUserId(request.getUserId());
    }

    public CartResponse getCartByUserId(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<CartItemResponse> items = cartItemRepository.findByUser_UserId(userId)
                .stream()
                .map(this::mapToCartItemResponse)
                .toList();

        double grandTotal = items.stream()
                .mapToDouble(CartItemResponse::getLineTotal)
                .sum();

        return new CartResponse(userId, items, grandTotal);
    }

    @Transactional
    public CartResponse updateCartItem(Long cartItemId, Integer quantity) {
        if (quantity == null || quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);

        return getCartByUserId(cartItem.getUser().getUserId());
    }

    @Transactional
    public CartResponse removeCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));
        Long userId = cartItem.getUser().getUserId();
        cartItemRepository.delete(cartItem);
        return getCartByUserId(userId);
    }

    @Transactional
    public CheckoutResponse checkout(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUser_UserId(userId);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }

        List<OrderResponse> orders = cartItems.stream()
                .map(cartItem -> orderService.placeOrder(new OrderRequest(
                        userId,
                        cartItem.getProduct().getProductId(),
                        cartItem.getQuantity()
                )))
                .toList();

        cartItemRepository.deleteByUser_UserId(userId);

        int totalItems = orders.stream().mapToInt(OrderResponse::getQuantity).sum();
        double totalAmount = orders.stream().mapToDouble(OrderResponse::getTotalPrice).sum();
        return new CheckoutResponse(userId, totalItems, totalAmount, orders);
    }

    private void validateCartRequest(CartItemRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Cart request is required");
        }
        if (request.getUserId() == null) {
            throw new IllegalArgumentException("User id is required");
        }
        if (request.getProductId() == null) {
            throw new IllegalArgumentException("Product id is required");
        }
        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }
    }

    private CartItemResponse mapToCartItemResponse(CartItem cartItem) {
        double unitPrice = cartItem.getProduct().getPrice();
        return new CartItemResponse(
                cartItem.getCartItemId(),
                cartItem.getProduct().getProductId(),
                cartItem.getProduct().getName(),
                cartItem.getQuantity(),
                unitPrice,
                unitPrice * cartItem.getQuantity()
        );
    }
}
