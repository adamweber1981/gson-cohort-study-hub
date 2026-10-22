"use strict";
(function(root){
  function shuffled(a,r=Math.random){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
  function assemble(questions,blueprint,random=Math.random){
    if(!Array.isArray(questions)||!blueprint||!blueprint.topics)throw Error("Invalid blueprint input");
    const topics=Object.entries(blueprint.topics),total=topics.reduce((n,[,v])=>n+v,0);
    if(total!==blueprint.total)throw Error("Blueprint topic totals do not equal exam length");
    const typeRules=blueprint.types||{},types=Object.keys(typeRules);
    const allowed=new Set(topics.map(([t])=>t));
    const available=questions.filter(q=>q.approved===true&&allowed.has(q.topic));
    const idSet=new Set();for(const q of available){if(idSet.has(q.id))throw Error("Duplicate approved ID: "+q.id);idSet.add(q.id)}
    for(const [topic,n] of topics)if(available.filter(q=>q.topic===topic).length<n)throw Error("Insufficient approved questions in "+topic+": need "+n);
    const min=Object.fromEntries(types.map(t=>[t,typeRules[t].min||0]));
    const max=Object.fromEntries(types.map(t=>[t,typeRules[t].max??blueprint.total]));
    for(const t of types)if(available.filter(q=>q.type===t).length<min[t])throw Error("Insufficient approved "+t+" questions");
    const slots=topics.map(([topic,n])=>({topic,n,candidates:shuffled(available.filter(q=>q.topic===topic),random)})).sort((a,b)=>a.candidates.length-a.n-(b.candidates.length-b.n));
    const selected=[],counts=Object.fromEntries(types.map(t=>[t,0]));
    function viable(k){
      for(const t of types){
        if(counts[t]>max[t])return false;
        let possible=0;for(let j=k;j<slots.length;j++){const s=slots[j];possible+=Math.min(s.n,s.candidates.filter(q=>q.type===t).length)}
        if(counts[t]+possible<min[t])return false;
      }
      return true
    }
    function fill(k){
      if(k===slots.length)return types.every(t=>counts[t]>=min[t]&&counts[t]<=max[t]);
      const s=slots[k],pool=s.candidates,chosen=[];
      function choose(start){
        if(chosen.length===s.n){
          for(const q of chosen)if(q.type in counts)counts[q.type]++;
          selected.push(...chosen);
          const ok=viable(k+1)&&fill(k+1);
          if(ok)return true;
          selected.length-=chosen.length;
          for(const q of chosen)if(q.type in counts)counts[q.type]--;
          return false;
        }
        if(pool.length-start<s.n-chosen.length)return false;
        for(let i=start;i<pool.length;i++){
          const q=pool[i];
          if(q.type in counts&&counts[q.type]+chosen.filter(x=>x.type===q.type).length>=max[q.type])continue;
          chosen.push(q);if(choose(i+1))return true;chosen.pop();
        }
        return false
      }
      return choose(0)
    }
    if(!viable(0)||!fill(0))throw Error("No approved selection satisfies all topic and type quotas");
    return shuffled(selected,random);
  }
  root.ExamBlueprint={assemble};
})(window);
