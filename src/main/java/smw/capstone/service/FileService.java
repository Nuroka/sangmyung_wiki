package smw.capstone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import smw.capstone.DTO.FileUploadDTO;
import smw.capstone.controller.component.FileHandler;
import smw.capstone.entity.Files;
import smw.capstone.entity.Member;
import smw.capstone.repository.FileRepository;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class FileService {

    private final FileRepository fileRepository;
    private final FileHandler fileHandler;

    @Transactional
    public Files savefiles(FileUploadDTO file, MultipartFile newFile) throws Exception {

        Files files = fileHandler.parseFileInfo(file, newFile);

        if (files == null) {
            //파일이  없을 경우: 클라이언트 측에서 파일 데이터가 없을 경우
        }
        else {
            fileRepository.save(files);
        }
        return files;
    }

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
        String filePathName = null;
        try {
            filePathName =  fileRepository.findById(files.getId()).get().getStoredFileName();
        } catch (NullPointerException e) {
            log.info("{} 해당 파일이 존재하지 않습니다.", files.getName(), e);
        }

        return filePathName;
    }

}
