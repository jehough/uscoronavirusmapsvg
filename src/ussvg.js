const statePop = { 'AL': 49.03, 'AK': 7.31, 'AS': 0.55, 'AZ': 72.78, 'AR': 30.17, 'CA': 395.12, 'CO': 57.58, 'CT': 35.65, 'DE': 9.73, 'DC': 7.05,'FL': 214.77, 'GA': 106.17, 'GU': 1.65,'HI': 14.15, 'ID': 17.87, 'IL': 126.71, 'IN': 67.32, 'IA': 31.55, 'KS': 29.13, 'KY': 44.67, 'LA': 46.48, 'ME': 13.44, 'MD': 60.45, 'MA': 69.49, 'MI': 99.86, 'MN': 56.39, 'MP': .55, 'MS': 29.76, 'MO': 61.37, 'MT': 10.68, 'NE': 19.34, 'NV': 30.80, 'NH': 13.59, 'NJ': 88.82, 'NM': 20.96, 'NY': 194.53, 'NC': 104.88, 'ND': 7.62, 'OH': 116.89, 'OK': 39.56, 'OR': 42.17, 'PA': 128.01, 'PR': 31.93,'RI': 10.59, 'SC': 51.48, 'SD': 8.84, 'TN': 68.33, 'TX': 289.95, 'UT': 32.05, 'VT': 6.23, 'VA': 85.35, "VI": 1.04,'WA': 76.14, 'WV': 17.92, 'WI': 58.22, 'WY': 5.78 };
const posarr = [5000, 10000, 20000]
const pcarr = [150,250,400]
const darr = [500,1000,2500]
const dcparr = [20, 40, 70]

function InitialLoad () {
    let value = "Positives"
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://covidtracking.com/api/states", requestOptions)
        .then(response => response.json())
        .then(result => getStateData(result, value))
        .catch(error => console.log('error', error));    
}

function LoadData (value) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://covidtracking.com/api/states", requestOptions)
        .then(response => response.json())
        .then(result => getStateData(result, value))
        .catch(error => console.log('error', error));
}

function selection(){
    const e = document.getElementById("show").value;
    LoadData(e)
}



function colorState(obj, num, arr){
    if (num <= arr[0]) {
        obj.style.fill = "#a68280"
    }
    else if (num <= arr[1]){
        obj.style.fill = "#7d4845"
    }
    else if (num <= arr[2]){
        obj.style.fill = "#782f2a"
    }
    else {
        obj.style.fill = "#8a0c03"
    }
}

function divideByPop(num, state){
    return  num/statePop[state]
    
}

function changeKey(arr){
    let low = document.getElementById('lowLabel')
    let midlow = document.getElementById('midlowLabel')
    let midhigh = document.getElementById('midhighLabel')
    let high = document.getElementById('highLabel')
    low.innerHTML = `Less than ${arr[0]}`
    midlow.innerHTML = `${arr[0]+1} - ${arr[1]}`
    midhigh.innerHTML = `${arr[1]+1} - ${arr[2]}`
    high.innerHTML = `Greater than ${arr[2]}`
}

function addInfo(state, obj){
    obj.setAttribute("info", `<div>State: ${state.state}</div><div>Cases: ${state.positive}</div><div>Deaths: ${state.death}</div>`)
    obj.addEventListener("mouseover", (e)=> {
        let x = e.clientX
        let y = e.clientY
        displayBox(obj, x, y)})
    obj.addEventListener("mouseout", ()=> hideBox())
}

function displayBox(obj, x, y){
    let box = document.getElementById("info-box")
    box.innerHTML = obj.getAttribute("info")
    box.style.display ="block"
    box.style.top = y + 100 +'px'
    box.style.left = x+'px'

}

function hideBox(){
    let box = document.getElementById('info-box')
    box.style.display = "none"
}

function getStateData(json, value){
    for(const state of json){
        let obj = document.getElementById(state.state)
        !!obj ? addInfo(state, obj):null
        switch(value){
            case "Positives":
                !!obj ? colorState(obj, state.positive, posarr):null
                changeKey(posarr)
                break;
            case "PerCapita":
                let num = divideByPop(state.positive, state.state)
                !!obj ? colorState(obj, num, pcarr): null;
                changeKey(pcarr)
                break;
            case "Deaths":
                !!obj ? colorState(obj, state.death, darr):null;
                changeKey(darr)
                break;
            case "DeathsPerCapita":
                let dcpval = divideByPop(state.death, state.state)
                !!obj ? colorState(obj, dcpval, dcparr):null
                changeKey(dcparr)
        }
    }
}

