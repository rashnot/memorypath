var LEARNING_INSURANCE_ZURICH_WAY = 0;		
var LEARNING_CATALOGUE = 1;
var LEARNING_FROM_EXPERTISE = 3;
var LEARNING_FROM_OUTSIDE = 2;
var LEARNING_FROM_CINEMA = 4;
var LEARNING_FROM_CUSTOMER = 5;
var LEARNING_FROM_HISTORY = 6;
var WHAT_IN_IT_FOR_ME = 7;

var academyCount;
var noOfColumns = 4;
var noOfRows;
var academyIndex =0;
var CourseType;
currUserID = "";
var currentContentIndex;
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
	currentContentIndex = n;
	
	$('#page-content #topicImage').removeClass().addClass('topicImage'+n);
	$('#page-content .topicHeading').html('').html($('.btnImage').eq(n).attr('titleText'));
	
	if(currentContentIndex == LEARNING_CATALOGUE || currentContentIndex == LEARNING_FROM_OUTSIDE || currentContentIndex == LEARNING_FROM_EXPERTISE || currentContentIndex == LEARNING_FROM_CINEMA){
		if(currentContentIndex == LEARNING_CATALOGUE) CourseType = "Internal";
		if( currentContentIndex == LEARNING_FROM_OUTSIDE) CourseType = "External";
		if( currentContentIndex == LEARNING_FROM_EXPERTISE) CourseType = "Expertise";
		if( currentContentIndex == LEARNING_FROM_CINEMA) CourseType = "Cinema";
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
	str += '<div style="float:left; width:360px; font-size:110%; margin-right:10px;"><strong>Learning Zurich History</strong><br><br>'
	str += 'Watch out for the continuous blog update.<br><br><a href="https://collaboration.zurich.com/community/00935/01/default.aspx" target="_blank">Visit the Zurich History blog &raquo;</a></div>'
	str += '<div style="float:left;"><img src="../SiteAssets/learning-zurich-history.jpg" width="250" height="250"></div>'
	$('#page-content .content').html(str)
}


function fBuildLearningFromCustomer(){
	var str = '';
	$('#page-content .content').html('')
	str += '<div style="float:left; width:360px; font-size:110%; margin-right:10px;"><strong>70.20.10. Development Guide</strong><br><br>'
	str += 'This resource explores some of the suggested activities in the 70-20-10 framework. <br/>By providing examples and tools, this resource assists employees and their managers in developing an approach that can be customized for their development.</br>The items in the tool are only suggestions, as there are many ways to learn from an experience, or interact with managers or peers.<br/><br/><a href="/community/00900/SitePages/70-20-10-development-guide.aspx" >Visit the 70:20:10 Development Guide for more &raquo;</a></div>'
	str += '<div style="float:left;"><img src="../SiteAssets/people-meeting.jpg" width="250" height="250"></div>'
	$('#page-content .content').html(str)
}

