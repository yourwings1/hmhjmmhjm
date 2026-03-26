let workplace = document.querySelector(".workplace")
let flag = document.querySelector(".knopka1")
let galka = document.querySelector(".knopka2")
let buton = document.querySelector(".buton")
let time = document.querySelector(".time")
let nochka = document.querySelector(".n")

let secunda = 0
let timer_id = null
let massivo = []
let cnt = 0

for (let i = 0; i <= 255; i++){
    let pixel = document.createElement("div")
    pixel.classList.add("square")
    pixel.dataset.index = i
    workplace.appendChild(pixel)

    massivo.push({
        bomba: bimba(),
        open: false,
        flag: false,
        el: pixel
    })
}

nochka.innerHTML = cnt

function bimba(){
    let a = Math.random()

    if (a > 0.875){
        cnt++
        return true
    }
    else{
        return false
    }
}

workplace.addEventListener("click", function(event){
    if(!event.target.classList.contains("square")){
        return
    }

    let indexa = event.target.dataset.index
    indexa = +indexa

    let cur_obj = massivo[indexa]

    if(!cur_obj){
        return
    }

    if(cur_obj.open){
        return
    }

    if(cur_obj.bomba){
        alert("game over")
        return
    }

    funccia(indexa)
})

function funccia(indexa){
    let cur_obj = massivo[indexa]

    if(!cur_obj){
        return
    }

    if(cur_obj.open){
        return
    }

    if(cur_obj.bomba){
        return
    }

    let schetchik = 0

    let bottom = indexa < 240
    let top = indexa >= 16
    let left = indexa % 16 != 0
    let right = indexa % 16 != 15

    if(top && left && massivo[indexa - 17] && massivo[indexa - 17].bomba === true){
        schetchik += 1
    }

    if(top && massivo[indexa - 16] && massivo[indexa - 16].bomba === true){
        schetchik += 1
    }

    if(top && right && massivo[indexa - 15] && massivo[indexa - 15].bomba === true){
        schetchik += 1
    }

    if(left && massivo[indexa - 1] && massivo[indexa - 1].bomba === true){
        schetchik += 1
    }

    if(right && massivo[indexa + 1] && massivo[indexa + 1].bomba === true){
        schetchik += 1
    }

    if(bottom && left && massivo[indexa + 15] && massivo[indexa + 15].bomba === true){
        schetchik += 1
    }

    if(bottom && massivo[indexa + 16] && massivo[indexa + 16].bomba === true){
        schetchik += 1
    }

    if(bottom && right && massivo[indexa + 17] && massivo[indexa + 17].bomba === true){
        schetchik += 1
    }

    cur_obj.open = true
    cur_obj.el.classList.add("open")

    if(schetchik > 0){
        cur_obj.el.innerHTML = schetchik
    }
    else{
        ifalka(indexa)
    }

    return schetchik
}

function ifalka(indexa){
    let bottom = indexa < 240
    let top = indexa >= 16
    let left = indexa % 16 != 0
    let right = indexa % 16 != 15

    if(top && left){
        funccia(indexa - 17)
    }

    if(top){
        funccia(indexa - 16)
    }

    if(top && right){
        funccia(indexa - 15)
    }

    if(left){
        funccia(indexa - 1)
    }

    if(right){
        funccia(indexa + 1)
    }

    if(bottom && left){
        funccia(indexa + 15)
    }

    if(bottom){
        funccia(indexa + 16)
    }

    if(bottom && right){
        funccia(indexa + 17)
    }
}

buton.addEventListener("click", function startTimer(){
    stopTimer()

    timer_id = setInterval(() => {
        secunda++
        rebootTimer()
    }, 1000)
})

function stopTimer(){
    if(timer_id){
        clearInterval(timer_id)
        timer_id = null
    }
}

function rebootTimer(){
    let chasi = (secunda / 3600) | 0
    let minuti = ((secunda % 3600) / 60) | 0
    let visiblesec = ((secunda % 3600) % 60) | 0

    time.textContent = chasi + ":" + minuti + ":" + visiblesec
}
