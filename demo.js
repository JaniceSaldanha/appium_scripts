const driver = require("webdriverio"); //webdriverio
const assert = require("assert");
const keycode = require('keycode');
const sleep = require('sleep-promise');
const colors = require('colors');
// const params = require('minimist')(process.argv.slice(2));
const Reporter = require('./testreport.js');
const REPORTER = new Reporter('./', 'Mission', `./Configuration2.json`);
//const Database1 = require('./database_connection.js'); 
//const DATABASE = new Database1() 
const fs = require('fs');
const { default: click } = require("webdriverio/build/commands/element/click");
const { default: waitUntil } = require("webdriverio/build/commands/browser/waitUntil");
const { now } = require("moment");
const { AsyncLocalStorage } = require("async_hooks");



// Lenovo TB-8504F
// adbexectimeout: 20000,

const opts = {
  path: '/wd/hub',
  port: 5736,  
  capabilities: {
    platformName: "Android",
    platformVersion: "10",
    deviceName: "HA1AMGE8",
    appPackage: "com.example.terramaxminioperatorandroid",
    appActivity: "com.example.terramaxminioperatorandroid.features.new_designs.MainActivityNd",
    automationName: "UiAutomator2",
    autoGrantPermissions: true,
    disableWindowAnimation: true,
    waitForIdleTimeout: 0,
    waitForQuiescence:false
  }
};

// -- Add any other needed values
const fixString = (string) => {
  string = string.replace("V", "");
  string = string.replace(" ", "");
  string = string.replace("%", "");
  string = string.replace("F", "");
  return string;
}

var total_testcases= 0;
var pass_testcases =0;
var fail_testcases =0;

async function main () {
  var timeBegin = (new Date()).getTime();
  var obj = JSON.parse(fs.readFileSync('./Configuration2.json', 'utf8'));
 
  const client = await driver.remote(opts);

  await client.setImplicitTimeout(10000);
  const check_drive_icon_click = await findItemById(client,"android.widget.TextView","tv_drive")
  await clickItem(client,check_drive_icon_click)

  await waitForActivity(client)

  var timeStart = (new Date()).getTime();
console.log(colors.red("Robot Settings icon"))
var robot_settings_icon1 = await findItemById(client,"android.widget.ImageView","iv_settings")
await clickItem(client,robot_settings_icon1);
var timeEnd = (new Date()).getTime();

//Adjust Turning speed
var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Turning speed"))
var turning_speed = await findItemById(client,"android.widget.SeekBar","slider_turning_drive")
await holdTouchByPercentage(client,turning_speed,50,20,5)
await waitForActivity(client)

var timeStart = (new Date()).getTime();
 console.log("Move to Autonomy Tab")
 const autonomy1 = await findItemById(client,"android.view.ViewGroup","container_autonomy_speeds")
 await clickItem(client,autonomy1)
 var timeEnd = (new Date()).getTime();

//To check if user can edit cruise control and Waypoint Autonomy following
var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Cruise Control speed"))
var cruise_control = await findItemById(client,"android.widget.SeekBar","slider_cruise_drive")
await holdTouchByPercentage(client,cruise_control,30,10,5)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

var timeStart = (new Date()).getTime();
console.log("Click on X button")
var close_robot_setting = await findItemById(client,"android.widget.ImageView","iv_close_settings2")
await close_robot_setting.click()
var timeEnd = (new Date()).getTime();


await waitForActivity(client)
const driveActivity_leftJoystick = await findItemById(client, "android.widget.ImageView", "left_joystick_image");
const driveActivity_rightJoystick = await findItemById(client, "android.widget.ImageView", "joystick_right_imv");

//Turn robot a bit to the right
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 90, 50,2000);//Move robot right


var timeStart = (new Date()).getTime();
console.log(colors.red("Swipe Cruise mode"))
var cruise_control_switch=await findItemById(client,"android.widget.Switch","sc_cruise_control")
await cruise_control_switch.click()

await sleep(5000) //loop start 

//Turn robot to left direction
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 10,50,13000); //Move robot to left

await sleep(2000)

//turn robot to right direction
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 90, 50,12500);//Move robot right

await sleep(3000)   //loop end

await cruise_control_switch.click()
/*
await moveElementByPercentage(client, driveActivity_leftJoystick, 70, 70, 70, 10, 6000); // move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 90, 50,4600);//Move robot right
await sleep(2000)
await moveElementByPercentage(client, driveActivity_leftJoystick, 70, 70, 70, 10,3000); //again move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 90, 50,4900); //make robot straight
await sleep(2000)
await moveElementByPercentage(client, driveActivity_leftJoystick, 70, 70, 70, 10, 6000); //Move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 10,50,4600); //Move robot to left
await sleep(2000) 
await moveElementByPercentage(client, driveActivity_leftJoystick, 70, 70, 70, 10,3000); //again move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 10, 50,4900) //make robot straight
await sleep(2000)
await moveElementByPercentage(client, driveActivity_leftJoystick, 70, 70, 70, 10, 6000); //Move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 90, 50,4600);//Move robot right
await sleep(2000)
await moveElementByPercentage(client, driveActivity_leftJoystick, 70, 70, 70, 10, 1000); //again move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick, 50, 50, 90, 50,4900); //make robot straight
await sleep(2000)
await moveElementByPercentage(client, driveActivity_leftJoystick, 70, 70, 70, 10, 6000); //Move robot forward
await sleep(2000) 

*/

 result_table(total_testcases,pass_testcases,fail_testcases)
  
  var script_name= " Waypoint Mission"
  var timeOver = (new Date()).getTime(); //End time calculation
 var tot= timeOver-timeBegin;
