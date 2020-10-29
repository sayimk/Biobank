package DB_Services;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.Date;
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
 * Servlet implementation class RDS_FetchSampleQuery_Service
 */
@WebServlet("/RDS_FetchSampleQuery_Service")
public class RDS_FetchSampleQuery_Service extends HttpServlet {
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
    public RDS_FetchSampleQuery_Service() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		ResultSet rs =null;
		List<Integer> sampleDCountList = new ArrayList<Integer>();
		List<String> sampleTypeList = new ArrayList<String>();
		List<Date> sampleLUpdateList = new ArrayList<Date>();
		
		Gson gs = new Gson();


    	//binding driver to class
        try {
			Class.forName(JDBC_driver);
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
		}

        
        try (Connection connect = DriverManager.getConnection(RDS_URL, USER, PASS); 
	        	Statement query = connect.createStatement();) {			
							
				//setting up and executing query
				String searchSql = "SELECT * from biobank.Samples where collection_id ="+request.getParameter("id");
				 rs = query.executeQuery(searchSql);
			
				//use beforefirst to check if resultset is empty 
				//storing in output lists
					
				if(rs.next()) {
					
					do {
						sampleDCountList.add(rs.getInt(3));
						sampleTypeList.add(rs.getString(4));
						sampleLUpdateList.add(rs.getDate(5));
					}while(rs.next());
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
        
        //set out string only if all lengths are >0 else [] empty response
        PrintWriter out = response.getWriter();
        
        if((sampleDCountList.size()>0)&&(sampleTypeList.size()>0)&&(sampleLUpdateList.size()>0)){
        String sampleDCountStr = gs.toJson(sampleDCountList);
        String sampleTypeStr = gs.toJson(sampleTypeList);
        String sampleLUpdateStr = gs.toJson(sampleLUpdateList);
        
        out.write("["+sampleDCountStr+","+sampleTypeStr+","+sampleLUpdateStr+"]");
        } else {
        	out.write("[]");
        }
        out.close();
	}

}
