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
 * Servlet implementation class RDS_AddCollection_Service
 */
@WebServlet("/RDS_AddCollection_Service")
public class RDS_AddCollection_Service extends HttpServlet {
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
    public RDS_AddCollection_Service() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        try {
			Class.forName(JDBC_driver);
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
		}
        
        try (Connection connect = DriverManager.getConnection(RDS_URL, USER, PASS); 
	        	PreparedStatement query = connect.prepareStatement("insert into biobank.Collections(disease_term, title) values(?,?)");) {	
        	
        	//prepared statements to help avoid SQL Injection
        	query.setString(1, request.getParameter("term"));
        	query.setString(2, request.getParameter("title"));
        	
        	int noInserted = query.executeUpdate();
        	
        	PrintWriter out = response.getWriter();
        	out.write("["+noInserted+"]");
        	out.close();
        	
		} catch (SQLException e) {
			e.printStackTrace();
		
		}
        
	}

}
