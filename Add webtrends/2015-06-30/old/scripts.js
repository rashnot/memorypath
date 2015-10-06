if(typeof dcsMultiTrack !== 'function'){window.dcsMultiTrack = function() {};}
var WTSITE = "/community/00900/";
// var mainMenuNames=['Learning Insurance at Zurich','Learning Inside Zurich, Catalog','Learning Outside Zurich, Catalog','Learning from expertise','Learning Cinema','70:20:10 Development Guide','Learning Zurich History'];
var mainMenuNames=['Learning Inside Zurich, Catalog','Learning Outside Zurich, Catalog','Learning from expertise','Learning Cinema','Learning Zurich History','70:20:10 Development Guide','Zurich Business Glossary','Being at My Best'];

var LEARNING_INSURANCE_ZURICH_WAY = 6;		
var LEARNING_CATALOGUE = 0;
var LEARNING_FROM_EXPERTISE = 2;
var LEARNING_FROM_OUTSIDE = 1;
var LEARNING_FROM_CINEMA = 3;
var LEARNING_FROM_CUSTOMER = 5;
var LEARNING_FROM_HISTORY = 4;
var WHAT_IN_IT_FOR_ME = 7;

var academyCount;
var noOfColumns = 4;
var noOfRows;
var academyIndex =0;
var CourseType;
currUserID = "";
var currentContentIndex;

gLinksArrToOpen = new Array();

function fBuildBtnEvents(){
	
	$('.btnImage[titleText]').qtip()
	$('#imageholder .btn').click(function(event) {
		$('#imageholder .btn').hide();
		$('#imageholder .btnImage').hide();
		$('#dialog').hide();
		var n = $('#imageholder .btn').index($(this));
		$('#imageholder').animate({'top':20,'left':20,'width':150,'height':150},500, function(){
			$('#page-content').show();
			fLoadPageContent(n);
		});
		
		setTimeout(function(){
			$('#bigImage').fadeOut(100)
			$('#smallImage').fadeIn(100)
		}, 400);
		$('.navigationBtn').animate({'width':61},500);
	})
	$('#smallImage').click(function(event) {	
		$('#bigImage').fadeIn(100)
		$('#smallImage').fadeOut(100)	
		$('#page-content .content').html('');
		$('#imageholder').animate({'top':70,'left':260,'width':500,'height':500},500, function(){
			$('#imageholder .btn').show();
			$('#dialog').show();
		});
		$('.navigationBtn').animate({'width':0},500);
		$('#transitionPatch').show().animate({'opacity':1},500,function(){})
		
	})
}

function fHomePageBtnOver(obj, index){
	$('#btnImg'+index).show();
}
function fHomePageBtnOut(obj, index){
	$('#btnImg'+index).hide();
}

function fLoadPageContent(n){
	//Webtrends start
	WTuriMainMenu = WTSITE + mainMenuNames[n];
	dcsMultiTrack('DCS.dcsuri', WTuriMainMenu, 'WT.es', WTuriMainMenu, 'WT.ti', 'MainMenu' + n, 'WT.dl', '59');
        //Webtrends end
	currentContentIndex = n;
	
	$('#page-content #topicImage').removeClass().addClass('topicImage'+n);
	$('#page-content .topicHeading').html('').html($('.btnImage').eq(n).attr('titleText'));
	
	if(currentContentIndex == LEARNING_CATALOGUE || currentContentIndex == LEARNING_FROM_OUTSIDE || currentContentIndex == LEARNING_FROM_EXPERTISE || currentContentIndex == LEARNING_FROM_CINEMA){
		if(currentContentIndex == LEARNING_CATALOGUE) CourseType = "Internal";
		if( currentContentIndex == LEARNING_FROM_OUTSIDE) CourseType = "External";
		if( currentContentIndex == LEARNING_FROM_EXPERTISE) CourseType = "Expertise";
		if( currentContentIndex == LEARNING_FROM_CINEMA) CourseType = "Cinema";
		fGetLearningCartData();
		fGetAcademyData();
	}else if(currentContentIndex == LEARNING_FROM_CUSTOMER){
		fBuildLearningFromCustomer();
	}else if(currentContentIndex == LEARNING_FROM_HISTORY){
		fBuildLearningFromHistory();
	}else if(currentContentIndex == LEARNING_INSURANCE_ZURICH_WAY){
		fBuildLearningInsuranceZurichWay();
	}else if(currentContentIndex == WHAT_IN_IT_FOR_ME){
		fBuildWhatInItForMe();
	}
	
	$('#transitionPatch').animate({'opacity':0},500,function(){
		$(this).hide();
		var _index = currentContentIndex - 1;
		if(_index < 0) _index =7;
		if( 'object' === typeof $('.btnBack').data('qtip') ) $('.btnBack').qtip("destroy");
		$('.btnBack').qtip({content: $('.btnImage').eq(_index).attr('titleText')})
		_index = currentContentIndex + 1;
		if(_index > 7) _index =0;
		if( 'object' === typeof $('.btnNext').data('qtip') ) $('.btnNext').qtip("destroy");
		$('.btnNext').qtip({content: $('.btnImage').eq(_index).attr('titleText')})		
	})
}

function fBuildLearningFromHistory(){
	var str = '';
	$('#page-content .content').html('')
	str += '<div style="float:left; width:360px; font-size:110%; margin-right:10px;"><strong>Watch out for the changing images every week. </strong><br><br>'
	//str += 'Be inspired by how Zurich has evolved from a Swiss insurer into one of the world’s leading insurance companies.<br><br><a href="https://collaboration.zurich.com/community/00935/01/default.aspx" target="_blank">More...Visit the Zurich History blog &raquo;</a></div>'
	str += 'Look and learn how Zurich has evolved into one of the world&#39;s leading insurange groups.<br><br>History shapes the Zurich culture. As we strive to work together productively, communicating the history of Zurich can instill a sense of identity and purpose. We find in the Zurich history a rich source of stories that can motivate us to embrace change. In doing so, we don&#39;t simply strive to be at our best; we find our own place in history.<br><br><a href="https://collaboration.zurich.com/community/00935/01/default.aspx" target="_blank">Look and Learn &raquo;</a></div>'

	str += '<div style="float:left;"><img src="../SiteAssets/learning-zurich-history.jpg" width="250" height="250"></div>'
	$('#page-content .content').html(str)
}


function fBuildLearningFromCustomer(){
	var str = '';
	$('#page-content .content').html('')
	str += '<div style="float:left; width:360px; font-size:110%; margin-right:10px;">Drive your continuous learning by mixing experience, exposure, and education in your development plan.<br><br>By doing so, you combine work and learning. Learning is no longer an isolated activity that is done only outside the workplace. The 70-20-10 learning approach (developed by Michael Lombardo and Robert Eichinger, 2000) encourages you to consider learning as a continuous process and mix of three E&#39;s based on your learning needs:<br><br><strong>70% Experience,</strong> learning in the workplace, where your job becomes your &#39;classes&#39;. This is viewed as the most effective way to develop skills. As you make contributions, or manage others, you grow and adapt, creating new reasons and ways to be challenged. This includes learning through stretch assignments, special projects, and good role models.<br><br><strong>20% Exposure,</strong> learning though others, which involves interaction and relationships. Social learning helps you build connection with other professionals and thought leaders. It includes learning through mentoring, coaching, and networking.<br><br><strong>10% Education,</strong> formal learning, which we often think of in the context of leaning and development including self-directed or directed learning.<br/><br/><a href="/community/00900/SitePages/70-20-10-development-guide.aspx" >View tools and examples in the 70-20-10 development guide</a></div>'
	str += '<div style="float:left;"><img src="../SiteAssets/people-meeting.jpg" width="250" height="250"></div>'
	$('#page-content .content').html(str)
}

function fBuildWhatInItForMe(){
	var isHTML5Video = (typeof(document.createElement('video').canPlayType) != 'undefined');
	var str = '';
	$('#page-content .content').html('')
	str = '<p style="text-align:left; color:#666;">Watch out for the next featured country.</p>'
	  str +='<object id="myExperience" class="BrightcoveExperience">'
	  str += '<param name="bgcolor" value="#FFFFFF" />'
	  str += '<param name="width" value="615" />'
	  str += '<param name="height" value="345" />'
	  str += '<param name="playerID" value="1916831544001" />'
	  str += '<param name="playerKey" value="AQ~~,AAABvfS_O2E~,2A2x9jRPg2gSOJ4kE1VFgrN8zvSnsxl8" />'
	  str += '<param name="isVid" value="true" />'
	  str += '<param name="isUI" value="true" />'
	  str += '<param name="wmode" value="transparent" />'
	  str += '<param name="dynamicStreaming" value="true" />'
	  str += '<param name="@videoPlayer" value="4003103588001" />'
	  str += '</object>'
	  
	  $('#page-content .content').html(str)
	  brightcove.createExperiences();	
}


function fBuildLearningInsuranceZurichWay(){
	var isHTML5Video = (typeof(document.createElement('video').canPlayType) != 'undefined');
	var str = '';
	$('#page-content .content').html('')
		str = '<p style="text-align:left;  color:#666;">Learn the accepted Zurich definitions to produce the right results.<br><br>Your <a href="https://businessglossary.zurich.com:9445/ibm/iis/igc/" target="_blank">Zurich Business Glossary</a> brings together approved business terms and definitions.<br><br>It allows you to view the components from which they are formed, or how they are used. This official glossary is produced by Enterprise Data Analytics & Architecture in Group Operations &amp; Technology in collaboration with designated internal experts.<br><br>The glossary is work in progress. Please share your feedback and suggestions for improvement with <a href="https://people.zurich.com/Person.aspx?accountname=EZCORP%5CGBQGFO">Andy Lockwood</a><br><br><span style="color:red"><strong>To access, please:</strong><br><br>Front page &ndash; click on &#39;<strong>continue to this website</strong>&#39; (this issue is being fixed)<br>Logonid: &#39;readonly&#39;<br>Password: &#39;readonly&#39;</span></p>'		
	  str +='<p style="text-align:left;  color:#666;">You may also want to visit the <a href="https://intranet.zurich.com/content/Pages/Jargonbuster.aspx" target="_blank">Jargonbuster</a> for acronyms</p>'
	  $('#page-content .content').html(str)
	
	/*if(!isHTML5Video){
		var cachecontrol = Math.floor(Math.random()*99999);
		var swfUrl="../SiteAssets/vidPlayer.swf?"+cachecontrol
		vidUrl="../SiteAssets/TZW_VIdeo.flv"
		str ='<object id="FlashObjID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="620.0" height="346.5"><param name="movie" value="'+swfUrl+'"></param><param name=FlashVars value="vidUrl='+vidUrl+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"><param name="wmode" value="transparent"> </param><embed name="FlashObjID" src="'+swfUrl+'" type="application/x-shockwave-flash" width="620" height="346.5" allowscriptaccess="always" wmode="transparent" allowfullscreen="false" flashvars="vidUrl='+vidUrl+'"></embed></object>';
	}else{
		str += '<video controls id="Video" preload="auto" width="620" height="346.5" >';
		 str += '<source src="../SiteAssets/TZW_VIdeo.mp4" type="video/mp4">';
		str += '</video>';
	}
	$('#page-content .content').html(str)*/
	
}

