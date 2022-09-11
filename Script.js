// TODO: Modify this function
//first 3 character are storeId following 4 character are transactionId, The left 2 character are day and month
function generateShortCode(storeId, transactionId) {
    // Logic goes here
    //storeID
    let resultStoreId= new Array(3).fill('Z');
    let storeIdList=[...String(storeId)];
    for (let i=0;i<storeIdList.length;i++){
        //make every number increase by 3
        const encryptedNum=Number(storeIdList[i])+3 +65;
        resultStoreId[i]=String.fromCharCode(encryptedNum);
    }
    //transactionId
    let resultTransactionId= new Array(4).fill('Z');

    let transactionIdList=[...String(transactionId)];
    for (let i=0;i<transactionIdList.length;i++){
        //make every number increase by 3
        const encryptedNum=Number(transactionIdList[i])+3 +65;
        resultTransactionId[i]=String.fromCharCode(encryptedNum);
    }
    // Date
    let newDate=new Date();
    let dateList=[...String(newDate.getDate())];
    const dateId=dateList.map(function (value){
        const encryptedNum=Number(value)+3 +65;
        return String.fromCharCode(encryptedNum);
    })

    const result=[...resultStoreId,...resultTransactionId,...dateId];
    return result.join('');
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
    // Logic goes here
    const storeIdList=[];
    const tranIdList=[];
    const codeList=[...shortCode];
    for (let i=0; i<codeList.length; i++){
        //storeID part
        if (i<3 && codeList[i]!=='Z'){
            storeIdList.push(codeList[i].charCodeAt()-65-3);
        }
        else if (i>=3 &&i<7 && codeList[i]!=='Z'){
            tranIdList.push(codeList[i].charCodeAt()-65-3);
        }
    }

    return {
        storeId: Number(storeIdList.join('')), // store id goes here,
        shopDate: new Date(), // the date the customer shopped,
        transactionId: Number(tranIdList.join('')), // transaction id goes here
    };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}


