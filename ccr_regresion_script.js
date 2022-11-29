const driver = require("webdriverio"); //webdriverio
const assert = require("assert");
const keycode = require('keycode');
const sleep = require('sleep-promise');
const colors = require('colors');
// const params = require('minimist')(process.argv.slice(2));
const Reporter = require('./testreport.js');
const REPORTER = new Reporter('./', 'CCR Regression', `./Configuration1.json`);
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

  await sleep(7000)

console.log("Check Robot Status")
const robot_status= await findItemById(client,"android.widget.TextView","tv_robot_status")
await readValueFromElementMatch(client,robot_status,"Connected","Check if robot is Connected")

/***Check if user can click on robot info tab */
console.log(colors.red("Click on Robot Info Tab"))
var timeStart = (new Date()).getTime();
const robot_info_click= await findItemById(client,"android.widget.TextView","tv_robot_name")
await clickItem(client,robot_info_click);
var timeEnd = (new Date()).getTime();

const show_robot_info= await findItemById(client,"android.widget.TextView","btn_show_robot_info") //Checking if user can view Show Robot information after clicking on Robot Info tab

if(show_robot_info !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Robot Info:Check if user can click on robot info tab","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Robot Info:Check if user can click on robot info tab","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }

//To check if user can exit Robot info tab by clicking on the X button
console.log(colors.red("Click on X button"))
var timeStart = (new Date()).getTime();
const exit_robot_info= await findItemById(client,"android.widget.ImageView","iv_close")
await clickItem(client,exit_robot_info);
var timeEnd = (new Date()).getTime();
  

const show_robot_info1= await findItemById(client,"android.widget.TextView","btn_show_robot_info")

if(show_robot_info1 == null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Robot Info:To check if user can exit Robot info tab by clicking on the X button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
    const robot_info_clickk= await findItemById(client,"android.widget.TextView","tv_robot_name")
    await clickItem(client,robot_info_clickk);
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Robot Info:To check if user can exit Robot info tab by clicking on the X button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }

  
//Checking if connected robot is in Ready to Launch state
console.log("Check Connected Robot Status")
const connected_robot_status= await findItemById(client,"android.widget.TextView","tv_connected_robot_status")
await readValueFromElementMatch(client,connected_robot_status,"Ready to Launch","Check Connected Robot Status")

//Checking Robot Cameras and Sensors Status

const show_robot_info_= await findItemById(client,"android.widget.TextView","btn_show_robot_info")
await clickItem(client,show_robot_info_)

await sleep(10000) //Waiting for statuses to appear

const front_camera_status= await findItemById(client,"android.widget.TextView","tv_front_status")
await readValueFromElementMatch(client,front_camera_status,"Connected","To check Front Camera status")

const left_camera_status= await findItemById(client,"android.widget.TextView","tv_left_status")
await readValueFromElementMatch(client,left_camera_status,"Connected","To check Left Camera status")

const right_camera_status= await findItemById(client,"android.widget.TextView","tv_right_status")
await readValueFromElementMatch(client,right_camera_status,"Connected","To check Right Camera status")

const top_camera_status= await findItemById(client,"android.widget.TextView","tv_top_status")
await readValueFromElementMatch(client,top_camera_status,"Connected","To check Top Camera status")

const horizontal_lidar_status= await findItemById(client,"android.widget.TextView","tv_hor_lidar_status")
await readValueFromElementMatch(client,horizontal_lidar_status,"Connected","To check Horizontal Lidar status")

const vertical_lidar_status= await findItemById(client,"android.widget.TextView","tv_ver_lidar_status")
await readValueFromElementMatch(client,vertical_lidar_status,"Connected","To check Vertical Lidar status")

const gps_status= await findItemById(client,"android.widget.TextView","tv_gps_status")
await readValueFromElementMatch(client,gps_status,"Connected","To check GPS status")

const imu_status= await findItemById(client,"android.widget.TextView","tv_imu_status")
await readValueFromElementMatch(client,imu_status,"Connected","To check IMU status")


console.log("Exit the Show Robot Information Tab")
const close_info = await findItemById(client,"android.widget.ImageView","iv_close")
await clickItem(client,close_info);

/*************Add Seeds Flow Test Cases */
  //To check if user can click on fab button

//Click on FAB button to Add new seed
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on FAB"))
await waitForActivity(client)
const fab_button= await findItemById(client,"android.widget.ImageButton","fab_create")
await clickItem(client,fab_button)
var timeEnd = (new Date()).getTime();

if(fab_button !== null){console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check if user can click on FAB button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))}
 else{
  total_testcases++;
  fail_testcases++;
  console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user can click on FAB button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
 }

//Click on Seed
//To check if user can click on Seed 
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Seed"))
await waitForActivity(client)
const seed_button = await findItemById(client,"android.widget.ImageView","fab_create_mission")
await waitForActivity(client)
await clickItem(client,seed_button)
var timeEnd = (new Date()).getTime();

