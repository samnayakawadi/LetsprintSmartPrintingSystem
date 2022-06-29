package com.nayakawadi.letsprint.response;

public class LongResponse {
	private Long id;
	private String msg;
	private Boolean status;
	
	public LongResponse() {
		super();
	}

	public LongResponse(Long id, String msg, Boolean status) {
		super();
		this.id = id;
		this.msg = msg;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	
}
