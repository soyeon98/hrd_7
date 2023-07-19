package bbs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class BbsDAO {
	
	private Connection conn;
	private ResultSet rs;
	private int totalRecords=0;
	private int viewList=3;
	
	public BbsDAO() {
		try {
			String DBURL = "jdbc:mysql://localhost:3306/bbs";			
			String DBID = "root";
			String DBPW = "1234";
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DBURL, DBID, DBPW);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
	
	
		
	
			// 글쓰기에 사용한 현재날짜시간 메서드
			public String getDate() {
				String SQL = "SELECT now()";				
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);
					rs = ps.executeQuery();
					if(rs.next()) {
						return rs.getString(1);
					}					
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}				
				return "";  // 데이터베이스 오류
			}
						
			// 게시 글번호
			public int getNumber() {
				//마지막글번호+1 
				String SQL = "SELECT bbsId FROM bbs ORDER BY bbsId DESC";
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);
					rs = ps.executeQuery();
					if(rs.next()) {
						return rs.getInt(1)+1; // 글번호 증가
					}
					else {
						return 1; // 첫번째 입력할 글번호 즉 => 저장된 게시글이 한개도 없을 때	
					}					
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}
				return -1; // 데이터베이스 오류
			}
			
			// 게시판 글쓰기(Write) 메서드
			public int write(String userId, String subject, String content) {
				String SQL = "INSERT INTO bbs VALUES(?, ?, ?, ?, ?, ?,?)";	
				
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);
					ps.setInt(1, getNumber()); // 글번호(마지막글번호+1 함수 getNumber)  
					ps.setString(2, userId); // 작성자
					ps.setString(3, subject); // 제목  
					ps.setString(4, content); // 내용  
					ps.setString(5, getDate()); // 작성일(현재날짜가져오기 함수) 
					ps.setInt(6, 1); // 삭제여부기본값입력(1) (0은삭제)
					ps.setInt(7, 0); // 조회수 => 글보기를 하면 1씩 증가하는 조회수 hit 최초 글쓰기하면 0 디폴트값

					return ps.executeUpdate();
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}				
				return -1;  // 데이터베이스 오류
			}
			
			
			// 게시글 리스트(목록) 메서드
			// 페이지네이션
			// 조건문 => 매개변수로 글번호 bbsId deleteOk=1 사용가능한목록만 글번호 bbsId 내림차순 그리고 5개씩 출력
			public ArrayList<BbsDTO> getList(int pageNumber){
				String SQL = "SELECT  *  FROM (SELECT *, @no:=@no+1 as no FROM bbs,(SELECT @no:=0) as v_format_no WHERE deleteOk=1 ) as v_table WHERE no<=? ORDER BY bbsId DESC LIMIT ? ";
				ArrayList<BbsDTO> list = new ArrayList<BbsDTO>();	
				
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);
					ps.setInt(1, totalRecordsMethod() - (pageNumber-1) * viewList );
					ps.setInt(2,viewList );
					rs = ps.executeQuery();
					while(rs.next()) {						
						BbsDTO bbsDTO = new BbsDTO();
						bbsDTO.setBbsId(rs.getInt(1));
						bbsDTO.setUserId(rs.getString(2));
						bbsDTO.setSubject(rs.getString(3));
						bbsDTO.setContent(rs.getString(4));
						bbsDTO.setWriteDate(rs.getString(5));
						bbsDTO.setDeleteOk(rs.getInt(6));
						bbsDTO.setHit(rs.getInt(7));
						list.add(bbsDTO);
					}

				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}				
				return list;
			}
			// 다음페이지함수 리턴값은 다음페이지 유무 true(다음페이지존재함) or false(다음페이지없음)
			// 다음페이지카운트함수
			public boolean nextPage(int pageNumber) {
				String SQL = "SELECT  *  FROM bbs where bbsId < ? and deleteOk=1 order by bbsId desc limit ?";
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);
					ps.setInt(1, totalRecordsMethod() - (pageNumber-1) *viewList );
					ps.setInt(2, viewList );
					rs = ps.executeQuery();
					while(rs.next()) {	
						return true;
					}
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}
				return false;
			}
			
			// 전체레코드수 카운트 함수
			public int totalRecordsMethod() {
				
				String SQL = "SELECT COUNT(bbsId) as mx FROM bbs WHERE deleteOk = 1";				
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);					
					rs = ps.executeQuery();
					while(rs.next()) {	
						return totalRecords=rs.getInt(1);
					}
										
				} catch (Exception e) {
				
					e.printStackTrace();
				}
				
				return totalRecords;
			}
			
			public int hitCount(int bbdId) {
				String SQL= "update bbs set hit = hit +1 where deleteOk=1 and bbsId = ?";
				
				try {
					PreparedStatement pStatement = conn.prepareStatement(SQL);
					pStatement.setInt(1, bbdId);
					return pStatement.executeUpdate();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return -1;
			}
			
			
			
			
			// 글보기 하나의 글목록 내용을 리턴
			public BbsDTO getView(int bbsId) {
				String SQL = "SELECT * FROM bbs WHERE deleteOk=1 AND bbsId = ?";
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);
					ps.setInt(1, bbsId);
					hitCount(bbsId);
					rs = ps.executeQuery();
					while(rs.next()) {						
						BbsDTO bbsDTO = new BbsDTO();
						bbsDTO.setBbsId(rs.getInt(1));
						bbsDTO.setUserId(rs.getString(2));
						bbsDTO.setSubject(rs.getString(3));
						bbsDTO.setContent(rs.getString(4));
						bbsDTO.setWriteDate(rs.getString(5));
						bbsDTO.setDeleteOk(rs.getInt(6));
						bbsDTO.setHit(rs.getInt(7));
						return bbsDTO;
					}
				} catch (Exception e) {
					// TODO: handle exception
				}
				return null;
			}
			
			// 글 삭제 deleteOk = 0 변경
			public int delete(int bbsId) {
				// String SQL ="delete from bbs where bbsId=? and userId=?"; 글 번호, 작성자 일치하면 데이터에서 삭제
				String SQL ="update bbs set deleteOk=0 where bbsId=?";
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);
					ps.setInt(1, bbsId);
					return ps.executeUpdate();
					
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				return -1;
			}
			
			public int update(int bbsId,String subject,String content) {
				String SQL="update bbs set subject=?,content=?,writeDate=? where bbsId=?";
				try {
					PreparedStatement ps = conn.prepareStatement(SQL);
					ps.setString(1, subject);
					ps.setString(2, content);
					ps.setString(3, getDate());
					ps.setInt(4, bbsId);
					return ps.executeUpdate();
					
				} catch (Exception e) {
					e.printStackTrace();
				}
				return -1;
			}
			
	
		
}