function fGetAllCourses(){
	if($().SPServices){
		allCourseData = [];
		var viewFields = '';
		viewFields += '<FieldRef Name="ID"/><FieldRef Name="LinkTitle"/><FieldRef Name="GLMSCourceId"/>';
		viewFields += '<FieldRef Name="Academy"/><FieldRef Name="Description"/><FieldRef Name="Course_x0020_Languages"/>';
		viewFields += '<FieldRef Name="CourseType"/><FieldRef Name="Level"/><FieldRef Name="DeliveryMethod"/>';
		viewFields += '<FieldRef Name="DestinationLink"/><FieldRef Name="LinkDescription"/><FieldRef Name="AddtolearningPlan"/>';
		viewFields += '<FieldRef Name="ClickLearningPlan"/><FieldRef Name="Duration"/><FieldRef Name="hours_x002f_days"/>';
		viewFields += '<FieldRef Name="Business_x0020_Area"/><FieldRef Name="PublishingPageImage"/><FieldRef Name="Academy"/>';
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Course",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: '<Query><OrderBy><FieldRef Name="Order0"  Ascending="TRUE"></FieldRef></OrderBy></Query>',
			CAMLViewFields: '<ViewFields>'+viewFields+'</ViewFields>',
		   completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {

					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");
					tmpObj.Title = myrow.attr("ows_LinkTitle");
					tmpObj.GLMSCourceId = myrow.attr("ows_GLMSCourceId");
					if (tmpObj.GLMSCourceId == undefined){
						tmpObj.GLMSCourceId = "";
					}
					tmpObj.Academy = myrow.attr("ows_Academy");
					tmpObj.Description = myrow.attr("ows_Description");
					tmpObj.Language =  fGeneratestr((myrow.attr("ows_Course_x0020_Languages")=== undefined) ? "" : myrow.attr("ows_Course_x0020_Languages"));
					//tmpObj.Language=fGeneratstr("2;#English;#13;#Spanish;#3;#French;#4;#Italian")
					tmpObj.CourseType = myrow.attr("ows_CourseType");
					tmpObj.Level = myrow.attr("ows_Level");
					if (tmpObj.Level == undefined){
						tmpObj.Level = "";
					}
					tmpObj.DeliveryMethod = (myrow.attr("ows_DeliveryMethod")=== undefined) ? "" : myrow.attr("ows_DeliveryMethod");
					
					var DestinationLink = myrow.attr("ows_DestinationLink");
					
					if(DestinationLink == undefined || DestinationLink == 'undefined'){
						//DestinationLink = myrow.attr("ows_DestinationUrl");
					}
					if(DestinationLink == undefined || DestinationLink == 'undefined') DestinationLink = 'http://www.zurich.com/'
					else DestinationLink = DestinationLink.split(",")[0]
					tmpObj.DestinationLink = DestinationLink;		
					
					
					tmpObj.DestinationLinkDescription = myrow.attr("ows_LinkDescription");
					if (tmpObj.DestinationLinkDescription ==  undefined){
						tmpObj.DestinationLinkDescription = "";
					}
					
					
					tmpObj.AddtolearningPlan = myrow.attr("ows_AddtolearningPlan");
					tmpObj.ClickLearningPlan = myrow.attr("ows_ClickLearningPlan");
					tmpObj.Duration =  (myrow.attr("ows_Duration")=== undefined) ? "" : parseInt(myrow.attr("ows_Duration"));
					tmpObj.hoursDays =  (myrow.attr("ows_hours_x002f_days")=== undefined) ? "" : myrow.attr("ows_hours_x002f_days");
					
					tmpObj.BusinessAreas =  fGeneratestr((myrow.attr("ows_Business_x0020_Area")=== undefined) ? "BusinessAreas" : myrow.attr("ows_Business_x0020_Area"));
					
					
					var _Image = myrow.attr("ows_PublishingPageImage");
					if(_Image == undefined || _Image == 'undefined') _Image = '<img src="../SiteAssets/zurich-logo.png" style="border:0px solid" />';
					tmpObj.PublishingPageImage = _Image;					
					
					tmpObj.AcademyID = myrow.attr("ows_Academy").split(";#")[0];
					
					//if (allCourseData.length<1){
					allCourseData.push(tmpObj);
					//}
					
				});					
			}
		});			
	}
	
	
}

function fGetAllCinemas(){

	if($().SPServices){
		allCinemaData = [];
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Cinema",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: '<Query><OrderBy><FieldRef Name="Order0"  Ascending="TRUE"></FieldRef></OrderBy></Query>',
		   completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {

					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");
					tmpObj.Title = myrow.attr("ows_LinkTitle");
					tmpObj.Academy = myrow.attr("ows_Academy");
					tmpObj.Description = myrow.attr("ows_Description");
					if (tmpObj.Description == undefined){
						tmpObj.Description = "";
					}
					var DestinationLink = myrow.attr("ows_DestinationLink");
					if(DestinationLink == undefined || DestinationLink == 'undefined') DestinationLink = 'http://www.zurich.com/'
					else DestinationLink = DestinationLink.split(",")[0]
					tmpObj.DestinationLink = DestinationLink;	
					
					
					tmpObj.DestinationLinkDescription = myrow.attr("ows_LinkDescription");
					if (tmpObj.DestinationLinkDescription ==  undefined){
						tmpObj.DestinationLinkDescription = "";
					}					
					
					var _Image = myrow.attr("ows_CourseImage");
					if(_Image == undefined || _Image == 'undefined') _Image = '<img src="../SiteAssets/zurich-logo.png" style="border:0px solid" />';
					tmpObj.CourseImage = _Image;					
					tmpObj.AcademyID = myrow.attr("ows_Academy").split(";#")[0];
					allCinemaData.push(tmpObj);
					
				});					
			}
		});			
	}
	
	
}

function fGetAllExpertise(){

	if($().SPServices){
		allExpertiseData = [];
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Expertise",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: '<Query><OrderBy><FieldRef Name="Order0"  Ascending="TRUE"></FieldRef></OrderBy></Query>',
		   completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {

					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");
					tmpObj.Title = myrow.attr("ows_LinkTitle");
					tmpObj.Academy = myrow.attr("ows_Academy");
					tmpObj.Description = myrow.attr("ows_Description");
					if (tmpObj.Description == undefined){
						tmpObj.Description = "";
					}
					var DestinationLink = myrow.attr("ows_DestinationLink");
					if(DestinationLink == undefined || DestinationLink == 'undefined') DestinationLink = 'http://www.zurich.com/'
					else DestinationLink = DestinationLink.split(",")[0]
					tmpObj.DestinationLink = DestinationLink;	
					
					tmpObj.DestinationLinkDescription = myrow.attr("ows_LinkDescription");
					if (tmpObj.DestinationLinkDescription ==  undefined){
						tmpObj.DestinationLinkDescription = "";
					}					
					
					var _Image = myrow.attr("ows_CourseImage");
					if(_Image == undefined || _Image == 'undefined') _Image = '<img src="../SiteAssets/zurich-logo.png" style="border:0px solid" />';
					tmpObj.CourseImage = _Image;					
					tmpObj.AcademyID = myrow.attr("ows_Academy").split(";#")[0];
					allExpertiseData.push(tmpObj);
					
				});					
			}
		});			
	}
	
	
}



function fGetAcademiesWithCourses(lCourseType){
	var academyTempArrToReturn = new Array();
	
	for (var i=0;i<allCourseData.length;i++){
		if(allCourseData[i].CourseType == lCourseType){
			
			if ($.inArray( allCourseData[i].AcademyID, academyTempArrToReturn ) == -1){
				academyTempArrToReturn.push(allCourseData[i].AcademyID);
			}

		}
	}
	
	return academyTempArrToReturn;
}

function fGetAcademiesWithCinemas(){
	var academyTempArrToReturn = new Array();
	
	for (var i=0;i<allCinemaData.length;i++){
	
		if ($.inArray( allCinemaData[i].AcademyID, academyTempArrToReturn ) == -1){
			academyTempArrToReturn.push(allCinemaData[i].AcademyID);
		}
	
	}
	
	return academyTempArrToReturn;
	
}

function fGetAcademiesWithExpertise(){
	var academyTempArrToReturn = new Array();
	
	for (var i=0;i<allExpertiseData.length;i++){
	
		if ($.inArray( allExpertiseData[i].AcademyID, academyTempArrToReturn ) == -1){
			academyTempArrToReturn.push(allExpertiseData[i].AcademyID);
		}
	
	}
	
	return academyTempArrToReturn;
	
}

function fGetLearningCartData(){
	userLearningCartData = [];
	
	if($().SPServices){
		currUserID = jQuery.fn.SPServices.SPGetCurrentUser({fieldName: "Name",debug: false});
		var query ='<Query><Where><Eq><FieldRef Name="UserGADId" /><Value Type="Text">' + currUserID + '</Value></Eq></Where></Query>';
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "LearningPlan",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: query,
		    completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				//alert(xData.responseText)
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {
					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");
					tmpObj.Title = myrow.attr("ows_LinkTitle");
					tmpObj.RowID = parseInt(myrow.attr("ows_RowID"));
					userLearningCartData.push(tmpObj);
				});	

			}
		});			
	}	
	
}

