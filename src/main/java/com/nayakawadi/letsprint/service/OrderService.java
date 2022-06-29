package com.nayakawadi.letsprint.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nayakawadi.letsprint.dao.OrderDao;
import com.nayakawadi.letsprint.entity.Order;
import com.nayakawadi.letsprint.response.LongResponse;

@Service
public class OrderService {
	
	@Autowired
	OrderDao orderDao;
	
	public List<Order> getOrders(){
		return orderDao.findAll();
	}
	
	public Order getOrder(Long id) {
		return orderDao.getById(id);
	}
	
	public LongResponse addOrder(Order order) {
		Order entity = orderDao.save(order);
		return new LongResponse(entity.getId(), "Order Placed Successfully", true);		
	}
	
	public LongResponse updateOrder(Order order) {
		Order entity = orderDao.save(order);
		return new LongResponse(entity.getId(), "Order Updated Successfully", true);		
	}
	
	public LongResponse deleteOrder(Long id) {
		Order entity = orderDao.getById(id);
		orderDao.delete(entity);
		return new LongResponse(entity.getId(), "Order Deleted Successfully", true);
	}

	public List<Order> getOrderBySender(String sender) {
		return orderDao.findBySender(sender);
	}

	public List<Order> getOrderByReciever(String reciever) {
		return orderDao.findByReciever(reciever);
	}

	public LongResponse updateStatus(Long id, String status) {
		orderDao.updateStatus(status, id);
		return new LongResponse(id, "Status Changed Successfully", true);
	}
}