function fBuildWhatInItForMe(){
	var isHTML5Video = (typeof(document.createElement('video').canPlayType) != 'undefined');
	var str = '';
	$('#page-content .content').html('')
	str = '<p style="text-align:center; color:#666;">Watch out for the changing videos from different countries.<br />What inspires us to keep learning and improving to deliver results?</p>'
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
		str = '<p style="text-align:center;  color:#666;">Learning videos coming soon.<br/>Watch-and-learn how insurance works in Zurich: how we help our customers manage the risks they face, make their lives more secure, and help them grow their business.</p>'		
	  str +='<object id="myExperience" class="BrightcoveExperience">'
	  str += '<param name="bgcolor" value="#FFFFFF" />'
	  str += '<param name="width" value="620" />'
	  str += '<param name="height" value="360" />'
	  str += '<param name="playerID" value="3791057207001" />'
	  str += '<param name="playerKey" value="AQ~~,AAACb7SfNLE~,CuHI5DSBQol4wumKw6CIaTR9TFxw45SL" />'
	  str += '<param name="isVid" value="true" />'
	  str += '<param name="isUI" value="true" />'
	  str += '<param name="wmode" value="transparent" />'
	  str += '<param name="dynamicStreaming" value="true" />'
	  str += '<param name="@videoPlayer" value="3903223320001" />'
	  str += '</object>'
	  $('#page-content .content').html(str)
	  brightcove.createExperiences();
	
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

function fGetAcademyData(){
	if($().SPServices){
		currUserID = jQuery.fn.SPServices.SPGetCurrentUser({fieldName: "Name",debug: false});
		academyData = [];
		var query ='<Query><OrderBy><FieldRef Name="Title"  Ascending="TRUE"></FieldRef></OrderBy></Query>';
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Academy",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLRowLimit: 100,
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
					if(CommunityURL == undefined || CommunityURL == 'undefined') CommunityURL = 'http://www.zurich.com/'
					else CommunityURL = CommunityURL.split(",")[0]
					tmpObj.CommunityURL = CommunityURL;
					
					var LearningCinemaURL = myrow.attr("ows_LearningCinemaURL");
					if(LearningCinemaURL == undefined || LearningCinemaURL == 'undefined') LearningCinemaURL = 'http://www.zurich.com/'
					else LearningCinemaURL = LearningCinemaURL.split(",")[0]
					tmpObj.LearningCinemaURL = LearningCinemaURL;					
					
					tmpObj.Description = (myrow.attr("ows_Description")=== undefined) ? "" : myrow.attr("ows_Description")
					
					if (tmpObj.Description.length>0){
						tmpObj.Description = tmpObj.Description + " ";
					}
					tmpObj.AcademyType = (myrow.attr("ows_AcademyType")=== undefined) ? "" : myrow.attr("ows_AcademyType")
					
					tmpObj.InternalLearningSiteURL = myrow.attr("ows_InternalLearningSiteURL");
					if (tmpObj.InternalLearningSiteURL == undefined){
						tmpObj.InternalLearningSiteURL = "";
					}else{
						tmpObj.InternalLearningSiteURL = tmpObj.InternalLearningSiteURL.split(",")[0];
					}

					tmpObj.ExternalLearningSiteURL = myrow.attr("ows_ExternalLearningSiteURL");
					if (tmpObj.ExternalLearningSiteURL == undefined){
						tmpObj.ExternalLearningSiteURL = "";
					}else{
						tmpObj.ExternalLearningSiteURL = tmpObj.ExternalLearningSiteURL.split(",")[0];
					}

					academyData.push(tmpObj);
				});	
				fBuildAcademtTiles();
			}
		});			
	}

}

var next_tr;
function fBuildAcademtTiles(){
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
		str += '<p style="text-align:center; color:#666;">Learn from the open courses across Zurich. Discover how we create value for our business, customers, stakeholders, community, and each other.</p>';
	if(CourseType=="External")
		str += '<p style="text-align:center; color:#666;">Explore outside learning institutions.  Balance inside knowledge with outside-in perspective.</p>';
	if(CourseType=="Expertise")
		str += '<p style="text-align:center; color:#666;">Learn from the open communities of expertise who share common learning interests. They regularly and virtually interact to learn from each other on how to improve what they do, seek help and give help.</p>';
	if(CourseType=="Cinema")
		str += '<p style="text-align:center; color:#666;">Now Showing! Watch-and-learn through learning videos, and people’s experiences and passion for what they do.</p>';	
	str += '<table class="academy-grid">';
	
	for(var i=0; i<noOfRows; i++){
		var _class = ''
		if(i == noOfRows-1) _class = 'lastRow';
		str += '<tr class="'+_class+'">';
		for(var j=0; j<noOfColumns; j++){
			if(academyData[academyIndex].AcademyType != "Country"){
				str += '<td><div id="Academy_'+academyData[academyIndex].ID+'" class="academy-tile academy-tile-normal" title="'+academyData[academyIndex].Description+'">\
					<div>'+academyData[academyIndex].Image+'</div>\
					<div class="image"></div>\
					<div class="text">'+academyData[academyIndex].Title+'</div>\
					</div></td>';
			} else {
				
				str += '<td><div id="Academy_'+academyData[academyIndex].ID+'" class="academy-tile academy-tile-normal" title="'+academyData[academyIndex].Description+'">\
					<div>'+academyData[academyIndex].Image+'</div>\
					<div class="image" style="background-position:center center !important;" ></div>\
					<div class="text">'+academyData[academyIndex].Title+'</div>\
					</div></td>';
			}
			academyIndex++;
			if(academyIndex == academyData.length) break;
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
		if(currentContentIndex == LEARNING_CATALOGUE || currentContentIndex == LEARNING_FROM_OUTSIDE ){
			if($(this).hasClass('academy-tile-clicked')) return;
			
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
			
			fGetCourseData($(this).attr('ID').split('_')[1]);
		}else{
			fOpenAcademyLinks($(this).attr('ID').split('_')[1]);
		}
	})
}

