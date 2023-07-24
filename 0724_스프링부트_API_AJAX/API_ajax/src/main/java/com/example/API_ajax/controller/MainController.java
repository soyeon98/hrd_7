package com.example.API_ajax.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@Slf4j
public class MainController {
    String subject = "";
    String content = "";

    // REST API : AJAX 를 통해서 데이터 입력 받는다
    @RequestMapping(value="/dataSend",method=RequestMethod.POST)
    public String dataSendMethod(MainDTO mainDTO, Model model){
        subject = mainDTO.getSubject();
        content = mainDTO.getContent();
        log.info(subject);
        log.info(content);
        // 모델(model) 데이터 속성(Attribute) 지정하기
        model.addAttribute("subject",subject);
        model.addAttribute("content",content);
        return "view";
    }
    
    // 입력받은 데이터를 화면에서 보여주기 View 페이지(뷰 템플릿)에 바인딩(모델 데이터)하기
    @GetMapping("/view")
    public String viewMethod(Model model){
        model.addAttribute("subject",subject);
        model.addAttribute("content",content);
        return "view";
    }
}
