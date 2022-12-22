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

  await waitForActivity(client);
//To check if the user can click on the FAB button
var timeStart = (new Date()).getTime();
const fab_button_click= await findItemById(client,"android.widget.ImageButton","fab_create")
await fab_button_click.click()

var timeEnd = (new Date()).getTime();

//To check if the user can click on mission icon in the fab list
var timeStart = (new Date()).getTime();
const mission_button_click= await findItemById(client,"android.widget.ImageView","fab_create_mission")
await mission_button_click.click()
await waitForActivity(client)
var timeEnd = (new Date()).getTime();



//To check if user can click on the Edit icon near set field
var timeStart = (new Date()).getTime();
await sleep(5000)
  const edit_field_name_click= await findItemById(client,"android.widget.ImageView","imv_field_edit")
  await edit_field_name_click.click()
  var timeEnd = (new Date()).getTime();
  
   //To check if user can click on Create new field
   var timeStart = (new Date()).getTime();
   const click_create_new_field= await findItemById(client,"android.widget.TextView","tv_create_new")
   await click_create_new_field.click()
   var timeEnd = (new Date()).getTime();

   var timeStart = (new Date()).getTime();
 const valid_field_name= await findItemById(client,"android.widget.EditText","et_create_new")
 await setValueEditText(client,valid_field_name,obj.field_name)
 console.log(colors.red("Click on Assign"))
 const assign4= await findItemById(client,"android.widget.TextView","tv_assign_field")
 await assign4.click()
 var timeEnd = (new Date()).getTime();

 //To check if user can click on the Edit icon near Set Waypoint Path Name
var timeStart = (new Date()).getTime();
await sleep(5000)
  const edit_wpt_name_click= await findItemById(client,"android.widget.ImageView","imv_gps_map_edit")
  await edit_wpt_name_click.click()
  var timeEnd = (new Date()).getTime();

  //To check if user can click on create new Waypoint Path
  var timeStart = (new Date()).getTime();
  const click_create_new_wpt= await findItemById(client,"android.widget.TextView","tv_create_new")
  await click_create_new_wpt.click()
  var timeEnd = (new Date()).getTime();

  var timeStart = (new Date()).getTime();
const valid_wpt_name= await findItemById(client,"android.widget.EditText","et_create_new")
await setValueEditText(client,valid_wpt_name,obj.wpt_name)
console.log(colors.red("Click on Assign"))
const assign_4= await findItemById(client,"android.widget.TextView","tv_assign_field")
await assign_4.click()
var timeEnd = (new Date()).getTime();


//To check if user can click on robot settings icon
var timeStart = (new Date()).getTime();
console.log(colors.red("Robot Settings icon"))
var robot_settings_icon1 = await findItemById(client,"android.widget.ImageView","iv_settings")
await clickItem(client,robot_settings_icon1);
var timeEnd = (new Date()).getTime();

var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Forward Drive speed"))
var forward_drive = await findItemById(client,"android.widget.SeekBar","slider_forward_drive")
await holdTouchByPercentage(client,forward_drive,50,20,5)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Turning speed"))
var turning_speed = await findItemById(client,"android.widget.SeekBar","slider_turning_drive")
await holdTouchByPercentage(client,turning_speed,50,20,5)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

var timeStart = (new Date()).getTime();
console.log("Click on X button")
var close_robot_setting = await findItemById(client,"android.widget.ImageView","iv_close_settings2")
await close_robot_setting.click()
var timeEnd = (new Date()).getTime();


//To check if RTK value is displayed to create a waypoint mission
var timeStart = (new Date()).getTime();
await sleep(5000) //waiting for rtk value to appear
const check_gps_value= await findItemById(client,"android.widget.TextView","tv_gps")
const convert_gps_text= await check_gps_value.getText()
console.log(colors.red(convert_gps_text))
var timeEnd = (new Date()).getTime();