function fOpenAcademyLinks(academyID){
	if(currentContentIndex == LEARNING_FROM_EXPERTISE){
		fOpenLink(getListItem(academyData, 'ID', academyID).CommunityURL);
	}
	if(currentContentIndex == LEARNING_FROM_CINEMA){
		fOpenLink(getListItem(academyData, 'ID', academyID).LearningCinemaURL);
	}
}
function fGetCourseData(academyID){

	if($().SPServices){
		courseData = [];
		var query ='<Query><Where><And><Eq><FieldRef Name="CourseType"/><Value Type="Text">' + CourseType + '</Value></Eq><Eq><FieldRef Name="Academy" LookupId="TRUE" /><Value Type="Lookup">' + academyID + '</Value></Eq></And></Where><OrderBy><FieldRef Name="Rating"  Ascending="FALSE"></FieldRef></OrderBy></Query>';
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "Course",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLRowLimit: 5,
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
					tmpObj.GLMSCourceId = myrow.attr("ows_GLMSCourceId");
					tmpObj.Academy = myrow.attr("ows_Academy");
					tmpObj.Description = myrow.attr("ows_Description");
					tmpObj.Language =  fGeneratestr((myrow.attr("ows_Course_x0020_Languages")=== undefined) ? "" : myrow.attr("ows_Course_x0020_Languages"));
					//tmpObj.Language=fGeneratstr("2;#English;#13;#Spanish;#3;#French;#4;#Italian")
					tmpObj.CourseType = myrow.attr("ows_CourseType");
					tmpObj.Level = myrow.attr("ows_Level");
					tmpObj.DeliveryMethod = (myrow.attr("ows_DeliveryMethod")=== undefined) ? "" : myrow.attr("ows_DeliveryMethod");
					
					var DestinationLink = myrow.attr("ows_DestinationLink");
					if(DestinationLink == undefined || DestinationLink == 'undefined') DestinationLink = 'http://www.zurich.com/'
					else DestinationLink = DestinationLink.split(",")[0]
					tmpObj.DestinationLink = DestinationLink;						
					
					tmpObj.AddtolearningPlan = myrow.attr("ows_AddtolearningPlan");
					tmpObj.ClickLearningPlan = myrow.attr("ows_ClickLearningPlan");
					tmpObj.Duration =  (myrow.attr("ows_Duration")=== undefined) ? "" : parseInt(myrow.attr("ows_Duration"));
					tmpObj.hoursDays =  (myrow.attr("ows_hours_x002f_days")=== undefined) ? "" : myrow.attr("ows_hours_x002f_days");
					tmpObj.Rating = myrow.attr("ows_Rating");
					
					tmpObj.BusinessAreas =  fGeneratestr((myrow.attr("ows_Business_x0020_Area")=== undefined) ? "BusinessAreas" : myrow.attr("ows_Business_x0020_Area"));
					
					
					var _Image = myrow.attr("ows_PublishingPageImage");
					if(_Image == undefined || _Image == 'undefined') _Image = '<img src="../SiteAssets/zurich-logo.png" style="border:0px solid" />';
					tmpObj.PublishingPageImage = _Image;					
					
					tmpObj.AcademyID = academyID;
					courseData.push(tmpObj);
				});					
				//alert(courseData.length)
			}
		});			
	}
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
	$( "#AcademyCourseList img" ).load(function() {
		ResizeBigPhotoRatio($(this)[ 0 ],100,75);
	});
	
	animateHeight(next_tr);


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
		str += '<div class="topCLabel">Explore Outside Learning Institutions</div>';
	}else{
		str += '<div class="topCLabel">Top Open Courses</div>';
	}
	if(courseData.length > 0){	
		str += '<table class="coursesTable">';
		str += '<tr>';
		var _w = 580 / courseData.length;
		for(var i=0; i<courseData.length; i++){
			str += '<td style="width:'+_w+'px"><b>'+courseData[i].Title+'</b>';
			
			if (CourseType == "Internal"){
				str += '<br><span class="courseLevel">'+courseData[i].Level+'</span>';
			}
			
			str += '</td>';
		}
		str += '</tr>';
		str += '<tr><td colspan=5 style="height:6px;"></td></tr>';
		str += '<tr>';
		for(var i=0; i<courseData.length; i++){
			str += '<td id="CourseListItem_'+courseData[i].ID+'" class="CourseListItem">';
				str += '<div class="courseImage" onClick="fShowCourseDetails('+courseData[i].ID+', this)"><div>'+courseData[i].PublishingPageImage+'</div></div>';
				str += '<div>';
				for(var j=1; j<=5; j++){
					var _c = 'rateStar';
					if(j > parseInt(courseData[i].Rating)) _c += ' rateStar-unrated';
					str += '<div class="'+_c+'"></div>';
				}
				str += '</div>';
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
		str += '</div>';
		
		str += '<div id="AcademyCourseDetails"></div>';
		if(CourseType=="Internal"){
			
			var InternalLearningSiteURL = getListItem(academyData, 'ID', academyID).InternalLearningSiteURL;
			if (InternalLearningSiteURL != ""){
				str += '<div style="height:40px;padding-left:20px; padding-top:10px; "><a href="javascript:fOpenLink(\''+InternalLearningSiteURL+'\')">More...Visit the Learning Site >></a></div>';
			}
			
		}else if(CourseType=="External"){

			var ExternalLearningSiteURL = getListItem(academyData, 'ID', academyID).ExternalLearningSiteURL;
			if (ExternalLearningSiteURL != ""){
				str += '<div style="height:40px;padding-left:20px; padding-top:10px; "><a href="javascript:fOpenLink(\''+ExternalLearningSiteURL+'\')">More...Visit the external site >></a></div>';
			}

		}

	}else{
		str += '<div style="padding:20px 0px 20px 0px;">Coming soon.</div>';
	}
	return str;
}

