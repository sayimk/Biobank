<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		
		<!-- Bootstrap links -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
		
		<!-- General CSS Link -->
		<link rel="stylesheet" href= "CSS/General_Home.css">
		
		<!-- Google JQuery CDN -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		
		<!-- Fetch Database Data Script -->
		<script src="Scripts/JS/RDS_Services/Fetch_Initial_Col_Data.js"></script>
		<script src="Scripts/JS/RDS_Services/Fetch_Selected_Sample_Data.js"></script>
		<script src="Scripts/JS/RDS_Services/Send_Collection_Data.js"></script>
		<script src="Scripts/JS/RDS_Services/Send_Sample_Data.js"></script>
	
		<!-- UI Handling Scripts -->
		<script src="Scripts/JS/UI_Handler_Scripts/UI_Alerts.js"></script>
		<script src="Scripts/JS/UI_Handler_Scripts/UI_Visibility_Modifiers.js"></script>
		<script src="Scripts/JS/UI_Handler_Scripts/Event_Handler.js"></script>
	
		<!-- On load Events -->
		<script src="Scripts/JS/Initialization_Scripts/onLoad.js"></script>
		
		
		<title>Biobank Home</title>
	</head>

	<body>
		<div class="container" id="mainDiv">
		
			<div id="dangerAlert">
  			</div>
  			
  			<div id="successAlert">
  			</div>
		
			<div class="row">
				<div class="column" id="titleCol">
					<h1>Bio-Bank</h1> 
				</div>
			</div>
			
			<div class="row">
				<div class="column subtitleTextCol">
					<h5>Welcome to Bio-Bank</h5>
				</div>
			</div>
			
			<div class="row">
				<div class="column dataTableCol">
					<table class="table" id="collectionTable">
					</table>
						
					<button class="btn btn-info" id="viewSelection">Search</button>	
					<button class="btn btn-primary" id="showAddCollectBtn">Add New Collection</button>	
				</div>
			</div>
			
			<div class="row">
				<div class="column newForm" id="newCollectForm" style="display:none">
				
					<hr class="rounded">
					
					<h5>Add new Collection:</h5>
						
					<label>Disease Name:</label>
					<input type="text" name="dis_term" id="dis_term">
						
					<label>Title:</label>
					<input type="text" name="dis_title" id="dis_title">
					<button class="btn btn-primary" id="submitColData">Add</button>
				
				</div>
			</div>
			
			<hr class="rounded">
			
			<div class="row">
				<div class="column subtitleTextCol">
					<h6 id="infoHead"></h6>
				</div>
			</div>
			
			<div class="row">
				<div class="column" id="sampleTableCol">
					<table class="table" id="sampleTable">
					</table>
				</div>
			</div>
			
			<div class="row">
				<div class="column newForm" id="newSampleForm" style="display:none">
				
					<hr class="rounded">
					
					<h5>Add new Sample:</h5>
						
					<label>Donor Count:</label>
					<input type="number" name="" id="don_Count">
						
					<label>Material Type:</label>
					<input type="text" name="" id="mat_Type">
					
					<input type="hidden" value="" id="collection_id">
										
					<button class="btn btn-primary" id="submitSamData">Add</button>
				</div>
			</div>
			
		</div>

	</body>
</html>