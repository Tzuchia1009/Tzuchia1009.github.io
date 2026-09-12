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
const dialog=document.querySelector('.lightbox');
if(dialog){
 let opener;const img=dialog.querySelector('img'),zoom=dialog.querySelector('.zoom-toggle'),scroll=dialog.querySelector('.image-scroll');
 function fit(){dialog.classList.remove('zoomed');zoom?.setAttribute('aria-pressed','false');if(zoom)zoom.textContent=zoom.dataset.zoom;scroll?.scrollTo(0,0)}
 document.querySelectorAll('.photo-open').forEach(b=>b.addEventListener('click',()=>{opener=b;fit();img.src=b.dataset.src;img.alt=b.dataset.caption;dialog.querySelector('figcaption').textContent=b.dataset.caption;dialog.showModal();document.body.style.overflow='hidden'}));
 dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
 zoom?.addEventListener('click',()=>{const on=dialog.classList.toggle('zoomed');zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?zoom.dataset.fit:zoom.dataset.zoom});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus()});
}
