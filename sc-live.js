(function(){
  const feedUrl = 'data/supreme-court-latest.json';
  const list = document.getElementById('scRecords');
  const status = document.getElementById('scStatus');
  const empty = document.getElementById('scEmpty');
  const search = document.getElementById('scSearch');
  const refresh = document.getElementById('scRefresh');
  let items = [], active = 'all';
  function el(tag, cls, text){ const n=document.createElement(tag); if(cls)n.className=cls; if(text!==undefined)n.textContent=text; return n; }
  function render(){
    const q=(search.value||'').trim().toLowerCase();
    const shown=items.filter(x=>(active==='all'||x.type===active)&&(!q||((x.title||'')+' '+(x.type||'')).toLowerCase().includes(q)));
    list.replaceChildren();
    shown.forEach(item=>{
      const card=el('article','sc-record-card');
      card.appendChild(el('span','sc-record-type',item.type==='judgment'?'JUDGMENT':'ORDER'));
      card.appendChild(el('h3','',item.title||'Untitled record'));
      const meta=el('p','sc-record-meta','Listed in source feed'); card.appendChild(meta);
      const a=el('a','text-link','Open official record ↗'); a.href=item.url; a.target='_blank'; a.rel='noopener noreferrer'; card.appendChild(a);
      list.appendChild(card);
    });
    empty.hidden=shown.length>0;
    if(items.length && shown.length===0) empty.textContent='No records match your search. Try another keyword or filter.';
  }
  async function load(){
    status.textContent='Checking the latest saved feed…'; refresh.disabled=true;
    try{
      const r=await fetch(feedUrl+'?t='+Date.now(),{cache:'no-store'});
      if(!r.ok) throw new Error('Feed returned HTTP '+r.status);
      const data=await r.json();
      items=Array.isArray(data.items)?data.items.filter(x=>x&&x.title&&x.url&&/^https:\/\/(www\.)?sci\.gov\.in\//i.test(x.url)):[];
      const when=data.fetched_at_utc?new Date(data.fetched_at_utc).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}):null;
      status.textContent=items.length?(items.length+' records · Last refreshed'+(when?' '+when+' IST':'')):'The feed has not been populated yet. Run the GitHub Actions update workflow.';
      render();
    }catch(e){status.textContent='The saved feed is temporarily unavailable. Use the official Supreme Court links below.';items=[];render();console.error('Supreme Court feed:',e);}
    finally{refresh.disabled=false;}
  }
  search.addEventListener('input',render);
  document.querySelectorAll('[data-sc-filter]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.scFilter;document.querySelectorAll('[data-sc-filter]').forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on));});render();}));
  refresh.addEventListener('click',load); load();
})();