var seconds =tot/1000;  // Convert msec to seconds 
var minutes =Math.floor(seconds/60);  // Get the minutes value
var sec= seconds % 60;  //Get the sec value
var roundoff=Math.trunc(sec)  //remove the decimal values for seconds

function padTo2Digits(num) {
return num.toString().padStart(2,'0');      //Displays the time in mm:ss format
}

var result= `${padTo2Digits(minutes)}:${padTo2Digits(roundoff)}`;
console.log(result);

  REPORTER.totExecutionTime(seconds,result,script_name);

  
  REPORTER.closeTable();
  await sleep(10000);
  await client.deleteSession();

}


const result_table= (total_testcases,pass_testcases,fail_testcases) =>
{
var total= total_testcases;
var pass= pass_testcases;
var fail= fail_testcases;
 REPORTER.writeResultEntry(total,pass,fail)

}

const testcase_name =(test_id,element,output,time_of_exec) =>{
  var id= test_id
  var test_case=element
  var out= output
  var execution_time = time_of_exec

  REPORTER.writeSummaryEntry(id,test_case,out,execution_time)
 //DATABASE.tableEntry(id,test_case,out,execution_time)
}

const clickItem = async (client, element) => {
var timeStart = (new Date()).getTime();
await element.click();
var timeStop = (new Date()).getTime();
var id = "No ID";
var issue = "-";
try{
  id = await element.getAttribute("resourceId")
}catch(e){
  issue = "No ID found for element.";
}
var clientAct = await client.getCurrentActivity();
REPORTER.writeExecutionTableEntry(clientAct, id, "Click", 'None', timeStop - timeStart, issue);
}


const moveElementByPercentage = async (client, element, px1, py1, px2, py2, msTime) => {
var sizeJson = await element.getSize();
var locJson = await element.getLocation();
var x1 = ((px1/100) * sizeJson.width) + locJson.x;
var y1 = ((py1/100) * sizeJson.height) + locJson.y;
var x2 = ((px2/100) * sizeJson.width) + locJson.x;
var y2 = ((py2/100) * sizeJson.height) + locJson.y;
await moveTouch(client, x1, y1, x2, y2, msTime);
}

const holdTouch = async (client, x1, y1, msTime) => {
await client.touchPerform([
  { action: 'press', options: { x: 300, y: 100 }},
  { action: 'wait', options: { ms: 10000 }},
  { action: 'release' }
]);
}

const holdTouchByPercentage = async(client, element, px1, py1, msTime) => {

var timeStart = (new Date()).getTime();
var sizeJson = await element.getSize();
var locJson = await element.getLocation();
var x1 = ((px1/100) * sizeJson.width) + locJson.x;
var y1 = ((py1/100) * sizeJson.height) + locJson.y;

await client.touchPerform([
  { action: 'press', options: { x: x1, y: y1 }},
  { action: 'wait', options: { ms: msTime }},
  { action: 'moveTo', options: { x: x1, y: y1 }},
  { action: 'release' }
]);
var timeStop = (new Date()).getTime();

REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), `x:${x1} y:${y1}`, "HoldTouch", `Time : ${String(msTime)}`, timeStop - timeStart, "-");
}


const moveTouch = async (client, x1, y1, x2, y2, msTime) => {
var timeStart = (new Date()).getTime();
await client.touchPerform([
  { action: 'press', options: { x: x1, y: y1 }},
  { action: 'wait', options: { ms: msTime }},
  { action: 'moveTo', options: { x: x2, y: y2 }},
  { action: 'release' }
]);
var timeStop = (new Date()).getTime();
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), `x:${x1} y:${y1} -> x:${x2} y:${y2}`, "Move", `Time : ${String(msTime)}`, timeStop - timeStart, "-");

}


const waitForActivity = async (client) => {
var timeStart = (new Date()).getTime();
await client.$("*")
var timeStop = (new Date()).getTime();
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), "None", "Wait", "", timeStop - timeStart, "-");
}

const findItemByName = async (client, className, text) => {
var timeStart = (new Date()).getTime();
const items = await client.$$(className);
for (const item of items) { 
  var itemText = (await item.getText());
  if(itemText == null) continue;
  if(itemText == text){
    var timeStop = (new Date()).getTime();
    REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), `@text/${text}`, "Find", "", timeStop - timeStart, "-");
    return item;
  }
}
var timeStop = (new Date()).getTime();
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), `@text/${text}`, "Find", "", timeStop - timeStart, "NOT FOUND");
return null;
}


