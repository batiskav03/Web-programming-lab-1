let x,y;
let inputX = document.querySelectorAll(".xnumber");
let inputY = document.querySelector(".ynumber");
let submit_button = document.querySelector(".submit")

inputX.forEach((item) => {
    item.addEventListener("click", (elem) => x = elem.target.value)
})

inputY.addEventListener("change", (elem) => {y = elem.target.value})

submit_button.addEventListener("click",submit_data)

function submit_data (){
    if (validate_data()) {
    fetch("/php/script.php/?" + "x=" + x + "&y=" + y)
        .then(response => response.text())
        .then(responseText => {
            document.querySelector(".output-table").innerHTML = responseText;
        })
    } else {
        document.querySelector(".wrong_data").innerHTML = "Данные введены некоректно";
        setTimeout(() =>{document.querySelector(".wrong_data").innerHTML = ""} ,5000);
    }
}

function validate_data(){
    return ($.isNumeric(x) && $.isNumeric(y));

}

const WIDTH = 700
const HEIGHT = 400
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const ROWS_COUNT = 10
const PADDING = 40
// рабочая область
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2
const STEP = VIEW_HEIGHT / ROWS_COUNT

function graph(canvas) {
    const ctx = canvas.getContext("2d")
    canvas.style.width = WIDTH + "px"
    canvas.style.height = HEIGHT + "px"
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT
    // линии по y
        ctx.beginPath()
    ctx.strokeStyle = "#bbb";
    // отрисока "сеточки"
    ctx.font = "normal 20px GOST type B"
    ctx.fillStyle = "#96a2aa"

        for (let i = 1; i <= ROWS_COUNT; i++) {
            const y = STEP * i
            ctx.moveTo(0, y + PADDING);
            ctx.lineTo(DPI_WIDTH, y + PADDING)
            ctx.fillText(DPI_HEIGHT - y,0,y + PADDING)
        }
        ctx.stroke()
        ctx.closePath()

    // отрисовываем ограничение сверху
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "red";
    for (let i = 0; i < 1400; i+=0.2) {
        ctx.lineTo(i,DPI_HEIGHT - PADDING - (Math.sin(i/120)*20 + 600))
    }
    ctx.stroke()
    ctx.closePath()

    // отрисовываем ограничение снизу
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "red";
    for (let i = 0; i < 1400; i+=0.2) {
        ctx.lineTo(i,DPI_HEIGHT - PADDING -(Math.sin(i/100)*50 + 200))
    }
    ctx.stroke()
    ctx.closePath()
}

graph(document.getElementById("graph"))

function drawPoint(canvas,x,y) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath()
    ctx.fillStyle = "blue";
    ctx.fillRect(x,DPI_HEIGHT - PADDING - y,5,5)
    ctx.fill()
}



let bigData = [];
fetch("/php/tradingDots.php")
    .then(response => response.text())
    .then(responseJson => {
        let arr = responseJson.split("},{")
        for (str of arr) {
            newarr = Array.from(str.split(',').toString().split(":").toString().split(","))
            newarr.splice([0],1)
            newarr.splice([1],1)
            newarr[0] = newarr[0].replace(/['"]+/g,'')
            if (typeof newarr[1] === "string")
                newarr[1] = newarr[1].replace(/['"]+/g,'')

            bigData.push(newarr)


        }

    })
setInterval(() => {
    x = Number(bigData[0][0]);
    y = Number(bigData[0][1]);
    bigData.splice([0],1)

    drawPoint(document.getElementById("graph"),x,y)
},0.1)


