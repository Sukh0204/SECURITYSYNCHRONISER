const mongoose=require('mongoose');
const ShivMandirSchema=new mongoose.Schema({

    DateTime: {
        type: String, default:0 ,
    },

    AT:{
        type: Number, defaut: 0,
    },

    ATmax:{
        type: Number, defaut: 0,
    },

    ATmin:{
        type: Number, defaut: 0,
    },

    Battery:{
        type: Number, defaut: 0,
    },

    Pressure:{
        type: Number, defaut: 0,
    },

    RH:{
        type: Number, defaut: 0,
    },

    SnowTemp1:{
        type: Number, default: 0 ,
    },

    WindDir:{
        type: Number, default: 0 
    },
    
    WindSp:{
        type: Number, default: 0 
    },

    Albedo_IN:{
        type: Number, default: 0 
    },

    Albedo_Out:{
        type: Number, default: 0 
    },

    NetRad:{
        type: Number, defaut: 0,
    },

    SD_Avg:{
        type: Number, defaut: 0,
    },

    SD_Ins:{
        type: Number, defaut: 0,
    },

    SnowPreci:{
        type: Number, defaut: 0,
    },

    SnowTemp2:{
        type: Number, defaut: 0,
    },

    SunD:{
        type: Number, defaut: 0,
    },

    GPSstatus1:{
        type: Number, defaut: 0,
    },

    GPSstatus2:{
        type: String, defaut: 0,
    },

    Status1:{
        type: String, defaut: 0,
    },

    Status2:{
        type: String, defaut: 0,
    },

    ReportingTime1:{
        type: String, defaut: 0,
    },

    ReportingTime2:{
        type: String, defaut: 0,
    },

    TotalBurst1:{
        type: Number, defaut: 0,
    },

    TotalBurst2:{
        type: Number, defaut: 0,
    },

});

//change name to original name to avoid default value to be added

const Shivmandir= mongoose.model('Shivmandir', ShivMandirSchema);

module.exports= Shivmandir;
