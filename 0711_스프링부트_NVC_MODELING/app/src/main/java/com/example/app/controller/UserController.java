package com.example.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {
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
        return "view";
    }


}