if(seed_button !== null){console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check if user can click on Seed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 {
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user can click on Seed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }



//Click on Discard Button to Exit the Add new Seed pop-up
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Discard button"))
await waitForActivity(client)
const discard_button =await findItemById(client,"android.widget.TextView","tv_cancel") 
await waitForActivity(client)
await clickItem(client,discard_button)
var timeEnd = (new Date()).getTime();

const fab_button1= await findItemById(client,"android.widget.ImageButton","fab_create")
if(fab_button1 !== null)
{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if user can click on Discard on Add Seed Screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await clickItem(client,fab_button1) //Click on FAB button
const seed_button1 = await findItemById(client,"android.widget.ImageView","fab_create_mission")
await seed_button1.click()
await waitForActivity(client)
}else
 {total_testcases++;
  fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("CCR","Seed:To check if user can click on Discard on Add Seed Screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
}


//To check if user cannot exit the add seed screen without entering any mandatory data
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Save button"))
await waitForActivity(client)
const save_button_verify =await findItemById(client,"android.widget.Button","btn_save")
await waitForActivity(client)
await clickItem(client,save_button_verify)
var timeEnd = (new Date()).getTime();

const fab_button2= await findItemById(client,"android.widget.ImageButton","fab_create")
if(fab_button2 == null)
{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if user cannot exit the add seed screen without entering any mandatory data","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await waitForActivity(client)
}else
 {total_testcases++;
  fail_testcases++;
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user cannot exit the add seed screen without entering any mandatory data","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
 await clickItem(client,fab_button2) //Click on FAB button
 const seed_button2 = await findItemById(client,"android.widget.ImageView","fab_create_mission")
 await clickItem(seed_button2) //Click on Seed again to view the pop-up

}



//Click on X to close the Add seed pop-up
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on X icon"))
await waitForActivity(client)
const close_add_seed = await findItemById(client,"android.widget.ImageView","iv_close")
await waitForActivity(client)
await clickItem(client, close_add_seed)
var timeEnd= (new Date()).getTime();

const fab_button_= await findItemById(client,"android.widget.ImageButton","fab_create")

if(fab_button_ !== null)
{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if user can click on X icon on Add Seed Screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await clickItem(client,fab_button_)
const seed_button3 = await findItemById(client,"android.widget.ImageView","fab_create_mission")
await clickItem(client,seed_button3)
}else
 {total_testcases++;
  fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("CCR","Seed:To check if user can click on X icon on Add Seed Screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
}


//Enter Seed Name 
//To check if user can enter values in Seed Name text field
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Name"))
await waitForActivity(client)
const seed_name= await findItemById(client,"android.widget.EditText","tiet_seed_name")
await waitForActivity(client)
await setValueEditText(client,seed_name,obj.seed_name)
var timeEnd = (new Date()).getTime();

const seed_name_check= await findItemByName(client,"android.widget.EditText",obj.seed_name)

 if(seed_name_check !== null){console.log(colors.yellow("Pass"))
 total_testcases++;
 pass_testcases++;
testcase_name("CCR","Seed:To check if user can type values in seed Name text field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 {  
  total_testcases++;
  fail_testcases++;
  console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user can type values in seed Name text field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }



//Enter seed density
//To check if user can enter values in Seed Density text field
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Density"))
await waitForActivity(client)
const seed_density= await findItemById(client,"android.widget.EditText","tiet_seed_density")
await waitForActivity(client)
await setValueEditText(client,seed_density,obj.seed_density)
var timeEnd = (new Date()).getTime();

const seed_density_check= await findItemByName(client,"android.widget.EditText",obj.seed_density)

if(seed_density_check !== null){
  total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if user can type values in seed density text field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user can type values in seed density text field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }



//Enter seed rate
//To check if user can enter values in Seed Rate text field
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Rate"))
await waitForActivity(client)
const seed_rate= await findItemById(client,"android.widget.EditText","tiet_seed_rate")
await waitForActivity(client)
await setValueEditText(client,seed_rate,obj.seeding_rate)
var timeEnd = (new Date()).getTime();

const seed_rate_check= await findItemByName(client,"android.widget.EditText",obj.seeding_rate)

if(seed_rate_check !== null){
  total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if user can type values in seed rate text field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user can type values in seed rate text field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }


/*******Creating element for save button */
 console.log(colors.red("Click onn Save"))
await waitForActivity(client)
const save_seed_details= await findItemById(client,"android.widget.Button","btn_save")



/***************** Seed Name Test Cases ****/
//To check seed name does not accept only numbers
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Name"))
await waitForActivity(client)
const seed_name_nos= await findItemById(client,"android.widget.EditText","tiet_seed_name")
await waitForActivity(client)
await setValueEditText(client,seed_name_nos,obj.neg_seed_name[0])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const seed_button3 = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_button3 == null){
console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check if user does not accept only numbers as Seed name","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user does not accept only numbers as Seed name","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await clickItem(client,seed_button3)
await setValueEditText(client,seed_density,obj.seed_density)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}


//To check seed name does not accept only special characters
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Name"))
await waitForActivity(client)
const seed_name_special_chars= await findItemById(client,"android.widget.EditText","tiet_seed_name")
await waitForActivity(client)
await setValueEditText(client,seed_name_special_chars,obj.neg_seed_name[1])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const seed_button4 = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_button4 == null){
console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check if user does not accept only special chars as Seed name","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user does not accept only special chars as Seed name","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await clickItem(client,seed_button4)
await setValueEditText(client,seed_density,obj.seed_density)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}


//To check seed name does not accept combination of numbers and special characters 
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Name"))
await waitForActivity(client)
const seed_name_combo= await findItemById(client,"android.widget.EditText","tiet_seed_name")
await waitForActivity(client)
await setValueEditText(client,seed_name_combo,obj.neg_seed_name[2])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const seed_button5 = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_button5 == null){
  total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check seed name does not accept combination of numbers and special characters ","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check seed name does not accept combination of numbers and special characters ","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await clickItem(client,seed_button5)
await setValueEditText(client,seed_density,obj.seed_density)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}


//To check seed name does not accept only spaces as seed name  
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Name"))
await waitForActivity(client)
const seed_name_spaces= await findItemById(client,"android.widget.EditText","tiet_seed_name")
await waitForActivity(client)
await setValueEditText(client,seed_name_combo,"  ")
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();



const seed_buttonn = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_buttonn == null){
  total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check seed name does not accept only spaces as seed name","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check seed name does not accept only spaces as seed name","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 await clickItem(client,seed_buttonn)
 await setValueEditText(client,seed_density,obj.seed_density)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}



//To check if user cannot save seed without entering seed name
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Name"))
await waitForActivity(client)
const seed_name_blank= await findItemById(client,"android.widget.EditText","tiet_seed_name")
await waitForActivity(client)
await setValueEditText(client,seed_name_blank,"")
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const seed_button6 = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_button6 == null){
  total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if user cannot save seed without entering seed name ","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await setValueEditText(client,seed_name,obj.seed_name)}
