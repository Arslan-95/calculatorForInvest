let calculatorItems = {
    procent: document.querySelector('.calculator-procent'),
    firstPay: document.querySelector('.calculator-firstPay'),
    years: document.querySelector('.calculator-years'),
    hidden: {
        procent: document.querySelector('input[name="calculator-procent"]'),
        firstPay: document.querySelector('input[name="calculator-firstPay"]'),
        years: document.querySelector('input[name="calculator-years"]'),
    },
};

let sumn = {
    procent: calculatorItems.procent.value,
    firstPay: calculatorItems.firstPay.value,
    years: calculatorItems.years.value,
    result: 0,
};

calculatorButtonsClick(document.querySelector('.calculator_header-btn:nth-child(2)'));

function calculatorValueChange(item, number){
    calculatorUpdateValues();
    
    if(number == 1){
        calculatorSimmetry(item);
    }else if(number == 2){
        calculatorItems.hidden.firstPay.value = item.value;
    }else if(number == 3){
        calculatorSimmetry(item);
    }else if(number == 4){
        calculatorItems.hidden.procent.value = calculatorProcentConvertor(item.getAttribute('value'));
        calculatorItems.hidden.years.value = item.getAttribute('value');
        calculatorItems.procent.value = item.getAttribute('value');
        calculatorItems.years.value = item.getAttribute('value');
        calculatorInputRange(calculatorItems.procent, 1);
        calculatorButtonsClick(item);
    }else if(number == 5){
        calculatorButtonsClick(item);
    }
    
    calculatorUpdateValues();
    calculatorDisplayValues();
    return;
}

function calculatorSimmetry(item){
    calculatorItems.hidden.procent.value = calculatorProcentConvertor(item.value);
    calculatorItems.hidden.years.value = item.value;
    calculatorItems.procent.value = item.value;
    calculatorItems.years.value = item.value;
    calculatorValueChange(document.querySelector(`.calculator_header-btn:nth-child(${item.value})`), 5);
    return;
}

function calculatorProcentConvertor(value){
    if(value == 1){
        return 12;
    }else if(value == 2){
        return 14;
    }else if(value == 3){
        return 16;
    }else{
        return 0;
    }
}
function calculatorButtonsClick(valueItem){
    let allItems = document.querySelectorAll('.calculator_header-btn')
    for(item of allItems){
        item.style.background = '#a9a9a9';
    }
    valueItem.style.background = "#009edb";
    return;
}
function calculatorUpdateValues(){
    calculatorItems = {
        procent: document.querySelector('.calculator-procent'),
        firstPay: document.querySelector('.calculator-firstPay'),
        years: document.querySelector('.calculator-years'),
        hidden: {
            procent: document.querySelector('input[name="calculator-procent"]'),
            firstPay: document.querySelector('input[name="calculator-firstPay"]'),
            years: document.querySelector('input[name="calculator-years"]'),
        },
    };

    sumn = {
        procent: Number(calculatorItems.hidden.procent.value),
        firstPay: Number(calculatorItems.firstPay.value),
        years: Number(calculatorItems.hidden.years.value),
        result: 0.
    };
    calculatorCalculate();
}
function calculatorDisplayValues(){
    let result = document.querySelector('.calculatorDisplayResult');
    let firstPay = document.querySelector('.calculator__invest_sumn-cash h3');
    let procent = document.querySelector('.calculator__invest_sumn-procent h3');
    let bigProcent = document.querySelector('.calculator__invest_sumn-bigProcent h2');
    let headerYears = document.querySelector('.calculator_header-years');
    let headerFirstPay = document.querySelector('.calculator_header-firstPay');
    let headerProcent = document.querySelector('.calculator_header-procent');
    result.innerHTML = sumn.result.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    firstPay.innerHTML = sumn.firstPay.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + ' Р';
    headerFirstPay.innerHTML = sumn.firstPay.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + 'р';
    if(sumn.years == 1){
        headerYears.innerHTML = sumn.years + ' год';
    }else{
        headerYears.innerHTML = sumn.years + ' года';
    }
    headerProcent.innerHTML = sumn.procent + ' %';
    procent.innerHTML = sumn.procent + ' %';
    bigProcent.innerHTML = sumn.procent + ' %';
}
function calculatorCalculate(){
    if(sumn.years == 1){
        sumn.result = ((sumn.firstPay/100) * sumn.procent) + sumn.firstPay;
    }else if(sumn.years == 2){
        sumn.result = ((sumn.firstPay/100) * sumn.procent) + sumn.firstPay;
        sumn.result = sumn.result + (sumn.result / 100 * sumn.procent);
    }else{
        sumn.result = ((sumn.firstPay/100) * sumn.procent) + sumn.firstPay;
        sumn.result = sumn.result + (sumn.result / 100 * sumn.procent);
        sumn.result = sumn.result + (sumn.result / 100 * sumn.procent);
    }
    sumn.result = Math.floor(sumn.result);
}
function calculatorFirstPaySettings(settings){
    if(settings == 'plus'){
        calculatorItems.firstPay.value = Number(calculatorItems.firstPay.value) + 100000;
        calculatorUpdateValues();
        calculatorDisplayValues();
    }else{
        calculatorItems.firstPay.value = Number(calculatorItems.firstPay.value) - 100000;
        calculatorUpdateValues();
        calculatorDisplayValues();
    }
}

function calculatorInputRange(item, number){
    let procentIs = 50;
    if(number == 1 || number == 3){
        if(item.value == 1){
            procentIs = 1;
        }else if(item.value == 2){
            procentIs = 50;
        }else{
            procentIs = 100;
        }
    }else if(number == 2){
        procentIs = (Number(item.value) - 500000) / 100000;
        if(procentIs > 70){
            procentIs = Number(item.value - 200000) / 100000;
        }else if(procentIs < 16){
            procentIs = (Number(item.value) - 800000) / 100000;
        }else if(procentIs < 30){
            procentIs = (Number(item.value) - 600000) / 100000;
        }
    }
    let color = `linear-gradient(90deg, #009edb ${procentIs}%, #a9a9a9 ${procentIs}%)`;
    if(number == 1){
        calculatorItems.years.style.background = color;
    }else if(number == 3){
        calculatorItems.procent.style.background = color;
    }
    item.style.background = color;
}