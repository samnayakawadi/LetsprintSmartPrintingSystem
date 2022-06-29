package com.nayakawadi.letsprint.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.nayakawadi.letsprint.entity.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Long> {
	List<Order> findBySender(String sender);
	List<Order> findByReciever(String reciever);
	
	@Transactional
	@Modifying
	@Query("UPDATE Order SET status = :status WHERE id = :id")
	Integer updateStatus(String status,Long id);
}
