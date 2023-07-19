package com.example.task.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {
    @Autowired
    private  UserDTOEntityRepository userDTOEntityRepository;
    @GetMapping("/writeForm.do")
    public String writeMethod(){
        return "writeForm";
    }
    @PostMapping("/view.do")
    public  String viewMethod(UserDTO userDTO, Model model){
        model.addAttribute("userName",userDTO.getUserName());
        model.addAttribute("userHp",userDTO.getUserHp());
        model.addAttribute("userEmail",userDTO.getUserEmail());
        model.addAttribute("userSubject",userDTO.getUserSubject());
        model.addAttribute("userContents",userDTO.getUserContents());

        UserDTOEntity userDTOEntity = userDTO.toEntity();
        System.out.println(userDTOEntity.toString());
        UserDTOEntity saved = userDTOEntityRepository.save(userDTOEntity);
        System.out.println(saved.toString());
        return "view";
    }
}
