!function($){function t(t){return 10>t?"0"+t:t}function e(e){var n=Math.floor(e/3600),a=Math.floor((e-3600*n)/60),i=Math.floor(e%60);return t(n)+":"+t(a)+":"+t(i)}var n=[],a=0,i=0,r=0,o=0,s=0,c=28800,u,d,m=$("#reset"),l=$("#timer"),f=$("#add"),h=function(){this.textMessage="",this.timeStore=0,this.taskStartTime=0,this.workingTime=0,this.elementId="t"+a,this.taskId=a,this.now=0};h.prototype.addSecond=function(){var t=new Date,e=t.getTime()-this.taskStartTime;this.workingTime=this.timeStore+e},h.prototype.getElementId=function(){return this.elementId},h.prototype.getSeconds=function(){return this.workingTime/1e3};var p=function(){var t=s%60;return 0===Math.round(t)&&(t=60),1===Math.round(t)&&($("#c3").hide(),window.setTimeout(function(){$("#c3").show()},20)),Math.round(60*Math.PI*2/(c/60/8)*t)},v=function(){$(".current-total-progress-time").text(e(s));var t=75*Math.PI*2/c*s,n=p();$("#c2").css("stroke-dasharray",t+","+75*Math.PI*2),$("#c3").css("stroke-dasharray",n+","+60*Math.PI*2)},k=function(){var t=new Date,e=t.getTime()-u;s=Math.floor(e/1e3)},w=function(){k(),n[o].addSecond(),$("#p"+n[o].taskId).text(e(n[o].getSeconds()))},g=function(){var t=new Date;i=window.setInterval(w,100),r=window.setInterval(v,1e3),u=t.getTime(),d=u},y=function(t){if(""!==n[t].textMessage){o=n[t].taskId;var e=new Date;n[t].taskStartTime=e.getTime(),n[t].timeStore=n[t].workingTime,$(".item").removeClass("active"),$("#i"+t).parent().parent().parent().addClass("active"),0===i&&($("#progress").addClass("animate"),g());var a=$("#i"+t);$("html,body").animate({scrollTop:a.offset().top-$(".time-overview").outerHeight()-5},300)}},b=function(t){y($(t).attr("data-id")),$(".item").removeClass("active"),$(t).parent().parent().addClass("active")},I=function(t){return'<div class="item"><div class="task-item"><form data-id="'+t+'" action="#"><input placeholder="Hi, please enter task name" type="text" id="i'+t+'" required="required"><div class="time"><span id="p'+t+'">00:00:00</span></div><button type="submit">⏱ <span></span></button></div></form></div>'},M=function(){a++;var t=a;n[t]=new h,$("#timer").append(I(t)),$("#i"+t).focus()},T=function(){$("#timer").append(I(a)),n[a]=new h},S=function(){d=0,s=0,a=0,n=[],$("#timer .item").remove(),$("circle").removeAttr("style"),$(".current-total-progress-time").text(e(s)),window.clearInterval(i),window.clearInterval(r),i=0,r=0,T()};T(),l.on("change","input",function(){var t=$(this).attr("id").replace("i","");n[t].textMessage=$(this).val()}),f.on("click",function(){M()}),l.on("submit","form",function(t){t.preventDefault(),b(this),$(this).find("input").blur()}),m.on("click",function(){S()}),window.addEventListener("beforeunload",function(t){var e="You have a timer running do you really want to leave the page?";return t.returnValue=e,e}),$(document).on("keyup",function(t){if(t.preventDefault(),187!==t.keyCode&&107!==t.keyCode||0!==$("input:focus").length||M(),0===$("input:focus").length)switch(t.keyCode){case 49:y(0);break;case 50:y(1);break;case 51:y(2);break;case 52:y(3);break;case 53:y(4);break;case 54:y(5);break;case 55:y(6);break;case 56:y(7);break;case 57:y(8)}})}(jQuery);