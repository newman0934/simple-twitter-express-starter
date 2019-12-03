module.exports = {
    ifCond: function(a, b, options){
        if( a === b){
            return options.fn(this)
        }else{
            return options.inverse(this)
        }
    },
    replyCut: function(a){
        return a.substring(0, 50)
    }
}