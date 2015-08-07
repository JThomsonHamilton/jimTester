var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    takePicture: function() {
      navigator.camera.getPicture( function( imageURI ) {
        alert( imageURI );
      },
      function( message ) {
        alert( message );
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
    }
};
var connectionStatus = false;
var db;
var transaction;
$(document).on('pagebeforeshow', '#phonenums', function () {
    setInterval(function () {
        connectionStatus = navigator.onLine ? 'online' : 'offline';
    }, 100);
});
$(document).ready(function() {
        console.log(connectionStatus);
        contentChecks();
        db = window.openDatabase("PagesDB", "1.0", "PhoneGap Demo", 200000);
        db.transaction(function (tx) {  
        tx.executeSql('DROP TABLE IF EXISTS pages');
	var sql = 
		"CREATE TABLE IF NOT EXISTS pages ( "+
		"id varchar(50) PRIMARY KEY, " +
		"pagetitle VARCHAR(255), " +
		"pageContents VARCHAR(8000), " +
		"pageActive VARCHAR(1), " +
		"lastupdated varchar(50), " + 
		"lastupdatedusername VARCHAR(50))";
        tx.executeSql(sql);
            console.log('pages created');
        });
        console.log('foo');
        loadJson();
       
    });
function 
function getTodayDate(e){
        var myDate=e;
        myDate=myDate.split("-");
        var foo = new Date(parseInt(myDate[2], 10), parseInt(myDate[1], 10) - 1 , parseInt(myDate[0]), 10).getTime();
        var currentTime = new Date();
        var todayDate = moment().format();
        //alert(currentTime);
        alert(todayDate);
    }
function contentChecks(){
        var todayDate = moment().format();
        var uuid = guid();
        db = window.openDatabase("PagesDB", "1.0", "PhoneGap Demo", 200000);
        db.transaction(function (tx) {  
	       var sql = 
            "CREATE TABLE IF NOT EXISTS contentChecks ( "+
            "id varchar(50) PRIMARY KEY, " +
            "vieweraudience VARCHAR(255), " +
            "lastupdated datetime())";
            tx.executeSql(sql);
            console.log('added contentchecks');
            tx.executeSql('INSERT INTO contentChecks (id,vieweraudience,lastupdated) VALUES (?,?,?)',[uuid,'S', todayDate]);
            console.log('added contentchecks');
        });

}
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}
function loadJson(){
    $.getJSON( "https://mercury.hamilton.edu:7075/appPages/ajax/getpages.cfm", function( data ) { 
        db.transaction(function (transaction) {
            var len = data.length;
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
                var pagetitle=data[i].pagetitle;           
                var pagecontent=data[i].pagecontent;  
                var pageactive=data[i].pageactive; 
                var lastupdated=data[i].lastupdated; 
                var lastupdatedusername=data[i].lastupdatedusername; 
                transaction.executeSql('INSERT INTO pages (id,pagetitle, pagecontent, pageaActive, lastupdated, lastupdatedusername) VALUES (?,?,?,?,?,?)',[id, pagetitle, pagecontent, pageactive, lastupdated,lastupdatedusername]);
            }
        });
    });
};