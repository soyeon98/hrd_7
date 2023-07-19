package com.example.app.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 롬복 어노테이션(@) 대체 코딩 : 모든 생성자와 게터 세터 투스트링
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {
    private String userName;
    private String userHp;
    private String userEmail;
    private String userSubject;
    private String userContents;

//    public String getUserName() {
//        return userName;
//    }
//
//    public void setUserName(String userName) {
//        this.userName = userName;
//    }
//
//    public String getUserHp() {
//        return userHp;
//    }
//
//    public void setUserHp(String userHp) {
//        this.userHp = userHp;
//    }
//
//    public String getUserEmail() {
//        return userEmail;
//    }
//
//    public void setUserEmail(String userEmail) {
//        this.userEmail = userEmail;
//    }
//
//    public String getUserSubject() {
//        return userSubject;
//    }
//
//    public void setUserSubject(String userSubject) {
//        this.userSubject = userSubject;
//    }
//
//    public String getUserContents() {
//        return userContents;
//    }
//
//    public void setUserContents(String userContents) {
//        this.userContents = userContents;
//    }



//    @Override
//    public String toString() {
//        return "UserDTO{" +
//                "userName='" + userName + '\'' +
//                ", userHp='" + userHp + '\'' +
//                ", userEmail='" + userEmail + '\'' +
//                ", userSubject='" + userSubject + '\'' +
//                ", userContents='" + userContents + '\'' +
//                '}';
//    }

//    public UserDTO(String userName, String userHp, String userEmail, String userSubject, String userContents) {
//        this.userName = userName;
//        this.userHp = userHp;
//        this.userEmail = userEmail;
//        this.userSubject = userSubject;
//        this.userContents = userContents;
//    }

    public UserDTOEntity toEntity() {
        return new UserDTOEntity(null,userName,userHp,userEmail,userSubject,userContents);
    }
}
