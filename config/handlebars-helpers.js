const moment = require('moment')
module.exports = {
<<<<<<< HEAD
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
=======
  ifCond: function(a, b, options) {
    if (a === b) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  },

  moment: function(a) {
    return moment(a).format('YYYY-MM-D, HH:mm')
  },

  replyCut: function(a) {
    return a.substring(0, 50)
  }
}
>>>>>>> 1f13f35d5be2f94a62965805f06fd8449c68b404
