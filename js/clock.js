const clock = document.getElementById('clock')

const getActualTime = () =>{
    const now = moment()
    const reloj = now.format('hh : mm : ss A')

    clock.textContent = reloj
}

setInterval(getActualTime, 500)
getActualTime()