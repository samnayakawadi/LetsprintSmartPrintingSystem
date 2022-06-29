package com.nayakawadi.letsprint.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.nayakawadi.letsprint.entity.File;
import com.nayakawadi.letsprint.response.FileResponse;
import com.nayakawadi.letsprint.response.FileStringResponse;
import com.nayakawadi.letsprint.response.StringResponse;
import com.nayakawadi.letsprint.service.FileService;

@RestController
@CrossOrigin(origins = "*")
public class FileController {
	@Autowired
	FileService fileService;
	
	@GetMapping("/files")
	public List<FileResponse> getFiles(){
//		Here we are fetching the File.java & creating the FileResponse.java
		List<FileResponse> entity = fileService.getFiles().map(file -> {
			String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/download/").path(file.getId()).toUriString();
			
			return new FileResponse(file.getId(), file.getName(), url, file.getType(), file.getData().length);
		}).collect(Collectors.toList());
		
		return entity;
	}
	
	@GetMapping("/files/{fileId}")
	public FileResponse getFile(@PathVariable String fileId) {
		File entity = fileService.getFile(fileId);
		String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/download/").path(entity.getId()).toUriString();
		
		return new FileResponse(entity.getId(), entity.getName(), url, entity.getType(), entity.getData().length);
	}
	
	@GetMapping("/download/{fileId}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable String fileId){
		File entity = fileService.getFile(fileId);
	
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+entity.getName()+"\"").body(entity.getData());
	}
	
	@PostMapping("/files")
	public FileStringResponse addFile(@RequestParam("file") MultipartFile file) {
		try {
			File entity = fileService.addFile(file);
			String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/download/").path(entity.getId()).toUriString();
			
			return new FileStringResponse(entity.getId(), entity.getName(), url, entity.getType(), entity.getData().length, "File Uploaded Successfully", true);
		
		}
		catch(Exception e){
			return new FileStringResponse("File Upload Failed", false);
		}
	}
	
	@DeleteMapping("/files/{fileId}")
	public StringResponse deleteFile(@PathVariable String fileId) {
		File entity = fileService.deleteFile(fileId);
		return new StringResponse(entity.getId(),"File Deleted Successfully", true);
	}
}