function fGetAcademyData(){
		
	if((currentContentIndex == LEARNING_CATALOGUE) || (currentContentIndex == LEARNING_FROM_OUTSIDE)){

		fGetAllCourses();
		var academiesWithCourses = fGetAcademiesWithCourses(CourseType);	

	}else if(currentContentIndex == LEARNING_FROM_CINEMA){
		
		fGetAllCinemas();
		var academiesWithCinemas = fGetAcademiesWithCinemas();
	}else if(currentContentIndex == LEARNING_FROM_EXPERTISE){
		
		fGetAllExpertise();
		var academiesWithExpertise = fGetAcademiesWithExpertise();
	}
	

	if($().SPServices){
		currUserID = jQuery.fn.SPServices.SPGetCurrentUser({fieldName: "Name",debug: false});
		academyData = [];
		var query ='<Query><OrderBy><FieldRef Name="TileOrder"  Ascending="TRUE"></FieldRef></OrderBy></Query>';
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Academy",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: query,
		   completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {
					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");

					tmpObj.Title = myrow.attr("ows_LinkTitle");

					var _Image = myrow.attr("ows_PublishingPageImage");
					if(_Image == undefined || _Image == 'undefined') _Image = '';
					tmpObj.Image = _Image;

					var CommunityURL = myrow.attr("ows_CommunityURL");
					if(CommunityURL == undefined || CommunityURL == 'undefined') CommunityURL = ''
					else CommunityURL = CommunityURL.split(",")[0]
					tmpObj.CommunityURL = CommunityURL;
					
					var LearningCinemaURL = myrow.attr("ows_LearningCinemaURL");
					if(LearningCinemaURL == undefined || LearningCinemaURL == 'undefined') LearningCinemaURL = ''
					else LearningCinemaURL = LearningCinemaURL.split(",")[0]
					tmpObj.LearningCinemaURL = LearningCinemaURL;					
					
					tmpObj.Description = (myrow.attr("ows_Description")=== undefined) ? "" : myrow.attr("ows_Description")
					
					if (tmpObj.Description.length>0){
						tmpObj.Description = tmpObj.Description + " ";
					}
					tmpObj.AcademyType = (myrow.attr("ows_AcademyType")=== undefined) ? "" : myrow.attr("ows_AcademyType")
					
					tmpObj.InternalLearningSiteURL = myrow.attr("ows_InternalLearningSiteURL");
					tmpObj.InternalLearningSiteURLLabel = "";
					
					if (tmpObj.InternalLearningSiteURL == undefined){
						tmpObj.InternalLearningSiteURL = "";
					}else{
						var urlArr = tmpObj.InternalLearningSiteURL.split(", ");
						if (urlArr.length==2){
							if (urlArr[0] != urlArr[1]){
								tmpObj.InternalLearningSiteURLLabel = urlArr[1]
							}
						}
						tmpObj.InternalLearningSiteURL = tmpObj.InternalLearningSiteURL.split(",")[0];
					}
					

					tmpObj.ExternalLearningSiteURL = myrow.attr("ows_ExternalLearningSiteURL");
					tmpObj.ExternalLearningSiteURLLabel = "";
					
					if (tmpObj.ExternalLearningSiteURL == undefined){
						tmpObj.ExternalLearningSiteURL = "";
					}else{
						var urlArr = tmpObj.ExternalLearningSiteURL.split(", ");
						if (urlArr.length==2){
							if (urlArr[0] != urlArr[1]){
								tmpObj.ExternalLearningSiteURLLabel = urlArr[1]
							}
						}						
						tmpObj.ExternalLearningSiteURL = tmpObj.ExternalLearningSiteURL.split(",")[0];
					}
					
					if((currentContentIndex == LEARNING_CATALOGUE) || (currentContentIndex == LEARNING_FROM_OUTSIDE)){
						
						if ($.inArray( tmpObj.ID, academiesWithCourses ) != -1){
							academyData.push(tmpObj);
						}

					}else if(currentContentIndex == LEARNING_FROM_CINEMA){
						if ($.inArray( tmpObj.ID, academiesWithCinemas ) != -1){
							academyData.push(tmpObj);
						}						
					}else if(currentContentIndex == LEARNING_FROM_EXPERTISE){
						if ($.inArray( tmpObj.ID, academiesWithExpertise ) != -1){
							academyData.push(tmpObj);
						}						
					}else{
						academyData.push(tmpObj);
					}
					
				});	
				fBuildAcademyTiles();
			}
		});			
	}

}

var next_tr;
function fBuildAcademyTiles(){
	
	var lTempChainValueArr = new Array()
	var lTempCountryArr = new Array()
	for(var i=0; i<academyData.length; i++){
		if(academyData[i].AcademyType != "Country"){
			lTempChainValueArr.push(academyData[i]);
		} else {
			lTempCountryArr.push(academyData[i]);
		}
	}
	academyData = new Array();
	academyData = $.merge(lTempChainValueArr, lTempCountryArr);

	academyCount =academyData.length;
	noOfRows = Math.ceil(academyCount/noOfColumns);	
	academyIndex =0;
	var str = '';
	$('#page-content .content').html('')
	if(CourseType=="Internal")
		str += '<p style="text-align:left; color:#666;">Explore. The academies, functions, and countries open up different learning resources so you can access &ndash; from this single convenient location - an even wider range of learning (including My Learning). In addition to getting access to material that will help you improve in your current roles, you have a broader choice of  tools and services that will help you develop skills needed for roles to which you may aspire.</p><p style="text-align:left; color:#666;">This catalog equips you to drive your continuous learning to achieve our strategy. The open learning community concept makes sharing knowledge easier and helps everyone learn from each other.</p><p style="text-align:left; color:#666;">Access to &#39;My Learning&#39; on the Group Learning Management System (GEMS) or to your local learning site have not changed. Those who wish to access them directly can continue to do so.</p>';
	if(CourseType=="External")
		str += '<p style="text-align:left; color:#666;">Explore. The academies, functions, and countries open up links to external learning resources that can help you refresh your skills.</p><p style="text-align:left; color:#666;">Insurance remains a skills business and so it is important that we all continue to develop and bring outside-in perspective. But this is also about each and every one of us being curious on a daily basis and looking to how we can improve and do our best in everything we do. </p>';
	if(CourseType=="Expertise")
		str += '<p style="text-align:left; color:#666;">Join. The academies and functions open up different community of expertise to those who share common learning interests. Leaders and experts interact via collaboration sites to learn from each other on how to improve what they do, seek help, and give help.</p><p style="text-align:left; color:#666;">The knowledge, expertise and experience we have around the Zurich world is simply amazing. These are key assets which we can use for our success. We already have a lot of excellent practices, tools and procedures in place in many parts of Zurich. We can continue to get better at spreading these further and using them more consistently to eliminate reinvention or duplication.</p>';
	if(CourseType=="Cinema")
		str += '<p style="text-align:left; color:#666;">We  learn in many different ways. If learning with videos stimulate your ability to acquire information, and you are motivated by being able to see the presenter, this is for you.</p><p style="text-align:left; color:#666;">Watch and learn through others &ndash; from their experiences and passion for what they do.</p>';	
	str += '<table class="academy-grid">';
	
	for(var i=0; i<noOfRows; i++){
		var _class = ''
		if (noOfRows > 1){
			if(i == noOfRows-1) _class = 'lastRow';
		}
		str += '<tr class="'+_class+'">';
		
		var tdAdded = 0;
		
		for(var j=0; j<noOfColumns; j++){
			if(academyData[academyIndex].AcademyType != "Country"){
				tdAdded++;
				str += '<td><div id="Academy_'+academyData[academyIndex].ID+'" class="academy-tile academy-tile-normal" title="'+academyData[academyIndex].Description+'">\
					<div>'+academyData[academyIndex].Image+'</div>\
					<div class="image"></div>\
					<div class="text">'+academyData[academyIndex].Title+'</div>\
					</div></td>';
			} else {
				tdAdded++;
				str += '<td><div id="Academy_'+academyData[academyIndex].ID+'" class="academy-tile academy-tile-normal" title="'+academyData[academyIndex].Description+'">\
					<div>'+academyData[academyIndex].Image+'</div>\
					<div class="image" style="background-position:center center !important;" ></div>\
					<div class="text">'+academyData[academyIndex].Title+'</div>\
					</div></td>';
			}
			academyIndex++;
			if(academyIndex == academyData.length){
				break;
			}	
		}	
		
		if (noOfRows == 1){
			if (tdAdded<noOfColumns){
				for(var j=(tdAdded); j<noOfColumns; j++){
					str += '<td style="border:0px solid #FFFFFF"><div style="width:154px;">&nbsp;</div></td>';
				}
			}
		}
		str += '</tr>';
		str += '<tr class="trTileDetails">';
			str += '<td class="tdTileDetails" colspan='+noOfColumns+'>';
				str += '<div class="academy-tile-details"><div class="academy-tile-details-inner">\
				</div></div>';
			str += '</td>';
		str += '</tr>';		
	}
	str += '</table>';
	
	
	$('#page-content .content').html(str);
	
	$( ".academy-tile img" ).load(function() {
		$(this).parent().parent().find('.image').css('background-image', 'url('+$(this).attr('src')+')');
	});
	
	$('.academy-tile[title]').qtip()
	
	$('.academy-tile').hover(function() {
		if($(this).hasClass('academy-tile-clicked')) return;
		$(this).removeClass('academy-tile-normal').addClass('academy-tile-hover');
		//$(this).parent().css('border','1px solid #335cae')
	},function(){
		if($(this).hasClass('academy-tile-clicked')) return;
		$(this).removeClass('academy-tile-hover').addClass('academy-tile-normal');
		//$(this).parent().css('border','1px solid #d1d1d1')
	});
	
	$('.academy-tile').click(function(event) {
		if(currentContentIndex == LEARNING_CATALOGUE || currentContentIndex == LEARNING_FROM_OUTSIDE || currentContentIndex == LEARNING_FROM_CINEMA || currentContentIndex == LEARNING_FROM_EXPERTISE){
			if($(this).hasClass('academy-tile-clicked')){

				var expanded_tr = $(".academy-grid").find( ".expanded" );
				expanded_tr.find('.academy-tile-details .academy-tile-details-inner').html('')
				expanded_tr.find(".academy-tile-details").animate({
					height: 0
				},500, function(){
					$(this).parent().parent().removeClass('expanded');
					$(this).parent().parent().hide();
				});		
				
				$('.academy-tile').removeClass('academy-tile-clicked').removeClass('academy-tile-hover').addClass('academy-tile-normal');
				$('.academy-tile').parent().css('border','1px solid #d1d1d1')
				return;
			}
			
			$('.academy-tile').removeClass('academy-tile-clicked').removeClass('academy-tile-hover').addClass('academy-tile-normal');
			$(this).removeClass('academy-tile-hover').removeClass('academy-tile-normal').addClass('academy-tile-clicked');
			
			$('.academy-tile').parent().css('border','1px solid #d1d1d1')
			$(this).parent().css('border','1px solid #335cae')
			
			var _tIndex = $(this).parent().parent().find('td').index($(this).parent());
				
			next_tr = $(this).parent().parent().next();
			var bgPos = ((_tIndex*154)+68)+'px 0px';
			next_tr.find('td').removeClass().addClass('tdTileDetailsDown').css('backgroundPosition', bgPos)	
			if($(this).parent().parent().hasClass('lastRow')) {
				next_tr = $(this).parent().parent().prev();
				bgPos = ((_tIndex*154)+68)+'px bottom';
				next_tr.find('td').removeClass().addClass('tdTileDetailsUp').css('backgroundPosition', bgPos)	
			}
			if(currentContentIndex == LEARNING_CATALOGUE || currentContentIndex == LEARNING_FROM_OUTSIDE){ 
				fGetCourseData($(this).attr('ID').split('_')[1]);
			}else if (currentContentIndex == LEARNING_FROM_CINEMA){
				fGetCinemaData($(this).attr('ID').split('_')[1]);
			}else if (currentContentIndex == LEARNING_FROM_EXPERTISE){
				fGetExpertiseData($(this).attr('ID').split('_')[1]);
			}
		}
	})
}

