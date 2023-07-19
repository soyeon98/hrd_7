package com.example.task.controller;

public class UserDTO {
    private String userName;
    private String userHp;
    private String userEmail;
    private String userSubject;
    private String userContents;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserHp() {
        return userHp;
    }

    public void setUserHp(String userHp) {
        this.userHp = userHp;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserSubject() {
        return userSubject;
    }

    public void setUserSubject(String userSubject) {
        this.userSubject = userSubject;
    }

    public String getUserContents() {
        return userContents;
    }

    public void setUserContents(String userContents) {
        this.userContents = userContents;
    }

    public UserDTO(String userName, String userHp, String userEmail, String userSubject, String userContents) {
        this.userName = userName;
        this.userHp = userHp;
        this.userEmail = userEmail;
        this.userSubject = userSubject;
        this.userContents = userContents;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "userName='" + userName + '\'' +
                ", userHp='" + userHp + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userSubject='" + userSubject + '\'' +
                ", userContents='" + userContents + '\'' +
                '}';
    }


    public UserDTOEntity toEntity() {
        return new UserDTOEntity(null,userName,userHp,userEmail,userSubject,userContents);
    }
}