else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user cannot save seed without entering seed name ","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await clickItem(client,seed_button5)
await setValueEditText(client,seed_name,obj.seed_name)
await setValueEditText(client,seed_density,obj.seed_density)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}






/************* Seed Density Test Cases ***

//To check seed denisty does not accept special characters
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Density"))
await waitForActivity(client)
const seed_density_special_chars= await findItemById(client,"android.widget.EditText","tiet_seed_density")
await waitForActivity(client)
await setValueEditText(client,seed_density_special_chars,obj.neg_seed_density[1])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const seed_button8 = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_button8 == null){
console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check seed denisty does not accept special characters","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check seed denisty does not accept special characters","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await clickItem(client,seed_button8)
await setValueEditText(client,seed_name,obj.seed_name)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}


//To check seed denisty does not accept alphabets
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Density"))
await waitForActivity(client)
const seed_density_nos= await findItemById(client,"android.widget.EditText","tiet_seed_density")
await waitForActivity(client)
await setValueEditText(client,seed_density_nos,obj.neg_seed_density[0])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const seed_button7 = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_button7 == null){
total_testcases++;
pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check seed denisty does not accept alphabets","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check seed denisty does not accept alphabets","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await clickItem(client,seed_button7)
await setValueEditText(client,seed_name,obj.seed_name)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}

//To check seed denisty does not accept combination of alphabets and special chars
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Density"))
await waitForActivity(client)
const seed_density_combo= await findItemById(client,"android.widget.EditText","tiet_seed_density")
await waitForActivity(client)
await setValueEditText(client,seed_density_combo,obj.neg_seed_density[2])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const seed_button10 = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_button8 == null){
  total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check seed denisty does not accept combination of alphabets and special chars","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check seed denisty does not accept combination of alphabets and special chars","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await clickItem(client,seed_button10)
await setValueEditText(client,seed_name,obj.seed_name)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}

*/

//To check that user cannot save seed data without adding seed density value 
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Density"))
await waitForActivity(client)
const seed_density_spaces= await findItemById(client,"android.widget.EditText","tiet_seed_density")
await waitForActivity(client)
await setValueEditText(client,seed_density_spaces,"")
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const seed_button9 = await findItemById(client,"android.widget.ImageView","fab_create_mission") //Check for seed_button

if(seed_button9 == null){
console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check that user cannot save seed data without adding seed density value","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await setValueEditText(client,seed_density,obj.seed_density)}
 