function fGetCourseData(academyID){
	
	courseData = [];
	
	for (var i=0;i<allCourseData.length;i++){
		if (allCourseData[i].CourseType == CourseType){
			if (allCourseData[i].AcademyID == academyID){
				courseData.push(allCourseData[i]);
			}
		}
	}
	//Webtrends start
        //var WTAcademyName = $('#Academy_' + academyID)[0].childNodes[5].outerText;
        var WTAcademyName = courseData[0].Academy.split("#")[1];
	WTuriAcademy = WTuriMainMenu + '/' + WTAcademyName; //+ '(' + academyID + ')';
	dcsMultiTrack('DCS.dcsuri', WTuriAcademy, 'WT.es', WTuriAcademy, 'WT.ti', WTAcademyName, 'WT.dl', '59');
        //Webtrends end
	var expanded_tr = $(".academy-grid").find( ".expanded" );
	
	if(expanded_tr.length > 0 && ($(".academy-grid").find( ".trTileDetails" ).index(next_tr) != $(".academy-grid").find( ".trTileDetails" ).index(expanded_tr))){
		expanded_tr.find('.academy-tile-details .academy-tile-details-inner').html('')
		expanded_tr.find(".academy-tile-details").animate({
			height: 0
		},500, function(){
			$(this).parent().parent().removeClass('expanded');
			$(this).parent().parent().hide();
		});		
	}	

	next_tr.show();
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());
	next_tr.find('.academy-tile-details .academy-tile-details-inner').html(fGetCoursesList(academyID))
	
	
	if ($("#dv_courselist_int").innerWidth()>580){
		$("#dv_cl_sr_container").show();
	}else{
		$("#dv_cl_sr_container").hide();
	}
	
	
	


	$( "#AcademyCourseList img" ).load(function() {
		ResizeBigPhotoRatio($(this)[ 0 ],100,75);
	});
	animateHeight(next_tr);


}

function fGetCinemaData(academyID){
        
	cinemaData = [];
	
	for (var i=0;i<allCinemaData.length;i++){
		if (allCinemaData[i].AcademyID == academyID){
			cinemaData.push(allCinemaData[i]);
		}
	}
        
	//Webtrends start
	//var WTAcademyName = $('#Academy_' + academyID)[0].childNodes[5].outerText;
        var WTAcademyName = cinemaData[0].Academy.split("#")[1];
	WTuriAcademy = WTuriMainMenu + '/' + WTAcademyName; //+ '(' + academyID + ')';
	dcsMultiTrack('DCS.dcsuri', WTuriAcademy, 'WT.es', WTuriAcademy, 'WT.ti', WTAcademyName, 'WT.dl', '59');
        //Webtrends end

	
	var expanded_tr = $(".academy-grid").find( ".expanded" );
	
	if(expanded_tr.length > 0 && ($(".academy-grid").find( ".trTileDetails" ).index(next_tr) != $(".academy-grid").find( ".trTileDetails" ).index(expanded_tr))){
		expanded_tr.find('.academy-tile-details .academy-tile-details-inner').html('')
		expanded_tr.find(".academy-tile-details").animate({
			height: 0
		},500, function(){
			$(this).parent().parent().removeClass('expanded');
			$(this).parent().parent().hide();
		});		
	}	

	next_tr.show();
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());
	next_tr.find('.academy-tile-details .academy-tile-details-inner').html(fGetCinemasList(academyID))
	
	if ($("#dv_courselist_int").innerWidth()>580){
		$("#dv_cl_sr_container").show();
	}else{
		$("#dv_cl_sr_container").hide();
	}
	

	$( "#AcademyCourseList img" ).load(function() {
		ResizeBigPhotoRatio($(this)[ 0 ],100,75);
	});
	
	animateHeight(next_tr);


}

function fGetExpertiseData(academyID){
        
	expertiseData = [];
	
	for (var i=0;i<allExpertiseData.length;i++){
		if (allExpertiseData[i].AcademyID == academyID){
			expertiseData.push(allExpertiseData[i]);
		}
	}
	
        //webtrends start
	//var WTAcademyName = $('#Academy_' + academyID)[0].childNodes[5].outerText;
        var WTAcademyName = expertiseData[0].Academy.split("#")[1];
	WTuriAcademy = WTuriMainMenu + '/' + WTAcademyName; //+ '(' + academyID + ')';
	dcsMultiTrack('DCS.dcsuri', WTuriAcademy, 'WT.es', WTuriAcademy, 'WT.ti', WTAcademyName, 'WT.dl', '59');
        //webtrends end
	
	var expanded_tr = $(".academy-grid").find( ".expanded" );
	
	if(expanded_tr.length > 0 && ($(".academy-grid").find( ".trTileDetails" ).index(next_tr) != $(".academy-grid").find( ".trTileDetails" ).index(expanded_tr))){
		expanded_tr.find('.academy-tile-details .academy-tile-details-inner').html('')
		expanded_tr.find(".academy-tile-details").animate({
			height: 0
		},500, function(){
			$(this).parent().parent().removeClass('expanded');
			$(this).parent().parent().hide();
		});		
	}	

	next_tr.show();
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());
	next_tr.find('.academy-tile-details .academy-tile-details-inner').html(fGetExpertiseList(academyID))
	
	if ($("#dv_courselist_int").innerWidth()>580){
		$("#dv_cl_sr_container").show();
	}else{
		$("#dv_cl_sr_container").hide();
	}
	

	$( "#AcademyCourseList img" ).load(function() {
		ResizeBigPhotoRatio($(this)[ 0 ],100,75);
	});
	
	animateHeight(next_tr);


}



function fEnableDisableSlideRightLeft(newLeftPos){

	if (newLeftPos <= 0){
		$("#dv_cl_sl_container").hide();
	}else{
		$("#dv_cl_sl_container").show();
	}	
	if ((newLeftPos+580) >= $("#dv_courselist_int").innerWidth()){
		$("#dv_cl_sr_container").hide();
	}else{
		$("#dv_cl_sr_container").show();
	}
}

function fSlideRight(){
	var leftPos = $('#dv_courselist').scrollLeft();
	var newLeftPos = leftPos+580;
	
	fEnableDisableSlideRightLeft(newLeftPos);
	
	$("#dv_courselist").animate({scrollLeft: (newLeftPos)}, 800);
		
}

function fSlideLeft(){
	var leftPos = $('#dv_courselist').scrollLeft();
	var newLeftPos = leftPos-580;
	
	fEnableDisableSlideRightLeft(newLeftPos);
	
	$("#dv_courselist").animate({scrollLeft: (newLeftPos)}, 800);
}


function fGeneratestr(lref){
	ltempArr = lref.split(";#");
	var str = new Array();
	for(i=1;i<ltempArr.length;i++){
		if(i%2==1){
			str.push(ltempArr[i])
		}
	}
	return str.join(", ");
	
}
function fGetCoursesList(academyID){
	
	var str = '<div id="AcademyCourseList">';
	str += '<div class="description">'+getListItem(academyData, 'ID', academyID).Description+'</div>';
	if (CourseType == "External"){
		str += '<div class="topCLabel">Explore Outside Institutions</div>';
	}else{
		str += '<div class="topCLabel">Explore Open Courses</div>';
	}
	if(courseData.length > 0){
		str += '<div id="dv_cl_sl_container" class="btnBackInt" style="position:absolute;left:-30px;top:150px;width:30px;height:30px;display:none" onClick="fSlideLeft()"></div>';	
		str += '<div style="width:580px;overflow-x:hidden" id="dv_courselist"><div id="dv_courselist_int" style="width:'+(116*courseData.length)+'px">';	
		str += '<table class="coursesTable">';
		str += '<tr>';
		var _w = 580 / courseData.length;
		if (_w < 116){
			_w = 116;
		}
		for(var i=0; i<courseData.length; i++){
			str += '<td style="width:'+_w+'px"><div style="width:'+(_w-10)+'px"><b>'+courseData[i].Title+'</b>';
			
			if (CourseType == "Internal"){
				str += '<br><span class="courseLevel">'+courseData[i].Level+'</span>';
			}
			
			str += '</div></td>';
		}
		str += '</tr>';
		str += '<tr><td colspan=5 style="height:6px;"></td></tr>';
		str += '<tr>';
		
		for(var i=0; i<courseData.length; i++){
			str += '<td id="CourseListItem_'+courseData[i].ID+'" class="CourseListItem">';
				str += '<div class="courseImage" onClick="fShowCourseDetails('+courseData[i].ID+', this)"><div>'+courseData[i].PublishingPageImage+'</div></div>';
				str += '<div class="seperator" style="width:100px;clear:both;"></div>';
				str += '<div id="" title="View Details" class="btns viewDetailBtn" onClick="fShowCourseDetails('+courseData[i].ID+', this)"></div>';
				
				if(fCheckLearningPlanList(courseData[i].ID)){
					str += '<div id="" title="Added to My Learning Cart" class="btns addToPlanBtn btnDisabled"></div>';
				}else{
					str += '<div id="addToPlanBtn_'+courseData[i].ID+'" title="Add to My Learning Cart" class="btns addToPlanBtn addToPlanBtnActive" onClick="fAddToPlan('+courseData[i].ID+')"></div>';
				}
				
				str += '<div class="clearF""></div>';
				str += '<div class="seperator" style="width:100px;clear:both;"></div>';
				str += '<div class="arrowDown"></div>';
				
			str += '</td>';
		}
		
		str += '</tr>';
		str += '</table>';
		str += '</div></div>';
		str += '<div id="dv_cl_sr_container" class="btnNextInt" style="position:absolute;right:-30px;top:150px;width:30px;height:30px;display:none" onClick="fSlideRight()"></div>';
		str += '</div>';
		
		str += '<div id="AcademyCourseDetails"></div>';
		if(CourseType=="Internal"){
			
			var InternalLearningSiteURL = getListItem(academyData, 'ID', academyID).InternalLearningSiteURL;
			var InternalLearningSiteURLLabel = getListItem(academyData, 'ID', academyID).InternalLearningSiteURLLabel;
			if (InternalLearningSiteURL != ""){
				var defLabel = 'More...Visit the Learning Site >>';
				if (InternalLearningSiteURLLabel != ""){
					defLabel = InternalLearningSiteURLLabel + ' >>'
				}
				var lLinkNum = fAddToGLinks(InternalLearningSiteURL)
				str += '<div style="height:40px;padding-left:20px; padding-top:10px; "><a href="javascript:fOpenLinkFromGLinks('+lLinkNum+')">'+defLabel+'</a></div>';
			}
			
		}else if(CourseType=="External"){

			var ExternalLearningSiteURL = getListItem(academyData, 'ID', academyID).ExternalLearningSiteURL;
			var ExternalLearningSiteURLLabel = getListItem(academyData, 'ID', academyID).ExternalLearningSiteURLLabel;
			if (ExternalLearningSiteURL != ""){
				var defLabel = 'More...Visit the external site >>';
				if (ExternalLearningSiteURLLabel != ""){
					defLabel = ExternalLearningSiteURLLabel + ' >>'
				}
				var lLinkNum = fAddToGLinks(ExternalLearningSiteURL)
				str += '<div style="height:40px;padding-left:20px; padding-top:10px; "><a href="javascript:fOpenLinkFromGLinks('+lLinkNum+')">'+defLabel+'</a></div>';
			}

		}

	}else{
		str += '<div style="padding:20px 0px 20px 0px;">Coming soon.</div>';
	}
	
	return str;
}

