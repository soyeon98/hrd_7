package com.example.app.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;

@Controller
@Slf4j // 로깅사용
public class UserController {

    // 리파지토리 필드 생성자
    // 자동으로 실행
    @Autowired
    private UserDTOEntityRepository userDTOEntityRepository;
    @GetMapping("/writeForm.do")
    public String writeMethod(){
        return "writeForm";
    }
    @PostMapping("/view.do")
    public String viewMethod(UserDTO userDTO, Model model){
        model.addAttribute("userName",userDTO.getUserName());
        model.addAttribute("userHp",userDTO.getUserHp());
        model.addAttribute("userEmail",userDTO.getUserEmail());
        model.addAttribute("userSubject",userDTO.getUserSubject());
        model.addAttribute("userContents",userDTO.getUserContents());

        UserDTOEntity userDTOEntity = userDTO.toEntity();

        UserDTOEntity saved = userDTOEntityRepository.save(userDTOEntity);

        log.info(saved.toString());
        return "view";
    }

    // 글목록 ArrayList 목록 출력
    // 폼데이터(DTO) => Entity => repository(DB 저장)
    // => 저장된 DB목록 => 뷰 탬플릿(머쉬태쉬,타임리프) ArrayList list 사용
    // userDTOEntityRepository에서 모든 목록 가져오기
    @GetMapping("/list.do")
    public String list(Model model) {
        ArrayList<UserDTOEntity> userDTOEntityList = userDTOEntityRepository.findAll();
        model.addAttribute("userList",userDTOEntityList);

        return "list";
    }


}
