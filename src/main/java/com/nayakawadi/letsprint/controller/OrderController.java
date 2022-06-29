package com.nayakawadi.letsprint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nayakawadi.letsprint.entity.Order;
import com.nayakawadi.letsprint.response.LongResponse;
import com.nayakawadi.letsprint.service.OrderService;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {
	@Autowired
	OrderService orderService;
	
	@GetMapping("/orders")
	public List<Order> getOrders(){
		return orderService.getOrders();
	}
	
	@GetMapping("/orders/{orderId}")
	public Order getOrder(@PathVariable String orderId) {
		return orderService.getOrder(Long.parseLong(orderId));
	}
	
	@GetMapping("/orders/sender/{sender}")
	public List<Order> getOrderBySender(@PathVariable String sender){
		return orderService.getOrderBySender(sender);
	}
	
	@GetMapping("/orders/reciever/{reciever}")
	public List<Order> getOrderByReciever(@PathVariable String reciever){
		return orderService.getOrderByReciever(reciever);
	}
	
	@PostMapping("/orders")
	public LongResponse addOrder(@RequestBody Order order) {
		return orderService.addOrder(order);
	}
	
	@PutMapping("/orders")
	public LongResponse updateOrder(@RequestBody Order order) {
		return orderService.updateOrder(order);
	}
	
	@PutMapping("/orders/{id}/status/{status}")
	public LongResponse updateStatus(@PathVariable String id, @PathVariable String status) {
		return orderService.updateStatus(Long.parseLong(id), status);
	}
	
	@DeleteMapping("/orders/{orderId}")
	public LongResponse deleteOrder(@PathVariable String orderId) {
		return orderService.deleteOrder(Long.parseLong(orderId));
	}
	
}
