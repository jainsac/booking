"use client";
import {useState} from "react";

type Entry={n:number;s:"APP"|"OFFLINE";st:"SERVING"|"WAITING"|"PASSED"};

export default function BusinessQueue(){
 const [avg,setAvg]=useState(10);
 const [entries,setEntries]=useState<Entry[]>([
  {n:1,s:"OFFLINE",st:"SERVING"},{n:2,s:"OFFLINE",st:"WAITING"},{n:3,s:"OFFLINE",st:"WAITING"},{n:4,s:"OFFLINE",st:"WAITING"},{n:5,s:"APP",st:"WAITING"}
 ]);
 const next=()=>setEntries(q=>{const i=q.findIndex(e=>e.st==="WAITING");if(i<0)return q;return q.map((e,n)=>n===i?{...e,st:"SERVING"}:e)});
 const passFive=()=>setEntries(q=>q.map(e=>e.n===5?{...e,st:"PASSED"}:e));
 return <main className="dashboard">
  <header><div className="brand"><span className="mark">B</span>BookFlow</div><span className="live">● LIVE QUEUE</span></header>
  <div className="dash-grid">
   <section className="panel">
    <div className="live">BUSINESS QUEUE</div><h1>Dr. Mehta Clinic</h1><p className="muted">Today · Unified online + walk-in sequence</p>
    <div className="stats">
     <div><b>{entries.filter(e=>e.st==="WAITING").length}</b><span>Waiting</span></div>
     <div><b>{entries.find(e=>e.st==="SERVING")?.n??"—"}</b><span>Serving</span></div>
     <div><b>{avg} min</b><span>Avg handling</span></div>
    </div>
    <div className="queue-list">{entries.map(e=><div className={"queue-row "+(e.s==="APP"?"app-row":"")} key={e.n}>
      <strong>#{e.n}</strong><span className={"source "+e.s.toLowerCase()}>{e.s}</span><span>{e.st}</span>
      <small>{e.st==="SERVING"?"Now":e.st==="WAITING"?"~"+(entries.filter(x=>x.n<e.n&&x.st!=="PASSED").length*avg)+" min":"—"}</small>
    </div>)}</div>
    <div className="demo-actions"><button className="ghost" onClick={passFive}>Pass #5</button><button className="primary" onClick={next}>Call next</button></div>
   </section>
   <aside className="panel settings">
    <div className="live">QUEUE RULES</div><h2>App positions</h2>
    <label>Range size<input type="number" defaultValue={10}/></label>
    <label>Reserved positions<input defaultValue="5"/></label>
    <label>Average handling time<input type="number" value={avg} onChange={e=>setAvg(Number(e.target.value)||1)}/></label>
    <div className="rule-card"><b>Current rule</b><p>Every 10 queue numbers, position #5 is reserved for app bookings.</p><small>Unused reserved positions can be passed and must not block the queue.</small></div>
   </aside>
  </div>
 </main>;
}