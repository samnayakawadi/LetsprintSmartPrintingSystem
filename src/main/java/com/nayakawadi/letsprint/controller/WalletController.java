package com.nayakawadi.letsprint.controller;

import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.razorpay.*;

import com.nayakawadi.letsprint.entity.Wallet;
import com.nayakawadi.letsprint.response.LongResponse;
import com.nayakawadi.letsprint.service.WalletService;

@RestController
@CrossOrigin(origins = "*")
public class WalletController {
	
	@Autowired
	WalletService walletService;
	
	@GetMapping("/wallets")
	public List<Wallet> getTransactions(){
		return walletService.getTransactions();
	}
	
	@GetMapping("/wallets/{walletId}")
	public Wallet getTransaction(@PathVariable String walletId) {
		return walletService.getTransaction(Long.parseLong(walletId));
	}
	
	@GetMapping("/wallets/sender/{sender}")
	public List<Wallet> getTransactionBySender(@PathVariable String sender){
		return walletService.getTransactionBySender(sender);
	}
	
	@GetMapping("/wallets/reciever/{reciever}")
	public List<Wallet> getTransactionByReciever(@PathVariable String reciever){
		return walletService.getTransactionByReciever(reciever);
	}
	
	@PostMapping("/wallets")
	public LongResponse addTransaction(@RequestBody Wallet wallet) {
		return walletService.addTransaction(wallet);
	}
	
	@DeleteMapping("/wallets/{walletId}")
	public LongResponse deleteTransaction(@PathVariable String walletId) {
		return walletService.deleteTransaction(Long.parseLong(walletId));
	}
	
	@PostMapping("/wallets/createorder")
	public String createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
		int amount = Integer.parseInt(data.get("amount").toString());
		RazorpayClient razorpayClient = new RazorpayClient("rzp_test_H5PcFQfQ2QkpKw", "Jfxb8r25VVO7gMtSdUINEcJ5");
		
		JSONObject options = new JSONObject();
		options.put("amount", amount * 100);
		options.put("currency", "INR");
		options.put("receipt", "wallet_tnx");
		Order order = razorpayClient.Orders.create(options);
		
//		System.out.println(order);
		return order.toString();
	}
}
