const driver = require("webdriverio"); //webdriverio
const assert = require("assert");
const keycode = require('keycode');
const sleep = require('sleep-promise');
const colors = require('colors');
// const params = require('minimist')(process.argv.slice(2));
const Reporter = require('./testreport.js');
const REPORTER = new Reporter('./', 'Drive Screen', `./Configuration2.json`);
//const Database1 = require('./database_connection.js'); 
//const DATABASE = new Database1() 
const fs = require('fs');
const { default: click } = require("webdriverio/build/commands/element/click");
const { default: waitUntil } = require("webdriverio/build/commands/browser/waitUntil");
const { now } = require("moment");



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

  await client.setImplicitTimeout(1000);

  await waitForActivity(client);

  //To check if user can view Drive icon on the main screen
var timeStart = (new Date()).getTime();
const check_drive_icon = await findItemById(client,"android.widget.TextView","tv_drive")

var timeEnd = (new Date()).getTime();

if(check_drive_icon !== null){
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Drive:To check if user can view the drive icon on the main screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("TMax","Drive:To check if user can view the drive icon on the main screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }



//To check if user can click on Drive icon on the main screen
var timeStart = (new Date()).getTime();
const check_drive_icon_click = await findItemById(client,"android.widget.TextView","tv_drive")
await clickItem(client,check_drive_icon_click)
var timeEnd = (new Date()).getTime();

if(check_drive_icon_click !== null){
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Drive:To check if user can click on the drive icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("TMax","Drive:To check if user can click on the drive icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }

  await waitForActivity(client)

 
  //To check if the Drive Screen appears on clicking on the Drive icon
  var timeStart = (new Date()).getTime();
const drive_screen_confirm= await findItemByName(client,"android.widget.TextView","STREAM")
var timeEnd = (new Date()).getTime();

if(drive_screen_confirm !== null){
  total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Drive:To check if the Drive Screen appears on clicking on the Drive icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("TMax","Drive:To check if the Drive Screen appears on clicking on the Drive icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }

  /***************************ROBOT SETTINGS SCREEN************************/

//To check if user can view robot settings icon
var timeStart = (new Date()).getTime();
console.log(colors.red("Robot Settings icon"))
var robot_settings_icon = await findItemById(client,"android.widget.ImageView","iv_settings")
var timeEnd = (new Date()).getTime();


if(robot_settings_icon !== null){
    total_testcases++;
    pass_testcases++;
    testcase_name("TMax","Drive:To check if user can view Robot settings icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.yellow("Pass"))
    } else{
      total_testcases++;
      fail_testcases++;
        testcase_name("TMax","Drive:To check if user can view Robot settings icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
        console.log(colors.red("Fail"))
    }

    
//To check if user can click on robot settings icon
var timeStart = (new Date()).getTime();
console.log(colors.red("Robot Settings icon"))
var robot_settings_icon1 = await findItemById(client,"android.widget.ImageView","iv_settings")
await clickItem(client,robot_settings_icon1);
var timeEnd = (new Date()).getTime();


if(robot_settings_icon1 !== null){
    total_testcases++;
    pass_testcases++;
    testcase_name("TMax","Drive:To check if user can click on Robot settings icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.yellow("Pass"))
    } else{
      total_testcases++;
      fail_testcases++;
        testcase_name("TMax","Drive:To check if user can click Robot settings icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
        console.log(colors.red("Fail"))
    }


    //To check if user can view the robot settings screen
    var timeStart = (new Date()).getTime();
    console.log(colors.red("Robot Settings screen"))
    var robot_settings_text = await findItemByName(client,"android.widget.TextView","Robot Settings")
    var timeEnd = (new Date()).getTime();


    if(robot_settings_text !== null){
    total_testcases++;
    pass_testcases++;
    testcase_name("TMax","Drive:To check if user can view the robot settings screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.yellow("Pass"))
    } else{
      total_testcases++;
      fail_testcases++;
        testcase_name("TMax","Drive:To check if user can view the robot settings screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
        console.log(colors.red("Fail"))
    }


    //To check if the robot settings screen contains Drive and Autonomy tab
    var timeStart = (new Date()).getTime();
    console.log(colors.red("Check if user can view Drive and Autonomy tab"))
    var drive_tab = await findItemById(client,"android.widget.TextView","tv_drive_settings_text")
    var timeEnd = (new Date()).getTime();


    if(drive_tab !== null){
    total_testcases++;
    pass_testcases++;
    testcase_name("TMax","Drive:To check if user can view the Drive tab","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.yellow("Pass"))
    } else{
      total_testcases++;
      fail_testcases++;
        testcase_name("TMax","Drive:To check if user can view the Drive tab","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
        console.log(colors.red("Fail"))
    }  


    //To check if user can click on the Drive settings screen
    var timeStart = (new Date()).getTime();
    console.log(colors.red("Check if user can view Drive and Autonomy tab"))
    var drive_tab_click = await findItemById(client,"android.widget.TextView","tv_drive_settings_text")
    await clickItem(client,drive_tab_click)
    var timeEnd = (new Date()).getTime();


    if(drive_tab_click !== null){
    total_testcases++;
    pass_testcases++;
    testcase_name("TMax","Drive:To check if user can click on Drive Settings","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.yellow("Pass"))
    } else{
      total_testcases++;
      fail_testcases++;
        testcase_name("TMax","Drive:To check if user can click on Drive Settings","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
        console.log(colors.red("Fail"))
    }  


//To check if user can set forward Drive speed
var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Forward Drive speed"))
var forward_drive = await findItemById(client,"android.widget.SeekBar","slider_forward_drive")
await holdTouchByPercentage(client,forward_drive,50,20,5)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

if(forward_drive !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("TMax","Drive Settings:To check if user can edit Forward Drive Speed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("TMax","Drive Settings:To check if user can edit Forward Drive Speed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }

//Adjust Turning speed
var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Turning speed"))
var turning_speed = await findItemById(client,"android.widget.SeekBar","slider_turning_drive")
await holdTouchByPercentage(client,turning_speed,50,20,5)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

if(turning_speed !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("TMax","Drive Settings:To check if user can edit Turning Speed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("TMax","Drive Settings:To check if user can edit Turning Speed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


 //To check if user can view Autonomy tab
 var timeStart = (new Date()).getTime();
 console.log("Move to Autonomy Tab")
 const autonomy = await findItemById(client,"android.view.ViewGroup","container_autonomy_speeds")
 var timeEnd = (new Date()).getTime();

 if(autonomy !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("TMax","Drive Settings:To check if user view Autonomy tab","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("TMax","Drive Settings:To check if user view Autonomy tab","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


 //To check if user can click on Autonomy Tab
 var timeStart = (new Date()).getTime();
 console.log("Move to Autonomy Tab")
 const autonomy1 = await findItemById(client,"android.view.ViewGroup","container_autonomy_speeds")
 await clickItem(client,autonomy1)
 var timeEnd = (new Date()).getTime();

 if(autonomy1 !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("TMax","Drive Settings:To check if user can click on Autonomy Tab","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("TMax","Drive Settings:To check if user can click on Autonomy Tab","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


//To check if user can edit cruise control and Waypoint Autonomy following
var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Cruise Control speed"))
var cruise_control = await findItemById(client,"android.widget.SeekBar","slider_cruise_drive")
await holdTouchByPercentage(client,cruise_control,50,50,5)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

if(cruise_control !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("TMax","Drive Settings:To check if user can edit Cruise Control Speed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("TMax","Drive Settings:To check if user can edit Cruise Control Speed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Row follow Speed"))
var rowfollow_speed = await findItemById(client,"android.widget.SeekBar","slider_waypoint_settings_drive")
await holdTouchByPercentage(client,rowfollow_speed,50,50,5)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

if(rowfollow_speed !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("TMax","Drive Settings:To check if user can edit RowFollow Speed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("TMax","Drive Settings:To check if user can edit RowFollow Speed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


 //To check if user can exit Robot Settings Screen by clicking on X button
var timeStart = (new Date()).getTime();
console.log("Click on X button")
var close_robot_setting = await findItemById(client,"android.widget.ImageView","iv_close_settings2")
await close_robot_setting.click()
var timeEnd = (new Date()).getTime();

var check_for_record_button= await findItemById(client,"android.view.ViewGroup","cl_record_button")// Looking out for an element on drive screen to confirm the exit of Robot Settings Screen

if(check_for_record_button !== null)
{total_testcases++;
 pass_testcases++;
   console.log(colors.yellow("Pass"))
   testcase_name("TMax","Drive Settings:To check if user can exit Robot Settings Screen by clicking on X button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
   await waitForActivity(client)
}
else
{total_testcases++;
 fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("TMax","Drive Settings:To check if user can exit Robot Settings Screen by clicking on X button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}

//To check if user can click on Drive icon and exit the screen multiple times
var timeStart = (new Date()).getTime();
console.log(colors.red("Robot Settings icon"))
var robot_settings_test = await findItemById(client,"android.widget.ImageView","iv_settings")

console.log("Click on X button")

for(var rs=0;rs<obj.close_settings_screen;rs++)
{
    await robot_settings_test.click()
    await waitForActivity(client) 
var close_robot_setting_test =await findItemById(client,"android.widget.ImageView","iv_close_settings2")
    await close_robot_setting_test.click()
    await waitForActivity(client)
}
var timeEnd = (new Date()).getTime();

var check_for_record_button_1=await findItemById(client,"android.view.ViewGroup","cl_record_button")// Looking out for an element on drive screen to confirm the exit of Robot Settings Screen

if(check_for_record_button_1 !== null)
{total_testcases++;
 pass_testcases++;
   console.log(colors.yellow("Pass"))
   testcase_name("TMax","Drive Settings:To check if user can click on Robot Settings icon and exit the screen multiple times","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
   await waitForActivity(client)
}
else
{total_testcases++;
 fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("TMax","Drive Settings:To check if user can click on Robot Settings icon and exit the screen multiple times","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}


//To check if user can turn cruise mode on and off
var timeStart = (new Date()).getTime();
console.log(colors.red("Swipe Cruise mode"))
var cruise_control_switch=await findItemById(client,"android.widget.Switch","sc_cruise_control")
await cruise_control_switch.click()
await holdTouchByPercentage(client,cruise_control_switch,20,30,10000)
var timeEnd = (new Date()).getTime();

if(cruise_control_switch !== null)
{total_testcases++;
  pass_testcases++;
  testcase_name("TMax","Drive:To check if user can turn cruise mode on and off","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("TMax","Drive:To check if user can turn cruise mode on and off","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }

  var timeStart = (new Date()).getTime();
console.log(colors.red("Move robot backward"))
const driveActivity_leftJoystick_move = await findItemById(client, "android.widget.ImageView", "left_joystick_image")
const driveActivity_rightJoystick_move = await findItemById(client, "android.widget.ImageView", "joystick_right_imv");
var timeStart = (new Date()).getTime();
//testcase_name(`<h4>`+"Check if the robot can move backward "+`<h4>`)
await moveElementByPercentage(client, driveActivity_leftJoystick_move, 70, 70, 70, 90, 60000); //backward
var timeEnd = (new Date()).getTime();

if(driveActivity_leftJoystick_move !== null){
testcase_name("TMax","Drive:To check if user can move the robot backward","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
total_testcases++;
pass_testcases++;
}else{
  total_testcases++;
  fail_testcases++;
         testcase_name("TMax","Drive:To check if user can move the robot backward","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}
         console.log(colors.red("Move robot forward"))
await moveElementByPercentage(client, driveActivity_leftJoystick_move, 70, 70, 70, 10, 13000);
var timeEnd = (new Date()).getTime();

if(driveActivity_leftJoystick_move !== null)
{total_testcases++;
  pass_testcases++;
testcase_name("TMax","Drive:To check if user can move the robot forward","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
        }        else{
         testcase_name("TMax","Drive:To check if user can move the robot forward","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
         total_testcases++;
         fail_testcases++;
        }

//testcase_name(`<h4>`+"Check if the robot can move left "+`<h4>`)
var timeStart = (new Date()).getTime();
console.log(colors.red("Move robot left"))
await moveElementByPercentage(client, driveActivity_rightJoystick_move, 50, 50, 10, 50, 15000); 
var timeEnd = (new Date()).getTime();

if(driveActivity_rightJoystick_move !== null)
{total_testcases++;
  pass_testcases++;
testcase_name("TMax","Drive:To check if user can move the robot left","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
        }        else{
          total_testcases++;
          fail_testcases++;
          testcase_name("TMax","Drive:To check if user can move the robot left","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
        }
//testcase_name(`<h4>`+"Check if the robot can move right"+`<h4>`)
var timeStart = (new Date()).getTime();
console.log(colors.red("Move robot right"))
await moveElementByPercentage(client, driveActivity_rightJoystick_move, 50, 50, 90, 50, 25000);
var timeEnd = (new Date()).getTime();

if(driveActivity_rightJoystick_move !== null){
testcase_name("TMax","Drive:To check if user can move the robot right","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
total_testcases++;
pass_testcases++;
}else{
  total_testcases++;
  fail_testcases++;
  testcase_name("TMax","Drive:To check if user can move the robot right","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
}

//testcase_name(`<h4>`+"Check if the robot can move ZRT"+`<h4>`)
var timeStart = (new Date()).getTime();
console.log(colors.red("Move robot ZRT"))
await moveElementByPercentage(client, driveActivity_rightJoystick_move , 50, 50, 90, 50, 70000);
var timeEnd = (new Date()).getTime();

if(driveActivity_rightJoystick_move !== null)
{
  total_testcases++;
  pass_testcases++;
testcase_name("TMax","Drive:To check if user can move the robot in ZRT","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
        }        else
        {
          total_testcases++;
          fail_testcases++;
         testcase_name("TMax","Drive:To check if user can move the robot in ZRT","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
        }


//To check if user can click on record to record a collection
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Record button"))
var record_button = await findItemById(client," android.view.ViewGroup","cl_record_button")
await clickItem(client,record_button)
var timeEnd = (new Date()).getTime();
await sleep(1000)

if(record_button !== null)
{total_testcases++;
  pass_testcases++;
  console.log("Pass")
  testcase_name("TMax","Drive:To check if user can click on record to record a collection","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{total_testcases++;
  fail_testcases++;
  console.log("Fail")
  testcase_name("TMax","Drive:To check if user can click on record to record a collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

}

await sleep(8000) //Wait for a couple of seconds to check if recording begins 

var start_recording= await findItemByName(client,"android.widget.TextView","Starting...")

if(start_recording == null)
{
  total_testcases++;
  pass_testcases++; 
  testcase_name("TMax","Drive:To check if recording has begun","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 


console.log(colors.red("Move robot backward"))
const driveActivity_leftJoystick_move1 = await findItemById(client, "android.widget.ImageView", "left_joystick_image")
const driveActivity_rightJoystick_move1 = await findItemById(client, "android.widget.ImageView", "joystick_right_imv");

//testcase_name(`<h4>`+"Check if the robot can move backward "+`<h4>`)
for(var run=0;run<obj.move_robot_while_recording; run++)
{
await moveElementByPercentage(client, driveActivity_leftJoystick_move1, 70, 70, 70, 90, 50000); //backward

console.log(colors.red("Move robot forward"))
await moveElementByPercentage(client, driveActivity_leftJoystick_move1, 70, 70, 70, 10, 13000);
}

//To check if user can click on stop recording
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Record button to stop recording"))
var record_button_stop = await findItemById(client," android.view.ViewGroup","cl_record_button")
await clickItem(client,record_button_stop)
var timeEnd = (new Date()).getTime();
await sleep(30000)

if(record_button_stop !== null)
{total_testcases++;
  pass_testcases++;
  console.log("Pass")
  testcase_name("TMax","Drive:To check if user can click on record to stop recording a collection","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{ total_testcases++;
  fail_testcases++; 
  testcase_name("TMax","Drive:To check if user can click on record to stop recording a collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  console.log("Fail")
}


//To check if user can click on start to start row-follow
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on start button to start row-follow"))
await waitForActivity(client)
var start_button_rf = await findItemById(client," android.view.ViewGroup","cl_start_button")
await start_button_rf.click()
console.log(colors.red("Click on Okay button"))
//var okay_button = await findItemById(client,"android.widget.Button","alert_box_button")
//await okay_button.click()
var timeEnd = (new Date()).getTime();


if(start_button_rf !== null)
{total_testcases++;
  pass_testcases++;
  console.log("Pass")
  testcase_name("TMax","Drive:To check if user can click on record to start recording row-follow collection","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{ total_testcases++;
  fail_testcases++; 
  testcase_name("TMax","Drive:To check if user can click on record to start recording row-follow collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  console.log("Fail")
}

//To check if user can stop recording after 20 seconds
var timeStart = (new Date()).getTime();
console.log("Record for 20 seconds")
await holdTouchByPercentage(client,start_button_rf,10,20,40000)
var stop_button_rf = await findItemById(client," android.view.ViewGroup","cl_start_button")
var timeEnd = (new Date()).getTime();

await sleep(30000)

if(stop_button_rf !== null)
{total_testcases++;
  pass_testcases++;
  console.log("Pass")
  testcase_name("TMax","Drive:To check if user can stop recording row-follow collection","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{ total_testcases++;
  fail_testcases++; 
  testcase_name("TMax","Drive:To check if user can stop recording row-follow collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  console.log("Fail")
}

}
 else  //If recording doesn't begin
 {
          total_testcases++;
          fail_testcases++; 
          testcase_name("TMax","Drive:To check if recording has begun","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

          total_testcases++;
          fail_testcases++; 
          testcase_name("TMax","Drive:To check if user can stop recording a collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 


          total_testcases++;
          fail_testcases++; 
          testcase_name("TMax","Drive:To check if user can start recording a row-follow collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

          total_testcases++;
          fail_testcases++; 
          testcase_name("TMax","Drive:To check if user can stop recording a row-follow collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

 }


 //To check if user can toggle and untoggle camera video streaming
 var timeStart = (new Date()).getTime();
 var cam_streaming= await findItemById(client,"android.widget.Switch","sc_stream")
await cam_streaming.click()
await sleep(5000)
await cam_streaming.click()
 var timeEnd = (new Date()).getTime();

 if(cam_streaming !== null)
{total_testcases++;
  pass_testcases++;
  console.log("Pass")
  testcase_name("TMax","Drive:To check if user can toggle and untoggle camera video streaming","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{ total_testcases++;
  fail_testcases++; 
  testcase_name("TMax","Drive:To check if user can toggle and untoggle camera video streaming","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  console.log("Fail")
}
client.back()


//To check if user can launch Drive screen and exit it multiple times
var timeStart = (new Date()).getTime();
var launch_drive_screen_multiple_times = await findItemById(client,"android.widget.TextView","tv_drive")
for(var ds= 0; ds<obj.launch_drive_screen; ds++)
{
await launch_drive_screen_multiple_times.click()
await waitForActivity(client)
 await sleep(5000)
 client.back()
 await sleep(5000)
}
var timeEnd = (new Date()).getTime(); 


const ds_icon= await findItemById(client,"android.widget.TextView","tv_drive")

if(ds_icon !== null){
total_testcases++;
pass_testcases++;
testcase_name("TMax","Drive:To check if user can launch Drive screen and exit it multiple times","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
console.log(colors.yellow("Pass"))
} else{
  total_testcases++;
  fail_testcases++;
    testcase_name("TMax","Drive:To check if user can launch Drive screen and exit it multiple times","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.red("Fail"))
}




result_table(total_testcases,pass_testcases,fail_testcases)


  var script_name= "Drive Screen"
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


const result_table=(total_testcases,pass_testcases,fail_testcases) =>
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
