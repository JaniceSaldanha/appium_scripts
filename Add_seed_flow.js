const driver = require("webdriverio"); //webdriverio
const assert = require("assert");
const keycode = require('keycode');
const sleep = require('sleep-promise');
const colors = require('colors');
// const params = require('minimist')(process.argv.slice(2));
const Reporter = require('./testreport.js');
const REPORTER = new Reporter('./', 'Add New Seed', `./Configuration1.json`);
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

const fab_button3= await findItemById(client,"android.widget.ImageButton","fab_create")

if(fab_button3 !== null)
{total_testcases++;
  pass_testcases++;
  console.log(colors.yellow("Pass"))
testcase_name("CCR","Seed:To check if user can click on X icon on Add Seed Screen","Pass",(((timeEnd-timeStart)% 60000) / 1000).toFixed(2))
await clickItem(client,fab_button3)
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


 
//client.back()  

result_table(total_testcases,pass_testcases,fail_testcases)


var script_name= "Add new Seed"
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