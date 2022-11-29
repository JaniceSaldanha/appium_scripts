Before running any script go to Files ->Internal Storage -> terrasentia (On your tablet) and delete all the files available in the terrasentia folder

Make sure the robot is not connected to Internet.

Place the Appium Scripts folder in the C Drive.
Unzip node modules file

Make sure that node modules folder is present in the folder where all the appium scripts are available. USB debugging must be enabled on your tablet

#Enable usb debugging using the following link or the steps provided below : https://www.embarcadero.com/starthere/xe5/mobdevsetup/android/en/enabling_usb_debugging_on_an_android_device.html

>On the device, go to Settings > About <device>.
>Tap the Build number seven times to make Settings >Developer options available.
>Then enable the USB Debugging option

#Install Android Studio to enable adb device:
Use https://developer.android.com/studio?gclid=EAIaIQobChMI07-YyaWc-wIVp51LBR0Lzgc4EAAYASAAEgKq6fD_BwE&gclsrc=aw.ds to download Android studio

Once the installation is completed 
>Click on More actions
>Select SDK manager
>Select Android versions that you'd wish to support
>On SDK tools tab select Android SDK Platform-tools,Android SDK command-line tools,Adroid SDK Build-Tools 
>Click on Apply. The selected versions and tools will be installed.

#For users who already have Android Studio installed:
Kindly go to SDK Manager and check if SDK Platform-tools has been installed.

#Environment Variable Setup:
>First the user needs to find the SDK folder path.
The path is mostly found in the C drive->Users-->"Your name"(eg Janice)-->AppData-->Local-->Android-->Sdk
Copy the path to set the environment variable.

--Click on search icon next to start and search for Edit environment variable. Hit enter
--System Properties screen will pop-up.Click on Environment variables present at the bottom of the pop-up 
--Click on New below System variables.
--Enter variable name as ANDROID_HOME
--Copy paste the SDK path as variable value. eg C:\Users\janice\AppData\Local\Android\Sdk
--Click on New below Sytem variables
 --Enter variable name as ANDROID_SDK_ROOT
--Copy paste the SDK path as variable value. eg C:\Users\janice\AppData\Local\Android\Sdk
--Click on Ok to add the environment variables

Once SDk path is set we will be able to run the adb command

#Before executing the script we need to change the device name in the script:

run 'adb devices ' on cmd prompt
This will give you your device name.
Copy the device name and display it as your device name in the appium script.
Steps to perform to setup and execute the appium scripts Windows :


#Install nodejs using this following link

https://nodejs.org/en/download/

#Download Git-Bash

https://gitforwindows.org/

#Run the below commands on GitBash
Open Gitbash in the folder where all the appium scripts are present and run the below command

Write "npm install -g appium"
Write "npm install webdriverio keycode colors sleep-promise fs moment"


For database Installation:

-Write npm install sqlite3


#Open Gitbash in the folder where all the appium scripts are present and run the below command

Run appium --port 5736 --platform-name Android --device-ready-timeout 1 --session-override

Don't close this tab.

#Open another Gitbash in the folder where all the appium scripts are present and run
export ANDROID_SDK_ROOT= "enter sdk folder path" eg export ANDROID_SDK_ROOT=/c/Users/janice/AppData/Local/Android/Sdk
export ANDROID_HOME="enter sdk folder path"      eg export ANDROID_HOME=/c/Users/janice/AppData/Local/Android/Sdk

#Open another Gitbash in the folder where all the appium scripts are present and run the below command to run the appium script

node ./<scriptname.js> eg node ./create_trait.js



#Incase you wish to run database as well, you need to un-comment 
 //const Database1 = require('./database_connection.js'); 
//const DATABASE = new Database1() 
 //DATABASE.tableEntry(id,test_case,out,execution_time)


//We need to make changes in robot name according to the robot type. Eg For CCR robot the robot name will change to CCR, for Phenotype: TS and for TerraMax: TSMax

The changes will be made in the dabase.connection file : var robot="TS" // This variable value will change according to robot type




#If the user wishes to view contents of the Database Table:
>Go to SQL DB browser downloads :https://sqlitebrowser.org/dl/
>Select windows option : DB Browser for SQLite - Standard installer for 64-bit Windows  (For 64-bit OS) 
>Select windows option : DB Browser for SQLite - Standard installer for 32-bit Windows  (For 32-bit OS) 
>Click on the installed file.

#Steps to SetUp SQL DB Browser:
>Click on Next
>Check (I accept the terms in the License Agreement) and click on Next
>Check (DB Sqlite Desktop) and click on Next
>Click on Next
>Click on Install.
>Click on Finish once installation is completed.


#Steps to be followed after Setup has been completed:
>Go to your Desktop and click on DB browser for SQLite
>Click on Open Database at the top of the screen.
>Navigate to the AppiumScripts folder shared with you.
>Select database.db file. (this file will contain all your database enteries)

#SQL Queries Execution:
>Click on Execute SQL
>Enter your query in the sql file.

#Database Structure will provide you the schema 
#Browse Data will provide you the list of enteries in all the tables.

