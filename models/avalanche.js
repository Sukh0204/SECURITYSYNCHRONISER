const mongoose=require('mongoose');
const AvalancheSchema=new mongoose.Schema({

    sector_id:{
        type: Number, default: 0 ,
    },
    avalanche_axis:{
        type: Number, default: 0 
    },
    forecast1:{
        type: Number, default: 0 
    },
    forecast2:{
        type: Number, default: 0 
    },
    forecast3:{
        type: Number, default: 0 
    }

});

//change name to original name to avoid default value to be added

const Avalanche= mongoose.model('Avalanche', AvalancheSchema);

module.exports= Avalanche;
