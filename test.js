const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
async function mongoConnect(){
const mongodb = await mongoose.connect("mongodb+srv://rahul:rahul@cluster0.ytelh.mongodb.net/series?retryWrites=true&w=majority")
}
const file = fs.readFileSync('tv-shows.json');
mongoConnect();
file.forEach(v=>{
    mongoose.Query()
})

