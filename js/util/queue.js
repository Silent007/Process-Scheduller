/**
 * Created by Zeeshan on 6/4/14.
 */

function Queue() {
    this.ready = [];
}

Queue.prototype.enq = function (element) {
    var tempp = [];
    tempp = this.ready;
    this.ready = [];	//clear
    this.ready.push(element);
    for (var i in tempp)
        this.ready.push(tempp[i]);
}

Queue.prototype.deq = function () {
    if (this.ready.length > 0)
        return this.ready.pop();
    else {
        alert("que empty");
    }
}

Queue.prototype.count = function () {
    return this.ready.length;
}