function fGetCinemasList(academyID){
	
	var str = '<div id="AcademyCourseList">';
	str += '<div class="description">'+getListItem(academyData, 'ID', academyID).Description+'</div>';
	str += '<div class="topCLabel">Watch & Learn</div>';
	if(cinemaData.length > 0){
		str += '<div id="dv_cl_sl_container" class="btnBackInt" style="position:absolute;left:-30px;top:150px;width:30px;height:30px;display:none" onClick="fSlideLeft()"></div>';	
		str += '<div style="width:580px;overflow-x:hidden" id="dv_courselist"><div id="dv_courselist_int" style="width:'+(116*cinemaData.length)+'px">';	
		str += '<table class="coursesTable">';
		str += '<tr>';
		var _w = 580 / cinemaData.length;
		if (_w < 116){
			_w = 116;
		}
		for(var i=0; i<cinemaData.length; i++){
			str += '<td style="width:'+_w+'px"><div style="width:'+(_w-10)+'px"><b>'+cinemaData[i].Title+'</b>';
			str += '</div></td>';
		}
		str += '</tr>';
		str += '<tr><td colspan=5 style="height:6px;"></td></tr>';
		str += '<tr>';
		
		for(var i=0; i<cinemaData.length; i++){
			str += '<td id="CourseListItem_'+cinemaData[i].ID+'" class="CourseListItem">';
				str += '<div class="courseImage" onClick="fShowCinemaDetails('+cinemaData[i].ID+', this)"><div>'+cinemaData[i].CourseImage+'</div></div>';
				str += '<div class="seperator" style="width:100px;clear:both;"></div>';
				str += '<div id="" title="View Details" class="btns viewDetailBtn" onClick="fShowCinemaDetails('+cinemaData[i].ID+', this)"></div>';
				
				if(fCheckLearningPlanList(cinemaData[i].ID)){
					str += '<div id="" title="Added to My Learning Cart" class="btns addToPlanBtn btnDisabled"></div>';
				}else{
					str += '<div id="addToPlanBtn_'+cinemaData[i].ID+'" title="Add to My Learning Cart" class="btns addToPlanBtn addToPlanBtnActive" onClick="fAddToPlan('+cinemaData[i].ID+')"></div>';
				}
				
				str += '<div class="clearF""></div>';
				str += '<div class="seperator" style="width:100px;clear:both;"></div>';
				str += '<div class="arrowDown"></div>';
				
			str += '</td>';
		}
		
		str += '</tr>';
		str += '</table>';
		str += '</div></div>';
		str += '<div id="dv_cl_sr_container" class="btnNextInt" style="position:absolute;right:-30px;top:150px;width:30px;height:30px;display:none" onClick="fSlideRight()"></div>';
		str += '</div>';
		
		str += '<div id="AcademyCourseDetails"></div>';

	}else{
		str += '<div style="padding:20px 0px 20px 0px;">Coming soon.</div>';
	}
	return str;
}

function fGetExpertiseList(academyID){
	
	var str = '<div id="AcademyCourseList">';
	str += '<div class="description">'+getListItem(academyData, 'ID', academyID).Description+'</div>';
	str += '<div class="topCLabel">Explore Open Communities</div>';
	if(expertiseData.length > 0){
		str += '<div id="dv_cl_sl_container" class="btnBackInt" style="position:absolute;left:-30px;top:150px;width:30px;height:30px;display:none" onClick="fSlideLeft()"></div>';	
		str += '<div style="width:580px;overflow-x:hidden" id="dv_courselist"><div id="dv_courselist_int" style="width:'+(116*expertiseData.length)+'px">';	
		str += '<table class="coursesTable">';
		str += '<tr>';
		var _w = 580 / expertiseData.length;
		if (_w < 116){
			_w = 116;
		}
		for(var i=0; i<expertiseData.length; i++){
			str += '<td style="width:'+_w+'px"><div style="width:'+(_w-10)+'px"><b>'+expertiseData[i].Title+'</b>';
			str += '</div></td>';
		}
		str += '</tr>';
		str += '<tr><td colspan=5 style="height:6px;"></td></tr>';
		str += '<tr>';
		
		for(var i=0; i<expertiseData.length; i++){
			str += '<td id="CourseListItem_'+expertiseData[i].ID+'" class="CourseListItem">';
				str += '<div class="courseImage" onClick="fShowExpertiseDetails('+expertiseData[i].ID+', this)"><div>'+expertiseData[i].CourseImage+'</div></div>';
				str += '<div class="seperator" style="width:100px;clear:both;"></div>';
				str += '<div id="" title="View Details" class="btns viewDetailBtn" onClick="fShowExpertiseDetails('+expertiseData[i].ID+', this)"></div>';
				if(fCheckLearningPlanList(expertiseData[i].ID)){
					str += '<div id="" title="Added to My Learning Cart" class="btns addToPlanBtn btnDisabled"></div>';
				}else{
					str += '<div id="addToPlanBtn_'+expertiseData[i].ID+'" title="Add to My Learning Cart" class="btns addToPlanBtn addToPlanBtnActive" onClick="fAddToPlan('+expertiseData[i].ID+')"></div>';
				}
				
				str += '<div class="clearF""></div>';
				str += '<div class="seperator" style="width:100px;clear:both;"></div>';
				str += '<div class="arrowDown"></div>';
				
			str += '</td>';
		}
		
		str += '</tr>';
		str += '</table>';
		str += '</div></div>';
		str += '<div id="dv_cl_sr_container" class="btnNextInt" style="position:absolute;right:-30px;top:150px;width:30px;height:30px;display:none" onClick="fSlideRight()"></div>';
		str += '</div>';
		
		str += '<div id="AcademyCourseDetails"></div>';

	}else{
		str += '<div style="padding:20px 0px 20px 0px;">Coming soon.</div>';
	}
	return str;
}

function fShowCourseDetails(ID, obj){
        //WT global
        WTCourseName = fWTgetCourseTitle(CourseType, ID);
        //Webtrends start todo
	WTuriCourse = WTuriAcademy + '/VD:' + WTCourseName;
	dcsMultiTrack('DCS.dcsuri', WTuriCourse, 'WT.es', WTuriCourse, 'WT.ti', WTCourseName, 'DCSext.MLCAVD', WTCourseName, 'WT.dl', '59');
	//Webtrends end
    
	if($(obj).hasClass('btnDisabled')) return;
	
	$('.CourseListItem').find('.courseImage').removeClass('btnDisabled');
	$('.CourseListItem').find('.viewDetailBtn').removeClass('btnDisabled').removeClass('viewDetailBtnNohover');
	$('.CourseListItem').find('.arrowDown').css('visibility','hidden');
	$('#CourseListItem_'+ID).find('.courseImage').addClass('btnDisabled');
	//$('#CourseListItem_'+ID).find('.viewDetailBtn').addClass('btnDisabled').addClass('viewDetailBtnNohover');
	$('#CourseListItem_'+ID).find('.viewDetailBtn').addClass('viewDetailBtnNohover');
	$('#CourseListItem_'+ID).find('.arrowDown').css('visibility','visible');
	
	var courseObj = getListItem(courseData, 'ID', ID);
	var str = '';
	str += '<div style="display:inline-block;  position:relative; width:100%;">';	
	//str += '<div class="floatL"><div class="courseImage"><div>'+courseObj.PublishingPageImage+'</div></div></div>';			
	str += '<div class="floatL" style="margin-left:0px;">';
	str += '<div style="height:30px;"><b>'+courseObj.Title+'</b>';
	if (courseObj.GLMSCourceId != ""){
		str += '	<span class="courseLevel"> ('+courseObj.GLMSCourceId+')</span>';
	}
	str += '</div>';
	
	if (CourseType == "Internal"){
	
		if(courseObj.BusinessAreas != ''){
			str += '<div class="language">'+courseObj.BusinessAreas+'</div>';
		}	
		if (courseObj.Level != ''){
			str += '<div class="language">'+courseObj.Level+'</div>';
		}
	
	}
	str += '</div>';
	str += '</div>';
	if (CourseType == "Internal"){
		if ((courseObj.BusinessAreas != '')||(courseObj.Level != '')){
			str += '<div class="clearF" style="height:10px;"></div>';
		}
	}
	str += '<div style="display:inline-block;  position:relative; width:100%;">';	
	str += '<div class="seperator clearF"></div>';
	
	
	var arrPipeSeparateDesc = new Array();
	if(courseObj.DeliveryMethod != ''){
		arrPipeSeparateDesc.push(courseObj.DeliveryMethod);
	}
	if (CourseType == "Internal"){
		if(courseObj.Duration != ''){
			arrPipeSeparateDesc.push(courseObj.Duration +' '+courseObj.hoursDays);
		}
	}
	if(courseObj.Language != ''){
		arrPipeSeparateDesc.push('Available in '+courseObj.Language);
	}
	if (arrPipeSeparateDesc.length>0){
		str += '<div class="">'+arrPipeSeparateDesc.join(' | ')+'</div>';
		str += '<div class="seperator"></div>';	
	}
	
	/*
	var cDuration = '';
	if(courseObj.Duration != '') cDuration = ' | '+courseObj.Duration +' '+courseObj.hoursDays
	if(courseObj.DeliveryMethod == '') cDuration = courseObj.Duration +' '+courseObj.hoursDays
	var lLang = ""
	if(courseObj.Language != ''){
		lLang = 'Available in '+courseObj.Language;
	}else{	
		lLang = 'Language';
	}	
		
	if (CourseType == "Internal"){
		str += '<div class="">'+courseObj.DeliveryMethod + cDuration + " | " + lLang + '</div>';
	}else{
		str += '<div class="">'+courseObj.DeliveryMethod + " | " + lLang + '</div>';
	}
	
	
	str += '<div class="seperator"></div>';	
	
	*/
	str += '<div class="description">'+courseObj.Description+'</div>';		
	str += '<div class="clearF" style="height:20px;"></div>';	
	
	str += '<div class="seperator clearF"></div>';	
	if(fCheckLearningPlanList(courseObj.ID)){
		str += '<div class="addToPlanBtn floatR btnDisabled">Added to My Learning Cart</div>';	
	}else{
		str += '<div id="add_Link_Below_'+courseObj.ID+'" class="CourseLink floatR" onClick="fAddToPlan(\''+courseObj.ID+'\')" >Add to My Learning Cart >></div>';	
		str += '<div class="clearF" style="height:3px;"></div>';
	}
	str += '<div class="seperator clearF"></div>';
	var linkStr = 'Go to Course in My Learning >>';
	if(CourseType == "External"){
		linkStr = 'Visit Site >>';
	}
	
	if (courseObj.DestinationLinkDescription != ""){
		linkStr = courseObj.DestinationLinkDescription + ' >>';
	}
	
	var lLinkNum = fAddToGLinks(courseObj.DestinationLink)
	str += '<div class="CourseLink floatR" onClick="fOpenLinkFromGLinks('+lLinkNum+')">'+linkStr+'</div>';
	str += '</div>';
	
	
	str += '<div class="clearF" style="height:0px;"></div>';	
	
	
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());	
	$('#AcademyCourseDetails').html('').html(str).show();
	$( "#AcademyCourseDetails img" ).load(function() {
		ResizeBigPhotoRatio($(this)[ 0 ],100,75);
	});	
	animateHeight(next_tr);
	
	if(sessionStorage){
		if (courseObj.GLMSCourceId != ""){
			if(sessionStorage[courseObj.GLMSCourceId]){	
			}else{
				var currCount;
				if($().SPServices){
					var query ='<Query><Where><Eq><FieldRef Name="ID"/><Value Type="Text">' + courseObj.ID + '</Value></Eq></Where></Query>';
					$().SPServices({
						operation: "GetListItems",//GetListCollection, GetListItems, GetList
						async: false,
						listName: "Course",
						webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
						CAMLRowLimit: 1,
						CAMLQuery: query,
					   completefunc: function (xData, Status) {
							if (Status == "error"){
								alert("error = "+xData.statusText);
								return;
							}
							$(xData.responseXML).find("z\\:row, row").each(function (idx) {
								currCount = parseInt($(this).attr("ows_ClickLearningPlan"));
							});					
						}
					});	
					if(isNaN(currCount)|| currCount == undefined || currCount == 'undefined') currCount = 1;
					else currCount++;

					var listToBeUpdated = '<Batch OnError="Continue" ListVersion="1" ViewName="">'
					listToBeUpdated += '<Method ID="1" Cmd="Update">';
					listToBeUpdated += '<Field Name="ID"><![CDATA[' + courseObj.ID + ']]></Field>';
					listToBeUpdated += '<Field Name="ClickLearningPlan"><![CDATA[' + currCount + ']]></Field>';
					listToBeUpdated += '</Method>';
					listToBeUpdated += '</Batch>'
					fUpdateList("Course", listToBeUpdated , "Add" )	
					sessionStorage[courseObj.GLMSCourceId] = 1;
				}		
			}
		}
	}
}


