"use strict";(()=>{var e={};e.id=701,e.ids=[701],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2286:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>S,patchFetch:()=>y,requestAsyncStorage:()=>h,routeModule:()=>f,serverHooks:()=>x,staticGenerationAsyncStorage:()=>w});var s={};t.r(s),t.d(s,{GET:()=>g,POST:()=>v});var a=t(3278),n=t(5002),o=t(4877),i=t(1309);let u=require("mongoose");var c=t.n(u);let p=!1;async function d(){if(!p)try{await c().connect(process.env.MONGO_URI,{useNewUrlParser:!0,useUnifiedTopology:!0,serverSelectionTimeoutMS:5e3}),p=!0,console.log("Connected to database")}catch(e){throw console.error("Database connection error:",e),Error("Could not connect to the database")}}let l=new(c()).Schema({firstname:{type:String,required:!0},lastname:{type:String,required:!0},email:{type:String,required:!0,unique:!0},password:{type:String,required:!0}},{timestamps:!0}),m=c().models.User||c().model("User",l);async function g(e){await d();let r=await m.find();return i.NextResponse.json({isSuccessful:!0,users:r},{status:200})}async function v(e){await d();let{firstname:r,lastname:t,email:s,password:a}=await e.json(),n=new m({firstname:r,lastname:t,email:s,password:a});try{return await n.save(),i.NextResponse.json({isSuccessful:!0,data:n},{status:201})}catch(e){return console.error("Error saving user:",e),i.NextResponse.json({isSuccessful:!1,message:"Error saving user"},{status:500})}}let f=new a.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/users/route",pathname:"/api/users",filename:"route",bundlePath:"app/api/users/route"},resolvedPagePath:"E:\\next.js\\practice-project\\src\\app\\api\\users\\route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:h,staticGenerationAsyncStorage:w,serverHooks:x}=f,S="/api/users/route";function y(){return(0,o.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:w})}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[140,833],()=>t(2286));module.exports=s})();