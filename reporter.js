const fs = require('fs');
const colors = require('colors');
const moment = require ('moment');





// Writes in HTML format. 
// Double click file to see the content. 

module.exports = class Reporter{ //("./.",test,"./configuration.js")
    constructor(outputPath, pathPrepend, automationFilePath){
        if(outputPath[outputPath.length - 1] == '/') outputPath = outputPath.substring(0, outputPath.length - 1);
        this.outputPath = outputPath;
        this.pathPrepend = pathPrepend;
        this.valuesReadString = this.createValuesTable();
        let date = new Date()
        this.scriptdate= moment(date).format('DD-MMM-YYYY_HH-mm') 
        console.log(colors.red(this.scriptdate))
        this.dateString = date.toISOString().split('T')[0]
        this.timeString = (date.toLocaleTimeString('en-US', {   //displaying time in 24hr format
            hour12: false,
          })).replace(" ","");
        const foldername= `${this.outputPath}/${this.pathPrepend}`
        try
        {
            if(!fs.existsSync(foldername))
            {
                fs.mkdirSync(foldername)
            }
        }catch(err){
            console.error(err)
        }

        if(this.pathPrepend != null || this.pathPrepend != ""){
            this.filePath =  `${foldername}/${this.pathPrepend}_${this.scriptdate}.html` //-${this.timeString}  
        }else{
            this.filePath =  `${foldername}/${this.scritpdate}.html`   
        }
        this.automationParams = this.readAutomationFile(automationFilePath);
        this.createTable();
    }
       

    createValuesTable = () => {
      this.valuesReadString = `<hr><h4>Values Read :</h4><table><tr>`;
      this.valuesReadString = this.valuesReadString + `<th>Activity</th>`;
        this.valuesReadString = this.valuesReadString + `<th>Description</th>`;
     this.valuesReadString = this.valuesReadString + `<th>Read Value</th>`;
       this.valuesReadString = this.valuesReadString + `<th>Expected Value</th>`;
       this.valuesReadString = this.valuesReadString + `<th>Time (ms)</th>`;
        this.valuesReadString = this.valuesReadString + `<th>issue</th>`;
       this.valuesReadString = this.valuesReadString + `</tr>`
       return this.valuesReadString;
    }



    createTable = () => {

        var autoParamHeaderList = "";
        for(var i = 0; i < this.automationParams["keys"].length; i++){
            var header = this.automationParams["keys"][i];
            autoParamHeaderList = autoParamHeaderList + `<th>${header}</th>`;
        }
        var autoParamValueList = "";
        for(var i = 0; i < this.automationParams["keys"].length; i++){
            var header = this.automationParams["keys"][i];
            var value = this.automationParams["object"][header];
            autoParamValueList = autoParamValueList + `<td>${value}</td>`;
        }
        fs.writeFileSync(this.filePath, `<style>table, th, td {border: 1px solid black;border-collapse: collapse; padding: 10px;}</style>\n`);
       fs.appendFileSync(this.filePath, `<h2> ${this.dateString}-${this.timeString} Android Automation. </h2>`);
        fs.appendFileSync(this.filePath, `<h4> Given parameters : </h4>`);
       fs.appendFileSync(this.filePath, `<table><tr>${autoParamHeaderList}</tr><tr>${autoParamValueList}</tr></table>`);
        fs.appendFileSync(this.filePath, "<hr>");
        fs.appendFileSync(this.filePath, `<h3> Test </h3>`);
        fs.appendFileSync(this.filePath, `<table><tr><th>Activity</th><th>ID</th><th>Action</th><th>Value</th><th>Time (ms)</th><th style="color:#FF0000">Issue</th></tr>`)

        // headers : 
        // Activity | Action | set value | ProcessTime (optional) | issue

    }


    writeLog = (activity, resId, action, value, msTime, issue) => {
        var act = activity.split('.');
        act = act[act.length - 1];
        fs.appendFileSync(this.filePath, `<tr><td>${act}</td><td>${resId}</td><td>${action}</td><td>${value}</td><td>${msTime}</td><td style="color:#FF0000">${issue}</td></tr>`)
    }


    writeReadValuesMatchLog = (activity, description, valueRead, expectedValue, msTime) => {
        var act = activity.split('.');
        act = act[act.length - 1];
        var expValue = expectedValue;
        var issue = "<td>-</td>";
        if(expectedValue == null){
            expValue = "None";
        }else{
            if(String(valueRead).replace(" ", "") != String(expectedValue).replace(" ", "")){
                issue = `<td style="color:#FF0000">Value doesn't match expected value.</td>`;
            }else{
                issue = `<td style="color:#00FF00">Match</td>`; 
            }
        }
        this.valuesReadString = this.valuesReadString + `<tr>`;
        this.valuesReadString = this.valuesReadString + `<td>${act}</td>`;
        this.valuesReadString = this.valuesReadString + `<td>${description}</td>`;
        this.valuesReadString = this.valuesReadString + `<td>${valueRead}</td>`;
        this.valuesReadString = this.valuesReadString + `<td>${expValue}</td>`;
        this.valuesReadString = this.valuesReadString + `<td>${msTime}</td>`;
        this.valuesReadString = this.valuesReadString + `${issue}`;
        this.valuesReadString = this.valuesReadString + `</tr>`
    }

    writeReadValuesRangeLog = (activity, description, valueRead, expectedValueLower, expectedValueHigher, msTime) => {
        var act = activity.split('.');
        act = act[act.length - 1];
        var issue = "<td>-</td>";
        try{
            if((valueRead) <= (expectedValueHigher) || (expectedValueLower) <= (valueRead)){
                issue = `<td style="color:#00FF00">Match</td>`;
            }else{
                issue = `<td style="color:#FF0000">Value doesn't match expected value.</td>`;
            }
        }catch(exception){
            issue = `<td style="color:#FF0000">Value doesn't match expected value.</td>`;
        }
        this.valuesReadString = this.valuesReadString + `<tr>`;
        this.valuesReadString = this.valuesReadString + `<td>${act}</td>`;
        this.valuesReadString = this.valuesReadString + `<td>${description}</td>`;
        this.valuesReadString = this.valuesReadString + `<td>${valueRead}</td>`;
        this.valuesReadString = this.valuesReadString + `<td>${expectedValueLower} to ${expectedValueHigher}</td>`;
        this.valuesReadString = this.valuesReadString + `<td>${msTime}</td>`;
        this.valuesReadString = this.valuesReadString + `${issue}`;
        this.valuesReadString = this.valuesReadString + `</tr>`
    }

    closeReadValuesTable = () => {
        this.valuesReadString = this.valuesReadString + `</table>`;
        //console.log(colors.red("END\n" + this.valuesReadString));

        fs.appendFileSync(this.filePath, this.valuesReadString)
    }

   
  
    totExecutionTime =(roundoffsec,roundoffminutes,script_name) =>
    {
        fs.appendFileSync(this.filePath,`<h4>`+"Script Name:"+`${script_name}`+`</h4>`);
        fs.appendFileSync(this.filePath,`<h4>`+"Total Execution Time in seconds:"+`${roundoffsec}`+"secs"+`</h4>`);
        fs.appendFileSync(this.filePath,`<h4>`+"Total Execution Time in minutes:"+`${roundoffminutes}`+"mins"+`</h4>`);
       
    }
    


    closeTable = () => {
        fs.appendFileSync(this.filePath, "</table>");
       
        this.closeReadValuesTable();

    }


    readAutomationFile = (automationFilePath) => {
        var obj = JSON.parse(fs.readFileSync(automationFilePath, 'utf8'));
        var keys = Object.keys(obj);
        return {
            "keys":keys,
            "object":obj
        }
          

    }
}


