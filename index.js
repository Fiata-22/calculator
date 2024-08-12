const displayHistory = document.querySelector(".display-history");
const display = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((number) => {
    //Ketika di klik akan memberikan event target ke number
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            console.log(e.target.innerText)
            haveDot = true
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }

        dis2Num += e.target.innerText;
        display.innerText = dis2Num;
    })
});

// Untuk mengaktifkan tombol Operation
operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num) return; //jika tidak ada isian dari dis2Num maka tidak dijalankan
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) { //jika ada isian dis1Num dan dis2Num dan ada lastOperation
            mathOperation();
        }else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName) 
        lastOperation = operationName
    })
}) 

function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    displayHistory.innerText = dis1Num;
    display.innerText = "";
    dis2Num = "";
    tempResult.innerText = result;
};
function mathOperation() { //ini untuk  mengoperasikan button dari operation
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2Num)
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num)
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num)
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num)
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num)
    }
}

equal.addEventListener("click", (e) => {
    if (!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display.innerText = result; //untuk menampilkan angka setelah di operasikan dan menggantikan tempResult yang di kode sebelumnya
    tempResult.innerText = ""; // akan menghilangkan tempResult setelah di operasikan
    dis2Num = result; //mengisi dis2Num dengan result
    dis1Num = ""; //mengosongkan dis1Num setelah melakukan operasi

})

// Akan mengosongkan semua variabel atau isian yang sebelumnya ada dalam arti dihapus ketika menentukan tombol C
clearAll.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display.innerText = "";
    displayHistory.innerText = "";
    result = "";
    lastOperation = "";
    haveDot = false;
})

clearLast.addEventListener("click", () => {
    display.innerText = ""; // akan mengahapus isi dari display input saat menekan tombol CE
    dis2Num = "";
})

// Fungsi window ini untuk menghandle secara kesuluruhan tamplan dari program
// Fungsi dari keydown ini supaya angka yang dimasukan bisa melalui tombol keyboard laptop atau alat yang dipakai
window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"
    ) {
        clickButton(e.key)
    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key)
    } else if (e.key === "*") {
        clickOperation("x");
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual();
    } else if (e.key === "Backspace") {
        clickClear();
    }
})

// Fungsi ini supaya angka yang dimasukan bisa melalui tombol keyboard laptop atau alat yang dipakai
function clickButton(key) {
    numbers.forEach((button) => {
        if(button.innerText === key) {
            button.click()
        } 
    })
}

function clickOperation(key) {
    operations.forEach((operation) => {
        operation.click()
    })
}

function clickEqual() {
    equal.click()
}

function clickClear() {
    clearAll.click();
}