function fShowCourseDetails(ID, obj){
	if($(obj).hasClass('btnDisabled')) return;
	
	$('.CourseListItem').find('.courseImage').removeClass('btnDisabled');
	$('.CourseListItem').find('.viewDetailBtn').removeClass('btnDisabled').removeClass('viewDetailBtnNohover');
	$('.CourseListItem').find('.arrowDown').css('visibility','hidden');
	$('#CourseListItem_'+ID).find('.courseImage').addClass('btnDisabled');
	$('#CourseListItem_'+ID).find('.viewDetailBtn').addClass('btnDisabled').addClass('viewDetailBtnNohover');
	$('#CourseListItem_'+ID).find('.arrowDown').css('visibility','visible');
	
	var courseObj = getListItem(courseData, 'ID', ID);
	var str = '';
	str += '<div style="display:inline-block;  position:relative; width:100%;">';	
	//str += '<div class="floatL"><div class="courseImage"><div>'+courseObj.PublishingPageImage+'</div></div></div>';			
	str += '<div class="floatL" style="margin-left:0px;">';
	str += '<div style="height:15px;"><b>'+courseObj.Title+'</b><span class="courseLevel"> ('+courseObj.GLMSCourceId+')</span></div>';
	
	if (CourseType == "Internal"){
	
		if(courseObj.BusinessAreas != ''){
			str += '<div class="language">'+courseObj.BusinessAreas+'</div>';
		}else{
			str += '<div class="language">BusinessAreas</div>';
		}	
		str += '<div class="language">'+courseObj.Level+'</div>';
	
	}
	str += '</div>';
	str += '</div>';
	
	str += '<div class="clearF" style="height:10px;"></div>';
	str += '<div style="display:inline-block;  position:relative; width:100%;">';	
	/*str += '<div class="floatL">';
	for(var j=1; j<=5; j++){
		var _c = 'rateStar';
		if(j > parseInt(courseObj.Rating)) _c += ' rateStar-unrated';
		str += '<div class="'+_c+'"></div>';
	}
	str += '</div>';*/
	str += '<div class="seperator clearF"></div>';
	var cDuration = '';
	if(courseObj.Duration != '') cDuration = ' | '+courseObj.Duration +' '+courseObj.hoursDays
	if(courseObj.DeliveryMethod == '') cDuration = courseObj.Duration +' '+courseObj.hoursDays
	var lLang = ""
	if(courseObj.Language != '')
		lLang = 'Available in '+courseObj.Language;
		else lLang = 'Language';
		
		if (CourseType == "Internal"){
		str += '<div class="">'+courseObj.DeliveryMethod + cDuration + " | " + lLang + '</div>';
	}else{
		str += '<div class="">'+courseObj.DeliveryMethod + " | " + lLang + '</div>';
	}
	
	str += '<div class="seperator"></div>';	
	str += '<div class="description">'+courseObj.Description+'</div>';		
	str += '<div class="clearF" style="height:20px;"></div>';	
	
	str += '<div class="seperator clearF"></div>';	
	if(fCheckLearningPlanList(courseObj.ID)){
		str += '<div class="addToPlanBtn floatR btnDisabled">Added to My Learning Cart</div>';	
	}else{
		str += '<div class="CourseLink floatR" onClick="fAddToPlan(\''+courseObj.ID+'\')" >Add to My Learning Cart >></div>';	
		str += '<div class="clearF" style="height:3px;"></div>';
	}
	str += '<div class="seperator clearF"></div>';
	var linkStr = 'Go to Course in My Learning >>';
	if(CourseType == "External") linkStr = 'Visit Site >>';
	str += '<div class="CourseLink floatR" onClick="fOpenLink(\''+courseObj.DestinationLink+'\')">'+linkStr+'</div>';	
	str += '</div>';
	
	
	str += '<div class="clearF" style="height:0px;"></div>';	
	
	
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());	
	$('#AcademyCourseDetails').html('').html(str).show();
	$( "#AcademyCourseDetails img" ).load(function() {
		ResizeBigPhotoRatio($(this)[ 0 ],100,75);
	});	
	animateHeight(next_tr);
	
	if(sessionStorage){
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
function fHideCourseDeatils(){
	next_tr.find(".academy-tile-details").height(next_tr.find(".academy-tile-details-inner").height());	
	$('#AcademyCourseDetails').html('');
	$('#AcademyCourseList').show();
	animateHeight(next_tr);
}
function fAddToPlan(ID){
	if($('#addToPlanBtn_'+ID).attr('class').indexOf('btnDisabled') != -1) return;
	if($('#AcademyCourseDetails .addToPlanBtn').length >0){
		if($('#AcademyCourseDetails .addToPlanBtn').attr('class').indexOf('btnDisabled') != -1) return;
	}
	
	$('#addToPlanBtn_'+ID).removeClass('addToPlanBtnActive').addClass('btnDisabled').attr('title','Added to My Learning Cart')
	if($('#AcademyCourseDetails .addToPlanBtn').length >0){
		$('#AcademyCourseDetails .addToPlanBtn').addClass('btnDisabled').html('Added to My Learning Cart')
	}

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
	
	var listToBeUpdated = '<Batch OnError="Continue" ListVersion="1" ViewName="">'
	listToBeUpdated += '<Method ID="1" Cmd="New">';
	listToBeUpdated += '<Field Name="Title"><![CDATA[' + courseObj.Title + ']]></Field>';
	listToBeUpdated += '<Field Name="CourseId"><![CDATA[' + parseInt(courseObj.ID) + ']]></Field>';
	listToBeUpdated += '<Field Name="GLMSCourceId"><![CDATA[' + courseObj.GLMSCourceId + ']]></Field>';
	listToBeUpdated += '<Field Name="CourseTitle"><![CDATA[' + courseObj.Title + ']]></Field>';
	listToBeUpdated += '<Field Name="UserGADId">-1;#' + currUserID + '</Field>';
	listToBeUpdated += '</Method>';
	listToBeUpdated += '</Batch>'
	//alert(listToBeUpdated)
	fUpdateList("LearningPlan", listToBeUpdated, "Add" )	
	
}
function fCheckLearningPlanList(ID){
	var isRecordFound = false;
	var query ='<Query><Where><And><Eq><FieldRef Name="CourseId"/><Value Type="Text">' + ID + '</Value></Eq><Eq><FieldRef Name="UserGADId"/><Value Type="Text">' + currUserID + '</Value></Eq></And></Where></Query>';
	$().SPServices({
		operation: "GetListItems",//GetListCollection, GetListItems, GetList
		async: false,
		listName: "LearningPlan",
		webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
		CAMLRowLimit: 1,
		CAMLQuery: query,
	   completefunc: function (xData, Status) {
			if (Status == "error"){

				return;
			}
			$(xData.responseXML).find("z\\:row, row").each(function (idx) {
				isRecordFound = true;
			});					
		}
	});		
	//alert('isRecordFound - '+ isRecordFound)
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
					element.innerHTML = '<div style="height:20px;text-align:center;padding:20px;font-family: "Arial" !important;font-size: 12px !important;">Course added to Learning Plan!</div><div style="text-align:center;"><input id="btnClientOk1" type="button" value="OK" onclick="SP.UI.ModalDialog.commonModalDialogClose(SP.UI.DialogResult.OK)" /></div>';
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
		alert("asdasd") 
	}else if(result== SP.UI.DialogResult.cancel){
		 
	}
	
}

