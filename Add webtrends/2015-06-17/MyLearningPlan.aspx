<html>
<head>
<title></title>
	<script>
		function fLoadData(){
			var x=document.getElementById("MyPlanList");
			x.innerHTML = parent.fLoadMyLearningPlan();
		}
		function fDelete(lRowID,lCourseID){
			parent.fDeleteCourseFromMyPlan(lRowID,lCourseID)
			var x=document.getElementById("MyPlanList");
			x.innerHTML = parent.fLoadMyLearningPlan();
		}
		

		function fDeleteExpCinema(lRowID){
			parent.fDeleteCourseFromMyPlanExpCinema(lRowID)
			var x=document.getElementById("MyPlanList");
			x.innerHTML = parent.fLoadMyLearningPlan();
		}
		
		function fViewLCLinks(lRowID){
			parent.fViewLinkFromMyPlan(lRowID)
		}
		
	</script>
	<style>
		body {font-family: "Verdana" !important;}
		table {border-collapse:collapse;width:720px;}
		tr td{border-collapse:collapse;font-size: 12px !important;  border:1px solid #d1d1d1; padding: 5px; border-spacing: 0;}
		#MyPlanPageTitle{ font-size: 18px !important;margin: 15px; margin-top: 55px;text-align:center;   }
		#MyPlanList{margin: 15px;  }
		.HelpIocn  { position:absolute; width:32px; height :32px; top:50px; left:460px; background-image:url("../SiteAssets/InfoIcon.jpg"); background-position:-37 0px;}
		.HelpIocn:hover { background-position:-37px 0px;}
		.MyPlanIcon{ position:absolute;width:50px; height :50px; top:0px;  left:365px;  background-image:url("../SiteAssets/LearningPlan.png"); background-position:0px 0px; }
		
		.btnRemove{ display:block;cursor:pointer;left:0px; top:0px; background-image:url("../SiteAssets/Delete.jpg");width:28px; height:32px; text-align:right;background-position:-25px 0px;}
		.btnRemove:hover{ background-position:-32px 0px;}
	</style>
	
</head>
<body onLoad="fLoadData()">
	<div id="divContainer">
		<div class="MyPlanIcon"></div>
		<div id="MyPlanPageTitle">My Learning Cart</div>
		<!--<div class="HelpIocn" title="To add your course to My Learning copy the  ID to the Search box in My Learning"> </div>-->
        <div><p style="text-align:center; font-size:80%;">Add to my Learning Cart means &#39;I want it and I will come back to it later&#39;.</p><p style="text-align:center; font-size:80%;">Let My Learning Cart serve as your ‘shopping list’ or your reminder to keep learning and improving.</p></div>
		<div id="MyPlanList"></div>
	</div>
<script src="/Style Library/Zurich Javascripts/jquery-1.7.2.js"></script>
<script type="text/javascript" src="/Style%20Library/Zurich%20Javascripts/collabWebtrends-v2.js "></script>	
</body>
</html>
       