if(convert_gps_text !== "--")
{
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Mission:To check if Gps RTK value is visible on the screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  }
  else
  {
  total_testcases++;
  fail_testcases++;
  testcase_name("TMax","Mission:To check if Gps RTK value is visible on the screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.red("Fail"))
  }


//To check if user can view Add Data point
var timeStart = (new Date()).getTime();
const add_data_point_view= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
var timeEnd = (new Date()).getTime();

if(add_data_point_view !== null)
{
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Mission:To check if user can view Add Data point","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  }
  else
  {
  total_testcases++;
  fail_testcases++;
  testcase_name("TMax","Mission:To check if user can view Add Data point","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.red("Fail"))
  }
  
//To check if user can click on Add data point
var timeStart = (new Date()).getTime();
const add_data_point_click= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
var timeEnd = (new Date()).getTime();

if(add_data_point_click !== null)
{
await add_data_point_click.click()
await sleep(10000)
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Mission:To check if user can click Add Data point","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  }
  else
  {
  total_testcases++;
  fail_testcases++;
  testcase_name("TMax","Mission:To check if user can click Add Data point","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.red("Fail"))
  }
  
  
//To check if user can view the waypoint plot position screen
var timeStart = (new Date()).getTime();
const check_waypoint_plot= await findItemByName(client,"android.widget.TextView","Waypoint in plot position") 
var timeEnd = (new Date()).getTime();

if(check_waypoint_plot !== null)
{
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Mission:To check if user can view the waypoint plot position screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  }
  else
  {
  total_testcases++;
  fail_testcases++;
  testcase_name("TMax","Mission:To check if user can view the waypoint plot position screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.red("Fail"))
  }

  if(convert_gps_text !== "--")   //if there is no rtk value user cannot create a waypoint map. Hence checking that condition here
  {
//To check if user can create a gps path for the waypoint mission and save the mission
var timeStart = (new Date()).getTime();
const column_block = await findItemById(client,"android.widget.ImageView","selected_display")
await column_block.click()
await waitForActivity(client)


//Select column value
const column_value= await findItemByName(client,"android.widget.TextView",obj.column1)
console.log(column_value)
await column_value.click()
await waitForActivity(client)

//Click on Save to save start range column value
const save_1= await findItemByName(client,"android.widget.TextView","SAVE")
await save_1.click()
await waitForActivity(client)


//Creating objects for left and right joysticks
const driveActivity_leftJoystick1 = await findItemById(client, "android.widget.ImageView", "left_joystick_image");
const driveActivity_rightJoystick1 = await findItemById(client, "android.widget.ImageView", "joystick_right_imv");

await moveElementByPercentage(client, driveActivity_leftJoystick1, 70, 70, 70, 10, 6000); // move robot forward
await sleep(2000)

//Click on add data point to add the end range and column for the first collection
const add_data_point_click1= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
await add_data_point_click1.click()
await sleep(10000)

//Save the end range and column value for the first column
const save_2= await findItemByName(client,"android.widget.TextView","SAVE")
await save_2.click()
await waitForActivity(client)

//This is to move the robot to the 2nd column before we start recording the 2nd collection
await moveElementByPercentage(client, driveActivity_rightJoystick1, 50, 50, 90, 50,4600);//Move robot right
await sleep(2000)
await moveElementByPercentage(client, driveActivity_leftJoystick1, 70, 70, 70, 10,3000); //again move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick1, 50, 50, 90, 50,4900); //make robot straight
await sleep(2000)

//Click on Add data point icon to add the start range and column for the 2nd collection
const add_data_point_click2= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
await add_data_point_click2.click()
await sleep(10000)

//Click on Column block to select the start column value for the 2nd collection
const column_block__ = await findItemById(client,"android.widget.ImageView","selected_display")
await column_block__.click()
await waitForActivity(client)

//Select column value from the drop-down list
const column_value2= await findItemByName(client,"android.widget.TextView",obj.column2)
await column_value2.click()
await waitForActivity(client)

//Click on Save to save the range column value
const save_3= await findItemByName(client,"android.widget.TextView","SAVE")
await waitForActivity(client)
await save_3.click()
await waitForActivity(client)

//Record the 2nd collection
await moveElementByPercentage(client, driveActivity_leftJoystick1, 70, 70, 70, 10, 6000); //Move robot forward
await sleep(2000)

//Click on Add data point to add the end range column value for the 2nd collection
const add_data_point_click3= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
await add_data_point_click3.click()
await sleep(10000)

//Click on Save to save the end range and column value
const save_4= await findItemByName(client,"android.widget.TextView","SAVE")
await save_4.click()

//This is to move the robot to the 3rd column before we start recording the 3rd collection
await moveElementByPercentage(client, driveActivity_rightJoystick1, 50, 50, 10,50,4600); //Move robot to left
await sleep(2000) 
await moveElementByPercentage(client, driveActivity_leftJoystick1, 70, 70, 70, 10,3000); //again move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick1, 50, 50, 10, 50,4900) //make robot straight
await sleep(2000)

const add_data_point_clickk2= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
await add_data_point_clickk2.click()
await sleep(10000)

//Click on Column block to select the start column value for the 3rd collection
const columnn_block_ = await findItemById(client,"android.widget.ImageView","selected_display")
await columnn_block_.click()

//Select column value from the drop-down list
const column_value3= await findItemByName(client,"android.widget.TextView",obj.column3)
await column_value3.click()
await waitForActivity(client)

//Click on Save to save the range column value
const save_5= await findItemByName(client,"android.widget.TextView","SAVE")
await waitForActivity(client)
await save_5.click()
await waitForActivity(client)

//Record the 3rd collection
await moveElementByPercentage(client, driveActivity_leftJoystick1, 70, 70, 70, 10, 6000); //Move robot forward
await sleep(2000)

//Click on Add data point to add the end range column value for the 3rd collection
const add_data_point_click4= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
await add_data_point_click4.click()
await sleep(10000)

//Click on Save to save the end range and column value
const save_6= await findItemByName(client,"android.widget.TextView","SAVE")
await save_6.click()

//This is to move the robot to the 4th column before we start recording the 4th collection
await moveElementByPercentage(client, driveActivity_rightJoystick1, 50, 50, 90, 50,4600);//Move robot right
await sleep(2000)
await moveElementByPercentage(client, driveActivity_leftJoystick1, 70, 70, 70, 10, 1500); //again move robot forward
await sleep(2000)
await moveElementByPercentage(client, driveActivity_rightJoystick1, 50, 50, 90, 50,4900); //make robot straight
await sleep(2000)

const add_data_point_clickk= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
await add_data_point_clickk.click()
await sleep(10000)

//Click on Column block to select the start column value for the 4th collection
const column_blockk_ = await findItemById(client,"android.widget.ImageView","selected_display")
await column_blockk_.click()

//Select column value from the drop-down list
const column_value4= await findItemByName(client,"android.widget.TextView",obj.column4)
await column_value4.click()
await waitForActivity(client)

//Click on Save to save the range column value
await waitForActivity(client)
const save_7= await findItemByName(client,"android.widget.TextView","SAVE")
await waitForActivity(client)
await save_7.click()

//Record the 4th collection
await moveElementByPercentage(client, driveActivity_leftJoystick1, 70, 70, 70, 10, 6000); //Move robot forward
await sleep(2000) 

//Click on Add data point to add the end range column value for the 3rd collection
const add_data_point_click5= await findItemById(client,"android.widget.ImageView","imv_add_point_icon")
await add_data_point_click5.click()
await sleep(10000)

//Click on Save to save the end range and column value
const save_8= await findItemByName(client,"android.widget.TextView","SAVE")
await save_8.click()

//Click on Save to save the gps waypoint mission
const save_mission= await findItemById(client,"android.widget.TextView","tv_start_button")
await save_mission.click()
var timeEnd = (new Date()).getTime();

if(save_mission !== null)
{

  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Mission:To check if user can create a gps path and save the waypoint mission","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  }
  else
  {
  total_testcases++;
  fail_testcases++;
  testcase_name("TMax","Mission:To check if user can create a gps path and save the waypoint mission","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.red("Fail"))
  }

}//end of rtk check if loop
else{
  total_testcases++;
  fail_testcases++;
  testcase_name("TMax","Mission:To check if user can create a gps path and save the waypoint mission","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.red("Fail"))

  client.back()
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
