const fs = require('fs');             //file object
const colors = require('colors');    //display contents in different colors
const moment = require('moment');   //required for date format
const { executionAsyncId } = require('async_hooks');
const { table } = require('console');



// Writes in HTML format. 
// Double click file to see the content. 

module.exports = class Reporter { //("./.",test,"./configuration.js")
    constructor(outputPath, pathPrepend, automationFilePath) {
        this.outputPath;
        this.pathPrepend;
        this.scriptdate;
        this.dateString;
        this.timeString;
        this.pathPrepend;
        this.filePath;
        this.initializeValues(outputPath, pathPrepend, automationFilePath);

        this.summaryTableString = this.createSummaryTable(); //Test Case Summary
        this.valuesTableString = this.createValuesTable();   //Values reading the connection data
        this.executionTableString = this.createExecutionTable(); //Table containing the detailed description of every action
        this.resultTableString = this.createResultTable();  //Table containing Tot count of testCases, Pass and fail testcases
        this.createTitleTable();

        this.automationParams = this.readAutomationFile(automationFilePath);    
        this.parameterTableString = this.createParameterTable();
    }

    totExecutionTime = (roundoffsec, roundoffminutes, script_name) => {
        var seconds_2digitsfixed = roundoffsec.toFixed(2)    //To displya only 2 digits
        fs.appendFileSync(this.filePath, `<h4>` + "Script Name:" + `${script_name}` + `</h4>`);
        fs.appendFileSync(this.filePath, `<h4>` + "Total Execution Time in seconds:" + `${seconds_2digitsfixed}` + "secs" + `</h4>`);
        fs.appendFileSync(this.filePath, `<h4>` + "Total Execution Time in minutes:" + `${roundoffminutes}` + "mins" + `</h4>`);
    }


    createExecutionTable = () => {
        this.executionTableString =  `<h3> Automation Test :</h3><table><tr>`;
        this.executionTableString =this.executionTableString +`<th>Activity</th><th>ID</th><th>Action</th><th>Value</th><th>Time (ms)</th><th style="color:#FF0000">Output</th></tr>`;
        return this.executionTableString;
    }

    createResultTable = () =>{
           this.resultTableString = `<h3>Results:</h3><table><tr>`;
           this.resultTableString= this.resultTableString + `<th>Total Test Cases</th>`;
           this.resultTableString = this.resultTableString + `<th>TestCases Passed</th>`;
           this.resultTableString = this.resultTableString + `<th>TestCases Failed</th>`;
           this.resultTableString = this.resultTableString + `</tr>`
           return this.resultTableString;
    }

    createSummaryTable = () => {
        this.summaryTableString = `<h3>Summary :</h3><table><tr>`;
        this.summaryTableString = this.summaryTableString + `<th>TestCase ID</th>`;
        this.summaryTableString = this.summaryTableString + `<th>TestCase Name</th>`;
        this.summaryTableString = this.summaryTableString + `<th>Output</th>`;
        this.summaryTableString = this.summaryTableString + `<th>Time(secs)</th>`;
        this.summaryTableString = this.summaryTableString + `</tr>`
        return this.summaryTableString;
    }


    createValuesTable = () => {
        this.valuesTableString = `<hr><h3>Values Read :</h3><table><tr>`;
        this.valuesTableString = this.valuesTableString + `<th>Activity</th>`;
        this.valuesTableString = this.valuesTableString + `<th>Description</th>`;
        this.valuesTableString = this.valuesTableString + `<th>Read Value</th>`;
        this.valuesTableString = this.valuesTableString + `<th>Expected Value</th>`;
        this.valuesTableString = this.valuesTableString + `<th>Time (ms)</th>`;
        this.valuesTableString = this.valuesTableString + `<th>issue</th>`;
        this.valuesTableString = this.valuesTableString + `</tr>`
        return this.valuesTableString;
    }

createParameterTable = () => {

    var autoParamHeaderList = "";
    var autoParamValueList = "";

   this.parameterTableString= this.parameterTableString + `<h3> Given Parameters : </h3> <table>`
   for (var i = 0; i < this.automationParams["keys"].length; i++) {
    var header = this.automationParams["keys"][i];
    var value = this.automationParams["object"][header];
    autoParamHeaderList = `<tr><th>${header}</th>`;
    autoParamValueList = `<td>${value}</td></tr>`;
    this.parameterTableString= this.parameterTableString +`${autoParamHeaderList}${autoParamValueList}`;
}
return this.parameterTableString ;
}
   

  
    // todo @janice : Old function name : createTable()

    createTitleTable = () => {

        fs.appendFileSync(this.filePath, `<style>table, th, td {border: 1px solid black;border-collapse: collapse; padding: 10px;}</style>\n`);
        fs.appendFileSync(this.filePath, `<h2> ${this.dateString}-${this.timeString} Android Automation Script. </h2>`);
        
    }


    writeResultEntry = (total, pass,fail) => {
var total_test_cases = total;
var pass_test_cases = pass;
var fail_test_cases = fail;

this.resultTableString = this.resultTableString + `<tr>`;
this.resultTableString = this.resultTableString + `<td>${total_test_cases}</td>`;
this.resultTableString= this.resultTableString + `<td> ${pass_test_cases}</td>`;
this.resultTableString = this.resultTableString + `<td>${fail_test_cases}</td>`;
this.resultTableString = this.resultTableString+ `</tr>`;
    }

    // todo @janice : Old function name :writetestcase
    writeSummaryEntry = (test_id,testcase_name, output, execution_time) => {
         var id = test_id
        var test = testcase_name;
        var out = output;
        console.log(out)
        var tottime = execution_time;
        if (out == "Pass")
            out = `<td style="color:#00FF00">Pass</td>`;
        else if (out == "Fail")
            out = `<td style="color:#FF0000">Fail</td>`;
        else
            out = `<td style="color:#FF0000">-</td>`

        this.summaryTableString = this.summaryTableString + `<tr>`;
        this.summaryTableString = this.summaryTableString + `<td>${id}</td>`;
        this.summaryTableString = this.summaryTableString + `<td>${test}</td>`;
        this.summaryTableString = this.summaryTableString + `${out}`;
        this.summaryTableString = this.summaryTableString + `<td>${tottime}</td>`;
        this.summaryTableString = this.summaryTableString + `</tr>`;
    }


    // todo @janice : Old function name : writeLog(...)
    writeExecutionTableEntry = (activity, resId, action, value, msTime, issue) => {
        var act = activity.split('.');
        act = act[act.length - 1];
        this.executionTableString = this.executionTableString +  `<tr><td>${act}</td><td>${resId}</td><td>${action}</td><td>${value}</td><td>${msTime}</td><td style="color:#FF0000">${issue}</td></tr>`;
    }


    // todo @janice : Old function name : writeReadValuesMatchLog(...);
    writeValuesTableEntry = (activity, description, valueRead, expectedValue, msTime) => {
        var act = activity.split('.');
        act = act[act.length - 1];
        var expValue = expectedValue;
        var issue = "<td>-</td>";
        if (expectedValue == null) {
            expValue = "None";
        } else {
            if (String(valueRead).replace(" ", "") != String(expectedValue).replace(" ", "")) {
                issue = `<td style="color:#FF0000">Value doesn't match expected value.</td>`;
            } else {
                issue = `<td style="color:#00FF00">Match</td>`;
            }
        }
        this.valuesTableString = this.valuesTableString + `<tr>`;
        this.valuesTableString = this.valuesTableString + `<td>${act}</td>`;
        this.valuesTableString = this.valuesTableString + `<td>${description}</td>`;
        this.valuesTableString = this.valuesTableString + `<td>${valueRead}</td>`;
        this.valuesTableString = this.valuesTableString + `<td>${expValue}</td>`;
        this.valuesTableString = this.valuesTableString + `<td>${msTime}</td>`;
        this.valuesTableString = this.valuesTableString + `${issue}`;
        this.valuesTableString = this.valuesTableString + `</tr>`
    }

    writeReadValuesRangeLog = (activity, description, valueRead, expectedValueLower, expectedValueHigher, msTime) => {
        var act = activity.split('.');
        act = act[act.length - 1];
        var issue = "<td>-</td>";
        try {
            if ((valueRead) <= (expectedValueHigher) || (expectedValueLower) <= (valueRead)) {
                issue = `<td style="color:#00FF00">Match</td>`;
            } else {
                issue = `<td style="color:#FF0000">Value doesn't match expected value.</td>`;
            }
        } catch (exception) {
            issue = `<td style="color:#FF0000">Value doesn't match expected value.</td>`;
        }
        this.valuesTableString = this.valuesTableString + `<tr>`;
        this.valuesTableString = this.valuesTableString + `<td>${act}</td>`;
        this.valuesTableString = this.valuesTableString + `<td>${description}</td>`;
        this.valuesTableString = this.valuesTableString + `<td>${valueRead}</td>`;
        this.valuesTableString = this.valuesTableString + `<td>${expectedValueLower} to ${expectedValueHigher}</td>`;
        this.valuesTableString = this.valuesTableString + `<td>${msTime}</td>`;
        this.valuesTableString = this.valuesTableString + `${issue}`;
        this.valuesTableString = this.valuesTableString + `</tr>`
    }

    closeExecutionTable = () => {  
        this.executionTableString = this.executionTableString + `</table>`;
        fs.appendFileSync(this.filePath,this.executionTableString);
    }

    closeResultTable = () =>{
        this.resultTableString = this.resultTableString + `</table>` ;
        fs.appendFileSync(this.filePath,this.resultTableString);
    }

    closeReadValuesTable = () => {
        this.valuesTableString = this.valuesTableString + `</table>`;
        //console.log(colors.red("END\n" + this.valuesReadString));
        fs.appendFileSync(this.filePath, this.valuesTableString);
    }

    // todo @janice : Old function name : closeTestCaseTable()
    closeSummaryTable = () => {
        this.summaryTableString = this.summaryTableString + `</table>`;
        fs.appendFileSync(this.filePath, this.summaryTableString)
    }

    closeParameterTable = () => {

        this.parameterTableString = this.parameterTableString + `</table>`;
        fs.appendFileSync(this.filePath,this.parameterTableString)
    }


    closeTable = () => {
        // todo @janice : Change order below as you wish
        this.closeResultTable();
        this.closeReadValuesTable();
        this.closeSummaryTable(); 
        this.closeExecutionTable(); 
        this.closeParameterTable();
    }


    readAutomationFile = (automationFilePath) => {
        var obj = JSON.parse(fs.readFileSync(automationFilePath, 'utf8')); //converting the text that is read into Json format
        var keys = Object.keys(obj);  //returns an arry of elements
        return {
            "keys": keys,
            "object": obj
        }
    }


    initializeValues = (outputPath, pathPrepend, automationFilePath) => {
        if (outputPath[outputPath.length - 1] == '/') outputPath = outputPath.substring(0, outputPath.length - 1);
        this.outputPath = outputPath;
        this.pathPrepend = pathPrepend;
        const foldername = `${this.outputPath}/${this.pathPrepend}`;       //eg The folder name is the name mentioned in("./.",test,"./configuration.js")
        try {
            if (!fs.existsSync(foldername)) {          //if the folder doesn't exist create a new folder{
                fs.mkdirSync(foldername)            //create a new folder 
            }
        } catch (err) {
            console.error(err)
        }
        let date = new Date()  // This step will provide you the current date
        this.scriptdate = moment(date).format('DD-MMM-YYYY_HH-mm')  //Save the report name with this date format
        //console.log(colors.red(this.scriptdate))
        this.dateString = date.toISOString().split('T')[0]    // Converting date to ISO format
        this.timeString = (date.toLocaleTimeString('en-US', {   //displaying time in 24hr format
            hour12: false,
        })).replace(" ", "");
        if (this.pathPrepend != null || this.pathPrepend != "") {
            this.filePath = `${foldername}/${this.pathPrepend}_${this.scriptdate}.html` //-${this.timeString} //location to save the file  
        } else {
            this.filePath = `${foldername}/${this.scritpdate}.html`       //location to save the file
        }
        fs.writeFileSync(this.filePath, "")
    }
}
