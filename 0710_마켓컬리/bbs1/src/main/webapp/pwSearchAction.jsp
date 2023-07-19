<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "bbs.UserDAO" %>
<%@ page import = "bbs.UserDTO" %>
<%
	request.setCharacterEncoding("UTF-8");
%>  
    
    
<%
	if(request.getParameter("userId")==null||request.getParameter("userEmail")==null){
		%>  
	    	<script>
	    		alert("아이디, 이메일을 모두 입력해 주세요");
	    		history.back();
	    	</script>
	    
		<%		
	}
	else{
		// DAO 클래스 인스턴스 생성하고 아이디찾기 함수 호출 실행(매개변수 이름,이메일)
		UserDTO userDTO = new UserDAO().pwSearch(request.getParameter("userId"),request.getParameter("userEmail"));
		
		if(userDTO==null){
			%>
				<script>
					alert('아이디와 이메일을 확인하고 다시 시도하세요');
					history.back();
				</script>
			<%
		}
		else{ // 찾음
			%>
			<script>
					location.href="./pwSearchResult.jsp?userPw=<%=userDTO.getUserPw()%>";
				</script>
		<%
		}
	}
%>