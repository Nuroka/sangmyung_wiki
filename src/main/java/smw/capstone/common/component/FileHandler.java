package smw.capstone.common.component;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import smw.capstone.DTO.FileUploadDTO;
import smw.capstone.entity.Files;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class FileHandler {

    public Files parseFileInfo(FileUploadDTO saveFiles, MultipartFile multipartFile) throws Exception {

        //반환할 파일 리스트
        Files files = null;

        //파일이 빈 것이 들어오면 빈것 반환
        if (multipartFile.isEmpty()) {
            return files;
        }

        // 파일 이름을 업로드 한 날짜로 바꾸어서 저장할 것이다
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        String current_date = simpleDateFormat.format(new Date());

        //resources/img 에 파일 저장
        String absolutePath = new File("").getAbsolutePath() + "\\src\\main\\resources\\static\\";

        //경로를 지정
        String path = "img/" + current_date;
        File file = new File(absolutePath+path);
        //저장할 위치의 디렉토리가 존재하지 않을 경우
        if (!file.exists()) {
            file.mkdirs();
        }

        //파일 handle

        //파일이 비어 있지 않을 때 작업을 시작 (오류나지 않도록)
        if (!multipartFile.isEmpty()) {
            //jpeg, png, gif만 처리
            String contentType = multipartFile.getContentType();
            String originalFileExtension = null;
            //확장자가 없으면 파일오류
            if (ObjectUtils.isEmpty(contentType)) {
                //클라이언트에게 오류 코드
                ;
            } else {
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
                //각 이름이 겹치면 안되므로 uuid
                UUID uuid = UUID.randomUUID();
                String newFileName = saveFiles.getFileName() + uuid.toString() + originalFileExtension;
                while (new File(path + "/" + newFileName).exists()) {
                    newFileName = saveFiles.getFileName() + UUID.randomUUID().toString() + originalFileExtension;
                }
                files = Files.builder()
                        .storedFileName(path + "/" + newFileName)
                        .Category(saveFiles.getCategory())
                        .Name(saveFiles.getFileName())
                        .License(saveFiles.getLicense())
                        .Summary(saveFiles.getSummary())
//                        .member(memberRepository.findById(1L)) 나중에 회원정보 넣기
                        .build();
                file = new File(absolutePath + path + "/" + newFileName);
                multipartFile.transferTo(file);
            }

        }

        return files;
        }
}
