const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path')
const qs = require('querystring')
const customers = require('./data/customers');
const Handlebars = require('handlebars');

// var filepath = path.join(__dirname, "templates", "index.hbs");  //dirname gives location where we are executing app.js
registerPartials();

const server = http.createServer(function(req,res){
    const link =url.parse(req.url, true)
    const query = link.query;
    const page = link.pathname;

    if(page=="/"){
        customers.getAll((err,result)=>{
            var context = {data:result};
            
            let t = renderTemplate('index', context);
            
            res.end(t);
        });
    }
    else if(page =="/customers/create"&& req.method == "GET"){
        let template = renderTemplate('create',{});
        res.end(template);

    }
    else if(page =="/customers/create"&& req.method == "POST"){
        let formData = '';
        req.on('data', function(data){
            formData += data.toString();
        });
req.on('end',function(){
    let userData = qs.parse(formData);
    customers.addOne(userData.name, userData.email, userData.age, (err,result)=>{
var context ={
    result:{
    success:true,
    errors:[]
    }
};
if(err){
    console.log(err)
    context.result.success = false;
}
    let t =renderTemplate('create',context);
    res.end(t);

    });

});
    }

});
server.listen(80);

function renderTemplate(name,data){
    var filepath = path.join(__dirname, "templates",name+".hbs");
    let templateText=fs.readFileSync(filepath, "utf8");
    let template = Handlebars.compile(templateText);
    return template(data);
}

function registerPartials(){
    var filepath = path.join(__dirname, "templates","partials","navbar.hbs");
    let templateText=fs.readFileSync(filepath, "utf8");
    Handlebars.registerPartial(
        "navbar", templateText);

}