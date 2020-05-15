var normalFunc = {
    muNo: '12',
    getMuNo: function(){
        console.log('normalFunc : getMuNo > this', this);
        setTimeout(function(){
           console.log('normalFunc : getMuNo > setTimeout > this', this);
        }, 1000);
    }
}

var arrowFunc = {
    muNo: '12',
    getMuNo: function(){
        console.log('arrowFunc : getMuNo > this', this);
        setTimeout(() => {
           console.log('arrowFunc : getMuNo > setTimeout > this', this);
        }, 1000);
    }
}

console.log(normalFunc.getMuNo());
console.log(arrowFunc.getMuNo());
