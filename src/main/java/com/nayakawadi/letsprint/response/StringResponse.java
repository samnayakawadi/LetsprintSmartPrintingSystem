package com.nayakawadi.letsprint.response;

public class StringResponse {
	
	private String id;
	private String msg;
	private Boolean status;
	
	public StringResponse() {
		super();
	}

	public StringResponse(String id, String msg, Boolean status) {
		super();
		this.id = id;
		this.msg = msg;
		this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
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
