// ============ Variables ============ 
var Lists = { 
	AssetRegister: "Site Collection Asset Register", 
	HTMLSnippet: "HTML Snippet Library", 
	BroadcastMessages: "Broadcast Messages" };

var HTMLSnippets = {
    Footer_Zurich: "Footer_Zurich", Footer_Farmers: "Footer_Farmers",
    SiteInformationDialog: "Site Information Dialog",
    GroupMailBox: "eSolutions Group Mail Box",
    SocialIcons: "Social Icons",
    SiteFollowIcon: "Site Follow Icon",
	OpenDocumentLibrary: "Open Document Library"
};

var SiteFields = {
	SiteName : "LinkTitle",
	SiteURL: "SiteURL",	
	Created: 'SiteCreationDate',
	SiteType: "SiteType",
    TemplateVersion: "TemplateVersion",
    LastCertified: "LastCertified",
    Recertify: "Recertify",
    Region: 'Region',
	Country: 'RequestorsCountry',    
    BusinessArea: "RequestorsBusinessArea",
    Function: 'RequestorsFunction',
    CostCenter: "CostCenter",
    DataClassification: "DataClassification",
    Quota: "Quota",
    Language: 'SiteLanguage'
}

var SiteUserFields = {
	Requestor: 'Author',
    Approver: 'Approver',
    PrimarySiteOwner: 'PrimarySiteOwner',
    SecondarySiteOwner: 'SecondarySiteOwner',
    DataOwner: 'DataOwner'
};

var DataClassificationOptions = {
    Confidential: "Confidential", ConfidentialColor: "#EEC900",
    HighlyConfidential: "Highly Confidential", HighlyConfidentialColor: "#E3170D",
    InternalUseOnly: "Internal Use Only", InternalUseOnlyColor: "#228B22",
    Unclassified: "Public", UnclassifiedColor: "#ffffff"
}

//Language Support
var lcidLangMap = {
    1033: "English",
    1031: "German",
    1036: "French",
    1040: "Italian",
    2070: "Portuguese (Portugal)",
    1049: "Russian",
    3082: "Spanish",
    1043: "Dutch",
    1055: "Turkish",
    1046: "Portuguese (Brazil)"
};
var translations = {
	"Open Document Library": { 1033: "Open Document Library", 1031: "Die Dokumenten-Bibliothek öffnen", 1036: "Accèder à la librairie où se trouve le document", 1040: "Aprire l'archivio documenti", 2070: "Abrir biblioteca de documentos", 1049: "Open Document Library", 3082: "Abrir librería de documentos", 1043: "Open Document Library", 1055: "Dokümanları aç", 1046: "Abrir biblioteca de documentos" }
};

var primaryAccount = "", primarySiteOwnerTitle = "", secondarySiteOwnerTitle = "", photoLoaded = false;
var currentLanguage = "", defaultLanguage = lcidLangMap[1033];
var groupMailBox = "";
var snippetLibraryItems = "";
var OpenDocumentLibraryTranslation = "";
// ============ End Variables ============ 

$(document).ready(function () {	
	currentLanguage = lcidLangMap[_spPageContextInfo.currentLanguage];
	loadSnippetsLibrary()
	HideMenus(); // hidden SharePoint Designer button 
	SetBorderRadiusForFarmers();   
    //Get web trend script
	$.getScript("/Style Library/Zurich Javascripts/collabWebtrends-v2.js");
	renderSocialIconsStatus();
	ShowSourceLibrary();
});

function loadSnippetsLibrary(){
	$().SPServices({
         webURL: "/",
         operation: "GetListItems",
         async: false,
         listName: "HTML Snippet Library",
         CAMLQuery: createSnippetQuery(),
         completefunc: function (xData, status) {
         	if(status == "success")
         	{
         		snippetLibraryItems = $(xData.responseXML).SPFilterNode("z:row");
         		populateSnippets(snippetLibraryItems);
         	}
         }
     });
}

function createSnippetQuery(){
	var query = "<Query><Where><And>";
	query += "<In><FieldRef Name='Title'/><Values>";
	$.each(HTMLSnippets, function(key, value){
		query += "<Value Type='Text'>" + value + "</Value>";
	});
	query += "</Values></In>";
	query += "<Or><Eq><FieldRef Name='SiteLanguage' LookupId='false'/><Value Type='Lookup'>English</Value></Eq><Eq><FieldRef Name='SiteLanguage' LookupId='false'/><Value Type='Lookup'>" + currentLanguage + "</Value></Eq></Or>"
	query += "</And></Where></Query>";
	
	return query;
}
// ============ Populate snippet  ============
function populateSnippets(snippetItems){
	populateFooterSnippet(snippetItems);
	populateSiteInformationDialog(snippetItems);
	populateSocialIcons(snippetItems);
	
	groupMailBox = GetSnippetContentByLanguage(HTMLSnippets.GroupMailBox, snippetItems);
	OpenDocumentLibraryTranslation = GetSnippetContentByLanguage(HTMLSnippets.OpenDocumentLibrary, snippetItems);
}

