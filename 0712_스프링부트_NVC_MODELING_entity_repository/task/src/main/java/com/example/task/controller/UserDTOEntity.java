package com.example.task.controller;

//import jakarta.persistence.Column;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class UserDTOEntity {
    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String userName;
    @Column
    private String userHp;
    @Column
    private String userEmail;
    @Column
    private String userSubject;
    @Column
    private String userContents;

    public UserDTOEntity(Long id, String userName, String userHp, String userEmail, String userSubject, String userContents) {
        this.id = id;
        this.userName = userName;
        this.userHp = userHp;
        this.userEmail = userEmail;
        this.userSubject = userSubject;
        this.userContents = userContents;
    }

    @Override
    public String toString() {
        return "UserDTOEntity{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", userHp='" + userHp + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userSubject='" + userSubject + '\'' +
                ", userContents='" + userContents + '\'' +
                '}';
    }
}
