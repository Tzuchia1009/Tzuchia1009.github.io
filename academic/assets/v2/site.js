'use strict';
const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)');
const statusNode=document.querySelector('.toast');let toastTimer;
function toast(text){statusNode.textContent=text;statusNode.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>statusNode.classList.remove('show'),2200)}
async function copyText(text){try{await navigator.clipboard.writeText(text);toast(document.body.dataset.copied)}catch{toast(document.body.dataset.copyfail+': '+text)}}
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copyText(b.dataset.copy)));
document.querySelectorAll('.cite').forEach(b=>b.addEventListener('click',()=>{const p=b.closest('.paper');copyText([p.querySelector('.authors').textContent,p.querySelector('.paper-year').firstChild.textContent,p.querySelector('h3').textContent,p.querySelector('.venue').textContent,p.querySelector('.paper-link')?.href||''].join('. '))}));
// An old deep link remains a useful entry point after the site becomes multi-page.
if(document.body.dataset.page==='index'){const legacy={teaching:'engagement.html',about:'about.html',publications:'publications.html',research:'research.html'};if(legacy[location.hash.slice(1)])location.replace(legacy[location.hash.slice(1)])}
document.querySelectorAll('.filter-bar').forEach(bar=>{
 const list=document.getElementById(bar.dataset.target),buttons=[...bar.querySelectorAll('[data-filter]')],result=bar.querySelector('.results');
 const search=bar.dataset.target==='paper-list'?document.getElementById('paper-search'):null,year=search?document.getElementById('paper-year'):null;
 let category='all';const params=new URLSearchParams(location.search);
 if(search){search.value=params.get('q')||'';if(buttons.some(b=>b.dataset.filter===params.get('category')))category=params.get('category')}
 function apply(){let count=0;const q=(search?.value||'').trim().toLocaleLowerCase();[...list.children].forEach(item=>{const y=item.querySelector('.paper-year')?.firstChild.textContent.trim();item.hidden=(category!=='all'&&item.dataset.kind!==category)||(q&&!item.textContent.toLocaleLowerCase().includes(q))||(year&&year.value!=='all'&&y!==year.value);if(!item.hidden)count++});buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));result.textContent=`${count} ${result.dataset.unit}`;if(search){document.querySelector('.empty').hidden=count!==0}}
 buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;apply()}));search?.addEventListener('input',apply);year?.addEventListener('change',apply);document.getElementById('clear-filters')?.addEventListener('click',()=>{category='all';search.value='';year.value='all';apply();search.focus()});apply();
});
const dialog=document.querySelector('.lightbox');if(dialog){let opener;document.querySelectorAll('.photo-open').forEach(b=>b.addEventListener('click',()=>{opener=b;dialog.querySelector('img').src=b.dataset.src;dialog.querySelector('img').alt=b.dataset.caption;dialog.querySelector('figcaption').textContent=b.dataset.caption;dialog.showModal();document.body.style.overflow='hidden'}));function close(){dialog.close()}dialog.querySelector('.lightbox-close').addEventListener('click',close);dialog.addEventListener('click',ev=>{if(ev.target===dialog){const r=dialog.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)close()}});dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus()})}
const field=document.querySelector('[data-observatory]');
if(field){
 const canvas=field.querySelector('canvas'),ctx=canvas.getContext('2d'),control=field.querySelector('.motion-control');
 const tabs=[...document.querySelectorAll('[role=tab]')],panels=[...document.querySelectorAll('[role=tabpanel]')];
 let mode=0,paused=prefersReduced.matches,visible=true,angle=.32,rx=-.13,px=0,py=0,w=600,h=460,dpr=1,last=0,frame=0;
 const count=850,points=Array.from({length:count},(_,i)=>({x:0,y:0,z:0,seed:i}));
 function target(i,m){const f=i/count,a=i*2.399963229728653,y=1-2*f,r=Math.sqrt(1-y*y);
  if(m===0){const cluster=i%3,theta=cluster*Math.PI*2/3;return{x:r*Math.cos(a)*.53+Math.cos(theta)*.75,y:y*.53+Math.sin(theta)*.67,z:r*Math.sin(a)*.53}}
  if(m===1){const u=(i%50)/50*Math.PI*2,v=Math.floor(i/50)/17*Math.PI*2,rr=.78+.28*Math.cos(v);return{x:rr*Math.cos(u),y:.28*Math.sin(v)+.15*Math.sin(u*3),z:rr*Math.sin(u)}}
  const gx=(i%34)/33*2-1,gz=Math.floor(i/34)/24*2-1;return{x:gx*1.25,y:Math.sin(gx*3.5+gz*2)*.22+Math.cos(gz*5)*.15,z:gz*.85};
 }
 points.forEach((p,i)=>Object.assign(p,target(i,0)));
 function resize(){const r=field.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw()}
 function draw(){if(!ctx)return;ctx.clearRect(0,0,w,h);const scale=Math.min(w*.31,h*.38),ca=Math.cos(angle+px),sa=Math.sin(angle+px),cx=Math.cos(rx+py),sx=Math.sin(rx+py);const projected=[];
  for(const p of points){const a=p.x*ca-p.z*sa,z=p.x*sa+p.z*ca,b=p.y*cx-z*sx,c=p.y*sx+z*cx,depth=3.8/(3.8+c);projected.push({x:w*.5+a*scale*depth,y:h*.5+b*scale*depth,z:c,i:p.seed,d:depth})}
  projected.sort((a,b)=>b.z-a.z);
  // Sparse connections emphasize collaboration without implying measured data.
  if(mode===0){ctx.lineWidth=.55;for(let i=0;i<projected.length;i+=13){const p=projected[i],q=projected[(i+72)%projected.length],dist=Math.hypot(p.x-q.x,p.y-q.y);if(dist<scale*.45){ctx.strokeStyle='rgba(62,100,204,.10)';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}
  for(const p of projected){const opacity=Math.max(.18,Math.min(.85,.6-p.z*.27));ctx.fillStyle=`rgba(45,83,198,${opacity})`;ctx.beginPath();ctx.arc(p.x,p.y,(p.i%13===0?1.65:.9)*p.d,0,Math.PI*2);ctx.fill()}
  ctx.strokeStyle='rgba(98,125,188,.18)';ctx.lineWidth=.7;ctx.beginPath();ctx.ellipse(w*.5,h*.52,scale*1.45,scale*.6,-.13,0,Math.PI*2);ctx.stroke();
 }
 function tick(ts){frame=0;if(paused||!visible||document.hidden)return;if(ts-last>27){const dt=Math.min(ts-last,50);last=ts;angle+=dt*.00009;points.forEach((p,i)=>{const t=target(i,mode);p.x+=(t.x-p.x)*.055;p.y+=(t.y-p.y)*.055;p.z+=(t.z-p.z)*.055});draw()}frame=requestAnimationFrame(tick)}
 function start(){if(!frame&&!paused&&visible&&!document.hidden)frame=requestAnimationFrame(tick)}
 function setControl(){control.textContent=paused?control.dataset.play:control.dataset.pause;control.setAttribute('aria-pressed',String(paused))}
 function select(i,focus=false){mode=i;tabs.forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1});panels.forEach((p,n)=>p.hidden=n!==i);if(focus)tabs[i].focus();if(paused){points.forEach((p,n)=>Object.assign(p,target(n,mode)));draw()}else start()}
 tabs.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',ev=>{let n=i;if(ev.key==='ArrowRight')n=(i+1)%tabs.length;else if(ev.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(ev.key==='Home')n=0;else if(ev.key==='End')n=tabs.length-1;else return;ev.preventDefault();select(n,true)})});
 control.addEventListener('click',()=>{paused=!paused;setControl();if(paused){cancelAnimationFrame(frame);frame=0;draw()}else start()});
 field.addEventListener('pointermove',ev=>{if(ev.pointerType==='touch')return;const r=field.getBoundingClientRect();px=(ev.clientX-r.left-r.width/2)/r.width*.35;py=(ev.clientY-r.top-r.height/2)/r.height*.22;if(paused)draw()});
 field.addEventListener('pointerleave',()=>{px=py=0;if(paused)draw()});
 new ResizeObserver(resize).observe(field);new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0}},{threshold:.05}).observe(field);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else start()});prefersReduced.addEventListener('change',ev=>{paused=ev.matches;setControl();if(paused){cancelAnimationFrame(frame);frame=0;draw()}else start()});
 setControl();resize();start();
}
