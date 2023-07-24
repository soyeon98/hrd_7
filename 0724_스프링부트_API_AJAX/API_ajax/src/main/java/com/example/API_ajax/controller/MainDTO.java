package com.example.API_ajax.controller;

public class MainDTO {
    private String subject;
    private String content;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public MainDTO(String subject, String content) {
        this.subject = subject;
        this.content = content;
    }
    @Override
    public String toString() {
        return "MainDTO{" +
                "subject='" + subject + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