const findItemById = async (client, className, id) => {
var timeStart = (new Date()).getTime();
const items = await client.$$(className);
for (const item of items) { 
  var itemText = (await item.getAttribute("resourceId"));
  if(itemText == null) continue;
  console.log(colors.cyan("ID : " + itemText));
  if(itemText.includes("id/" + id)){
    var timeStop = (new Date()).getTime();
    REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), `@id/${id}`, "Find", "", timeStop - timeStart, "-");
    console.log(colors.yellow("Found : " + id));
    return item;
  }
}
var timeStop = (new Date()).getTime();
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), `@id/${id}`, "Find", "", timeStop - timeStart, "NOT FOUND");
return null;
}

const findItem = async (client, className) => {
return await client.$(className);
}

const readValueWaitFromElementMatch = async (client, element, matchValue, description, waitTimeMs) => {
var timeStart = (new Date()).getTime();
var waitDivides = parseInt(waitTimeMs/200);
var itemText = "";
for(var i = 0 ; i < waitDivides; i ++){
  itemText = (await element.getText());
  if(String(itemText).replace(" ", "") == String(matchValue).replace(" ", "")){
    break;
  }
  await sleep(200);
}
var timeStop = (new Date()).getTime();
var act = await client.getCurrentActivity();
var itemId = (await element.getAttribute("resourceId"));
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), itemId, "ReadValueWait", `Time : ${String(waitTimeMs)}`, timeStop - timeStart, "-");
REPORTER. writeValuesTableEntry(act, `WaitMax(${waitTimeMs}) : ${description}`, itemText, matchValue, timeStop - timeStart);
}



const readValueWaitFromElementRange = async (client, element, lowerValue, higherValue, description, waitTimeMs) => {
var timeStart = (new Date()).getTime();
var waitDivides = parseInt(waitTimeMs/200);
var itemText = "";
for(var i = 0 ; i < waitDivides; i ++){
  try{
    itemText = parseFloat(fixString(await element.getText()));
    if((itemText) <= (higherValue) || (lowerValue) <= (itemText)){
      break;
    }
  }catch(exception){

  }
  await sleep(200);
}
if(String(itemText) == "NaN" || itemText == ""){
  itemText = await element.getText();
}
var timeStop = (new Date()).getTime();
var act = await client.getCurrentActivity();
var itemId = (await element.getAttribute("resourceId"));
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), itemId, "ReadRangeWait", `Time : ${String(waitTimeMs)}`, timeStop - timeStart, "-");
REPORTER.writeReadValuesRangeLog(act, `WaitMax(${waitTimeMs}) : ${description}`, itemText, lowerValue, higherValue, timeStop - timeStart);
}


const readValueFromElementMatch = async (client, element, matchValue, description) => {
var timeStart = (new Date()).getTime();
var itemText = (await element.getText());
var timeStop = (new Date()).getTime();
var act = await client.getCurrentActivity();
var itemId = (await element.getAttribute("resourceId"));
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), itemId, "ReadValue", '', timeStop - timeStart, "-");
REPORTER. writeValuesTableEntry(act, description, itemText, matchValue, timeStop - timeStart);
//  writeValuesTableEntry = (activity, description, valueRead, expectedValue, msTime)
}

const readValueFromElementRange = async (client, element, lowerValue, higherValue, description) => {
var itemText = parseFloat(fixString(await element.getText()));
// await client.getCurrentActivity() 
// writeReadValuesRangeLog = (activity, description, valueRead, expectedValueLower, expectedValueHigher, msTime)
var timeStart = (new Date()).getTime();
var itemText = (await element.getText());
var timeStop = (new Date()).getTime();
var act = await client.getCurrentActivity();
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), itemId, "ReadValue", '', timeStop - timeStart, "-");
REPORTER.writeReadValuesRangeLog(act, description, itemText, lowerValue, higherValue, timeStop - timeStart);

}

const setValueEditText = async (client, element, value) => {
var timeStart = (new Date()).getTime();
await element.setValue(value);
var timeStop = (new Date()).getTime();
var id = "No ID";
var issue = "-";
try{
  id = await element.getAttribute("resourceId")
}catch(e){
  issue = "No ID found for element.";
}
var clientAct = await client.getCurrentActivity();
REPORTER.writeExecutionTableEntry(clientAct, id, "setValue", value, timeStop - timeStart, issue);
}

const findElementByIndex = async (client, className, index) => {
var timeStart = (new Date()).getTime();
const items = await client.$$(className);
var timeStop = (new Date()).getTime();
REPORTER.writeExecutionTableEntry(await client.getCurrentActivity(), `@ALL/${className}`, "Find", `Found ${items.length} items.`, timeStop - timeStart, "-");
return items[index];
}

readAutomationFile = (automationFilePath) => {
var obj = JSON.parse(fs.readFileSync(automationFilePath, 'utf8'));
var keys = Object.keys(obj);
console.log("mission name "+obj.mission_name);        
console.log("Keys "+keys);
return {
    "keys":keys,
    "object":obj
}
}

main();
