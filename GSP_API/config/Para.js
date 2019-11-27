module.exports =  function() {
    var val= [];
    return{ 
        push: (name,value,type) => {
            val.push({  name, value, type: type == undefined || type == '' ?"string":type});
        },
        add: (name,value,type) => {
           // push(name,value,type);
           val.push({  name, value, type: type == undefined || type == '' ?"string":type});
        },
        clear:() => {
            val = [];
        },
        values :() => val
        ,append:(appendVal) => val= [...val,...appendVal]
    }
}  