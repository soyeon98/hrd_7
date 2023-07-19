<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "bbs.BbsDAO" %> 
<%@ page import = "bbs.BbsDTO" %> 
<%@ page import = "java.util.ArrayList" %> 
<%
	request.setCharacterEncoding("UTF-8");
%> 
    
<jsp:useBean id="BbsDTO" class="bbs.BbsDTO" scope="page"/> 
<jsp:setProperty name='BbsDTO'  property="userId"/>
<jsp:setProperty name='BbsDTO'  property="subject"/>
<jsp:setProperty name='BbsDTO'  property="content"/>    
    
     
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시판 메인</title>

	<style type="text/css">
		* {margin:0; padding:0; vertical-align:center;box-sizing:border-box;}
		ul {list-style:none;}
		a {color:#333;text-decoration:none;}
	
		#header {width:100%;height:80px;background:#f7f7f7;border-bottom:1px solid #ccc;}
		#header .container {
			width:100%;max-width:80%;margin:0 auto;
			height:100%;
			display:flex;
			align-items:center;		
			justify-content:space-between;
			font-weight:600;
		}	
		#header .container .left  {width:50%;}
		#header .container .left  h1 {font-size:24px;display:inline-block;color:#7e9fc2;margin:0 20px; 0 0;}
		#header .container .left  a  {foant-size:17px;color:#333;margin:0 10px;}
		#header .container .left  a:hover  {color:#5f0080;}
		#header .container .right {width:50%;text-align:right;}
		#header .container .right a  {foant-size:17px;color:#333;margin:0 10px;}
		#header .container .right a:hover  {color:#5f0080;}
		
		


		
		#bbsList {width:100%;padding:60px 0 100px 0; text-align:center;}
		#bbsList table {width:100%;max-width:70%;margin:0 auto;border-collapse:collapse;}
		#bbsList table caption {width:100%;padding: 0 0 60px 0;font-size:34px;letter-spacing:1px;font-weight:600; color:#7e9fc2;}
				
		#bbsList table th,td {border-bottom:1px solid #7e9fc2;}		
		#bbsList table th {height:60px;background:#f9f9f9;color:#7e9fc2;font-size:16px;}
		#bbsList table td {height:50px;background:#fff;color:#444;font-size:15px;text-align:center;}		
		#bbsList table th:nth-child(1) {width:80px;}
		#bbsList table th:nth-child(2) {width:650px;}	
		#bbsList table th:nth-child(3) {width:120px;}
		#bbsList table th:nth-child(4) {width:150px;}
		
		#bbsList table th {border-top:2px solid #7e9fc2;border-bottom:1px solid #7e9fc2;}		
		

		#bbsList table td:nth-child(2) {text-align:left;}			
		#bbsList table td:nth-child(4) {font-size:14px;color:#999;}			
		#bbsList table td a {			
			padding: 0 0 0 20px;
			white-space:nowrap;
			overflow: hidden;			
			display:block;			
			max-width:590px;
			text-overflow:ellipsis;
			transition: all 0.3s;			
		}
		#bbsList table td a:hover {color:#5f0080;}
		
		#bbsList .button-box {
			padding: 30px 0 0 0;
		}
		#bbsList .button-box  a {
			display:flex;
			margin:auto;
			align-items: center;
			justify-content:center;			
			width:200px;height:48px;font-size:17px;color:#fff;border-radius:3px;border:0;
			background:#333;cursor:pointer;		
			transition: all 0.3s;
		}
		#bbsList .button-box a:hover {background:#111;}
		
		#bbsList .pagebtn-box {padding:30px 0;text-align:center;}
		#bbsList .pagebtn-box a {
			background:#fff;
			display:inline-flex;width:30px;height:30px;border:1px solid #ccc;color:#555;
			font-size:14px;align-items:center;justify-content:center;border-radius:2px;		
		}
		#bbsList .pagebtn-box a.page-btn {margin: 0 1px;}
		#bbsList .pagebtn-box a.prev-btn {width:50px;margin: 0 10px 0 0;border:0px solid #666;color:#666;}
		#bbsList .pagebtn-box a.next-btn {width:50px;margin: 0 0 0 10px;border:0px solid #666;color:#666;}
		
	
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



<div id="bbsList">
		
	<table>
		<caption>게시판</caption>
		<thead>
			<tr>
				<th>번호</th>
				<th>제목</th>
				<th>작성자</th>
				<th>작성일</th>
				<th>조회수</th>
			</tr>			
		</thead>
		
		<tbody>
		<%
			int pageNumber = 1;
			if(request.getParameter("pageNumber")!=null){
				pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			}
			BbsDAO bbsDAO = new BbsDAO(); 
		    ArrayList<BbsDTO> list = bbsDAO.getList(pageNumber);
			for(int i=0; i<list.size(); i++){
		%>

			<tr>
				<td><%=list.get(i).getBbsId() %></td>
				<td><a href="viewAction.jsp?bbsId=<%=list.get(i).getBbsId() %>"><%=list.get(i).getSubject() %></a></td>
				<td><%=list.get(i).getUserId() %></td>
				<td><%=list.get(i).getWriteDate() %></td>
				<td><%=list.get(i).getHit() %></td>
			</tr>
						
		<%
			}
		%>
					
		</tbody>
		
	</table>
		<div class='pagebtn-box' style='text-align:center;'>
	<%		
		if(pageNumber>1){
    %>			
			<a class='prev-btn' href='./bbsListAction.jsp?pageNumber=<%=pageNumber-1%>'>이전</a>
	<%			
		}
	%>
		



		
	<%
		if(bbsDAO.nextPage(pageNumber+1)){
	%>
			<a class='next-btn' href='./bbsListAction.jsp?pageNumber=<%=pageNumber+1%>'>다음</a>
    <%			
		}
	%>	
		
		
				
	</div>
	
	<%
		if(userId!=null){
	%>	
	<div class="button-box" style="text-align:center">
       <a href='./write.jsp'>글쓰기</a>
    </div>
	<%
		}
	%>

</div>
	

</body>
</html>