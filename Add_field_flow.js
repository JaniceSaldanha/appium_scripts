const driver = require("webdriverio"); //webdriverio
const assert = require("assert");
const keycode = require('keycode');
const sleep = require('sleep-promise');
const colors = require('colors');
// const params = require('minimist')(process.argv.slice(2));
const Reporter = require('./testreport.js');
const REPORTER = new Reporter('./', 'Add New Field', `./Configuration1.json`);
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
await clickItem(client,field_manager_screen_click);

var total_field_counter= await findItemById(client,"android.widget.TextView","tv_mission_count")
var count = await total_field_counter.getText()
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


result_table(total_testcases,pass_testcases,fail_testcases)


var script_name= "Add new field"
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
