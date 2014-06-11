/**
 * Created by Zeeshan on 6/11/14.
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

    var noOfProcess = document.forms.form1.NoOfprocesses.value
        , srvcTArr = serviceTime()
        , arrTArr = arrivalTime()
        , process = []
        , totalTime = 0
        , fcfs = []
        , dispatcher = new Process();

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