function fOpenLink(_url){
	window.open(_url);
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
	MyLearningPlanArr = new Array();
	if($().SPServices){
		currUserID = jQuery.fn.SPServices.SPGetCurrentUser({fieldName: "Name",debug: false});
		var query ='<Query><Where><Eq><FieldRef Name="UserGADId" /><Value Type="Text">' + currUserID + '</Value></Eq></Where></Query>';
		$().SPServices({
			operation: "GetListItems",//GetListCollection, GetListItems, GetList
			async: false,
			listName: "LearningPlan",
			webURL: $().SPServices.SPGetCurrentSite(),//siteURL, ???????
			CAMLRowLimit: 100,
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
					tmpObj.CourseId = (myrow.attr("ows_CourseId")=== undefined) ? "" : myrow.attr("ows_CourseId")
					tmpObj.GLMSCourceId = (myrow.attr("ows_GLMSCourceId")=== undefined) ? "" : myrow.attr("ows_GLMSCourceId")
					tmpObj.CourseTitle = (myrow.attr("ows_CourseTitle")=== undefined) ? "" : myrow.attr("ows_CourseTitle")
					tmpObj.Created = (myrow.attr("ows_Created")=== undefined) ? "" : myrow.attr("ows_Created")
					MyLearningPlanArr.push(tmpObj);
				});	
								str="<table ><tr style='background-color:#4066B1;color:#ffffff;'><td >Course ID</td><td>Course Title</td><td>Date Added</td><td>Action</td>"
				for(i=0;i<MyLearningPlanArr.length;i++){
					str+="<tr>"
					str+="<td style='width:140px><div'>" + MyLearningPlanArr[i].GLMSCourceId +"</div></td>"
					str+="<td style='width:380px'><div >" + MyLearningPlanArr[i].CourseTitle +"</div></td>"
					str+="<td style='width:80px'><div>" + fFormatDate(MyLearningPlanArr[i].Created.split(" ")[0]) +"</div></td>"
					str+="<td style='width:60px'><div style='width:60px;padding-left:17px;'><div class='btnRemove' title='Delete from My Learning Cart' onClick=fDelete('"+ MyLearningPlanArr[i].ID   + "','" + Number(MyLearningPlanArr[i].CourseId) + "')></div>"
					str+="</tr>"
				}
				str+="</table>"
			}
		});			
	}
	return str;
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

}

function fFormatDate(lref){
	lTempArr = lref.split("-")
	return lTempArr[2] + "-" + lTempArr[1] + "-" + lTempArr[0]
}

