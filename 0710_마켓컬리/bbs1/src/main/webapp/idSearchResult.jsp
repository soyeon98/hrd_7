<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
 <%@ page import = "bbs.UserDAO" %>
<%@ page import = "bbs.UserDTO" %>
<%
	request.setCharacterEncoding("UTF-8");
%>  
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<style type="text/css">
	* {margin:0; padding:0; vertical-align:center;box-sizing:border-box;}
	ul {list-style:none;}
	a {color:#333;text-decoration:none;}
	
	#header {width:100%;height:80px;background:#f7f7f7;border-bottom:1px solid #ccc;}
	#header .container {width:100%;max-width:80%;margin:0 auto;height:100%;display:flex;align-items:center;justify-content:space-between;font-weight:600;}	
	#header .container .left  {width:50%;}
	#header .container .left  h1 {font-size:24px;display:inline-block;color:#7e9fc2;margin:0 20px; 0 0;}
	#header .container .left  a  {foant-size:17px;color:#333;margin:0 10px;}
	#header .container .left  a:hover  {color:#7e9fc2;}
	#header .container .right {width:50%;text-align:right;}
	#header .container .right a  {foant-size:17px;color:#333;margin:0 10px;}
	#header .container .right a:hover  {color:#7e9fc2;}
	
	#idSearchResult {width:100%;padding:100px 0;}
	#idSearchResult .container {width:100%;max-width:600px;margin:0 auto;background:#f9f9f9;padding:50px;}
	#idSearchResult .container .title {text-align:center;padding:0 0 60px 0;}
	#idSearchResult .container .title h1 {font-size:28px;text-align:center;color:#7e9fc2;font-weight:500;}
	#idSearchResult .container .title h5 {font-size:16px;text-align:center;color:#333;font-weight:500;padding:5px 0 0 0;}
	
	#idSearchResult .container .content {width:100%;height:auto;}
	#idSearchResult .container .content  {width:100%;}
	#idSearchResult .container .content  ul {width:100%;}
	#idSearchResult .container .content  ul li {width:100%;padding:5px 0; text-align:center; }
	#idSearchResult .container .content  ul li p{font-weight:500;font-size:24px;}
	
	#idSearchResult .container .content  .button-box {width:100%;padding: 30px 0 50PX 0; text-align:center;}
	#idSearchResult .container .content  .button-box a {
		width:100%;height:48px;font-size:17px;color:#fff;border-radius:3px;border:0;
		display:flex;
		background:#7e9fc2;cursor:pointer;		
		transition: all 0.3s;
		margin:5px 0;
		text-align:center;
		align-items:center; justify-content:center;
	}
	#login .container .content form .button-box a:hover {opacity:0.8}
	
</style>
</head>
<body>

<%
// 로그인 정보 => 세션 가져오기
String userId = null;
if(session.getAttribute("userId")!=null){ // 세션값이 비어있지 않으면 세션아이디 변수에 저장
	userId = (String)session.getAttribute("userId");
}
%>

<header id='header'>
	<div class='container'>
		<div class='left'>
			<h1>PSY Board</h1>
			<a href='./admin.jsp'>HOME</a>
			<a href='./bbsListAction.jsp'>게시판</a>
		</div>
		<div class='right'>
		<%
			if(userId==null){
		%>
			<a href='./signup.jsp'>Signup</a>
			<a href='./login.jsp'>Login</a>
		<%
			}
			else{
		%>
			<a href='./logoutAction.jsp'>Logout</a>
		<%
			}
		%>	
		</div>
	</div>
</header>	

<div id='idSearchResult'>
	<div class='container'>
		<div class='title'>
			<h1>고객님의 계정을 찾았습니다.</h1>
			<h5>아이디 확인 후 다시 로그인해주세요.</h5>
		</div>
		
		<div class="content">
	
		        <ul>
		            <li><p><%=request.getParameter("userId") %></p></li>
		            <li></li>
		        </ul>
		        <div class="button-box" style="text-align:center">
		            <a href="./pwSearchForm.jsp"> 비밀번호 찾기 </a>
		            <a  href="./login.jsp"> 로그인 </a>
		        </div>
		
		</div>
	
	</div>
</div>	
	
</body>
</html>