else
 {  console.log(colors.red("Fail"))
 total_testcases++;
 fail_testcases++;
 testcase_name("CCR","Seed:To check that user cannot save seed data without adding seed density value","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
await clickItem(client,seed_button9)
await setValueEditText(client,seed_name,obj.seed_name)
await setValueEditText(client,seed_rate,obj.seeding_rate)
}



/**** Test Cases for Seeding Rates 
//To check seeding rate does not accept alphabets
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Rate"))
await waitForActivity(client)
const seed_rate_alpha= await findItemById(client,"android.widget.EditText","tiet_seed_rate")
await waitForActivity(client)
await setValueEditText(client,seed_rate_alpha,obj.neg_seeding_rate[0])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();

const seed_button_check = await findItemById(client,"android.widget.ImageView","fab_create_mission")

if(seed_button_check == null){
  total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if seeding rate does not accept alphabets","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if seeding rate does not accept alphabets","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }


 //To check seeding rate does not accept special characters
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Rate"))
await waitForActivity(client)
const seed_rate_special_char= await findItemById(client,"android.widget.EditText","tiet_seed_rate")
await waitForActivity(client)
await setValueEditText(client,seed_rate_special_char,obj.neg_seeding_rate[1])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();

const seed_button_check1 = await findItemById(client,"android.widget.ImageView","fab_create_mission")

if(seed_button_check1 == null){console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check if seeding rate does not accept special characters","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if seeding rate does not accept special characters","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }


//To check seeding rate does not accept combination of char and special characters
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Rate"))
await waitForActivity(client)
const seed_rate_combo= await findItemById(client,"android.widget.EditText","tiet_seed_rate")
await waitForActivity(client)
await setValueEditText(client,seed_rate_combo,obj.neg_seeding_rate[2])
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();

const seed_button_check2 = await findItemById(client,"android.widget.ImageView","fab_create_mission")

if(seed_button_check2 == null){console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check if seeding rate does not accept combination of alphabets and special chars","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if seeding rate does not accept combination of alphabets and special chars","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }

*/

//To check if seed data cannot be saved without entering seeding rate
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter Seed Rate"))
await waitForActivity(client)
const seed_rate_spaces= await findItemById(client,"android.widget.EditText","tiet_seed_rate")
await waitForActivity(client)
await setValueEditText(client,seed_rate_spaces,"")
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();

const seed_button11 = await findItemById(client,"android.widget.ImageView","fab_create_mission")

if(seed_button11 == null){console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Seed:To check if seed data cannot be saved without entering seeding rate","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if seed data cannot be saved without entering seeding rate","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }


/**Positive flow for Add Seed *******/
var timeStart = (new Date()).getTime();
await setValueEditText(client,seed_name,obj.seed_name)
await setValueEditText(client,seed_density,obj.seed_density)
await setValueEditText(client,seed_rate,obj.seeding_rate)
await clickItem(client,save_seed_details)
var timeEnd = (new Date()).getTime();


const fab_button_check_pos= await findItemById(client,"android.widget.ImageButton","fab_create")
if(fab_button_check_pos !== null){
  total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if user can save seed record by adding valid input","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 { total_testcases++;
  fail_testcases++; 
   console.log(colors.red("Fail"))
 testcase_name("CCR","Seed:To check if user can save seed record by adding valid input","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }

//This step is followed to get the count of total no of seeds currently present
const seed_manager_screenn = await findItemById(client,"android.widget.TextView","tv_data")
  await seed_manager_screenn.click()

  await sleep(5000)
  

const tot_seed_count_for_field = await findItemById(client,"android.widget.TextView","tv_seed_count") //This will give s the total count of seeds
  var count_seed_for_field = await tot_seed_count_for_field.getText() //converting count of value to text( eg 13 Seeds)
var counting = parseInt(count_seed_for_field)  //Storing just the integer part into counting
console.log(colors.red(counting))

//Click on FAB button to Add new field
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on FAB"))
await waitForActivity(client)
const fab_button_field= await findItemById(client,"android.widget.ImageButton","fab_create")
await clickItem(client,fab_button_field)
var timeEnd = (new Date()).getTime();


if(fab_button_field !== null){console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Field:To check if user can click on FAB button to click on field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))}
 else{
  total_testcases++;
  fail_testcases++;
  console.log(colors.red("Fail"))
 testcase_name("CCR","Field:To check if user can click on FAB button to click on field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
 }


//To check if user can click on Field
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Field"))
await waitForActivity(client)
const field_button = await findItemById(client,"android.widget.ImageView","fab_create_field")
await waitForActivity(client)
await clickItem(client,field_button)
var timeEnd = (new Date()).getTime();

if(field_button !== null){console.log(colors.yellow("Pass"))
total_testcases++;
pass_testcases++;
testcase_name("CCR","Field:To check if user can click on field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }
 else
 {  total_testcases++;
  fail_testcases++;
   console.log(colors.red("Fail"))
 testcase_name("CCR","Field:To check if user can click on field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) }


 
//Click on Discard Button to Exit the Add new Field Screen
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Discard button"))
await waitForActivity(client)
const discard_button_field =await findItemById(client,"android.widget.TextView","tv_cancel") 
await waitForActivity(client)
await clickItem(client,discard_button_field)
var timeEnd = (new Date()).getTime();

const fab_button_field1= await findItemById(client,"android.widget.ImageButton","fab_create")
if(fab_button_field1 !== null)

{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if user can click on Discard on Add Field Screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await clickItem(client,fab_button_field1)
await clickItem(client,field_button) //Click on field again to view the pop-up
await waitForActivity(client)
}else
 {total_testcases++;
  fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("CCR","Field:To check if user can click on Discard on Add Field Screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
}


//Click on X to close the Add seed pop-up
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on X icon"))
await waitForActivity(client)
const close_add_field = await findItemById(client,"android.widget.ImageView","iv_close")
await waitForActivity(client)
await clickItem(client, close_add_field)
var timeEnd= (new Date()).getTime();

const fab_button4= await findItemById(client,"android.widget.ImageButton","fab_create")

if(fab_button4 !== null)
{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if user can exit Add Field Screen by clicking on the X icon ","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await clickItem(client,fab_button4)
await clickItem(client,field_button)
}else
 {total_testcases++;
  fail_testcases++;
   console.log(colors.red("Fail"))
testcase_name("CCR","Field:To check if user can exit Add Field Screen by clicking on the X icon ","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
}

//To check if user cannot exit the add field screen without entering any mandatory data
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Save button"))
await waitForActivity(client)
const save_button_field_verify =await findItemById(client,"android.widget.Button","btn_save")
await waitForActivity(client)
await clickItem(client,save_button_field_verify)
var timeEnd = (new Date()).getTime();

const fab_button3= await findItemById(client,"android.widget.ImageButton","fab_create")

if(fab_button3 == null)
{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if user cannot exit the add field screen without entering any mandatory data","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await waitForActivity(client)
}else
 {fail_testcases++;
  total_testcases++;
   console.log(colors.red("Fail"))
 testcase_name("CCR","Field:To check if user cannot exit the add field screen without entering any mandatory data","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
 await clickItem(client,fab_button3) //Click on FAB button
 await clickItem(client,field_button) //Click on field button again to view the pop-up

}

//To check if the user can save a field by adding just field name and not seed details.
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter field name"))
var field_textbox= await findItemById(client,"android.widget.EditText","tiet_field_name")
await setValueEditText(client,field_textbox,obj.field_name)
const save_button_field_click =await findItemById(client,"android.widget.Button","btn_save")
await waitForActivity(client)
await clickItem(client,save_button_field_click)
var timeEnd = (new Date()).getTime();


const fab_button_field3= await findItemById(client,"android.widget.ImageButton","fab_create")

if(fab_button_field3 == null)
{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if user cannot exit the add field screen by adding just field name and not seed details.","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await waitForActivity(client)
}else
 {console.log(colors.red("Fail"))
 fail_testcases++;
 total_testcases++;
 testcase_name("CCR","Field:To check if user cannot exit the add field screen by adding just field name and not seed details.","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
 await clickItem(client,fab_button_field3) //Click on FAB button
 await clickItem(client,field_button) //Click on field button again to view the pop-up
}

/***************** Seed Settings Screen ************/

//To check if user can click on Seed settings screen
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Select seed type(s)"))
var select_seed_type = await findItemById(client,"android.widget.TextView","tv_select_seeds")
await clickItem(client,select_seed_type);
var timeEnd = (new Date()).getTime();

if(select_seed_type !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if user can click on Select seed type(s) and seeding rate","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}
 else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
 testcase_name("CCR","Field:To check if user can click on Select seed type(s) and seeding rate","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }



 //To check if the Seed Settings screen appears on clicking on Select seed type(s) and seeding rate
 var timeStart = (new Date()).getTime();
 console.log(colors.red("Check for seed settings title"))
 var seed_settings= await findItemByName(client,"android.widget.TextView","Seed Settings")
 var timeEnd = (new Date()).getTime();

 if(seed_settings !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if the Seed Settings screen appears on clicking on Select seed type(s) and seeding rate","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)
}  else
{total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if the Seed Settings screen appears on clicking on Select seed type(s) and seeding rate","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}


//To check if user can exit Seed settings screen by clicking on the X button
var timeStart = (new Date()).getTime();
console.log(colors.red("Close screen settings using X icon"))
 var close_seed_settings= await findItemById(client,"android.widget.ImageView","iv_close")
 await clickItem(client, close_seed_settings)
 var timeEnd = (new Date()).getTime();

 const add_field_text = await findItemByName(client,"android.widget.TextView","Add field")
  
 if( add_field_text !== null){
    console.log(colors.yellow("Pass"))
    total_testcases++;
    pass_testcases++;
    testcase_name("CCR","Field:To check if user can exit Seed settings screen by clicking on the X button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    var select_seed_type1 = await findItemById(client,"android.widget.TextView","tv_select_seeds")
    await clickItem(client,select_seed_type1)
    await waitForActivity(client)  
 } else
 {total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if user can exit Seed settings screen by clicking on the X button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
 }

//To check if user can exit the seed settings screen by clicking on Cancel button
var timeStart = (new Date()).getTime();
console.log(colors.red("Close screen settings using cancel button"))
 const cancel_seed_settings= await findItemById(client,"android.widget.TextView","tv_cancel")
 await clickItem(client,cancel_seed_settings)
 var timeEnd = (new Date()).getTime();

 
 const add_field_text1 = await findItemByName(client,"android.widget.TextView","Add field")
  
 if( add_field_text1 !== null){
  total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if user can exit the seed settings screen by clicking on Cancel button","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    var select_seed_type2 = await findItemById(client,"android.widget.TextView","tv_select_seeds")
    await clickItem(client,select_seed_type2)
    await waitForActivity(client)  
 } else
 {
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if user can exit Seed settings screen by clicking on the cancel button","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
 }


//To check if user cannot exit Seed settings screen without entering mix % and seeding rate
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on Save button on Seed Settings screen"))
 var save_seed_settings= await findItemById(client,"android.widget.Button","btn_save")
 await clickItem(client,save_seed_settings)
 var timeEnd = (new Date()).getTime();


const add_field_text2 = await findItemByName(client,"android.widget.TextView","Add field")
  
 if( add_field_text1 == null){
  total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if user cannot exit Seed settings screen without entering mix % and seeding rate","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)  
 } else
 {
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if user cannot exit Seed settings screen without entering mix % and seeding rate","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
    var select_seed_type3 = await findItemById(client,"android.widget.TextView","tv_select_seeds")
    await clickItem(client,select_seed_type3) 
 }


 //To check if user can click on Add Additional seed to add secondary and ternary seed
 var timeStart = (new Date()).getTime();
 console.log(colors.red("Click on Add Additional Seed"))
  var add_additional_seed = await findItemById(client,"android.widget.TextView","tv_add_new_seed")
  await clickItem(client,add_additional_seed)
  await clickItem(client,add_additional_seed)
  var timeEnd = (new Date()).getTime();

  if (add_additional_seed !== null){
    total_testcases++;
    pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if user can click on Add Additional seed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)  
 } else
 {
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if user can click on Add Additional seed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 }

//To check if an secondary seed textbox appears after clicking Add additional seed
var timeStart = (new Date()).getTime();
 console.log(colors.red("Check for secondary seed entry"))
  var additional_seed_entry = await findItemById(client,"android.widget.Spinner","sp_secondary_seed")
  var timeEnd = (new Date()).getTime();

  if(additional_seed_entry !== null)
  {total_testcases++;
    pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if an secondary seed textbox appears after clicking Add additional seed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)    
  }else
  {
    total_testcases++;
    fail_testcases++;
     console.log(colors.red("Fail"))
     testcase_name("CCR","Field:To check if an secondary seed textbox appears after clicking Add additional seed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  }

//To check if  tertiary seed textbox appears after clicking Add additional seed
  var timeStart = (new Date()).getTime();
 console.log(colors.red("Check for tertiary seed entry"))
  var tertiary_seed = await findItemById(client,"android.widget.Spinner","sp_tertiary_seed")
  var timeEnd = (new Date()).getTime();

  if(tertiary_seed !== null)
  {total_testcases++;
    pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if a tertiary seed textbox appears after clicking Add additional seed","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)    
  }else
  {fail_testcases++;
    total_testcases++;
     console.log(colors.red("Fail"))
     testcase_name("CCR","Field:To check if a tertiary seed textbox appears after clicking Add additional seed","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  }


  //To check if the user can click on tertiary seed delete icon
  var timeStart = (new Date()).getTime();
  console.log(colors.red("Click on tertiary seed delete icon"))
   var tertiary_seed_delete = await findItemById(client,"android.widget.ImageView","iv_tertiary_delete")
   await clickItem(client,tertiary_seed_delete)
   var timeEnd = (new Date()).getTime();
 
   if(tertiary_seed_delete !== null)
   {total_testcases++;
    pass_testcases++;
     console.log(colors.yellow("Pass"))
     testcase_name("CCR","Field:To check if the user can click on tertiary seed delete icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
     await waitForActivity(client)    
   }else
   {total_testcases++;
    fail_testcases++;
      console.log(colors.red("Fail"))
      testcase_name("CCR","Field:To check if the user can click on tertiary seed delete icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
   }


   //To check if the tertiary seed entry is deleted
   var timeStart = (new Date()).getTime();
 console.log(colors.red("Check for tertiary seed entry is deleted"))
  var tertiary_seed_deleted = await findItemById(client,"android.widget.Spinner","sp_tertiary_seed")
  var timeEnd = (new Date()).getTime();

  if(tertiary_seed_deleted == null)
  {total_testcases++;
    pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if a tertiary seed entry is deleted on clicking the delete icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)    
  }else
  {
    total_testcases++;
    fail_testcases++;
     console.log(colors.red("Fail"))
     testcase_name("CCR","Field:To check if a tertiary seed entry is deleted on clicking the delete icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  }


  //To check if the user can click on secondary seed delete icon
  var timeStart = (new Date()).getTime();
  console.log(colors.red("Click on tertiary seed delete icon"))
   var secondary_seed_delete = await findItemById(client,"android.widget.ImageView","iv_secondary_delete")
   await clickItem(client,secondary_seed_delete)
   var timeEnd = (new Date()).getTime();
 
   if(secondary_seed_delete !== null)
   {total_testcases++;
    pass_testcases++;
     console.log(colors.yellow("Pass"))
     testcase_name("CCR","Field:To check if the user can click on secondary seed delete icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
     await waitForActivity(client)    
   }else
   {total_testcases++;
    fail_testcases++;
      console.log(colors.red("Fail"))
      testcase_name("CCR","Field:To check if the user can click on secondary seed delete icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
   }


   //To check if the secondary seed entry is deleted
   var timeStart = (new Date()).getTime();
 console.log(colors.red("Check for secondary seed entry is deleted"))
  var secondary_seed_deleted = await findItemById(client,"android.widget.Spinner","sp_secondary_seed")
  var timeEnd = (new Date()).getTime();

  if(secondary_seed_deleted == null)
  {total_testcases++;
    pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if the secondary seed entry is deleted on clicking the delete icon","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)    
  }else
  {total_testcases++;
    fail_testcases++;
     console.log(colors.red("Fail"))
     testcase_name("CCR","Field:To check if the secondary seed entry is deleted on clicking the delete icon","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  }



//Click on the Select seed drop-down list
var timeStart = (new Date()).getTime();
console.log(colors.red("Click on the seed drop-down list"))
var drop_down_list= await findItemById(client,"android.widget.Spinner","sp_primary_seed")
await clickItem(client,drop_down_list)
await waitForActivity(client)
var timeEnd = (new Date()).getTime();


if(drop_down_list !== null)
{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
  testcase_name("CCR","Field:To check if user can click on the Select seed drop-down list","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
  await waitForActivity(client)    
}else
{total_testcases++;
  fail_testcases++;
   console.log(colors.red("Fail"))
   testcase_name("CCR","Field:To check if user can click on the Select seed drop-down list","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}


//To check if user can select a seed from the drop-down list
var timeStart = (new Date()).getTime();
console.log(colors.red("Select a seed from the drop-down list"))
var p= counting/6; //Dividing the total no of seeds by 6. To decide the no of times the loop should execute
var l=parseInt(p)  //If the answer is in float or decimal, store in Int format

for(var q=0;q<l;q++)  //WE will run the loop l no of times
{
  var new_seed_selection= await findItemByName(client,"android.widget.CheckedTextView",obj.seed_selection)
  if(new_seed_selection == null)  //Checking if the element is not visible on the first screen
  {
    moveTouch(client,602,1024,645,451) //if not visible move to the next screen
   }
else
{
  console.log("Seed Found") //element is found
}
}
var new_seed_selection1= await findItemByName(client,"android.widget.CheckedTextView",obj.seed_selection)
await clickItem(client,new_seed_selection1) //selecting the element that is found
await waitForActivity(client)
var timeEnd = (new Date()).getTime();


if (new_seed_selection1 !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if user can select a seed from the drop-down list","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)    
  }else
  {total_testcases++;
    fail_testcases++;
     console.log(colors.red("Fail"))
     testcase_name("CCR","Field:To check if user can select a seed from the drop-down list","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
  }


  //Check if the selected seed is visible on the screen
  var timeStart = (new Date()).getTime();
console.log(colors.red("Check if the selected seed is visible on the screen"))
var selected_seed_verify= await findItemByName(client,"android.widget.TextView",obj.seed_selection)
var timeEnd = (new Date()).getTime();

if(selected_seed_verify !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if the selected seed is visible on the screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    await waitForActivity(client)  
} else
{total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if the selected seed is visible on the screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}
 
//Seed Mix 
 
//To check if the user can add mix % value
var timeStart = (new Date()).getTime();
console.log(colors.red("Check if the user can write text in the mix % textbox"))
var mix= await findItemById(client,"android.widget.EditText","tiet_primary_rate") 
await setValueEditText(client,mix, obj.mix)
var timeEnd = (new Date()).getTime();
if(mix !== null){
  total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if the user can add mix % value","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    } else
    {total_testcases++;
      fail_testcases++;
        console.log(colors.red("Fail"))
        testcase_name("CCR","Field:To check if the user can add mix % value","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))   
    }


    //To check if the mixed% value is reflected on the screen
    var timeStart = (new Date()).getTime();   
console.log("To check if the mixed% value is reflected on the screen")
var mix_check= await findItemByName(client,"android.widget.EditText",obj.mix) 
var timeEnd = (new Date()).getTime();

if(mix_check !== null){
  total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if the mix % value is reflected on the screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
} else
{total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if the mix % value is reflected on the screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
}

//To check if the user is not able to exit seed settings screen without entering seeding rate value
var timeStart = (new Date()).getTime();   
console.log("Click on Save button to exit Seed Setting screen")
var save_seed_settings1 = await findItemById(client,"android.widget.Button","btn_save")
await clickItem(client, save_seed_settings1)
var timeEnd= (new Date()).getTime();

const add_field_text_check = await findItemByName(client,"android.widget.TextView","Add field")

if(add_field_text_check == null)
{total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if the user is not able to exit seed settings screen without entering seeding rate value","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

} else{
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if the user is not able to exit seed settings screen without entering seeding rate value","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
    var select_seed_type_click = await findItemById(client,"android.widget.TextView","tv_select_seeds")
    await clickItem(client,select_seed_type_click)
}


//To check if the user can add text in Seeding rate text-box
var timeStart = (new Date()).getTime(); 
console.log(colors.red("Enter seeding rate value"))
var seed_rate_field_seed = await findItemById(client,"android.widget.EditText","tiet_seed_rate")
await setValueEditText(client,seed_rate_field_seed,obj.seed_rate)
var timeEnd = (new Date()).getTime();

if(seed_rate_field_seed !== null)
{total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if the user can add text in Seeding rate text-box","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
}else
{total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if the user can add text in Seeding rate text-box","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
}


//To check if the entered seeding rate value is reflected on the screen
var timeStart = (new Date()).getTime(); 
console.log(colors.red("Check seeding rate value"))
var seed_rate_field_seed_value = await findItemByName(client,"android.widget.EditText",obj.seed_rate)
var timeEnd = (new Date()).getTime();

if(seed_rate_field_seed !== null)
{
  total_testcases++;
  pass_testcases++;
    console.log(colors.yellow("Pass"))
    testcase_name("CCR","Field:To check if the entered seeding rate value is reflected on the screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
}else
{total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if the entered seeding rate value is reflected on the screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))  
}


//To check if the user cannot exit the seed settings screen without entering seed mix %
var timeStart = (new Date()).getTime(); 
console.log("Click on Save button to exit Seed Setting screen")
var save_seed_settings2 = await findItemById(client,"android.widget.Button","btn_save")
await clickItem(client, save_seed_settings2)
var timeEnd = (new Date()).getTime();

const add_field_text_check_new = await findItemByName(client,"android.widget.TextView","Add field")

if(add_field_text_check_new == null)
{total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if the user cannot exit the seed settings screen without entering seed mix %","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
} else{
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if the user cannot exit the seed settings screen without entering seed mix %","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    var select_seed_type_clickk = await findItemById(client,"android.widget.TextView","tv_select_seeds")
    await clickItem(client,select_seed_type_clickk)
}


//To check if the user can save seed after inputing valid seed details on seeds settings screen
var timeStart = (new Date()).getTime(); 
console.log(colors.red("Click on the seed drop-down list"))
var drop_down_list= await findItemById(client,"android.widget.Spinner","sp_primary_seed")
await clickItem(client,drop_down_list)
await waitForActivity(client)

console.log(colors.red("Select a seed from the drop-down list"))
console.log(colors.red("Select a seed from the drop-down list"))
var p1= counting/6; //Dividing the total no of seeds by 6. To decide the no of times the loop should execute
var l1=parseInt(p1)  //If the answer is in float or decimal, store in Int format

for(var q1=0;q1<l1;q1++)  //WE will run the loop l no of times
{
  var new_seed_selection_p= await findItemByName(client,"android.widget.CheckedTextView",obj.seed_selection)
  if(new_seed_selection_p == null)  //Checking if the element is not visible on the first screen
  {
    moveTouch(client,602,1024,645,451) //if not visible move to the next screen
   }
else
{
  console.log("Seed Found") //element is found
}
}
var new_seed_selection_pos= await findItemByName(client,"android.widget.CheckedTextView",obj.seed_selection)
await clickItem(client,new_seed_selection_pos)

console.log(colors.red("Check if the user can write text in the mix % textbox"))
var mix_pos= await findItemById(client,"android.widget.EditText","tiet_primary_rate") 
await setValueEditText(client,mix_pos, obj.mix)

console.log(colors.red("Enter seeding rate value"))
var seed_settings_rate= await findItemById(client,"android.widget.EditText","tiet_seed_rate")
await setValueEditText(client,seed_settings_rate,obj.seed_rate)

console.log("Click on Save button to exit Seed Setting screen")
var save_seed_settings_pos = await findItemById(client,"android.widget.Button","btn_save")
await clickItem(client,save_seed_settings_pos )
var timeEnd = (new Date()).getTime();

const add_field_text_check_neww = await findItemByName(client,"android.widget.TextView","Add field")

if(add_field_text_check_neww !== null)
{
  total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if the user can save seed after inputing valid seed details on seeds settings screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

} else{
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if the user can save seed after inputing valid seed details on seeds settings screen","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
}


/************** FIELD NAME TEST CASES */
console.log(colors.red("Save button element creation"))
const save_field_button = await findItemById(client,"android.widget.Button","btn_save")

//To check if user cannot save field,when user saves field name containing only spaces
var timeStart = (new Date()).getTime();
console.log(colors.red("Enter field name"))
const enter_field_name= await findItemById(client,"android.widget.EditText","tiet_field_name")
await setValueEditText(client,enter_field_name,"  ")
await save_field_button.click()
var timeEnd = (new Date()).getTime();

const add_field_text_check_neww1 = await findItemByName(client,"android.widget.TextView","Add field")

if(add_field_text_check_neww1 !== null)
{total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if user cannot save field,when user saves field name containing only spaces","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

} else{
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if user cannot save field,when user saves field name containing only spaces","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

}


//To check if user cannot save field,when user saves field name containing only numbers
var timeStart = (new Date()).getTime();
await setValueEditText(client,enter_field_name,obj.neg_field_name[0])
await save_field_button.click()
var timeEnd = (new Date()).getTime();

if(add_field_text_check_neww1 !== null)
{total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if user cannot save field,when user saves field name containing only numbers","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

} else{
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if user cannot save field,when user saves field name containing only numbers","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

}


//To check if user cannot save field,when user saves field name containing only special characters
var timeStart = (new Date()).getTime();
await setValueEditText(client,enter_field_name,obj.neg_field_name[1])
await save_field_button.click()
var timeEnd = (new Date()).getTime();


if(add_field_text_check_neww1 !== null)
{
  total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","Field:To check if user cannot save field,when user saves field name containing only special characters","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

} else{
  total_testcases++;
  fail_testcases++;
    console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if user cannot save field,when user saves field name containing only special characters","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

}

//To check if user cannot save field,when user saves field name containing combination of only numbers and special characters
var timeStart = (new Date()).getTime();
await setValueEditText(client,enter_field_name,obj.neg_field_name[2])
await save_field_button.click()
var timeEnd = (new Date()).getTime();

if(add_field_text_check_neww1 !== null)
{
  total_testcases++;
  pass_testcases++;
console.log(colors.yellow("Pass"))
testcase_name("CCR","To check if user cannot save field,when user saves field name containing combination of only numbers and special characters","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))

} else{
  total_testcases++;
  fail_testcases++;
      console.log(colors.red("Fail"))
    testcase_name("CCR","Field:To check if user cannot save field,when user saves field name containing combination of only numbers and special characters","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))


}

//To check if user can save field with valid field name
var timeStart = (new Date()).getTime();
await setValueEditText(client,enter_field_name,obj.field_name)
await save_field_button.click()
var timeEnd = (new Date()).getTime();

const add_field_text_check_newww = await findItemByName(client,"android.widget.TextView","Add field")


if(add_field_text_check_newww == null)
{total_testcases++;
  pass_testcases++;
    testcase_name("CCR","Field:To check if user ccan save field with valid field name","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
console.log(colors.yellow("Pass"))
} else{
  total_testcases++;
  fail_testcases++;
    testcase_name("CCR","Field:To check if user can save field with valid field name","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
    console.log(colors.red("Fail"))
}


//Click on Field Manager Screen
var field_manager_screen_click = await findItemById(client,"android.widget.TextView","tv_fields");
await field_manager_screen_click.click();

await waitForActivity(client)

var total_field_counter = await findItemById(client,"android.widget.TextView","tv_mission_count");
var count = await total_field_counter.getText();
var c = parseInt(count)

//To check if the user can click on Field Manager
var timeStart = (new Date()).getTime();
var field_manager_screen =await findItemById(client,"android.widget.TextView","tv_fields");
await clickItem(client,field_manager_screen);
var timeEnd = (new Date()).getTime();

if(field_manager_screen !== null)
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
const field_recently_created_check= await findItemByName(client,"android.widget.TextView",obj.field_name)
var timeEnd = (new Date()).getTime();

if(field_recently_created_check !== null)
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
const dotted_menu= await findItemById(client,"android.widget.ImageView","iv_menu")
var timeEnd = (new Date()).getTime();

if(dotted_menu !== null)
{total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Field:To check if the user is able to view the 3 dotted menu","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 await clickItem(client,dotted_menu)
} else
{total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Field:To check if the user is able to view the 3 dotted menu","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 

}

//To check if user can delete a field
var timeStart = (new Date()).getTime();
const delete_field_created= await findItemByName(client,"android.widget.TextView","Delete")
var timeEnd = (new Date()).getTime();

if(delete_field_created !== null)
{total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Field:To check if user can delete a field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
 await clickItem(client,delete_field_created)
} else
{total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Field:To check if user can delete a field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}


//To check if the total field counter is decremented after deleting a field
var timeStart = (new Date()).getTime();
var updated_field_counter= await findItemById(client,"android.widget.TextView","tv_mission_count")
var count_update = await updated_field_counter.getText()
var c_update = parseInt(count_update)
var timeEnd = (new Date()).getTime();

 if(c-1 == c_update)
 {total_testcases++;
  pass_testcases++;
  testcase_name("CCR","Field:To check if the total field counter is decremented after deleting a field","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
} else
{total_testcases++;
  fail_testcases++;
  testcase_name("CCR","Field:To check if the total field counter is decremented after deleting a field","Fail",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2)) 
}


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
  await moveTouch(client,403,1005,411,243) 
}
    else if(a < 0)
  {
    console.log("second loop")
    await moveTouch(client,403,1005,411,243) 
    await moveTouch(client,403,1005,411,243) 
}
  else
  {
    console.log("No need to scroll")
  }


const set_front_cam= await findItemByName(client,"android.widget.TextView",obj.front_camera_angle)
await set_front_cam.click();

if(a <= 30  && a >= 0)
{
await moveTouch(client,401,317,401,998)   //scroll downwards
}
    else if(a < 0)
  {
    console.log("second loop")
    await moveTouch(client,401,317,401,998)   //scroll downwards
    await moveTouch(client,401,317,401,998)    //scroll downwards
}
  else
  {
    console.log("No need to scroll")
  }


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

 const b = parseInt(obj.left_camera_angle)

if(b <= 30  && b >= 0)
{
  await moveTouch(client,403,1005,411,243) 
}
    else if(b < 0)
  {
    console.log("second loop")
    await moveTouch(client,403,1005,411,243) 
    await moveTouch(client,403,1005,411,243) 
}
  else
  {
    console.log("No need to scroll")
  }

const set_left_cam= await findItemByName(client,"android.widget.TextView",obj.left_camera_angle)
await set_left_cam.click();

if(b <= 30  && b >= 0)
{
    await moveTouch(client,401,317,401,998)
}
    else if(b < 0)
  {
    console.log("second loop")
    await moveTouch(client,401,317,401,998)
    await moveTouch(client,401,317,401,998)
}
  else
  {
    console.log("No need to scroll")
  }

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

 const cc = parseInt(obj.right_camera_angle)

if(cc <= 30  && cc >= 0)
{
    await moveTouch(client,403,1005,411,243) 
}
    else if(cc < 0)
  {
    console.log("second loop")
    await moveTouch(client,403,1005,411,243) 
    await moveTouch(client,403,1005,411,243) 
}
  else
  {
    console.log("No need to scroll")
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
var p2= counting/6; //Dividing the total no of seeds by 6. To decide the no of times the loop should execute
var l2=parseInt(p2)  //If the answer is in float or decimal, store in Int format

for(var q2=0;q2<l2;q2++)  //WE will run the loop l no of times
{
  var new_seed_selection0= await findItemByName(client,"android.widget.CheckedTextView",obj.seed_selection)
  if(new_seed_selection0 == null)  //Checking if the element is not visible on the first screen
  {
    moveTouch(client,602,1024,645,451) //if not visible move to the next screen
   }
else
{
  console.log("Seed Found") //element is found
}
}

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

await sleep(8000) //Wait for a couple of seconds to check if recording begins 

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


  var script_name= "CCR Regression Script"
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
  REPORTER.writeValuesTableEntry(act, `WaitMax(${waitTimeMs}) : ${description}`, itemText, matchValue, timeStop - timeStart);
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
  REPORTER.writeValuesTableEntry(act, description, itemText, matchValue, timeStop - timeStart);
  // writeValuesTableEntry = (activity, description, valueRead, expectedValue, msTime)
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
  