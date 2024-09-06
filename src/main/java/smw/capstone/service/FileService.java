package smw.capstone.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import smw.capstone.DTO.response.FileDTO;
import smw.capstone.DTO.FileUploadDTO;
import smw.capstone.DTO.response.ResponseFilePathDTO;
import smw.capstone.common.annotation.CurrentUser;
import smw.capstone.common.component.FileHandler;
import smw.capstone.common.exception.BusinessException;
import smw.capstone.common.exception.CustomErrorCode;
import smw.capstone.config.S3Config;
import smw.capstone.entity.DocFile;
import smw.capstone.entity.Documents;
import smw.capstone.entity.Files;
import smw.capstone.entity.Member;
import smw.capstone.repository.DocFileRepository;
import smw.capstone.repository.DocRepository;
import smw.capstone.repository.FileRepository;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class FileService {

    private final FileRepository fileRepository;
    private final FileHandler fileHandler;
    private final DocFileRepository docFileRepository;
    private final AmazonS3Client amazonS3Client;
    private final DocRepository docRepository;
    private final S3Config s3Config;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

//    @Transactional
//    public Files savefiles(FileUploadDTO file, MultipartFile newFile, Member member) throws Exception {
//        if (member == null) {
//            throw new BusinessException(CustomErrorCode.ACCESS_DENIED);
//        }
//
//        Files files = fileHandler.parseFileInfo(file, newFile, member);
//
//        if (files == null) {
//            //파일이  없을 경우: 클라이언트 측에서 파일 데이터가 없을 경우
//            throw new BusinessException(CustomErrorCode.NOT_EXIST_FILE);
//        }
//        else {
//            fileRepository.save(files);
//        }
//        return files;
//    }

    public List<Files> findAllFiles() {
        return fileRepository.findAll();
    }

    public Optional<Files> findFiles(Long id) {
        return fileRepository.findById(id);
    }

    public Files finByMemberAndFileName(Member member, String fileName) {
        return fileRepository.findByMemberAndName(member, fileName);
    }

    public String findFilePathByFile(Files files) {
        Files file = fileRepository.findById(files.getId()).orElseThrow(() -> new BusinessException(CustomErrorCode.NOT_EXIST_FILE_BY_ID));

        return file.getStoredFileName();
    }

    public FileDTO buildFileDTO(Files files) {
        FileUploadDTO fileUploadDTO = FileUploadDTO.builder()
                .category(files.getCategory())
                .license(files.getLicense())
                .summary(files.getSummary())
                .fileName(files.getName())
                .build();
        ResponseFilePathDTO responseFilePathDTO = new ResponseFilePathDTO(files.getStoredFileName());
        return FileDTO.builder()
                .responseFilePathDTO(responseFilePathDTO)
                .fileUploadDTO(fileUploadDTO).build();
    }

    public List<FileDTO> findFilesByDocId(Long docId) {
        List<FileDTO> filesList = new ArrayList<>();
        List<DocFile> docFiles = docFileRepository.findByDocumentId(docId); //docFileService하면 순환 발생
        for (DocFile docFile : docFiles) {
            filesList.add(buildFileDTO(docFile.getFile()));
        }
        return filesList;
    }

    public List<Files> finByMember(Member member) {
        return fileRepository.findByMember(member);
    }

    @Transactional
    public Files saveFile(MultipartFile file, FileUploadDTO fileDto, Member member) throws IOException {

        if (member == null) {
            throw new BusinessException(CustomErrorCode.ACCESS_DENIED);
        }
        String originalFileExtension = null;
        String contentType = file.getContentType();
        if (contentType.contains("image/jpeg")) {
            originalFileExtension = ".jpg";
        } else if (contentType.contains("image/png")) {
            originalFileExtension = ".png";
        } else if (contentType.contains("image/gif")) {
            originalFileExtension = ".gif";
        } else { //다른 확장자면 무시
            //클라이언트에게 오류 코드
            ;
        }
        Files fineFile = fileRepository.findByMemberAndName(member, fileDto.getFileName()+member.getUsername()+originalFileExtension);
        if (fineFile != null) {
            throw new BusinessException(CustomErrorCode.EXIST_FILE_TITLE);
        }

        Files files = null;


        files = Files.builder()
                .storedFileName(uploadFileToS3(file, member.getUsername()))
                .Category(fileDto.getCategory())
                .name(fileDto.getFileName() + member.getUsername() + originalFileExtension)
                .License(fileDto.getLicense())
                .Summary(fileDto.getSummary())
                .member(member) //나중에 회원정보 넣기
                .build();
        fileRepository.save(files);

        return files;

    }

    public String uploadFileToS3(MultipartFile file, String username) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_FILE);
        }
        byte[] originalImageBytes;
        try {
            originalImageBytes = file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try {
            originalImageBytes = file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        byte[] compressedImageBytes = compressImage(originalImageBytes);


        String fileName=file.getOriginalFilename();
        System.out.println(fileName);
        String fileUrl= "https://" + bucket +".s3."+ region + ".amazonaws.com/" +username + fileName;
        ObjectMetadata metadata= new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        amazonS3Client.putObject(new PutObjectRequest(bucket,username+fileName,file.getInputStream(),metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        return fileUrl;

    }

    public static byte[] compressImage(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4 * 1024];
        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }
        try {
            outputStream.close();
        } catch (Exception ignored) {

        }
        return outputStream.toByteArray();
    }

    public static byte[] decompressImage(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4*1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        }catch (Exception ignored){

        }
        return outputStream.toByteArray();
    }

    public String getImageUrl(String imgName) {
//        URL url = amazonS3Client.getUrl(bucket, imgName);
        Files findFile = fileRepository.findByName(imgName);
        return findFile.getStoredFileName();


    }
    public List<String> getImageUrlByUser(Member member) {
        //memberId로 파일 이름 모두 가져오기
        List<Files> files = fileRepository.findByMember(member);
        if (files == null) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_FILE);
        }
        List<String> urls = new ArrayList<>();

        for (Files file: files) {
            urls.add(file.getStoredFileName());
        }
        return urls;
    }

    @Transactional
    public void deleteImg(Member member, String imgName) {
        //문서에 해당 이미지가 등록되어있다면 삭제 못함
        //본인이 등록한 이미지인가 확인
        Files findFile = fileRepository.findByMemberAndName(member, imgName);
        if (findFile == null) {
            throw new BusinessException(CustomErrorCode.NOT_EXIST_FILE);
        }

        List<Documents> fileWithDoc = docRepository.findByFilesId(findFile);
        if (fileWithDoc.size() > 0) {
            throw new BusinessException(CustomErrorCode.EXIST_DOC_WITH_FILE);
        }
        fileRepository.delete(findFile);
    }
}
