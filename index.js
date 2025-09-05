const app = require("express")();
const db = require("./db.json");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get("/users",(req,res)=> {
    console.log("Request");
    res.status(200).json(db);
});
app.get("/users/:id",(req,res)=> {

    if(isNaN(req.params.id)){
    res.status(400).json({ message: "İşlenemeyen veri" });


    }else{
const user = db.find(u => u.id == req.params.id);
if(user){
    res.status(200).json(user);
}else{
    res.status(404).json({message: "Kullanıcı Bulunamadı..."});
}
    }
});


app.post("/users",(req,res)=> {

const willSaveDate = {
    id : db.length+1,
    full_name : req.body.full_name,
    country : req.body.country,
    email : req.body.email,
    created_at : new Date()
};
db.push(willSaveDate);
res.send(willSaveDate);

});
app.patch("/users/:id",(req,res)=> {

   if(isNaN(req.params.id)){
    res.status(400).json({ message: "İşlenemeyen veri" });


    }else{
const user = db.find(u => u.id == req.params.id);
if(user){
   Object.keys(req.body).forEach(key => {
user[key] = req.body[key];
   });
  res.status(200).json(user);
}else{
    res.status(404).json({message: "Kullanıcı Bulunamadı..."});
}
    }

});



app.delete("/users/:id",(req,res)=> {

   if(isNaN(req.params.id)){
    res.status(400).json({ message: "İşlenemeyen veri" });


    }else{
const userIndex = db.findIndex(u => u.id == req.params.id);
if(userIndex > -1){
    db.splice(userIndex,1);
    res.status(201).json({message: "Kullanıcı Silindi..."});
}else{
    res.status(404).json({message: "Kullanıcı Bulunamadı..."});
}
    }

})

app.listen(process.env.PORT || 3000, () => {
console.log("Server is running...");
});