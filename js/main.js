let x_absolute,y_absolute
let xLimit = 300
let inputX = document.querySelectorAll(".xnumber")
let inputY = document.querySelector(".ynumber")
let submit_button = document.querySelector(".submit")
let range = document.querySelector(".range")

// все слушатели(почти)
inputX.forEach((item) => {
    item.addEventListener("click", (elem) => x_absolute = elem.target.value)
})
inputY.addEventListener("change", (elem) => {y_absolute = elem.target.value})
submit_button.addEventListener("click",submit_data)
range.addEventListener("change",(e) => xLimit = e.target.value)

// отправка данных на сервер
function submit_data (){
    if (validate_data()) {
    fetch("/php/script.php/?" + "x_absolute=" + x_absolute + "&y_absolute=" + y_absolute)
        .then(response => response.text())
        .then(responseText => {
            document.querySelector(".output-table").innerHTML = responseText
            drawPoint(document.getElementById("graph"),x_absolute,y_absolute,"red")
        })
    } else {
        document.querySelector(".wrong_data").innerHTML = "Данные введены некоректно"
        setTimeout(() =>{document.querySelector(".wrong_data").innerHTML = ""} ,5000)
    }
}

// проверка правильности введенных данных:
//      - на случай если человек решил удалить кнопки, и не кликнул на одну из них - страница перезагружаеться
function validate_data(){
    if (typeof x_absolute == "undefined" && typeof y_absolute == "undefined"){
        location.reload()
    }
    else {
        return ($.isNumeric(x_absolute) && $.isNumeric(y_absolute))
    }
}


// данные для работы с canvas
const WIDTH = 700
const HEIGHT = 400
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGHT = HEIGHT * 2
const ROWS_COUNT = 10
const COLUMN_COUNT = 10
const PADDING = 40



// рабочая область
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2


const STEP_ORDINATE = VIEW_HEIGHT / ROWS_COUNT
const STEP_ABSCISS = DPI_WIDTH / COLUMN_COUNT
const EXT = graphExt()
const textStep = (EXT[0] - EXT[1]) / ROWS_COUNT


//отрисовка графика
function graph(canvas) {
    const ctx = canvas.getContext("2d")
    canvas.style.width = WIDTH + "px"
    canvas.style.height = HEIGHT + "px"
    canvas.width = DPI_WIDTH
    canvas.height = DPI_HEIGHT
    function mousemove({clientX,clientY}) {


    }
    canvas.addEventListener('mousemove', mousemove)

    // линии по y
        ctx.beginPath()
    ctx.strokeStyle = "#bbb"
    // отрисока "сеточки"
    ctx.font = "normal 20px GOST type B"
    ctx.fillStyle = "#96a2aa"
        for (let i = 1; i <= ROWS_COUNT; i++) {
            const y = STEP_ORDINATE * i
            const text = EXT[0] - textStep * i
            ctx.moveTo(0, y + PADDING)
            ctx.lineTo(DPI_WIDTH, y + PADDING)
            ctx.fillText(text,0,y + PADDING)
        }
        ctx.stroke()
        for (let i = 1; i <= COLUMN_COUNT; i++) {
            const x = STEP_ABSCISS * i
            ctx.moveTo(x, DPI_HEIGHT)
            ctx.lineTo(DPI_HEIGHT, x)
            ctx.fillText(x, x, DPI_HEIGHT)
        }
        ctx.closePath()

    // отрисовываем ограничение сверху
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "red"
    for (let i = 0; i < 1400; i+=0.2) {
        ctx.lineTo(i,DPI_HEIGHT - PADDING - (Math.sin(i/120)*20 + 600))
    }
    ctx.stroke()
    ctx.closePath()

    // отрисовываем ограничение снизу
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "red"
    for (let i = 0; i < 1400; i+=0.2) {
        ctx.lineTo(i,DPI_HEIGHT - PADDING -(Math.sin(i/100)*50 + 200))
    }
    ctx.stroke()
    ctx.closePath()
}


// точка(квадрат)
function drawPoint(canvas,x,y,color) {
    const ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.fillStyle = color ;
    ctx.fillRect(x,DPI_HEIGHT - PADDING - y,5,5)
    ctx.fill()
}


// получение информации с сервера и дальнейщий ее парсинг
let bigData = [] // массив со всеми точками из БД

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
// прорисовывание пользовательских точек
setTimeout(() => {
    setInterval(() => {
        x = Number(bigData[0][0])
        y = Number(bigData[0][1])
        let item = bigData.splice([0],1)
        if (y <= (Math.sin(x/120)*20 + 600) && y >= (Math.sin(x/100)*50 + 200) && x <= xLimit ){
            drawPoint(document.getElementById("graph"),x,y,"blue")
        }  else if (y <= (Math.sin(x/120)*20 + 600) && y >= (Math.sin(x/100)*50 + 200)) {
            bigData.push(item)
        }
    },0.1)
},220);


// вычисление минимального и максимального значения функции (extremum's)
function graphExt() {
    let max = 0
    let min = 1000000
    for (let i = 0; i <= 1400; i+=10){
        if ((Math.sin(i/100)*50 + 200) < min) {
            min = Math.round(Math.sin(i/100)*50 + 200)
        }
       if (Math.sin(i/120)*20 + 600 > max)    {
           max = Math.round(Math.sin(i/120)*20 + 600)
       }
    }
    return [max,min]
}

graph(document.getElementById("graph"))



