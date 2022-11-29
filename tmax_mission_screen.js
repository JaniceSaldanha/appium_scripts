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

  await waitForActivity(client);

  /****************************** Mission Creation *********************/

//To check if the user can view the FAB button
var timeStart = (new Date()).getTime();
const fab_button_view = await findItemById(client,"android.widget.ImageButton","fab_create")
var timeEnd = (new Date()).getTime();

if(fab_button_view !== null){
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Mission:To check if the user can view the FAB button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("TMax","Mission:To check if the user can view the FAB button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }


//To check if the user can click on the FAB button
var timeStart = (new Date()).getTime();
const fab_button_click= await findItemById(client,"android.widget.ImageButton","fab_create")
await fab_button_click.click()

var timeEnd = (new Date()).getTime();

if(fab_button_click !== null){
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Mission:To check if the user can click on the FAB button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("TMax","Mission:To check if the user can click on the FAB button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }


  //To check if the user can view mission icon in the fab list
  var timeStart = (new Date()).getTime();
  const mission_button_view= await findItemById(client,"android.widget.ImageView","fab_create_mission")
 
  var timeEnd = (new Date()).getTime();
  
  if(mission_button_view !== null){
    total_testcases++;
    pass_testcases++;
    testcase_name("TMax","Mission:To check if the user can view mission icon in the fab list","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.yellow("Pass"))
    } else{
      total_testcases++;
      fail_testcases++;
        testcase_name("TMax","Mission:To check if the user can view mission icon in the fab list","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
        console.log(colors.red("Fail"))
    }
  
 
  //To check if the user can click on mission icon in the fab list
  var timeStart = (new Date()).getTime();
  const mission_button_click= await findItemById(client,"android.widget.ImageView","fab_create_mission")
  await mission_button_click.click()
  await waitForActivity(client)
  var timeEnd = (new Date()).getTime();
  
  if(mission_button_click !== null){
    total_testcases++;
    pass_testcases++;
    testcase_name("TMax","Mission:To check if the user can click on mission icon in the fab list","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.yellow("Pass"))
    } else{
      total_testcases++;
      fail_testcases++;
        testcase_name("TMax","Mission:To check if the user can click on mission icon in the fab list","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
        console.log(colors.red("Fail"))
    }
  

//To check if user can view the mission screen
var timeStart = (new Date()).getTime();
const element_on_mission_screen= await findItemById(client,"android.widget.RelativeLayout","rl_orient_map")
var timeEnd = (new Date()).getTime();

if(element_on_mission_screen !== null){
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Mission:To check if user can view the mission screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("TMax","Mission:To check if user can view the mission screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }


//To check if the user can click on Compass icon multiple times
var timeStart = (new Date()).getTime();
for(var ci=0;ci<obj.compass_icon_multiple_clicks;ci++)
{
const compass_icon= await findItemById(client,"android.widget.RelativeLayout","rl_orient_map")
await compass_icon.click()
}
var timeEnd = (new Date()).getTime();
const compass_icon1= await findItemById(client,"android.widget.RelativeLayout","rl_orient_map") 

if(compass_icon1 !== null){
total_testcases++;
pass_testcases++;
testcase_name("TMax","Mission:To check if the user can click on Compass icon multiple times","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
console.log(colors.yellow("Pass"))
} else{
  total_testcases++;
  fail_testcases++;
    testcase_name("TMax","Mission:To check if the user can click on Compass icon multiple times","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.red("Fail"))
}

  
//To check if the user can click on the Robot icon multiple times
var timeStart = (new Date()).getTime();
for(var ri=0;ri<obj.robot_icon_multiple_clicks;ri++)
{
const robot_icon= await findItemById(client,"android.widget.RelativeLayout","rl_follow_robot")
await robot_icon.click()
}
var timeEnd = (new Date()).getTime();
const robot_icon1= await findItemById(client,"android.widget.RelativeLayout","rl_follow_robot") 

if(robot_icon1 !== null){
total_testcases++;
pass_testcases++;
testcase_name("TMax","Mission:To check if the user can click on the Robot icon multiple times","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
console.log(colors.yellow("Pass"))
} else{
  total_testcases++;
  fail_testcases++;
    testcase_name("TMax","Mission:To check if the user can click on the Robot icon multiple times","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.red("Fail"))
}
  
  
  
  
  
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
