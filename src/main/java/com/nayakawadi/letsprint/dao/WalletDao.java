package com.nayakawadi.letsprint.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nayakawadi.letsprint.entity.Wallet;

@Repository
public interface WalletDao extends JpaRepository<Wallet, Long>{
	public List<Wallet> findBySender(String sender);
	public List<Wallet> findByReciever(String reciever);
	
}
