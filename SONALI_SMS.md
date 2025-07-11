# API.Sonalisms.com

--------------
Billing link :  
--------------
 https://panel.sonalisms.com	(https)
 http://panel.sonalisms.com		(http)
 http://103.177.125.109/login


-------------
SMPP Details:
-------------
 Smpp iTel
 IP: 103.177.125.106
 SMPP : 9988
 http : 7788


------------
Sonalisms API: 
------------
 http://api.sonalisms.com:7788/sendtext?apikey=API_KEY&secretkey=SECRET_KEY&callerID=SENDER_ID&toUser=MOBILE_NUMBER&messageContent=MESSAGE
 
 http://api.sonalisms.com:7788/getstatus?apikey=API_KEY&secretkey=SECRET_KEY&messageid=MESSAGE_ID
 
 http://103.177.125.106:7788/sendtext?apikey=API_KEY&secretkey=SECRET_KEY&callerID=SENDER_ID&toUser=MOBILE_NUMBER&messageContent=MESSAGE
 
 http://103.177.125.106:7788/getstatus?apikey=API_KEY&secretkey=SECRET_KEY&messageid=MESSAGE_ID





--------------------
Sonali SMS API C panel:
--------------------
 http://api.sonalisms.com/sendtext?apikey=API_KEY&secretkey=SECRET_KEY&callerID=SENDER_ID&toUser=MOBILE_NUMBER&messageContent=MESSAGE
 
 http://api.sonalisms.com/getstatus?apikey=API_KEY&secretkey=SECRET_KEY&messageid=MESSAGE_ID
 
 http://103.177.125.108/sendtext?apikey=API_KEY&secretkey=SECRET_KEY&callerID=SENDER_ID&toUser=MOBILE_NUMBER&messageContent=MESSAGE
 
 http://103.177.125.108/getstatus?apikey=API_KEY&secretkey=SECRET_KEY&messageid=MESSAGE_ID





--------------------
Sonalisms Balance api:
--------------------
 http://api.sonalisms.com/sms/smsConfiguration/smsClientBalance.jsp?client=CLIENT_ID
 
 http://103.177.125.106/portal/sms/smsConfiguration/smsClientBalance.jsp?client=CLIENT_ID





---------------------
Sonali SMS API for Bulk:
---------------------

Multi Contact with same content :
 http://api.sonalisms.com:7788/send?apikey=API_KEY&secretkey=SECRET_KEY&content=[{"callerID":"8809612","toUser":"8801811,8801749","messageContent":"SMS test multi"}]

Multi Contact with Muili content :
 http://api.sonalisms.com:7788/send?apikey=API_KEY&secretkey=SECRET_KEY&content=[{"callerID":"8801847","toUser":"8801149,8801182","messageContent":"SMS1"},{"callerID":"9101847","toUser":"8801147","messageContent":"SMS2"}]





------------------------
Sonali SMS SMS status API :
------------------------
 http://api.sonalisms.com:7788/getmultistatus?apikey=API_KEY&secretkey=SECRET_KEY&messageids=7331,7332,7333







- - -
- - -
## Sonali SMS| SMS Marketing Solution
## Introduction:
One can send SMS request through JSON object or through simple parameters using API Key and Secret
Key.
## Send SMS API:
You can send SMS using API key and Secret key using GET method
**Parameters:**
**Parameter** **Value** **Required**
apikey apikey provided by termination √
secretkey Sender Identification Number √
secretkey provided by termination √
CallerID Content JSON formatted array of sms. Described bellow √
toUser SMS Receiver Number √
Message Content SMS Body √
### Send SMS Using Simple Parameters:
Request:
http://192.168.18.119:8585/sendtext?apikey=xxxxxx&secretkey=xxxxx&callerID=8801847&toUs
er=452621&messageContent=abcd
Response:
{"Status":"0","Text":"ACCEPTD","Message_ID":"444"}
### Send SMS Using JSON Object:
Request:
http://192.168.18.119:8585/send?apikey=5d2a&secretkey=465&content=[{"callerID":"8801847
","toUser":"452621,568468","messageContent":"abcd"},{"callerID":"9101847","toUser":"91262
1,918468","messageContent":"abcd"}]
Response:
_ID":"445"}
API Response Status:
{"Status":"0","Text":"ACCEPTD","Message_ID":"444"},{"Status":"0","Text":"ACCEPTD","Message
**Case** **Response**
If user not provided/Deleted {“Status”:”109”,”Text”:”REJECTD”}
{“Status”:”108”,”Text”:”REJECTD”}
If wrong password/ not provided {“Status”:”101”,”Text”:”REJECTD”}
If content not provided {“Status”:”114”,”Text”:”REJECTD”}
if internal server error occurs If request successful {“Status”:”0”
,
”Text”:”Acceptd”}
If request failed {“Status”:”1”,”Text”:”REJECTD”}Sonali SMS| SMS Marketing Solution P a g e | 4
Along with Status there is one parameter “Message_ID”. For every message there is a unique message ID
which you can use later to get the delivery status of the SMS or system can push the status to origination
delivery URL for this message ID.
## Delivery Report:
You can get delivery status for single SMS as well as for multiple SMS from our System using GET method.
Also, Sonalisms SMS can push delivery status in your call back URL using GET and POST method.
### Query status for Single SMS ID:
Request:
http://192.168.18.119:8585/getstatus?apikey=xxxxxx&secretkey=xxxxx&messageid=444
Response:
Time":"0"}
### Query Status for Multiple SMS IDs:
Request:
{"Status":"0","Text":"DELIVRD","Message_ID":"444","Delivery
http://192.168.18.119:8585/getmultistatus?apikey=xxxxx&secretkey=xxxxx&messageids=444,4
45
Response:
[{"Status":"0","Text":"DELIVRD","Message_ID":"444","Delivery
Time":"0"},{"Status":"0","Text":"DELIVRD","Message_ID":"445","Delivery
Time":"0"}]
### Pushing Delivery Status to Origination Using GET Method:
If the origination support GET method for receiving Delivery status then we can send the status in
following parameters
Parameters: REPLACE_STATUS, REPLACE_TEXT, REPLACE_ID
Sample URL:
http://abc.com/submitstatus?apikey=5d2a5cebf00d66bb65f30b5a81c882e4&secretkey=46586ec2&stat
us=REPLACE_STATUS&text=REPLACE_TEXT&messageid=REPLACE_ID
### Pushing Delivery Status to Origination Using POST Method:
Header: Fixed part of the API will be sent through the header part of the POST request and the status will
be sent in body.
Sample Header:Sonali SMS| SMS Marketing Solution http://abc.com/submitstatus?apikey=xxxxx&secretkey=xxxx
Status:0, Message_ID:193002, Text:DELIVRD
P a g e | 5
Example status in Body:
From Trace:
**API Response Status:**
**Case** **Response**
If api key isn’t provided {“Status”:”109”,”Text”:”REJECTD”}
If wrong password/ not provided {“Status”:”108”,”Text”:”REJECTD”}
If message id isn’t provided {“Status”:”114”,”Text”:”REJECTD”}
If message id isn’t valid or query has been
done already for the same id
{“Status”:”114”,”Text”:”REJECTD”}
if internal server error occurs {“Status”:”101”,”Text”:”REJECTD”}
if Authorization failed {“Status”:”-42”,”Text”:”REJECTD”}
If request failed {“Status”:”1”,”Text”:”REJECTD”}
If request pending {“Status”:”2”,”Text”:”PENDING”}
If request sent {“Status”:”4”,”Text”:”SENT”}
If sms request successful {“Status”:”0”
,
”Text”:”DELIVRD”}

