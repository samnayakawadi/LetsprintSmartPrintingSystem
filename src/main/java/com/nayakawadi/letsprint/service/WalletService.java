package com.nayakawadi.letsprint.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nayakawadi.letsprint.dao.WalletDao;
import com.nayakawadi.letsprint.entity.Wallet;
import com.nayakawadi.letsprint.response.LongResponse;

@Service
public class WalletService {
	@Autowired
	WalletDao walletDao;

	public List<Wallet> getTransactions() {
		return walletDao.findAll();
	}

	public Wallet getTransaction(Long id) {
		return walletDao.getById(id);
	}

	public LongResponse addTransaction(Wallet wallet) {
		Wallet entity = walletDao.save(wallet);
		return new LongResponse(entity.getId(), "Transaction Added Successfully", true);
	}

	public LongResponse deleteTransaction(Long id) {
		Wallet entity = walletDao.getById(id);
		walletDao.delete(entity);
		return new LongResponse(id, "Transaction Deleted Successfully", true);
	}

	public List<Wallet> getTransactionBySender(String sender) {
		return walletDao.findBySender(sender);
	}

	public List<Wallet> getTransactionByReciever(String reciever) {
		return walletDao.findByReciever(reciever);
	}
	
	
}
