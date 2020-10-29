package DB_Services;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class RDS_AddSample_Service
 */
@WebServlet("/RDS_AddSample_Service")
public class RDS_AddSample_Service extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
		//JDBC Driver and dataname URL
		static final String JDBC_driver = "com.mysql.cj.jdbc.Driver";
		static final String RDS_URL = "jdbc:mysql://biobank.cjsxvledy2nj.eu-west-2.rds.amazonaws.com";
		
		//RDS Login
		static final String USER = "admin";
		static final String PASS = "SayimKhan1997";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RDS_AddSample_Service() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		boolean updateOnly = false;
		ResultSet checkRS = null;
		
		try {
			Class.forName(JDBC_driver);
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
		}
				
		try (Connection connect = DriverManager.getConnection(RDS_URL, USER, PASS); 
	        	PreparedStatement checkstmt = connect.prepareStatement("SELECT * from biobank.Samples where collection_id=? and material_type =?;");) {	
				
				checkstmt.setInt(1, Integer.parseInt(request.getParameter("id")));
				checkstmt.setString(2, request.getParameter("material"));
				
				checkRS = checkstmt.executeQuery();
				
				if(checkRS.next())
					updateOnly = true;
				else
					updateOnly =false;
		
		} catch (SQLException e) {
			e.printStackTrace();
		
		} catch (NumberFormatException n) {
			n.printStackTrace();
		}finally {
			try {
				checkRS.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		PreparedStatement query = null;
		
		try (Connection connect = DriverManager.getConnection(RDS_URL, USER, PASS); ) {	
		
			if(updateOnly) {
				query = connect.prepareStatement("update biobank.Samples set donor_count = ?, last_updated = ? where collection_id=? and material_type = ?");
				
				query.setInt(1, Integer.parseInt(request.getParameter("count")));
				query.setDate(2, java.sql.Date.valueOf(java.time.LocalDate.now()));
				
				query.setInt(3, Integer.parseInt(request.getParameter("id")));
				query.setString(4, request.getParameter("material"));
				
			}else {
				query = connect.prepareStatement("insert into biobank.Samples(collection_id, donor_count, material_type, last_updated) values(?,?,?,?)");
				
				query.setInt(1, Integer.parseInt(request.getParameter("id")));
				query.setInt(2, Integer.parseInt(request.getParameter("count")));
				query.setString(3, request.getParameter("material"));
				query.setDate(4, java.sql.Date.valueOf(java.time.LocalDate.now()));
			}
		
		int resultInt = query.executeUpdate();
		
		PrintWriter out = response.getWriter();
		
		out.write("["+resultInt+","+request.getParameter("id")+"]");
		out.close();
		
		} catch (SQLException e) {
			e.printStackTrace();
		
		} catch (NumberFormatException n) {
			n.printStackTrace();
		}
	}

}