function fShowCinemaDetails(ID, obj){
//WT global
        WTCourseName = fWTgetCourseTitle(CourseType, ID);
        //Webtrends start todo
	WTuriCourse = WTuriAcademy + '/VD:' + WTCourseName;
	dcsMultiTrack('DCS.dcsuri', WTuriCourse, 'WT.es', WTuriCourse, 'WT.ti', WTCourseName, 'DCSext.MLCAVD', WTCourseName, 'WT.dl', '59');
	//Webtrends end
	if($(obj).hasClass('btnDisabled')) return;
	
	$('.CourseListItem').find('.courseImage').removeClass('btnDisabled');
	$('.CourseListItem').find('.viewDetailBtn').removeClass('btnDisabled').removeClass('viewDetailBtnNohover');
	$('.CourseListItem').find('.arrowDown').css('visibility','hidden');
	$('#CourseListItem_'+ID).find('.courseImage').addClass('btnDisabled');
	//$('#CourseListItem_'+ID).find('.viewDetailBtn').addClass('btnDisabled').addClass('viewDetailBtnNohover');
	$('#CourseListItem_'+ID).find('.viewDetailBtn').addClass('viewDetailBtnNohover');
	$('#CourseListItem_'+ID).find('.arrowDown').css('visibility','visible');
	
	var cinemaObj = getListItem(cinemaData, 'ID', ID);
	var str = '';
	str += '<div style="display:inline-block;  position:relative; width:100%;">';	
	//str += '<div class="floatL"><div class="courseImage"><div>'+cinemaObj.CourseImage+'</div></div></div>';			
	str += '<div class="floatL" style="margin-left:0px;">';
	str += '<div style="height:15px;"><b>'+cinemaObj.Title+'</b></div>';
	
	str += '</div>';
	str += '</div>';
	
	str += '<div class="clearF" style="height:10px;"></div>';
	str += '<div style="display:inline-block;  position:relative; width:100%;">';	
	str += '<div class="seperator clearF"></div>';
	if (cinemaObj.Description!=""){
		str += '<div class="description">'+cinemaObj.Description+'</div>';		
		str += '<div class="clearF" style="height:20px;"></div>';	
		str += '<div class="seperator clearF"></div>';	
	}
	
	if(fCheckLearningPlanList(cinemaObj.ID)){
		str += '<div class="addToPlanBtn floatR btnDisabled">Added to My Learning Cart</div>';	
	}else{
		str += '<div id="add_Link_Below_'+cinemaObj.ID+'" class="CourseLink floatR" onClick="fAddToPlan(\''+cinemaObj.ID+'\')" >Add to My Learning Cart >></div>';	
		str += '<div class="clearF" style="height:3px;"></div>';
	}
	str += '<div class="seperator clearF"></div>';
	var linkStr = 'Watch and Learn >>';
	
	if (cinemaObj.DestinationLinkDescription != ""){
		linkStr = cinemaObj.DestinationLinkDescription + ' >>';
	}	
	
	var lLinkNum = fAddToGLinks(cinemaObj.DestinationLink)
	str += '<div class="CourseLink floatR" onClick="fOpenLinkFromGLinks('+lLinkNum+')">'+linkStr+'</div>';	
	str += '</div>';
	
	
	str += '<div class="clearF" style="height:0px;"></div>';	
	
	
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());	
	$('#AcademyCourseDetails').html('').html(str).show();
	$( "#AcademyCourseDetails img" ).load(function() {
		ResizeBigPhotoRatio($(this)[ 0 ],100,75);
	});	
	animateHeight(next_tr);

}


function fShowExpertiseDetails(ID, obj){
//RJA todo
//WT global
        WTCourseName = fWTgetCourseTitle(CourseType, ID);
        //Webtrends start todo
	WTuriCourse = WTuriAcademy + '/VD:' + WTCourseName;
	dcsMultiTrack('DCS.dcsuri', WTuriCourse, 'WT.es', WTuriCourse, 'WT.ti', WTCourseName, 'DCSext.MLCAVD', WTCourseName, 'WT.dl', '59');
	//Webtrends end


	if($(obj).hasClass('btnDisabled')) return;
	
	$('.CourseListItem').find('.courseImage').removeClass('btnDisabled');
	$('.CourseListItem').find('.viewDetailBtn').removeClass('btnDisabled').removeClass('viewDetailBtnNohover');
	$('.CourseListItem').find('.arrowDown').css('visibility','hidden');
	$('#CourseListItem_'+ID).find('.courseImage').addClass('btnDisabled');
	//$('#CourseListItem_'+ID).find('.viewDetailBtn').addClass('btnDisabled').addClass('viewDetailBtnNohover');
	$('#CourseListItem_'+ID).find('.viewDetailBtn').addClass('viewDetailBtnNohover');
	$('#CourseListItem_'+ID).find('.arrowDown').css('visibility','visible');
	
	var expertiseObj = getListItem(expertiseData, 'ID', ID);
	var str = '';
	str += '<div style="display:inline-block;  position:relative; width:100%;">';	
	//str += '<div class="floatL"><div class="courseImage"><div>'+expertiseObj.CourseImage+'</div></div></div>';			
	str += '<div class="floatL" style="margin-left:0px;">';
	str += '<div style="height:15px;"><b>'+expertiseObj.Title+'</b></div>';
	
	str += '</div>';
	str += '</div>';
	
	str += '<div class="clearF" style="height:10px;"></div>';
	str += '<div style="display:inline-block;  position:relative; width:100%;">';	
	str += '<div class="seperator clearF"></div>';
	if (expertiseObj.Description!=""){
		str += '<div class="description">'+expertiseObj.Description+'</div>';		
		str += '<div class="clearF" style="height:20px;"></div>';	
		str += '<div class="seperator clearF"></div>';	
	}
	
	if(fCheckLearningPlanList(expertiseObj.ID)){
		str += '<div class="addToPlanBtn floatR btnDisabled">Added to My Learning Cart</div>';	
	}else{
		str += '<div id="add_Link_Below_'+expertiseObj.ID+'" class="CourseLink floatR" onClick="fAddToPlan(\''+expertiseObj.ID+'\')" >Add to My Learning Cart >></div>';	
		str += '<div class="clearF" style="height:3px;"></div>';
	}
	str += '<div class="seperator clearF"></div>';
	var linkStr = 'Visit >>';

	if (expertiseObj.DestinationLinkDescription != ""){
		linkStr = expertiseObj.DestinationLinkDescription + ' >>';
	}	
	
	var lLinkNum = fAddToGLinks(expertiseObj.DestinationLink)
	str += '<div class="CourseLink floatR" onClick="fOpenLinkFromGLinks('+lLinkNum+')">'+linkStr+'</div>';	
	
	str += '</div>';
	
	
	str += '<div class="clearF" style="height:0px;"></div>';	
	
	
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());	
	$('#AcademyCourseDetails').html('').html(str).show();
	$( "#AcademyCourseDetails img" ).load(function() {
		ResizeBigPhotoRatio($(this)[ 0 ],100,75);
	});	
	animateHeight(next_tr);

}