function populateFooterSnippet(snippetItems){
	var footerDiv = $("#s4-pageFooter");
	var currentBrand = "";
	if($(".zurichLogo").length > 0) currentBrand = HTMLSnippets.Footer_Zurich;
	if($(".farmersLogo").length > 0) currentBrand = HTMLSnippets.Footer_Farmers;
 	
 	snippetContent = GetSnippetContentByLanguage(currentBrand, snippetItems); 
 	snippetContent = snippetContent.replace("{{Year}}", new Date().getFullYear());
	appendHtmlSnippet(snippetContent, footerDiv);
}

function populateSiteInformationDialog(snippetItems){
	var rootSite = $(".rootLogo"), siteInfoDialog = $("#siteInfoDialog"); 
    if(rootSite.length == 0)
    {
	    snippetContent = GetSnippetContentByLanguage(HTMLSnippets.SiteInformationDialog, snippetItems); 
	    appendHtmlSnippet(snippetContent, siteInfoDialog);
		ExecuteDialog();
		ExecuteDataToInfoPanel();
    }
}

function populateSocialIcons(snippetItems){
	var socialWrapper = $("#zurich-site-socialicons-wrapper");
	snippetContent = GetSnippetContentByLanguage(HTMLSnippets.SocialIcons, snippetItems); 
	appendHtmlSnippet(snippetContent, socialWrapper);
    
    //prepend the Site Follow Icon
	snippetContent = GetSnippetContentByLanguage(HTMLSnippets.SiteFollowIcon, snippetItems); 
	prependHtmlSnippet(snippetContent, socialWrapper);

	$("#zurich-site-socialicons-wrapper").show();
}

