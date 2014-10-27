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
        , totalTimeDevBranch = 0
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

    for (var i = 0; i < 5; i++) {
        console.log('Print Dev Branch');

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

/**

 * XXTEA: encodes array of unsigned 32-bit integers using 128-bit key.
 *
 * @param   {number[]} v - Data vector.
 * @param   {number[]} k - Key.
 * @returns {number[]} Encoded vector.
 */
Tea.encode = function(v, k) {
    if (v.length < 2) v[1] = 0;  // algorithm doesn't work for n<2 so fudge by adding a null
    var n = v.length;

    var z = v[n-1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52/n), sum = 0;

    while (q-- > 0) {  // 6 + 52/n operations gives between 6 & 32 mixes on each word
        sum += delta;
        e = sum>>>2 & 3;
        for (var p = 0; p < n; p++) {
            y = v[(p+1)%n];
            mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
            z = v[p] += mx;
        }
    }

    return v;
}
 * Tiny Encryption Algorithm
 *
 * @namespace
 */
var Tea = {};


/**
 * Encrypts text using Corrected Block TEA (xxtea) algorithm.
 *
 * @param   {string} plaintext - String to be encrypted (multi-byte safe).
 * @param   {string} password - Password to be used for encryption (1st 16 chars).
 * @returns {string} Encrypted text (encoded as base64).
 */
Tea.encrypt = function(plaintext, password) {
  plaintext = String(plaintext);
  password = String(password);

  if (plaintext.length == 0) return('');  // nothing to encrypt

  //  v is n-word data vector; converted to array of longs from UTF-8 string
  var v = Tea.strToLongs(plaintext.utf8Encode());
  //  k is 4-word key; simply convert first 16 chars of password as key
  var k = Tea.strToLongs(password.utf8Encode().slice(0,16));
  var n = v.length;

  v = Tea.encode(v, k);

  // convert array of longs to string
  var ciphertext = Tea.longsToStr(v);

  // convert binary string to base64 ascii for safe transport
  return ciphertext.base64Encode();

};