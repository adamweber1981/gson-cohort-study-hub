"use strict";
(function(root){
 function shuffle(items,random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 function assemble(questions,blueprint,random=Math.random){
  if(!blueprint||!blueprint.topics||!Number.isInteger(blueprint.total))throw Error("Invalid exam blueprint");
  const topics=Object.entries(blueprint.topics),total=topics.reduce((n,[,v])=>n+v,0);
  if(total!==blueprint.total||topics.some(([,n])=>!Number.isInteger(n)||n<0))throw Error("Invalid topic quotas");
  const subtopics=blueprint.subtopics||{};
  for(const [topic,sub] of Object.entries(subtopics)){
   if(!(topic in blueprint.topics)||Object.values(sub).some(n=>!Number.isInteger(n)||n<0)||Object.values(sub).reduce((a,n)=>a+n,0)!==blueprint.topics[topic])throw Error("Subtopic quotas do not match topic total: "+topic);
  }
  const slots=topics.flatMap(([topic,n])=>subtopics[topic]?Object.entries(subtopics[topic]).map(([subtopic,count])=>({topic,subtopic,n:count})):[{topic,subtopic:null,n}]);
  const rules=blueprint.types||{},types=Object.keys(rules);
  const minima=types.map(t=>rules[t].min||0),maxima=types.map(t=>rules[t].max??total);
  const seen=new Set(),approved=questions.filter(q=>q.approved===true);
  for(const q of approved){if(seen.has(q.id))throw Error("Duplicate approved question: "+q.id);seen.add(q.id)}
  const pools=slots.map(({topic,subtopic,n})=>({topic,subtopic,n,byType:Object.fromEntries([...types,"other"].map(t=>[t,shuffle(approved.filter(q=>q.topic===topic&&(subtopic===null||q.subtopic===subtopic)&&(types.includes(q.type)?q.type:"other")===t),random)]))}));
  for(const p of pools)if(Object.values(p.byType).reduce((n,a)=>n+a.length,0)<p.n)throw Error("Insufficient approved questions in "+p.topic+(p.subtopic?" / "+p.subtopic:""));
  const memo=new Set();
  function search(i,counts){
   if(i===pools.length)return minima.every((min,k)=>counts[k]>=min&&counts[k]<=maxima[k])?[]:null;
   const key=i+":"+counts.join(",");if(memo.has(key))return null;
   const p=pools[i],caps=types.map(t=>p.byType[t].length),alloc=Array(types.length).fill(0);
   function assign(k,remaining){
    if(k===types.length){
     if(remaining>p.byType.other.length)return null;
     const next=counts.map((n,j)=>n+alloc[j]);
     for(let j=0;j<types.length;j++){
      if(next[j]>maxima[j])return null;
      const future=pools.slice(i+1).reduce((n,p2)=>n+Math.min(p2.n,p2.byType[types[j]].length),0);
      if(next[j]+future<minima[j])return null;
     }
     const tail=search(i+1,next);
     return tail===null?null:[{pool:p,allocation:[...alloc],other:remaining},...tail]
    }
    const possible=Math.min(caps[k],remaining,maxima[k]-counts[k]);
    const values=shuffle(Array.from({length:possible+1},(_,i)=>i),random);
    for(const value of values){alloc[k]=value;const result=assign(k+1,remaining-value);if(result!==null)return result}
    return null
   }
   const result=assign(0,p.n);if(result===null)memo.add(key);return result
  }
  const allocation=search(0,Array(types.length).fill(0));
  if(!allocation)throw Error("No approved question selection satisfies the blueprint topic/subtopic/type quotas");
  const selected=[];
  for(const entry of allocation){types.forEach((t,i)=>selected.push(...entry.pool.byType[t].slice(0,entry.allocation[i])));selected.push(...entry.pool.byType.other.slice(0,entry.other))}
  if(selected.length!==total||new Set(selected.map(q=>q.id)).size!==total)throw Error("Blueprint assembly integrity check failed");
  return shuffle(selected,random)
 }
 root.ExamBlueprint={assemble};
})(window);