// === Load data site information & append data to information dialog ===
function ExecuteDataToInfoPanel() {

    this.clientContext = new SP.ClientContext.get_current();
    this.spSite = this.clientContext.get_site();

    this.clientContext.load(this.spSite, 'Url');

    this.clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

var emailInfo = new Object(), urlMatchError = false, urlCamlQuery = "";
function onQuerySucceeded(sender, args) {

	$().SPServices.defaults.cacheXML = false;
    //Get current site URL
    var currentSiteURL = this.spSite.get_url();
    urlCamlQuery = "<Query>" +
                        "<Where>" +
                        	"<Or>" +
	                            "<Eq>" +
	                                "<FieldRef Name='SiteURL' />" +
	                                "<Value Type='Text'>" + currentSiteURL + "</Value>" +
	                            "</Eq>" +
	                            "<Eq>" +
	                                "<FieldRef Name='SiteURL' />" +
	                                "<Value Type='Text'>" + currentSiteURL + "/</Value>" +
	                            "</Eq>" +
                            "</Or>" +
                        "</Where>" +
                    "</Query>";
    
    //call service for normal fields include taxonomy
    var viewFields = "<ViewFields>";
    $.each(SiteFields, function (key, val) {
        var fieldRef = "<FieldRef Name='" + val + "'/>";
        viewFields += fieldRef;
    });
    viewFields += "</ViewFields>";
    
    var Query_Options = "<QueryOptions><IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns></QueryOptions>";
    
    $().SPServices({
        webURL: "/",
        operation: "GetListItems",
        async: false,
        listName: Lists.AssetRegister,
        CAMLQuery: urlCamlQuery,
        CAMLViewFields: viewFields,
        CAMLQueryOptions: Query_Options,
        completefunc: function (xData, Status) {
        	if(Status == "success")
        	{
	        	if($(xData.responseXML).SPFilterNode("z:row").length == 0)
	        	{
	        		urlMatchError == true;
            		DisplaySiteInformationError();	        	
            	}
            	else {
		            $(xData.responseXML).SPFilterNode("z:row").each(function () {
		                var data = $(this);
		
		                emailInfo.SiteName = data.attr("ows_" + SiteFields.SiteName);
		                emailInfo.SiteURL = data.attr("ows_" + SiteFields.SiteURL);
		                
		                //bind query data to site information panel after loading style of dialog
		                $.each(SiteFields, function (key, val) {
		                    var value = "";
		                    var infoSpan = $("#" + key); //get html element that contains corresponding value
		
		                    if (infoSpan.length > 0) {
		
		                        //check if fields are taxonomy or user/group 
		                        if (val == SiteFields.BusinessArea || val == SiteFields.DataClassification || val == SiteFields.Region ||
		                        val == SiteFields.Function || val == SiteFields.Country || val == SiteFields.Language) {
		
		                            if (data.attr("ows_" + val))
		                                value = data.attr("ows_" + val).split("#")[1];
		
		                            //set color for site information panel by data classification
		                            if (val == SiteFields.DataClassification)
		                                SetInfoPanelColors(value);
		                        }
		                        else {
		
		                            if (data.attr("ows_" + val)) {
		                                value = data.attr("ows_" + val);
		
		                                if (val == SiteFields.Created || val == SiteFields.LastCertified ||
		                                val == SiteFields.Recertify || val == SiteFields.SiteExpiryDate) {
		                                    value = formatDate(value);
		                                }
		                            }
		                        }
		
		                        //Set value to span on table
		                        infoSpan.append(value);
		                    }
		                });
		            });
	            }
            }
            else if (Status == "error")
            {
            	var error = $(xData.responseXML).find("errorstring").text();
            	DisplaySiteInformationError(error);
            	urlMatchError = true;
            }
        }
    });
}

function LoadUserFields()
{
	if(urlMatchError == false)
    {
	    //get user fields
	    var viewUserFields = "<ViewFields>";
	    $.each(SiteUserFields, function (key, val) {
	        var fieldRef = "<FieldRef Name='" + val + "'/>";
	        viewUserFields += fieldRef;
	    });
	    viewUserFields += "</ViewFields>";
	    $().SPServices({
	        webURL: "/",
	        operation: "GetListItems",
	        async: false,
	        listName: Lists.AssetRegister,
	        CAMLQuery: urlCamlQuery,
	        CAMLViewFields: viewUserFields,
	        CAMLQueryOptions: "<QueryOptions><ExpandUserField>True</ExpandUserField><IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns></QueryOptions>",
	        completefunc: function (xData, Status) {
	            $(xData.responseXML).SPFilterNode("z:row").each(function () {
	                var data = $(this);

	                //get account of primary site owner
	                var primaryUser = data.attr("ows_" + SiteUserFields.PrimarySiteOwner).split("#");
	                primarySiteOwnerTitle = primaryUser[1].substring(0, primaryUser[1].length -1).replace(",,",",");
	                primaryAccount = primaryUser[2].substring(0, primaryUser[2].length - 1);
	                
	                var secondaryUser = data.attr("ows_" + SiteUserFields.SecondarySiteOwner).split("#");
	                secondarySiteOwnerTitle = secondaryUser[1].substring(0, secondaryUser[1].length -1).replace(",,",",");
	                
	                //bind query data to site information panel after loading style of dialog
	                $.each(SiteUserFields, function (key, val) {
	                    var value = "";
	                    var infoSpan = $("#" + key); //get html element that contains corresponding value
	
	                    if (infoSpan.length > 0) {
	                                                       
	                        if (data.attr("ows_" + val)) {
								var user = data.attr("ows_" + val).split("#");
								var name = user[1].substring(0, user[1].length - 1).replace(",,",",");
								var accountName = user[2].substring(0, user[2].length - 1); 
								
								var myMiteHostUrl = $("#mysitehost").text();
								if (myMiteHostUrl.length > 0 && myMiteHostUrl.charAt(myMiteHostUrl.length - 1)=='/') {
								    myMiteHostUrl = myMiteHostUrl.substring(0, myMiteHostUrl.length-1);
								}
	                            var url = myMiteHostUrl + "/Person.aspx?accountname=" + accountName;
	                            value = "<a href='" + url + "' target='_blank'>" + name + "</a>";
	                        }
	                        //Set value to span on table
	                        infoSpan.append(value);
	                    }
	                });
	            });
	        }
	    });
    }
}

function DisplaySiteInformationError(error)
{
	var errorElement = $("#url-match-error"); 
	if(error != "undefined")
		errorElement.text(error);
    errorElement.css("display", "block");
	errorElement.css("width", "370px");
	$("#siteInfoDialog .contentDialog table").css("width", "250px");

}

function onQueryFailed(sender, args) {

    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function GetSnippetContentByLanguage(titleSnippet, snippetItems){
	var snippetContent = "", currentLanguageItem = "", defaultLanguageItem = "";
    snippetItems.each(function(){
    	var title = $(this).attr("ows_Title");
    	var itemLanguage = $(this).attr("ows_SiteLanguage").split("#")[1];
    	
    	if($(this).attr("ows_Title") == titleSnippet){
    		if(itemLanguage == currentLanguage){
    			currentLanguageItem = $(this);
    		}
    		else if(itemLanguage == defaultLanguage){
    			defaultLanguageItem = $(this);
    		}
		}
    });
    
    if(currentLanguageItem != "") 
    	snippetContent = currentLanguageItem.attr("ows_HTMLContent");
    else if (defaultLanguageItem != "")
    	snippetContent = defaultLanguageItem.attr("ows_HTMLContent");
    	
    return snippetContent;
}

function appendHtmlSnippet(snippetContent, target){
	if(target.length > 0) 
	{
		target.append(snippetContent);
	}
}

function prependHtmlSnippet(snippetContent, target){
	if(target.length > 0) 
	{
		target.prepend(snippetContent);
	}
}

// === Set color for Site Information Panel by Data Classification ===
function SetInfoPanelColors(value) {
    var color;
    var InfoSitePanel = $("#siteInfo");
    var DataClassificationRow = $("span#DataClassification").closest("tr");
    
    switch (value.toLowerCase()) {
        case DataClassificationOptions.Confidential.toLowerCase(): color = DataClassificationOptions.ConfidentialColor; break;
        case DataClassificationOptions.HighlyConfidential.toLowerCase(): color = DataClassificationOptions.HighlyConfidentialColor; break;
        case DataClassificationOptions.InternalUseOnly.toLowerCase(): color = DataClassificationOptions.InternalUseOnlyColor; break;
        case DataClassificationOptions.Unclassified.toLowerCase(): color = DataClassificationOptions.UnclassifiedColor; break;
    }

    InfoSitePanel.css("background", color);
    DataClassificationRow.css("background", color).css("font-weight", "bold");
    if (value != DataClassificationOptions.Unclassified && value != DataClassificationOptions.Confidential) {
        InfoSitePanel.css("color", "#ffffff");
        DataClassificationRow.find("td").css("color", "#ffffff");
    }
    else DataClassificationRow.find("td").css("color", "black");
    if (value == DataClassificationOptions.Unclassified)
    {
    	DataClassificationRow.find("td").css("border", "1px solid black");
    	DataClassificationRow.find("td").eq(0).css("border-right", "0px");
    	DataClassificationRow.find("td").eq(1).css("border-left", "0px");
    }
}

// === Load Primary User Profile to set photo ===
function SetPhotoForPrimaryUser(primaryAccountName) {

    $().SPServices({
        operation: 'GetUserProfileByName',
        AccountName: primaryAccountName,
        async: false,
        completefunc: function (xData, Status) {
            $(xData.responseXML).find('PropertyData').each(function () {

                //set photo for primary site owner
                if (($(this).find('Name').text()) === 'PictureURL') {
                    var urlImage = $(this).find('Value').text();
                    if (urlImage.length > 0)
                        $("#pictureProfile").find("img").attr("src", urlImage);
                }

            });
        } //end of completefunc
    });
}

function CheckNotifyChangesPermission() {

	var currentUserName = $().SPServices.SPGetCurrentUser({
		fieldName: "Title",
		debug: false
	});
	
	if(currentUserName == primarySiteOwnerTitle ||
		currentUserName == secondarySiteOwnerTitle ){
		if( $("#notifyChange span").length > 0)
		{
			$("#notifyChange span").css("display","inline");
			ApplyNotifyChanges(emailInfo);
		}
	}
}

var targetHref;
function DoSendEmail(href)
{
    document.location.href = targetHref;
}

//Mail to
function ApplyNotifyChanges(emailInfo) {
    var subject = "Revisions to " + "'" + emailInfo.SiteName + "'";
    var body = "Site URL: " + emailInfo.SiteURL + "\n" + GetSiteInformationPanel();
    var href = "mailto:" + groupMailBox + "?Subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    targetHref = href;
    var notifyChangeHtml = $("#notifyChange").html();
    notifyChangeHtml = "<!-- saved from url=(0014)about:internet --><a href=\"javascript:DoSendEmail()\">" + notifyChangeHtml + "</a>";
    $("#notifyChange").html(notifyChangeHtml);
}

function GetSiteInformationPanel() {
    var emailContent = "";
    $("#siteInfoDialog .contentDialog > table > tbody > tr").each(function () {
        var tds = $(this).find("td");
        var titleColumns = "", content = "";
                 
        if (tds.length > 0) {
        		
        	var titleColumnTd = tds.eq(0);
        	var contentColumnTd = tds.eq(1);

            if (titleColumnTd.length > 0) {
                titleColumns += titleColumnTd.html();
            }
            if (contentColumnTd.length > 0) {
                var span = contentColumnTd.find("span");
                if (span.find("a").length > 0)
                    content = span.find("a").html();
                else content = span.text();
            }
            if(titleColumnTd.hasClass("blockPrimaryOwner") || titleColumnTd.hasClass("blockSiteInfo"))
            	emailContent += "\n" + titleColumns + "\n";
			else
				emailContent += titleColumns + ": " + content + "\n";
            
        }
    });
    return emailContent;
}

// ============================= Site Information Dialog =============================
function ExecuteDialog() {
    window["DIALOG"] = new Dialog(
        "siteInfo", //Site information panel
        "siteInfoDialog", //site information dialog parent div
        "close-icon", //id close icon
        "dialog-wrapper", //dialog wrapper : transparent div, close icon & content
        "dialog", //dialog contains : icon-close, content
        "contentDialog", //content of dialog
        "transparent"
    );
}

function Dialog(siteInfoCtrId, siteInfoDialogParentDiv, closeIconId, dialogWrapperDiv, dialogDiv, contentDialogDiv, transparentDiv) {
    
    // Items in Site information dialog
    this.SiteInfoPanel = $("#" + siteInfoCtrId);
    this.SiteInfoDialogParentDiv = $("#" + siteInfoDialogParentDiv);
    this.SiteInfoCloseIconDialog = this.SiteInfoDialogParentDiv.find("." + closeIconId);
    this.SiteInfoDialogWrapper = this.SiteInfoDialogParentDiv.find("." + dialogWrapperDiv);
    this.SiteInfoDialog = this.SiteInfoDialogParentDiv.find("." + dialogDiv);
    this.SiteInfoDialogContent = this.SiteInfoDialogParentDiv.find("." + contentDialogDiv);
    this.SiteInfoTransparent = this.SiteInfoDialogParentDiv.find("." + transparentDiv);
    
    //start
    this.Init();
}

var finishUserFieldLoading = false;
Dialog.prototype.Init = function () {
    var me = this;

    me.ColorLines();
    
    //For site information panel
    me.SiteInfoPanel.centerHorizon();
    
	$(window).resize(function(){
        me.SiteInfoDialog.center();
        me.SiteInfoDialog.center();
    });
        
    me.SiteInfoPanel.click(function () {
    	if(finishUserFieldLoading == false)
    	{
    		LoadUserFields();
    		finishUserFieldLoading = true;
    	}
        if(primaryAccount != "" && photoLoaded == false)
        {
            SetPhotoForPrimaryUser(primaryAccount);
            photoLoaded = true;
           	
             //Apply click event to "Notify Changes"
		    CheckNotifyChangesPermission();
        }
        me.SiteInfoDialogWrapper.fadeIn("fast");
        me.SiteInfoDialog.center();
    });

    me.SiteInfoCloseIconDialog.click(function () {
        me.SiteInfoDialogWrapper.fadeOut("fast");
    });

    me.SiteInfoTransparent.click(function () {
        me.SiteInfoDialogWrapper.fadeOut("fast");
    });
}

Dialog.prototype.ColorLines = function () {
    var me = this;
    var siteInfoTrs = me.SiteInfoDialogContent.find("table tr");
    siteInfoTrs .each(function (index) {
        if (index % 2)
            $(this).css("background", "#F6FAFD");
    });
}


jQuery.fn.center = function () {
    this.css("position", "fixed");
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();
    var dialogHeight = this.GetDialogHeight();
    var dialogWidth = this.GetDialogWidth();
    
    if(screenHeight <= dialogHeight)
		this.addClass("minimize");
	else {
		this.removeClass("minimize");
		dialogHeight = this.GetDialogHeight();
		if(screenHeight <= dialogHeight)
			this.addClass("minimize");
	}
	
    dialogHeight = this.GetDialogHeight();
    if(dialogHeight < screenHeight)
    {
	    if(this.parents("#broadcastDialog").length == 0)
	    	this.css("top", (screenHeight - dialogHeight + 25) / 2  + "px");
	    else this.css("top", "100px");
    }
    else{
    	this.css("top", "18px");
    }
    
    screenWidth = $(window).width();
    dialogWidth = this.GetDialogWidth();
    this.css("left", (screenWidth - dialogWidth) / 2 + "px");
    return this;
}

jQuery.fn.GetDialogHeight = function(){
	return (this.height() + 50);
}

jQuery.fn.GetDialogWidth = function(){
	return (this.width() + 50);
}

jQuery.fn.centerHorizon = function () {
    var left = $('.ms-cui-QATRowCenter').position().left;
    this.css("left", left + "px");
    this.css("position", "fixed");
    return this;
}

// =============== UI Script =====================
function HideMenus(){
	$("#onetCategoryCustom").closest('table').css("display","none"); //hide designer button on designer view page 
	var menuItems = document.getElementsByTagName("ie:menuitem");
	if( menuItems != null )
	{
		for( var i = 0; i < menuItems.length; i++ )
		{
			var keyId = menuItems[i].id;
			if(keyId.endsWith("MenuItem_TakeOffline"))//Hide Sync to SharePoint Workspace
				menuItems[keyId ].hidden = true;
			else if( keyId.endsWith("MenuItem_EditSite")) //Hide Edit in SharePoint Designer
						menuItems[keyId].hidden = true; 
				else if(keyId.endsWith("MenuItem_CreateDocLib")) //Hide New Document Library
						menuItems[keyId].hidden = true; 
		}
	}
}

function SetBorderRadiusForFarmers() {
    if ($(".farmersLogo").length > 0) {
        var rootLi = $(".s4-toplinks .s4-tn ul.root > li");

        if (rootLi.length > 0) {
        	if(!rootLi.hasClass("selected"))
        	{
	            rootLi.find("a").eq(0).hover(function () {
	            	if($.browser.mozilla)
            			$(".nav-left-off ").css("background-position", "0px -114px");     
	                else $(".nav-left-off ").css("background-position-x", "0");
	            }, function () {
	            	if($.browser.mozilla)
            			$(".nav-left-off ").css("background-position", "-30px -114px");     
	                else $(".nav-left-off ").css("background-position-x", "-30px");
	            });
            }
            else
            {
            	if($.browser.mozilla)
            		$(".nav-left-off ").css("background-position", "0px -114px");            
            	else $(".nav-left-off ").css("background-position-x", "0");            
            }
        }
    }
}

// ============================= Support Function ============================= 
function formatDate(dateStr) {
    var a = dateStr.split(" ");
    var d = a[0].split("-");
    var t = a[1].split(":");
    var date = new Date(d[0], (d[1] - 1), d[2], t[0], t[1], t[2]);
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
};

// ============================= START: Social icons functions ============================= 
var specialCharacters = ['&', '<', '>'], specialCharactersMap = ['<![CDATA[&]]>', '<![CDATA[<]]>', '<![CDATA[>]]>'];
var currentTitle = $("title").text();
function addBookmark(keyword) {
    var nid = SP.UI.Notify.addNotification('<img src="/_layouts/images/loadingcirclests16.gif" style="vertical-align: top;"/>' + keyword + "...", true);
    $().SPServices({
        operation: "AddTagByKeyword",
        url: currentUrl,
        keyword: keyword,
        title: currentTitle.replace(new RegExp(specialCharacters.join('|'), 'g'), function (value) { return specialCharactersMap[$.inArray(value, specialCharacters)]; }),
        completefunc: function (xData, Status) {
            $("#zurich-template-bookmark").attr("onClick", "deleteCurrentBookmark('" + keyword + "');");
            $("#zurich-template-bookmark").addClass('active-bookmark');
        }
    });
    SP.UI.Notify.removeNotification(nid);
    nid = '';
}

function deleteCurrentBookmark(keyword) {
    var nid = SP.UI.Notify.addNotification('<img src="/_layouts/images/loadingcirclests16.gif" style="vertical-align: top;"/>' + "remove " + keyword + "...", true);
    $().SPServices({
        operation: "DeleteTagByKeyword",
        keyword: keyword,
        url: currentUrl,
        completefunc: function (xData, Status) {
            $("#zurich-template-bookmark").attr("onClick", "addBookmark('" + keyword + "');");
            $("#zurich-template-bookmark").removeClass('active-bookmark');
        }
    });
    SP.UI.Notify.removeNotification(nid);
    nid = '';
}

function checkPageIsBookmarked(keyword) {
    if (isPageTaggedBy(keyword)) {
        $("#zurich-template-bookmark").attr("onClick", "deleteCurrentBookmark('" + keyword + "');");
        $("#zurich-template-bookmark").addClass('active-bookmark');
    }
}

function checkPageIsLiked() {
	var $likeAnchor = $("a[id^='AddQuickTag_ctl00_']");
    if ($likeAnchor != null) {
        if (isPageTaggedBy("I like it")) {
            $likeAnchor.addClass('active-like');
        } else {
        	var existingOnClickEvent = $likeAnchor.attr("onclick");
        	$likeAnchor.attr("onclick", existingOnClickEvent + "\n$('#" + $likeAnchor.attr("id") + "').addClass('active-like');");
        }
    }
}

function checkPageIsTagged() {
    var tagsAndNotes = $("a[id^='TagsAndNotes_ctl00_']");
    if (tagsAndNotes != null) {
        var tags = getCurrentPageTags();
        for (var i = 0; i < tags.length; i++) {
            if (tags[i] != "I like it" && tags[i] != "I share this" && tags[i] != "Bookmarked" && tags[i] != "I Follow This") {
                tagsAndNotes.addClass('active-tag');
                break;
            }
        }
    }
}

function shareThisPage(subject, notificationText, mmsKeyWord, isAuthenticated) {
    window.location = "mailto:?subject=" + subject + "&body=" + window.location.href;
    if (isAuthenticated) {
        var nid = SP.UI.Notify.addNotification('<img src="/_layouts/images/loadingcirclests16.gif" style="vertical-align: top;"/>' + notificationText, true);
        $().SPServices({
            operation: "AddTagByKeyword",
            url: currentUrl,
            keyword: mmsKeyWord,
            title: $(document).find("title").text(),
            completefunc: function (xData, Status) {
                $("#zurich-template-sharethispage").addClass('active-share');
            }
        });
        SP.UI.Notify.removeNotification(nid);
        nid = '';
    }
}

function checkPageIsShared(keyword) {
    if (isPageTaggedBy(keyword)) {
        $("#zurich-template-sharethispage").addClass('active-share');
    }
}

function isPageTaggedBy(keyword) {
    var tags = getCurrentPageTags();
    if (tags == null)
        return false;

    for (var i = 0; i < tags.length; i++) {
        if (tags[i] == keyword)
            return true;
    }
    return false;
}

var currentUrl = new String(document.location);
currentUrl = currentUrl.split("?")[0];
var pageTags = null;
function getCurrentPageTags() {
    if (pageTags == null) {
        $().SPServices({
            operation: "GetTags",
            url: currentUrl,
            async: false,
            completefunc: function (xData, Status) {
                var i = 0;
                pageTags = new Array();

                $(xData.responseXML).find("SocialTagDetail").each(function () {
                    pageTags[i] = $(this).find("Name").text();
                    i++;
                });
            }
        });
    }

    return pageTags;
}

function addFollow(keyword) {
    var nid = SP.UI.Notify.addNotification('<img src="/_layouts/images/loadingcirclests16.gif" style="vertical-align: top;"/>Followed...', true);
    $().SPServices({
        operation: "AddTagByKeyword",
        url: currentUrl,
        keyword: keyword,
        title: currentTitle.replace(new RegExp(specialCharacters.join('|'), 'g'), function (value) { return specialCharactersMap[$.inArray(value, specialCharacters)]; }),
        completefunc: function (xData, Status) {
            $("#zurich-template-followthispage").attr("onclick", "deleteCurrentFollow('" + keyword + "');");
            $("#zurich-template-followthispage").addClass('follow-selected');
        }
    });
    SP.UI.Notify.removeNotification(nid);
    nid = '';
}

function deleteCurrentFollow(keyword) {
    var nid = SP.UI.Notify.addNotification('<img src="/_layouts/images/loadingcirclests16.gif" style="vertical-align: top;"/>remove Followed...', true);
    $().SPServices({
        operation: "DeleteTagByKeyword",
        keyword: keyword,
        url: currentUrl,
        completefunc: function (xData, Status) {
            $("#zurich-template-followthispage").attr("onclick", "addFollow('" + keyword + "');");
            $("#zurich-template-followthispage").removeClass('follow-selected');
        }
    });
    SP.UI.Notify.removeNotification(nid);
    nid = '';
}

function checkPageIsFollowed(keyword) {
    var myFollowedSites = getFollowedSites();
    if (myFollowedSites == null || myFollowedSites.length == 0) {
        //do nothing since default icon is the grey one
    } else {
        var exactMatch = false;
        var partialMatch = false;
        $.each(myFollowedSites, function (k, v) {
            if (v.Url.toLowerCase() == currentUrl.toLowerCase()) {
                exactMatch = true;
                return false;
            }
            if (currentUrl.toLowerCase().indexOf(v.Url.toLowerCase()) > -1)
                partialMatch = true;
        });
        if (exactMatch) {
            $("#zurich-template-followthispage").attr("onclick", "deleteCurrentFollow('" + keyword + "');");
            $("#zurich-template-followthispage").addClass('follow-selected');
        } else if (partialMatch) {
            $("#zurich-template-followthispage").attr("onclick", null);
            $("#zurich-template-followthispage").attr("onclick", "").unbind("click");
            $("#zurich-template-followthispage").css("cursor", "default");
            $("#zurich-template-followthispage").addClass('follow-unselected');
            var tooltip = $("#implicitly-followed-site-tooltip").val();
            $("#zurich-template-followthispage").attr("title", tooltip);
        }
    }
}

var thisUserAccount = $().SPServices.SPGetCurrentUser({
    fieldName: "Name"
});
function getUserProfile(currentUser) {
    var userProfile = new Object();
    $().SPServices({
        operation: 'GetUserProfileByName',
        AccountName: currentUser,
        async: false,
        completefunc: function (xData, Status) {
            $(xData.responseXML).find('PropertyData').each(function () {
                if (($(this).find('Name').text()) === 'AccountName') {
                    userProfile.accountname = $(this).find('Value').text();
                }
            });
        }
    });

    return userProfile;
}

function getFollowedSites(currentUser) {
    var followedSites = [];

    var userProfile = getUserProfile(thisUserAccount);
    if (userProfile == null || userProfile.accountname == null)
        return null;

    var currentUser = userProfile.accountname;
    if (currentUser == null || currentUser.length == 0)
        return null;

    $().SPServices({
        operation: "GetTagsOfUser",
        userAccountName: currentUser,
        async: false,
        cacheXML: false,
        completefunc: function (xData, Status) {
            $(xData.responseXML).find("SocialTagDetail").each(function () {
                if ($("Term>Name", $(this)).text().toLowerCase() == "i follow this") {
                    obj = {};
                    obj["Title"] = $("Title", $(this)).text();
                    obj["Url"] = $("Url", $(this)).text();
                    followedSites.push(obj);
                }
            });
        }
    });
    return followedSites;
}

function renderSocialIconsStatus() {
	var isHomePage = false;
	//CSOM code to detect welcome page requires higher permissions than Vistors --> it's not possible to use CSOM
	//so welcome page Url is assumed to be
	//1. /SitePages/Home.aspx (Team Site) or
	//2. /Pages/Default.aspx (Publishing site) or
	//3. /Pages/CollaborationSites.aspx (Zurich's Search Center site) or
	//4. /default.aspx (Blog site or Blank site)
	if (currentUrl.match(/\/SitePages\/Home.aspx/i)) {
		currentUrl = currentUrl.replace(/\/SitePages\/Home.aspx/i, "/");
		isHomePage = true;
	} else if (currentUrl.match(/\/Pages\/Default.aspx/i)) {
		currentUrl = currentUrl.replace(/\/Pages\/Default.aspx/i, "/");
		isHomePage = true;
	} else if (currentUrl.match(/\/Pages\/CollaborationSites.aspx/i)) {
		currentUrl = currentUrl.replace(/\/Pages\/CollaborationSites.aspx/i, "/");
		isHomePage = true;
	} else if (currentUrl.match(/\/default.aspx/i)) {
		currentUrl = currentUrl.replace(/\/default.aspx/i, "/");
		isHomePage = true;
	}

    //hide I Follow This icon
    if (!isHomePage) {
    	$("#zurich-template-followthispage").hide();
    	$("#zurich-site-socialicons-wrapper").css("width", 140);
    }

    checkPageIsLiked();
    checkPageIsTagged();
    checkPageIsBookmarked("Bookmarked");
    checkPageIsShared("I share this");
    checkPageIsFollowed("I Follow This");   
}
// ============================= END: Social icons functions ============================= 

// ============================= START: Show source library of document ============================= 
function getTranslation(key) {
	var lcid = _spPageContextInfo.currentLanguage;
	
	var value = "";
	try {
	value = translations[key][lcid];
	} catch(err) {
	}

	return value;
}

function ShowSourceLibrary(){	
	$("span.srch-URL2").each(function(){
		var link = $(this).text();
		if(link.lastIndexOf("/") > 7 && link.lastIndexOf(".aspx") < 1 && link.lastIndexOf(".") > 7 && link.lastIndexOf(".") > link.lastIndexOf("/"))
		{
			var source = link.substring(0, link.lastIndexOf("/"));			
			var sourceElement = "<span class='srch-urllink'><a target='_blank' href='" + source +"' >" + getTranslation("Open Document Library") + "</a></span>";
			var parent = $(this).parent();				
			$(parent).append(sourceElement);
		}
	});
}
// ============================= END: Show source library of document ============================= 