function fHideCourseDeatils(){
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());	
	$('#AcademyCourseDetails').html('');
	$('#AcademyCourseList').show();
	animateHeight(next_tr);
}
function fAddToPlan(ID){
	//Webtrends start
	WTCourseName = fWTgetCourseTitle(CourseType, ID);
	WTuriCourse = WTuriAcademy + '/AtoC:' + WTCourseName;
	dcsMultiTrack('DCS.dcsuri', WTuriCourse, 'WT.es', WTuriCourse, 'WT.ti', WTCourseName, 'DCSext.MLCAAtoC', WTCourseName, 'WT.dl', '59');
	//Webtrends end
	if($('#addToPlanBtn_'+ID).attr('class').indexOf('btnDisabled') != -1) return;
	if($('#AcademyCourseDetails .addToPlanBtn').length >0){
		if($('#AcademyCourseDetails .addToPlanBtn').attr('class').indexOf('btnDisabled') != -1) return;
	}
	
	$('#addToPlanBtn_'+ID).removeClass('addToPlanBtnActive').addClass('btnDisabled').attr('title','Added to My Learning Cart')
	if($('#AcademyCourseDetails .addToPlanBtn').length >0){
		$('#AcademyCourseDetails .addToPlanBtn').addClass('btnDisabled').html('Added to My Learning Cart')
	}
	
	if ($('#add_Link_Below_'+ID).length>0){
		$('#add_Link_Below_'+ID).removeClass('CourseLink');
		$('#add_Link_Below_'+ID).addClass('addToPlanBtn');
		$('#add_Link_Below_'+ID).addClass('btnDisabled').html('Added to My Learning Cart');
	}
	
	if ((CourseType == "Internal")||(CourseType == "External")){
	
		var courseObj = getListItem(courseData, 'ID', ID);
		var currCount;
		if($().SPServices){
			var query ='<Query><Where><Eq><FieldRef Name="ID"/><Value Type="Text">' + courseObj.ID + '</Value></Eq></Where></Query>';
			$().SPServices({
				operation: "GetListItems",//GetListCollection, GetListItems, GetList
				async: false,
				listName: "Course",
				webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
				CAMLRowLimit: 1,
				CAMLQuery: query,
			   completefunc: function (xData, Status) {
					if (Status == "error"){
						alert("error = "+xData.statusText);
						return;
					}
					$(xData.responseXML).find("z\\:row, row").each(function (idx) {
						currCount = parseInt($(this).attr("ows_AddtolearningPlan"));
					});					
				}
			});			
		}

		if(isNaN(currCount)|| currCount == undefined || currCount == 'undefined') currCount = 1;
		else currCount++;

		var listToBeUpdated = '<Batch OnError="Continue" ListVersion="1" ViewName="">'
		listToBeUpdated += '<Method ID="1" Cmd="Update">';
		listToBeUpdated += '<Field Name="ID"><![CDATA[' + courseObj.ID + ']]></Field>';
		listToBeUpdated += '<Field Name="AddtolearningPlan"><![CDATA[' + currCount + ']]></Field>';
		listToBeUpdated += '</Method>';
		listToBeUpdated += '</Batch>'
		fUpdateList("Course", listToBeUpdated , "Add" )
	
	}
	
	var listToBeUpdated = '<Batch OnError="Continue" ListVersion="1" ViewName="">'
	listToBeUpdated += '<Method ID="1" Cmd="New">';
	listToBeUpdated += '<Field Name="Title"><![CDATA[' + CourseType + ']]></Field>';
	listToBeUpdated += '<Field Name="RowID"><![CDATA[' + parseInt(ID) + ']]></Field>';
	listToBeUpdated += '<Field Name="UserGADId">-1;#' + currUserID + '</Field>';
	listToBeUpdated += '</Method>';
	listToBeUpdated += '</Batch>'
	
	fUpdateList("LearningPlan", listToBeUpdated, "Add" );
	fGetLearningCartData();
	
}
function fCheckLearningPlanList(ID){
	var isRecordFound = false;
	for (var i=0;i<userLearningCartData.length;i++){
		if ((userLearningCartData[i].Title == CourseType) && userLearningCartData[i].RowID == ID){
			isRecordFound = true;
			break;
		}
	}
	
	return isRecordFound;
}

function fNavigate(dir){
	if(dir == 'back'){
		currentContentIndex--;
	}else{
		currentContentIndex++;
	}
	if(currentContentIndex < 0 ) currentContentIndex=7;
	if(currentContentIndex > 7 ) currentContentIndex=0;
	$('#transitionPatch').show().animate({'opacity':1},500,function(){
		fLoadPageContent(currentContentIndex);
	});

}

function animateHeight(obj_tr){
	var newHeight = obj_tr.find(".academy-tile-details-inner").height();
	obj_tr.find(".academy-tile-details").animate({
		height: newHeight
	}, 500, function(){$(this).parent().parent().addClass('expanded')});

}
function ResizeBigPhotoRatio(img,lwidth,lheight) {
   	var maxWidth = lwidth;
	var maxHeight = lheight;
	var ratio = 0;
	var width = jQuery(img).width();
	var height = jQuery(img).height();
	if(width > maxWidth){
		ratio = maxWidth / width;
		jQuery(img).css("width", maxWidth);
		jQuery(img).css("height", height * ratio);
		height = height * ratio;
		width = width * ratio;
	}
	if(height > maxHeight){
		ratio = maxHeight / height;
		jQuery(img).css("height", maxHeight);
		jQuery(img).css("width", width * ratio);
		width = width * ratio;
		height = maxHeight;
	}
}
function getListItem(arrObj, key, value){
	for(var i=0; i<arrObj.length; i++){
		if(arrObj[i][key] == value){
			return arrObj[i];
		}
	}
}

function fUpdateList(listName, updates, lAction){
	jQuery.fn.SPServices({
		operation: "UpdateListItems",
		listName: listName,
		updates: updates,
		async: false,
		completefunc: function (xData, Status){
			if (Status == "success"){
				if((listName == 'LearningPlan') && (lAction =="Add")) {
					//alert("Course added to Learning Plan!");
					var element = document.createElement('div');
					element.innerHTML = '<div style="height:20px;text-align:center;padding:20px;font-family: "Arial" !important;font-size: 12px !important;">Added to Learning Cart!</div><div style="text-align:center;"><input id="btnClientOk1" type="button" value="OK" onclick="SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK)" /></div>';
					SP.UI.ModalDialog.showModalDialog({
						html: element,
						allowMaximize: false,
						width : 300,
						height : 100, 
						showClose: false,
						autoSize: true,
						dialogReturnValueCallback: DelegateSupervisorCallback
					});
				}
			}else{
				alert("ERROR :"+ listName)
			}
		}
	});
}

function DelegateSupervisorCallback(result, searchResult) {
	if(result== SP.UI.DialogResult.OK){
	}else if(result== SP.UI.DialogResult.cancel){
		 
	}
	
}

function fOpenLink(_url){
    if(typeof WTuriAcademy == 'undefined'){WTuriAcademy = 'RHL';WTCourseName = '';} //set to right hand links
	if(typeof WTCourseName == 'undefined'){WTCourseName = 'No Course';} //set to right hand links
    //Webtrends start todo
        var WTclass = fWTanalyseURL(_url);
	WTuriCourse = WTuriAcademy + '/' + WTclass + ':' + WTCourseName;
	dcsMultiTrack('DCS.dcsuri', WTuriCourse, 'WT.es', WTuriCourse, 'WT.ti', WTCourseName, 'DCSext.MLCA' + WTclass, WTCourseName, 'WT.dl', '59');
	//Webtrends end
      
	window.open(_url);
}

function fAddToGLinks(lStr){
	for (var i=0;i<gLinksArrToOpen.length;i++){
		if (gLinksArrToOpen[i] == lStr){
			return i;
		}
	}
	gLinksArrToOpen.push(lStr);
	return (gLinksArrToOpen.length-1);
}

function fOpenLinkFromGLinks(lIndex){
	fOpenLink(gLinksArrToOpen[lIndex]);
}


function fLoadMyPlan(){
	var options = {
		url: "../SiteAssets/MyLearningPlan.aspx",
		width : 775,
		height : 700, 
		allowMaximize: false,
		args:{"currUserID": currUserID },
		dialogReturnValueCallback: DelegateSupervisorCallback
	};
	SP.UI.ModalDialog.showModalDialog(options);	
}

function DelegateSupervisorCallback(result, searchResult) {
	if(result== SP.UI.DialogResult.OK){
		 
	}else if(result== SP.UI.DialogResult.cancel){
		 
	}
	
}
var MyLearningPlanArr;
	
