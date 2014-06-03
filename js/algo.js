/**
 * Created by Zeeshan on 6/4/14.
 */

function fcfs() {
    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.arrT = 0;
        this.waitT = 0;
        this.turnT = 0;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value;
    var srvcTArr = serviceTime();
    var arrTArr = arrivalTime();
    var process = [];
    var totalTime = 0;
    var fcfs = [];
    var dispatcher = new Process();
    dispatcher.srvcT = Number(1);
    dispatcher.no = Number(16);
    for (var i = 0; i < Number(noOfProcess); i++)
        process.push(new Process());
    for (var i = 0; i < Number(noOfProcess); i++) {
        process[i].no = i;
        process[i].srvcT = srvcTArr[i];
        totalTime += Number(process[i].srvcT);
        process[i].arrT = arrTArr[i];

    }
    process = sortIt2(process);
    var count = -1;
    for (var i = 0; i < Number(noOfProcess * 2 - 1); i++) {
        if (i % 2 === 0)
            fcfs.push(process[++count]);
        else
            fcfs.push(dispatcher);
    }

    var incx = 0, y = 50;
    var x = Number(arrTArr[0]) * 30 + 50;
    for (var i = 0; i < Number(noOfProcess * 2 - 1); i++) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * fcfs[i].no, fcfs[i].srvcT * 30, 17);
        incx += fcfs[i].srvcT * 30;
    }
}
function spn() {
    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.waitT = 0;
        this.turnT = 0;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value;
    var srvcTArr = serviceTime();
    var arrTArr = arrivalTime();
    var process = [];
    for (var i = 0; i < noOfProcess + 1; i++)
        process.push(new Process());
    for (var i = 1; i < noOfProcess + 1; i++) {
        process[i].no = i - 1;
        process[i].srvcT = srvcTArr[i - 1];
    }
    var temp = new Process();
    alert("chk 2");
    for (var i = 1; i < noOfProcess; i++)
        for (var j = i + 1; j < noOfProcess + 1; j++) {

            if (process[i].srvcT > process[j].srvcT) {
                temp = process[i];
                process[i] = process[j];
                process[j] = temp;
            }
        }
    var incx = 0, y = 50;
    var x = Number(arrTArr[0]) * 30 + 50;
    for (var i = 1; i < noOfProcess + 1; i++) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * process[i].no, process[i].srvcT * 30, 17);
        incx += process[i].srvcT * 30;
    }
}
function spn2() {
    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.arrT = 0;
        this.waitT = 0;
        this.turnT = 0;
        this.state;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value;
    var srvcTArr = serviceTime();
    var arrTArr = arrivalTime();
    var process = [];
    var totalBT = 0;
    var pIndex = 0;
    var count = -1;
    var sPN = [];
    var tempArr = [];
    var sPN2 = [];
    var tempArr2 = [];
    var transfer = [];
    var dispatcher = new Process();
    dispatcher.no = 16;
    dispatcher.srvcT = Number(1);
    var tempQueue = [];
    var arrTMax = 8;
    for (var i = 0; i < Number(noOfProcess); i++) {
        process.push(new Process());
        transfer.push(new Process());
    }
    for (var i = 0; i < Number(noOfProcess); i++) {
        process[i].no = i;
        process[i].srvcT = srvcTArr[i];
        totalBT += Number(process[i].srvcT);
        process[i].arrT = arrTArr[i];
        transfer[i].no = i;
        transfer[i].srvcT = srvcTArr[i];
        transfer[i].arrT = arrTArr[i];
    }
    var tAT = process[0].arrT;
    while (process[++count].arrT == tAT) {
        tempArr[count] = process[count];
        tempArr2[count] = transfer[count];

    }
    tempArr = sortIt(tempArr);
    tempArr2 = sortIt(tempArr2);
    for (var i = tempArr.length; i < process.length; i++) {
        tempArr[i] = process[i];
        tempArr2[i] = transfer[i];
    }
    for (var i = 0; i < process.length; i++) {
        process[i] = tempArr[i];
        transfer[i] = tempArr2[i];
    }
    sPN.push(transfer[0]);
    function addRange(dest, src) {
        for (var i = 0; i < src.length; i++) {
            dest.push(src[i]);
        }
    }

    var maxcomp;
    var inflag = false;
    for (var i = 0; i < Number(totalBT); i++) { //var cnt = pIndex;
        while ((tempArr[pIndex].srvcT--) != 0) {
            for (var k = pIndex + 1; k < process.length; k++)
                if (tempArr[k].arrT == i) {

                    tempQueue.push(transfer[k]);	//tempQueue.push(process[k]);

                }

            i++;
            maxcomp = i;

        }
        pIndex++;
        tempQueue = sortIt(tempQueue);
        for (var m in tempQueue) {
            sPN.push(tempQueue[m]);
        }
        for (var l in sPN)
            tempQueue = [];
        if (maxcomp >= arrTMax)
            break;
    }

    var spnPrint = [];
    var counti = -1;
    for (var i = 0; i < Number(noOfProcess * 2 - 1); i++) {
        if (i % 2 === 0)
            spnPrint.push(sPN[++counti]);
        else
            spnPrint.push(dispatcher);
    }
    var incx = 0, y = 50;
    var x = Number(arrTArr[0]) * 30 + 50;
    for (var i = 0; i < Number(noOfProcess * 2 - 1); i++) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * spnPrint[i].no, spnPrint[i].srvcT * 30, 17);
        incx += spnPrint[i].srvcT * 30;
    }
}
function srn() {
    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.arrT = 0;
        this.waitT = 0;
        this.turnT = 0;
        this.state;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value;
    var srvcTArr = serviceTime();
    var arrTArr = arrivalTime();
    var process = [];
    var totalTime = 0;
    for (var i = 0; i < noOfProcess + 1; i++)
        process.push(new Process());

    //alert(Number(noOfProcess) + 1);
    for (var i = 1; i < (Number(noOfProcess) + 1); i++) {
        process[i].no = i - 1;
        process[i].srvcT = srvcTArr[i - 1];
        totalTime += Number(process[i].srvcT);
        process[i].arrT = arrTArr[i - 1];
        process[i].state = "T";
        //alert(totalTime);

    }
    var count = 0;
    var tempArr = [];
    var tAT = process[1].arrT;//alert("trying frst");
    while (process[++count].arrT == tAT) {
        tempArr[count] = process[count];
    }
    tempArr = sortIt(tempArr);
    for (var i = tempArr.length; i < process.length; i++) {
        tempArr[i] = process[i];
    }
    process = tempArr;
    //alert(totalTime);
    var temp;//= new Process();
    var temp1;// = new Process();
    for (var i = noOfProcess; i > 0; i--) {
        for (var j = 3; j < Number(noOfProcess + 1); j++) {

            if (process[j - 1].srvcT > process[j].srvcT) {
                temp = process[j - 1];
                process[j - 1] = process[j];
                process[j] = temp;
            }
        }
    }
    /*
     var np = Number(noOfProcess)+1;
     for(var i = 1; i < np ; i++)
     {
     alert("in loop" + noOfProcess);
     alert("Process " + process[i].no + " ST " +  process[i].srvcT + " AT " + process[i].arrT);
     }
     //var i,Tt=0,temp,j,t,TWt=0.0,w=0.0;
     var i;
     var w = 0.0;
     var t;
     process[1].waitT = 0;
     w = w + process[1].srvcT;
     t = w;
     process[1].state = "F";
     while(w < totalTime)
     {
     i=2; //alert("in while 1");
     while(i <= noOfProcess)
     {//alert("in while 2");
     if(process[i].state == "T" && process[i].arrT <= t)
     {
     process[i].waitT = w;
     process[i].state = "F";
     w += process[i].srvcT;
     t=w;
     i=2;
     }
     else
     i++;
     }
     }
     var np = Number(noOfProcess)+1;
     for(var i = 1; i < np ; i++)
     {
     alert("in loop");
     alert("Process " + process[i].no + " ST " +  process[i].srvcT + " AT " + process[i].arrT);
     }*/

    //alert("out loop");
    var incx = 0, y = 50;
    var x = Number(arrTArr[0]) * 30 + 50;
    for (var i = 1; i < noOfProcess + 1; i++) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * process[i].no, process[i].srvcT * 30, 17);
        incx += process[i].srvcT * 30;
    }
    /*for(var i = 1; i < noOfProcess+1 ; i++)
     {
     process[i].waitT = Number(process[i-1].waitT) + Number(process[i-1].srvcT);
     process[i].turnT = Number(process[i].waitT) + Number(process[i].srvcT);
     //alert("wt "+process[i].waitT+" tt " + process[i].turnT);
     }//alert(noOfProcess);
     for(var i = 1; i < noOfProcess+1 ; i++)
     {
     alert( " i " + i + " " +process[i].srvcT);
     }*/

}
function roundRobin() {
    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.arrT = 0;
        this.waitT = 0;
        this.turnT = 0;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value;
    var srvcTArr = serviceTime();
    var arrTArr = arrivalTime();
    var quantamT, maxT = 0;
    var count = [];
    var robin = new Array(Number(noOfProcess));
    var process = [];
    for (var t in srvcTArr) {
        if (maxT < srvcTArr[t])
            maxT = Number(srvcTArr[t]);
    }
    //read quantum time
    quantamT = Number(prompt("Please Enter Quantam Time, Default : 4", 4));
    var noOfBreaks = Math.floor(Number(maxT) / Number(quantamT) + 1);
    alert("no of brks " + noOfBreaks + " robin.length " + robin.length);
    for (var p = 0; p < Number(noOfProcess * noOfBreaks); p++)
        process.push(new Process());

    for (var i = 0; i < robin.length; i++)
        robin[i] = new Array(Number(noOfBreaks));

    for (var i = 0; i < noOfProcess; i++)
        for (var j = 0; j < robin[i].length; j++)
            robin[i][j] = 0;

    //var i = 0;
    var pIndex = 0;
    var bIndex;
    while (pIndex < Number(noOfProcess)) {
        bIndex = 0;//alert(" robin in while 1 srvct " + srvcTArr[pIndex] + " pIndex  "+ pIndex+ " qt " + quantamT);
        while (srvcTArr[pIndex] > 0) {//alert(" robin in while 2");
            if (srvcTArr[pIndex] >= quantamT) {//alert(" robin in if pIndex " + pIndex);
                srvcTArr[pIndex] = srvcTArr[pIndex] - (quantamT);//alert("working 1");
                robin[pIndex][bIndex] = quantamT;//alert("working 1"); // worked fine on here 18 oct
                bIndex++;
            }
            else {//alert(" robin in else pind" + pIndex + "bind " + bIndex);
                //alert(robin[pIndex][bIndex]);
                robin[pIndex][bIndex] = srvcTArr[pIndex];//alert(" robin in else 1 ran");
                srvcTArr[pIndex] = 0;//alert(" robin in else 2 ran");
                bIndex++;//alert(" robin in else e");
            }
        }
        count[pIndex] = Number(bIndex - 1);
        pIndex++;//alert(" robin in while 1");
    }

    /*for(var i= 0; i < Number(noOfProcess); i++)
     for(var j = 0; j< Number(noOfBreaks) ; j++)
     alert(" robin[" + i + "][" + j + "] : " + robin[i][j]);*/
    var indexx = -1;
    for (var j = 0; j < Number(noOfBreaks); j++)
        for (var i = 0; i < Number(noOfProcess); i++) {
            process[++indexx].no = i;
            process[indexx].srvcT = robin[i][j];
            //alert(" robin[" + i + "][" + j + "] : " + robin[i][j]);
        }

    /*for(var i in process)
     alert("process["+i+"].no : "+process[i].no +"  process["+i+"].srvcT : "+process[i].srvcT);

     alert("process.length" + process.length + " indexx " + indexx);*/


    var incx = 0, y = 50;
    var x = Number(arrTArr[0]) * 30 + 50;
    for (var i in process) {
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * process[i].no, process[i].srvcT * 30, 17);
        incx += process[i].srvcT * 30;
    }

}
function roundRobin1() {
    drawCanvas();
    var ctx = document.getElementById("canvas").getContext("2d");

    function Process() {
        this.no;
        this.srvcT = 0;
        this.arrT = 0;
        this.waitT = 0;
        this.turnT = 0;
    }

    var noOfProcess = document.forms.form1.NoOfprocesses.value;
    var srvcTArr = serviceTime();
    var arrTArr = arrivalTime();
    var totalSrvcT = 0;//alert("bfr false");
    var dequed = false;
    var dequedP;
    var pIndex = Number(0);
    var ran = 0;
    var quantamT = 4;
    var bPrint;//alert(" bfr queues initialized");
    var ready = new Queue();
    var processQue = new Queue();// alert("queues initialized");
    var process = [];
    var dispatcher = new Process();
    dispatcher.no = 16;
    dispatcher.srvcT = 1;
    quantamT = Number(prompt("Please Enter Quantam Time, Default : 4", 4));
    for (var i = 0; i < noOfProcess; i++) {
        process.push(new Process());
        process[i].no = i;
        process[i].srvcT = srvcTArr[i];
        totalSrvcT += Number(process[i].srvcT);
        process[i].arrT = arrTArr[i];
    }
    var i = 0;
    while (i < totalSrvcT) {
        for (var j = i; j <= Number(ran); j++) {
            for (var k = pIndex; k < process.length; k++) {
                if (process[k].arrT == j) {
                    ready.enq(process[k]);
                    pIndex++;
                }
            }
        }
        if (dequed) {
            dequed = false;
            if (dequedP.srvcT > 0)
                ready.enq(dequedP);
        }

        if (ready.count() > 0) {
            dequed = true;
            dequedP = ready.deq();
            if (dequedP.srvcT > quantamT) {
                bPrint = Number(quantamT);
                dequedP.srvcT -= Number(quantamT);
                ran += Number(bPrint + 1);
                var temp = new Process();
                temp.no = dequedP.no;
                temp.srvcT = bPrint;
                temp.arrT = dequedP.arrT;
                processQue.enq(temp);
                processQue.enq(dispatcher);
            }
            else {
                bPrint = dequedP.srvcT;
                dequedP.srvcT = Number(0);
                ran += Number(bPrint + 1);
                var temp = new Process();
                temp.no = dequedP.no;
                temp.srvcT = Number(bPrint);
                temp.arrT = Number(dequedP.arrT);
                processQue.enq(temp);
                processQue.enq(dispatcher);
            }
        }
        i++;
    }

    var tempLen = Number(processQue.count() - 1);
    var incx = 0, y = 50;
    var x = Number(arrTArr[0]) * 30 + 50;
    for (var i = 0; i < tempLen; i++) {
        var p = processQue.deq();
        ctx.fillStyle = 'rgba(189,131,155,0.9)';
        ctx.fillRect(x + incx, y + 17 * p.no, p.srvcT * 30, 17);
        incx += p.srvcT * 30;
    }

}