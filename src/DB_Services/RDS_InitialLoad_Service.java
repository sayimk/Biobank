package DB_Services;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class RDS_InitialLoad_Service
 */
@WebServlet("/RDS_InitialLoad_Service")
public class RDS_InitialLoad_Service extends HttpServlet {
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
    public RDS_InitialLoad_Service() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		//query result holders
				ResultSet rs =null;
		        List<String> disTitleList = new ArrayList<String>();
		        List<String> disTermList = new ArrayList<String>();
		        List<Integer> disIdList = new ArrayList<Integer>();


		    	//binding driver to class
		        try {
					Class.forName(JDBC_driver);
				} catch (ClassNotFoundException e1) {
					e1.printStackTrace();
				}
		        
		        
		        try (Connection connect = DriverManager.getConnection(RDS_URL, USER, PASS); 
		        	Statement query = connect.createStatement();) {			
								
					//setting up and executing query
					String sql = "SELECT * FROM biobank.Collections";
					 rs = query.executeQuery(sql);
				
					//storing in output lists
					while(rs.next()) {
						disTitleList.add(rs.getString(2));
						disTermList.add(rs.getString(3));
						disIdList.add(rs.getInt(1));
					}
					
					
				} catch (SQLException e) {
					e.printStackTrace();
				
				} finally {
					try {
						rs.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
		        
		    	//setting up service response
		        response.setContentType("application/json;charset=utf-8");
		        PrintWriter out = response.getWriter();
		        Gson GS = new Gson();
		       
		        String disTitleJson = GS.toJson(disTitleList);
		        String disTermJson = GS.toJson(disTermList);
		        String disIdJson = GS.toJson(disIdList);
			
		        out.write("["+disTitleJson+","+disTermJson+","+disIdJson+"]");
		        out.close();
	}
}
