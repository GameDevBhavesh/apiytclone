 const express= require("express");
 var data =require("./public/data.json");
 var category =require("./public/category.json");
 var home =require("./public/Home.json");
var fs =require("fs");

 const app=express();
 var server=(app.listen(5000));


  function listning(){
      console.log("listning...")
      
  }
  app.get("/send/filter/:word/:num?",sendfiltered);

  function sendfiltered(req,res){
     var word=req.params.word;
     var num=req.params.num;
    
      if(category[word]){
        var d=[];
        data.forEach(push);
        function push(element){
        if(element.category==word&&d.length<num){d.push(element)}
        }
    
        res.send(d);
    }else{
        res.send("sorry this is not a category")
    }

  }
  
  app.get("/send/:word",sendall)

   function sendall(req,res){
    var d=req.params;
    var word=d.word;
    if(word=="all"){
        res.send(data)
    }

   }
   app.get("/send/page/:word",sendpage)
   function sendpage(req,res){
    var d=req.params;
    var word=d.word;
    if(word=="home"){
        res.send(home)
    }
   }
   app.get("/watch/:video",getvideo)
   function getvideo(req,res){
    var d=req.params;
    var video=d.video;
    if(video=="how to make tasty cakes")  {
        stream(video);
    }
     function stream(para){
        res.writeHead(200,{"Content-Type":"video/mp4"})
        var rs=fs.createReadStream(`./public/${para}.mp4`)
        rs.pipe(res);
     }
       
     
    
   }