function fLoadMyLearningPlan(){
	MyLearningPlanArrInternal = new Array();
	MyLearningPlanArrExternal = new Array();
	MyLearningPlanArrExpertise = new Array();
	MyLearningPlanArrCinema = new Array();
	
	MyLearningPlanArrAll = new Array();
	
	if($().SPServices){
		currUserID = jQuery.fn.SPServices.SPGetCurrentUser({fieldName: "Name",debug: false});
		var query ='<Query><Where><Eq><FieldRef Name="UserGADId" /><Value Type="Text">' + currUserID + '</Value></Eq></Where></Query>';
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "LearningPlan",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: query,
		    completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				//alert(xData.responseText)
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {
					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");
					tmpObj.Title = myrow.attr("ows_LinkTitle");
					tmpObj.CTitleDisplay = "";
					tmpObj.DestinationLink = "";
					tmpObj.RowID = parseInt(myrow.attr("ows_RowID"));
					tmpObj.RowID = tmpObj.RowID + '';
					tmpObj.Created = (myrow.attr("ows_Created")=== undefined) ? "" : myrow.attr("ows_Created")
					
					if (tmpObj.Title == "Internal"){
						MyLearningPlanArrInternal.push(tmpObj);
					}else if (tmpObj.Title == "External"){
						MyLearningPlanArrExternal.push(tmpObj);
					}else if (tmpObj.Title == "Expertise"){
						MyLearningPlanArrExpertise.push(tmpObj);
					}else if (tmpObj.Title == "Cinema"){
						MyLearningPlanArrCinema.push(tmpObj);
					}
					
				});	
			}
		});			
	}
	

	if($().SPServices){
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Course",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: '<Query><OrderBy><FieldRef Name="Order0"  Ascending="TRUE"></FieldRef></OrderBy></Query>',
		   completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {

					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");
					tmpObj.Title = myrow.attr("ows_LinkTitle");
					tmpObj.CourseType = myrow.attr("ows_CourseType");

					var DestinationLink = myrow.attr("ows_DestinationLink");
					if(DestinationLink == undefined || DestinationLink == 'undefined'){
						//DestinationLink = myrow.attr("ows_DestinationUrl");
					}
					if(DestinationLink == undefined || DestinationLink == 'undefined') DestinationLink = 'http://www.zurich.com/'
					else DestinationLink = DestinationLink.split(",")[0]
					tmpObj.DestinationLink = DestinationLink;						
					
					
					if (tmpObj.CourseType == "Internal"){
						for (var i=0;i<MyLearningPlanArrInternal.length;i++){
							if (MyLearningPlanArrInternal[i].RowID == tmpObj.ID){
								MyLearningPlanArrInternal[i].CTitleDisplay = tmpObj.Title;
								MyLearningPlanArrInternal[i].DestinationLink = tmpObj.DestinationLink;
								break;
							}
						}
					}else if (tmpObj.CourseType == "External"){
						for (var i=0;i<MyLearningPlanArrExternal.length;i++){
							if (MyLearningPlanArrExternal[i].RowID == tmpObj.ID){
								MyLearningPlanArrExternal[i].CTitleDisplay = tmpObj.Title;
								MyLearningPlanArrExternal[i].DestinationLink = tmpObj.DestinationLink;
								break;
							}
						}
					}
					
					
				});					
			}
		});			
	}

	if($().SPServices){
		
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Cinema",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: '<Query><OrderBy><FieldRef Name="Order0"  Ascending="TRUE"></FieldRef></OrderBy></Query>',
		   completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {

					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");
					tmpObj.Title = myrow.attr("ows_LinkTitle");
					
					var DestinationLink = myrow.attr("ows_DestinationLink");
					if(DestinationLink == undefined || DestinationLink == 'undefined'){
						//DestinationLink = myrow.attr("ows_DestinationUrl");
					}
					if(DestinationLink == undefined || DestinationLink == 'undefined') DestinationLink = 'http://www.zurich.com/'
					else DestinationLink = DestinationLink.split(",")[0]
					tmpObj.DestinationLink = DestinationLink;						
					

					for (var i=0;i<MyLearningPlanArrCinema.length;i++){
						if (MyLearningPlanArrCinema[i].RowID == tmpObj.ID){
							MyLearningPlanArrCinema[i].CTitleDisplay = tmpObj.Title;
							MyLearningPlanArrCinema[i].DestinationLink = tmpObj.DestinationLink;
							break;
						}
					}

					
				});					
			}
		});			
	}
	
	if($().SPServices){
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Expertise",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLQuery: '<Query><OrderBy><FieldRef Name="Order0"  Ascending="TRUE"></FieldRef></OrderBy></Query>',
		   completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {

					var myrow = $(this);
					var tmpObj = new Object();
					tmpObj.ID = myrow.attr("ows_ID");
					tmpObj.Title = myrow.attr("ows_LinkTitle");
					var DestinationLink = myrow.attr("ows_DestinationLink");
					if(DestinationLink == undefined || DestinationLink == 'undefined'){
						//DestinationLink = myrow.attr("ows_DestinationUrl");
					}
					if(DestinationLink == undefined || DestinationLink == 'undefined') DestinationLink = 'http://www.zurich.com/'
					else DestinationLink = DestinationLink.split(",")[0]
					tmpObj.DestinationLink = DestinationLink;						
					

					for (var i=0;i<MyLearningPlanArrExpertise.length;i++){
						if (MyLearningPlanArrExpertise[i].RowID == tmpObj.ID){
							MyLearningPlanArrExpertise[i].CTitleDisplay = tmpObj.Title;
							MyLearningPlanArrExpertise[i].DestinationLink = tmpObj.DestinationLink;
							break;
						}
					}


					
				});					
			}
		});			
	}	
	
	
	str = "";
	str="<table width='95%'><tr style='background-color:#4066B1;color:#ffffff;'><td>Title</td><td align='center'>Date Added</td><td align='center'>Link</td><td align='center'>Remove</td>"
	if (MyLearningPlanArrInternal.length > 0){
		str+='<tr bgcolor="#96C1E3"><td colspan="4"><span style="color:#FFFFFF">Learning inside Zurich</span></td></tr>'
		for(i=0;i<MyLearningPlanArrInternal.length;i++){
			if (MyLearningPlanArrInternal[i].CTitleDisplay != ""){
				
				MyLearningPlanArrAll.push(MyLearningPlanArrInternal[i]);
			
				str+="<tr>"
				str+="<td><div >" + MyLearningPlanArrInternal[i].CTitleDisplay +"</div></td>"
				str+="<td width='100px' align='center'><div>" + fFormatDate(MyLearningPlanArrInternal[i].Created.split(" ")[0]) +"</div></td>"
				str+='<td width="80px" align="center"><a href="javascript:fViewLCLinks(\''+ MyLearningPlanArrInternal[i].ID   + '\')">View</a></td>';
				str+="<td width='60px'><div style='width:60px;padding-left:17px;'><div class='btnRemove' title='Remove from My Learning Cart' onClick=fDelete('"+ MyLearningPlanArrInternal[i].ID   + "','" + MyLearningPlanArrInternal[i].RowID + "')></div>"
				str+="</tr>"
			}
		}
	}
	if (MyLearningPlanArrExternal.length > 0){
		str+='<tr bgcolor="#96C1E3"><td colspan="4"><span style="color:#FFFFFF">Learning outside Zurich</span></td></tr>'
		for(i=0;i<MyLearningPlanArrExternal.length;i++){
			if (MyLearningPlanArrExternal[i].CTitleDisplay != ""){
			
				MyLearningPlanArrAll.push(MyLearningPlanArrExternal[i]);
			
				str+="<tr>"
				str+="<td><div >" + MyLearningPlanArrExternal[i].CTitleDisplay +"</div></td>"
				str+="<td width='100px' align='center'><div>" + fFormatDate(MyLearningPlanArrExternal[i].Created.split(" ")[0]) +"</div></td>"
				str+='<td width="80px" align="center"><a href="javascript:fViewLCLinks(\''+ MyLearningPlanArrExternal[i].ID   + '\')">View</a></td>';
				str+="<td width='60px'><div style='width:60px;padding-left:17px;'><div class='btnRemove' title='Remove from My Learning Cart' onClick=fDelete('"+ MyLearningPlanArrExternal[i].ID   + "','" + MyLearningPlanArrExternal[i].RowID + "')></div>"
				str+="</tr>"
			}
		}
	}	
	if (MyLearningPlanArrExpertise.length > 0){
		str+='<tr bgcolor="#96C1E3"><td colspan="4"><span style="color:#FFFFFF">Learning from expertise</span></td></tr>'
		for(i=0;i<MyLearningPlanArrExpertise.length;i++){
			if (MyLearningPlanArrExpertise[i].CTitleDisplay != ""){
			
				MyLearningPlanArrAll.push(MyLearningPlanArrExpertise[i]);
			
				str+="<tr>"
				str+="<td><div >" + MyLearningPlanArrExpertise[i].CTitleDisplay +"</div></td>"
				str+="<td width='100px' align='center'><div>" + fFormatDate(MyLearningPlanArrExpertise[i].Created.split(" ")[0]) +"</div></td>"
				str+='<td width="80px" align="center"><a href="javascript:fViewLCLinks(\''+ MyLearningPlanArrExpertise[i].ID   + '\')">View</a></td>';
				str+="<td width='60px'><div style='width:60px;padding-left:17px;'><div class='btnRemove' title='Remove from My Learning Cart' onClick=fDeleteExpCinema('"+ MyLearningPlanArrExpertise[i].ID   + "')></div>"
				str+="</tr>"
			}
		}
	}	
	if (MyLearningPlanArrCinema.length > 0){
		str+='<tr bgcolor="#96C1E3"><td colspan="4"><span style="color:#FFFFFF">Learning cinema</span></td></tr>'
		for(i=0;i<MyLearningPlanArrCinema.length;i++){
			if (MyLearningPlanArrCinema[i].CTitleDisplay != ""){
				
				MyLearningPlanArrAll.push(MyLearningPlanArrCinema[i]);
			
				str+="<tr>"
				str+="<td><div >" + MyLearningPlanArrCinema[i].CTitleDisplay +"</div></td>"
				str+="<td width='100px' align='center'><div>" + fFormatDate(MyLearningPlanArrCinema[i].Created.split(" ")[0]) +"</div></td>"
				str+='<td width="80px" align="center"><a href="javascript:fViewLCLinks(\''+ MyLearningPlanArrCinema[i].ID   + '\')">View</a></td>';
				str+="<td width='60px'><div style='width:60px;padding-left:17px;'><div class='btnRemove' title='Remove from My Learning Cart' onClick=fDeleteExpCinema('"+ MyLearningPlanArrCinema[i].ID   + "')></div>"
				str+="</tr>"
			}
		}
	}	

	str+="</table>"

	return str;
}

function fViewLinkFromMyPlan(lRowID){
	for (var i=0;i<MyLearningPlanArrAll.length;i++){
		if (MyLearningPlanArrAll[i].ID == lRowID){
			fOpenLink(MyLearningPlanArrAll[i].DestinationLink)
			break;
		}
	}
	
}

function fDeleteCourseFromMyPlan(lRowID,lCourseID){
var currCount;
	if($().SPServices){
		var query ='<Query><Where><Eq><FieldRef Name="ID"/><Value Type="Text">' + lCourseID + '</Value></Eq></Where></Query>';
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Course",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLRowLimit: 1,
			CAMLQuery: query,
		   completefunc: function (xData, Status) {
				if (Status == "error"){
					alert("error = "+xData.statusText);
					return;
				}
				$(xData.responseXML).find("z\\:row, row").each(function (idx) {
					currCount = parseInt($(this).attr("ows_AddtolearningPlan"));
				});					
			}
		});			
	}
	if(isNaN(currCount)|| currCount == undefined || currCount == 'undefined') currCount = 1;
	else currCount--;

	var listToBeUpdated = '<Batch OnError="Continue" ListVersion="1" ViewName="">'
	listToBeUpdated += '<Method ID="1" Cmd="Update">';
	listToBeUpdated += '<Field Name="ID"><![CDATA[' + lCourseID + ']]></Field>';
	listToBeUpdated += '<Field Name="AddtolearningPlan"><![CDATA[' + currCount + ']]></Field>';
	listToBeUpdated += '</Method>';
	listToBeUpdated += '</Batch>'
	fUpdateList("Course", listToBeUpdated , "")

	var listToBeUpdated = '<Batch OnError="Continue" ListVersion="1" ViewName="">'
	listToBeUpdated += '<Method ID="1" Cmd="Delete">';
	listToBeUpdated += '<Field Name="ID"><![CDATA[' + lRowID + ']]></Field>';
	listToBeUpdated += '</Method>';
	listToBeUpdated += '</Batch>'
	fUpdateList("LearningPlan", listToBeUpdated , "")
	fGetLearningCartData();

}

function fDeleteCourseFromMyPlanExpCinema(lRowID){

	var listToBeUpdated = '<Batch OnError="Continue" ListVersion="1" ViewName="">'
	listToBeUpdated += '<Method ID="1" Cmd="Delete">';
	listToBeUpdated += '<Field Name="ID"><![CDATA[' + lRowID + ']]></Field>';
	listToBeUpdated += '</Method>';
	listToBeUpdated += '</Batch>'
	fUpdateList("LearningPlan", listToBeUpdated , "")
	fGetLearningCartData();

}

function fFormatDate(lref){
	lTempArr = lref.split("-")
	return lTempArr[2] + "-" + lTempArr[1] + "-" + lTempArr[0]
}

function fWTgetCourseTitle(thisCourseType, thisCourseID){
	if(thisCourseType=="Internal"||thisCourseType=="External"){
	for(var i=0; i<courseData.length; i++){
		if(courseData[i].ID==thisCourseID){return courseData[i].Title;}
	}}
	
	else if(thisCourseType=="Cinema"){
	for(var i=0; i<allCinemaData.length; i++){
		if(allCinemaData[i].ID==thisCourseID){return allCinemaData[i].Title;}
	}}
	
	else if(thisCourseType=="Expertise"){
	for(var i=0; i<allExpertiseData.length; i++){
		if(allExpertiseData[i].ID==thisCourseID){return allExpertiseData[i].Title;}
	}}
	
	return "NoCourseTitle";
}
function fWTanalyseURL(_url){
    //Look at URL and classify for Webtrends use
    var WTclassify="GtoE";                                                  //Default - External
    var WTURL = decodeURI(_url).toLowerCase();
    if (WTURL.indexOf("intranet.zurich.com")>-1){WTclassify="GtoZ";}        //Z-Net
    if (WTURL.indexOf("collaboration.zurich.com")>-1){WTclassify="GtoC";}   //Collab site/page
    if (WTURL.indexOf("glms")>-1){WTclassify="GtoL";}                      //My Learning
    if (WTURL.indexOf("cinemaflexi")>-1){WTclassify="GtoV";}                //Video
    if (WTURL.indexOf("globuz.zurich.com")>-1){WTclassify="GtoG";}          //Globuz
    if (WTURL.indexOf("tzw.zurich.com")>-1){WTclassify="GtoT";}             //TZW
    if (WTURL.indexOf("www.yammer.com")>-1){WTclassify="GtoY";}             //Yammer
    return WTclassify;
}
