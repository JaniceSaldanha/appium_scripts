const driver = require("webdriverio"); //webdriverio
const assert = require("assert");
const keycode = require('keycode');
const sleep = require('sleep-promise');
const colors = require('colors');
// const params = require('minimist')(process.argv.slice(2));
const Reporter = require('./testreport.js');
const REPORTER = new Reporter('./', 'Drive Screen', `./Configuration1.json`);
const fs = require('fs');
const { default: click } = require("webdriverio/build/commands/element/click");
const { default: waitUntil } = require("webdriverio/build/commands/browser/waitUntil");


// Lenovo TB-8504F
// adbexectimeout: 20000,

const opts = {
  path: '/wd/hub',
  port: 5736,  
  capabilities: {
    platformName: "Android",
    platformVersion: "10",
    deviceName: "HA1AMGE8",
    appPackage: "com.example.ccroperatorandroid",
    appActivity: "com.example.ccroperatorandroid.features.new_designs.MainActivityNd",
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
  var obj = JSON.parse(fs.readFileSync('./Configuration1.json', 'utf8'));
 
  const client = await driver.remote(opts);

  await client.setImplicitTimeout(1000);

  await waitForActivity(client);


  /***********************DRIVE SCREEN TESTCASES***************/
//To check if user can view Drive icon on the main screen
var timeStart = (new Date()).getTime();
const check_drive_icon = await findItemById(client,"android.widget.TextView","tv_drive")

var timeEnd = (new Date()).getTime();

if(check_drive_icon !== null){
  total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Drive:To check if user can view the drive icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("CCR","Drive:To check if user can view the drive icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
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
  testcase_name("CCR","Drive:To check if user can click on the drive icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("CCR","Drive:To check if user can click on the drive icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }

  await waitForActivity(client)


  //To check if user can click on Robot settings screen
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Settings icon"))
var robot_settings = await findItemById(client,"android.widget.ImageView","iv_settings")
await clickItem(client,robot_settings);
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

const confirm_settings_screen= await findItemByName(client,"android.widget.TextView","Robot Settings")

if(confirm_settings_screen !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Settings:To check if user can click on Robot settings","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Settings:To check if user can click on Robot settings","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


//To check if user can edit Forward Drive and turning Speed 
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
    testcase_name("CCR","Drive Settings:To check if user can edit Forward Drive Speed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Settings:To check if user can edit Forward Drive Speed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


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
    testcase_name("CCR","Drive Settings:To check if user can edit Turning Speed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Settings:To check if user can edit Turning Speed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


 //To check if user can move Autonomy Tab
 var timeStart = (new Date()).getTime();
 console.log("Move to Autonomy Tab")
 const autonomy = await findItemById(client,"android.view.ViewGroup","container_autonomy_speeds")
 await clickItem(client,autonomy)
 var timeEnd = (new Date()).getTime();

 if(autonomy !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Settings:To check if user can move Autonomy Tab","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Settings:To check if user can move Autonomy Tab","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }

//To check if user can edit cruise control and row following speed
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
    testcase_name("CCR","Drive Settings:To check if user can edit Cruise Control Speed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Settings:To check if user can edit Cruise Control Speed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


var timeStart = (new Date()).getTime();
console.log(colors.red("Adjust Row follow Speed"))
var rowfollow_speed = await findItemById(client,"android.widget.SeekBar","slider_row_follow_drive")
await holdTouchByPercentage(client,rowfollow_speed,50,50,5)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

if(rowfollow_speed !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Settings:To check if user can edit RowFollow Speed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Settings:To check if user can edit RowFollow Speed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


//To check if user can move Auger Tab
var timeStart = (new Date()).getTime();
console.log("Move to Auger Tab")
const auger = await findItemById(client,"android.view.ViewGroup","container_auger_settings")
await clickItem(client,auger)
var timeEnd = (new Date()).getTime();

if(auger !== null)
{total_testcases++;
 pass_testcases++;
   console.log(colors.yellow("Pass"))
   testcase_name("CCR","Drive Settings:To check if user can move Auger Tab","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
   await waitForActivity(client)
}
else
{total_testcases++;
 fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("CCR","Drive Settings:To check if user can move Auger Tab","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}


//To check if user can move Spinner Tab
var timeStart = (new Date()).getTime();
console.log("Move to Spinner Tab")
const spinner = await findItemById(client,"android.view.ViewGroup","container_spinner_settings")
await clickItem(client,spinner)
var timeEnd = (new Date()).getTime();

if(spinner !== null)
{total_testcases++;
 pass_testcases++;
   console.log(colors.yellow("Pass"))
   testcase_name("CCR","Drive Settings:To check if user can move to Spinner Tab","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
   await waitForActivity(client)
}
else
{total_testcases++;
 fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("CCR","Drive Settings:To check if user can move to Spinner Tab","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
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
   testcase_name("CCR","Drive Settings:To check if user can exit Robot Settings Screen by clicking on X button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
   await waitForActivity(client)
}
else
{total_testcases++;
 fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("CCR","Drive Settings:To check if user can exit Robot Settings Screen by clicking on X button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}



//Camera Settings:
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Camera Settings icon"))
var camera_settings = await findItemById(client,"android.widget.ImageView","iv_camera")
await clickItem(client,camera_settings);
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

const confirm_camera_settings_screen= await findItemByName(client,"android.widget.TextView","Camera Check")

if(confirm_camera_settings_screen !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Camera Settings:To check if user can click on Camera settings","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Camera Settings:To check if user can click on Camera settings","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }

 //To check if user can reset all camera angles
 var timeStart = (new Date()).getTime();
 const reset_camera_angles= await findItemById(client,"android.widget.Button","btn_reset")
 await clickItem(client,reset_camera_angles);
 var timeEnd = (new Date()).getTime();

 const check_angle_zero = await findItemByName(client,"android.widget.TextView","0") //to check if angle is reset to Zero
 
 if(check_angle_zero !== null)
 {total_testcases++;
   pass_testcases++;
     console.log(colors.yellow("Pass"))
     testcase_name("CCR","Drive Camera Settings:To check if user can reset camera angle","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
     await waitForActivity(client)
 }
  else
  {total_testcases++;
   fail_testcases++;
     console.log(colors.red("Fail"))
  testcase_name("CCR","Drive Camera Settings:To check if user can reset camera angle","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  }
 


//Set Front Camera Angle:
//To check if user can click on front camera checkbox
var timeStart = (new Date()).getTime();
const front_camera_checkbox= await findItemById(client,"android.widget.CheckBox","cb_front")
await clickItem(client,front_camera_checkbox);
var timeEnd = (new Date()).getTime();

if(front_camera_checkbox !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Camera Settings:To check if user can click on front camera checkbox","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Camera Settings:To check if user can click on front camera checkbox","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }

 console.log(obj.front_camera_angle)
 const a = parseInt(obj.front_camera_angle)
 console.log(a)
 //To check if user can set front camera angle
      if(a <= 30  && a >= 0)
{
await moveTouch(client,409,978,398,325)
}
    else if(a < 0)
  {
    console.log("second loop")
    await moveTouch(client,409,978,398,325)
    await moveTouch(client,409,978,410,329)
}
  else
  {
    console.log("No need to scroll")
  }


const set_front_cam= await findItemByName(client,"android.widget.TextView",obj.front_camera_angle)
await set_front_cam.click();


//To check if user can click on top camera checkbox
var timeStart = (new Date()).getTime();
const top_camera_checkbox= await findItemById(client,"android.widget.CheckBox","cb_top")
await clickItem(client,top_camera_checkbox);
var timeEnd = (new Date()).getTime();

if(top_camera_checkbox !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Camera Settings:To check if user can click on top camera checkbox","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Camera Settings:To check if user can click on top camera checkbox","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


//To check if user can click on left camera checkbox
var timeStart = (new Date()).getTime();
const left_camera_checkbox= await findItemById(client,"android.widget.CheckBox","cb_left")
await clickItem(client,left_camera_checkbox);
var timeEnd = (new Date()).getTime();

if(left_camera_checkbox !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Camera Settings:To check if user can click on left camera checkbox","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Camera Settings:To check if user can click on left camera checkbox","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


const set_left_cam= await findItemByName(client,"android.widget.TextView",obj.left_camera_angle)
await set_left_cam.click();


//To check if user can click on right camera checkbox
var timeStart = (new Date()).getTime();
const right_camera_checkbox= await findItemById(client,"android.widget.CheckBox","cb_right")
await clickItem(client,right_camera_checkbox);
var timeEnd = (new Date()).getTime();

if(right_camera_checkbox !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Camera Settings:To check if user can click on right camera checkbox","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Camera Settings:To check if user can click on right camera checkbox","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


const set_right_cam= await findItemByName(client,"android.widget.TextView",obj.right_camera_angle)
await set_right_cam.click();



//To check if user can save the camera angles:
var timeStart = (new Date()).getTime();
const save_camera_angles= await findItemById(client,"android.widget.Button","btn_save")
await clickItem(client,save_camera_angles);
var timeEnd = (new Date()).getTime();

if(save_camera_angles !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Drive Camera Settings:To check if user can save the camera angles","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Drive Camera Settings:To check if user can save the camera angles","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }


 //To check if user can exit the camera settings screen by clicking on X button
 var timeStart = (new Date()).getTime();
 const close_camera_settings= await findItemById(client,"android.widget.ImageView","iv_close_camera")
await close_camera_settings.click();
 var timeEnd = (new Date()).getTime();

 var check_for_record_button1= await findItemById(client,"android.view.ViewGroup","cl_record_button")// Looking out for an element on drive screen to confirm the exit of Robot Settings Screen
 
 if(check_for_record_button1 !== null)
 {total_testcases++;
   pass_testcases++;
     console.log(colors.yellow("Pass"))
     testcase_name("CCR","To check if user can exit the camera settings screen by clicking on X button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
     await waitForActivity(client)
 }
  else
  {total_testcases++;
   fail_testcases++;
     console.log(colors.red("Fail"))
  testcase_name("CCR","To check if user can exit the camera settings screen by clicking on X button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  client.back()
}


  //To check if user can click on create field
  var timeStart = (new Date()).getTime();
  var field_drive= await findItemById(client,"android.widget.TextView","tv_field_selection")
await field_drive.click();
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

var select_field_text_verify = await findItemByName(client,"android.widget.TextView","Select a Field")
 
if(select_field_text_verify !== null)
{
  total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Drive:To check if user can click on create field and view field selection screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("CCR","Drive:To check if user can click on create field and view field selection screenn","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }

  //To check if user is able to exit the Add field screen by clicking on the cancel button
  var timeStart = (new Date()).getTime();
  var cancel_field_textbox= await findItemById(client,"android.widget.Button","btn_cancel")
await cancel_field_textbox.click();
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

console.log(colors.yellow("To check if user can view select field on the drive screen"))
var field_drive_verify= await findItemById(client,"android.widget.TextView","tv_field_selection")

if (field_drive_verify !== null)
{total_testcases++;
  pass_testcases++;
testcase_name("CCR","Drive:To check if user is able to exit the Add field screen by clicking on the cancel button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  await field_drive_verify.click()

  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("CCR","Drive:To check if user is able to exit the Add field screen by clicking on the cancel button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }


// To check if user cannot exit the field selection screen by clicking on save button without slecting a field
var timeStart = (new Date()).getTime();
  var save_field_textbox= await findItemById(client,"android.widget.Button","btn_okay")
await save_field_textbox.click();
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

var select_field_text_verify1 = await findItemByName(client,"android.widget.TextView","Select a Field")


if (select_field_text_verify1 !== null)
{
  total_testcases++;
  pass_testcases++;
testcase_name("CCR","Drive:To check if user cannot exit the field selection screen by clicking on ok button without slecting a field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("CCR","Drive:To check if user cannot exit the field selection screen by clicking on ok button without slecting a field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }


//To check if the user can click on Create New Field
var timeStart = (new Date()).getTime();
var create_new_field_clickk= await findItemByName(client,"android.widget.TextView","Create New Field")
await create_new_field_clickk.click()
await waitForActivity(client)
var timeEnd = (new Date()).getTime();

const check_add_field_text_newww = await findItemByName(client,"android.widget.TextView","Add field")

if( check_add_field_text_newww !== null)
{total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Drive:To check if user can click on create new field and view Add new field screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("CCR","Drive:To check if user can click on create new field and view Add new field screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
  }


//To check if user can add valid details and save the field
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter field name"))
const enter_field_name_for_drive= await findItemById(client,"android.widget.EditText","tiet_field_name")
await setValueEditText(client,enter_field_name_for_drive,obj.field_name)

console.log(colors.red("Click on Select seed type(s)"))
var select_seed_type_drive = await findItemById(client,"android.widget.TextView","tv_select_seeds")
await clickItem(client,select_seed_type_drive);

console.log(colors.red("Click on the seed drop-down list"))
var drop_down_list_for_seed= await findItemById(client,"android.widget.Spinner","sp_primary_seed")
await clickItem(client,drop_down_list_for_seed)


console.log(colors.red("Select a seed from the drop-down list"))
var new_seed_selection_pos_= await findItemByName(client,"android.widget.CheckedTextView",obj.seed_selection)
await clickItem(client,new_seed_selection_pos_)

console.log(colors.red("Check if the user can write text in the mix % textbox"))
var mix_seed_pos= await findItemById(client,"android.widget.EditText","tiet_primary_rate") 
await setValueEditText(client,mix_seed_pos, obj.mix)

console.log(colors.red("Enter seeding rate value"))
var seed_settings_rate_for_field= await findItemById(client,"android.widget.EditText","tiet_seed_rate")
await setValueEditText(client,seed_settings_rate_for_field,obj.seed_rate)

console.log("Click on Save button to exit Seed Setting screen")
var save_seed_settings_for_field = await findItemById(client,"android.widget.Button","btn_save")
await clickItem(client,save_seed_settings_for_field)

console.log(colors.red("Save button element creation"))
const save_field_button_for_drive = await findItemById(client,"android.widget.Button","btn_save")
await clickItem(client,save_field_button_for_drive)
var timeEnd = (new Date()).getTime();

var check_field_is_added = await findItemByName(client,"android.widget.TextView",obj.field_name)


if( check_field_is_added !== null)
{
  total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Drive:To check if user can create and save a new field successfully","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("CCR","Drive:To check if user can create and save a new field successfully","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
      console.log(colors.red("Fail"))
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
  testcase_name("CCR","Drive:To check if user can turn cruise mode on and off","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  console.log(colors.yellow("Pass"))
  } else{
    total_testcases++;
    fail_testcases++;
      testcase_name("CCR","Drive:To check if user can turn cruise mode on and off","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
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
testcase_name("CCR","Drive:To check if user can move the robot backward","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
total_testcases++;
pass_testcases++;
}else{
  total_testcases++;
  fail_testcases++;
         testcase_name("CCR","Drive:To check if user can move the robot backward","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}
         console.log(colors.red("Move robot forward"))
await moveElementByPercentage(client, driveActivity_leftJoystick_move, 70, 70, 70, 10, 13000);
var timeEnd = (new Date()).getTime();

if(driveActivity_leftJoystick_move !== null)
{total_testcases++;
  pass_testcases++;
testcase_name("CCR","Drive:To check if user can move the robot forward","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
        }        else{
         testcase_name("CCR","Drive:To check if user can move the robot forward","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
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
testcase_name("CCR","Drive:To check if user can move the robot left","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
        }        else{
          total_testcases++;
          fail_testcases++;
          testcase_name("CCR","Drive:To check if user can move the robot left","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
        }
//testcase_name(`<h4>`+"Check if the robot can move right"+`<h4>`)
var timeStart = (new Date()).getTime();
console.log(colors.red("Move robot right"))
await moveElementByPercentage(client, driveActivity_rightJoystick_move, 50, 50, 90, 50, 25000);
var timeEnd = (new Date()).getTime();

if(driveActivity_rightJoystick_move !== null){
testcase_name("CCR","Drive:To check if user can move the robot right","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
total_testcases++;
pass_testcases++;
}else{
  total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Drive:To check if user can move the robot right","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
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
testcase_name("CCR","Drive:To check if user can move the robot in ZRT","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
        }        else
        {
          total_testcases++;
          fail_testcases++;
         testcase_name("CCR","Drive:To check if user can move the robot in ZRT","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
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
  testcase_name("CCR","Drive:To check if user can click on record to record a collection","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{total_testcases++;
  fail_testcases++;
  console.log("Fail")
  testcase_name("CCR","Drive:To check if user can click on record to record a collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

}

await sleep(10000) //Wait for a couple of seconds to check if recording begins 

var start_recording= await findItemByName(client,"android.widget.TextView","Starting...")

if(start_recording == null)
{
  total_testcases++;
  pass_testcases++; 
  testcase_name("CCR","Drive:To check if recording has begun","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 


console.log(colors.red("Move robot backward"))
const driveActivity_leftJoystick_move1 = await findItemById(client, "android.widget.ImageView", "left_joystick_image")
const driveActivity_rightJoystick_move1 = await findItemById(client, "android.widget.ImageView", "joystick_right_imv");

//testcase_name(`<h4>`+"Check if the robot can move backward "+`<h4>`)
for(var run=0;run<2; run++)
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
  testcase_name("CCR","Drive:To check if user can click on record to stop recording a collection","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{ total_testcases++;
  fail_testcases++; 
  testcase_name("CCR","Drive:To check if user can click on record to stop recording a collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
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
  testcase_name("CCR","Drive:To check if user can click on record to start recording row-follow collection","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{ total_testcases++;
  fail_testcases++; 
  testcase_name("CCR","Drive:To check if user can click on record to start recording row-follow collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
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
  testcase_name("CCR","Drive:To check if user can stop recording row-follow collection","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

} else
{ total_testcases++;
  fail_testcases++; 
  testcase_name("CCR","Drive:To check if user can stop recording row-follow collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  console.log("Fail")
}
client.back()
}
 else  //If recording doesn't begin
 {
          total_testcases++;
          fail_testcases++; 
          testcase_name("CCR","Drive:To check if recording has begun","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

          total_testcases++;
          fail_testcases++; 
          testcase_name("CCR","Drive:To check if user can stop recording a collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 


          total_testcases++;
          fail_testcases++; 
          testcase_name("CCR","Drive:To check if user can start recording a row-follow collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

          total_testcases++;
          fail_testcases++; 
          testcase_name("CCR","Drive:To check if user can stop recording a row-follow collection","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 


          client.back()
        }



//This is to find the total count of fields present
var total_field_counter_= await findItemById(client,"android.widget.TextView","tv_mission_count")
var count1 = await total_field_counter_.getText()
var c1 = parseInt(count1)

//To check if the user can click on Field Manager
var timeStart = (new Date()).getTime();
var field_manager_screen1 =await findItemById(client,"android.widget.TextView","tv_fields");
await clickItem(client,field_manager_screen1);
var timeEnd = (new Date()).getTime();

if(field_manager_screen1 !== null)
{total_testcases++;
  pass_testcases++;
testcase_name("CCR","Field:To check if the user can click on Field Manager","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
} else
{total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Field:To check if the user can click on Field Manager","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

}

//To check if the field created is visible on the field manager screen
var timeStart = (new Date()).getTime();
const field_recently_created_check1= await findItemByName(client,"android.widget.TextView",obj.field_name)
var timeEnd = (new Date()).getTime();

if(field_recently_created_check1 !== null)
{total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Field:To check if the field created is visible on the field manager screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 
} else
{total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Field:To check if the field created is visible on the field manager screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

}

//To check if the user is able to view the 3 dotted menu
var timeStart = (new Date()).getTime();
const dotted_menu1= await findItemById(client,"android.widget.ImageView","iv_menu")
var timeEnd = (new Date()).getTime();

if(dotted_menu1 !== null)
{total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Field:To check if the user is able to view the 3 dotted menu","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 await clickItem(client,dotted_menu1)
} else
{total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Field:To check if the user is able to view the 3 dotted menu","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

}

//To check if user can delete a field
var timeStart = (new Date()).getTime();
const delete_field_created1= await findItemByName(client,"android.widget.TextView","Delete")
var timeEnd = (new Date()).getTime();

if(delete_field_created1 !== null)
{total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Field:To check if user can delete a field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 await clickItem(client,delete_field_created1)
} else
{total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Field:To check if user can delete a field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}


//To check if the total field counter is decremented after deleting a field
var timeStart = (new Date()).getTime();
var updated_field_counter1= await findItemById(client,"android.widget.TextView","tv_mission_count")
var count_update1 = await updated_field_counter1.getText()
var c_update1 = parseInt(count_update1)
var timeEnd = (new Date()).getTime();
console.log(c1-1);
console.log(c_update1)

 if(c1-1 == c_update1)
 {total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Field:To check if the total field counter is decremented after deleting a field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
} else
{total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Field:To check if the total field counter is decremented after deleting a field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
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


const testcase_name =(test_id,element,output,time_of_exec) =>{
  var id= test_id
  var test_case=element
  var out= output
  var execution_time = time_of_exec

  REPORTER.writeSummaryEntry(id,test_case,out,execution_time)
}

const result_table= (total_testcases,pass_testcases,fail_testcases) =>
{
var total= total_testcases;
var pass= pass_testcases;
var fail= fail_testcases;
 REPORTER.writeResultEntry(total,pass,fail)

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
REPORTER.writeValuesTableEntry (act, `WaitMax(${waitTimeMs}) : ${description}`, itemText, matchValue, timeStop - timeStart);
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
REPORTER.writeValuesTableEntry (act, description, itemText, matchValue, timeStop - timeStart);
// writeValuesTableEntry  = (activity, description, valueRead, expectedValue, msTime)
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
