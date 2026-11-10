'use strict';
const $ = id => document.getElementById(id);
const shapes = {
 pipe:'<path d="M25 80L120 25" stroke="#95afbd" stroke-width="25"/><path d="M25 74L120 19" stroke="#d7e6ed" stroke-width="17"/><ellipse cx="120" cy="24" rx="10" ry="12" fill="#506f80"/>',
 elbow:'<path d="M35 85V40Q35 25 55 25H120" fill="none" stroke="#a5bfcc" stroke-width="29"/><path d="M35 80V40Q35 25 55 25H115" fill="none" stroke="#dce9ef" stroke-width="16"/>',
 tee:'<path d="M25 30H130M77 30V88" stroke="#abc5d1" stroke-width="28"/><path d="M25 26H130M73 30V86" stroke="#e0ebf0" stroke-width="16"/>',
 motor:'<rect x="35" y="27" width="70" height="56" rx="10" fill="#809fac"/><ellipse cx="105" cy="55" rx="8" ry="27" fill="#c4d8e1"/><path d="M105 55H137M35 42H18V17M35 67H14V90" fill="none" stroke="#347c90" stroke-width="5"/>',
 propeller:'<g fill="#d3b55c" stroke="#8c722c" stroke-width="2"><path d="M77 55C27 6 15 44 54 56Z"/><path d="M77 55C98 3 135 27 99 49Z"/><path d="M77 55C125 94 80 110 74 76Z"/></g><circle cx="77" cy="55" r="9" fill="#526f80"/>',
 floats:'<rect x="25" y="22" width="36" height="67" rx="12" fill="#8bd9b0"/><ellipse cx="43" cy="22" rx="18" ry="9" fill="#bcf0cf"/><rect x="91" y="22" width="36" height="67" rx="12" fill="#8bd9b0"/><ellipse cx="109" cy="22" rx="18" ry="9" fill="#bcf0cf"/>',
 tether:'<path d="M20 90V55C20 0 138 8 135 58S37 101 40 56S110 29 110 83" fill="none" stroke="#d9aa4a" stroke-width="6"/>',
 controller:'<rect x="25" y="23" width="105" height="70" rx="12" fill="#5b7d8d"/><rect x="33" y="30" width="89" height="55" rx="8" fill="#dfeaf0"/><circle cx="48" cy="43" r="7" fill="#087b89"/><circle cx="106" cy="43" r="7" fill="#087b89"/><path d="M53 73V58M100 73V58" stroke="#304f60" stroke-width="6"/>',
 battery:'<rect x="30" y="30" width="95" height="62" rx="5" fill="#3d5b6d"/><rect x="43" y="20" width="15" height="12" fill="#d1846d"/><rect x="100" y="20" width="15" height="12" fill="#8ea7b3"/><path d="M43 53H57M50 46V60M100 53H114" stroke="white" stroke-width="3"/><path d="M82 43L63 68H79L72 84L95 59H80Z" fill="#b2f2d6"/>',
 ties:'<path d="M30 30C120 0 151 83 84 93S8 69 30 30Z" fill="none" stroke="#536f80" stroke-width="6"/><rect x="20" y="23" width="21" height="16" rx="3" fill="#315366"/>',
 rov:'<g fill="none" stroke="#6b98ac" stroke-width="7" stroke-linejoin="round"><path d="M24 78L48 26H112L137 78Z"/><path d="M24 78V98H137V78M48 26V49H112V26M48 49L24 98M112 49L137 98"/></g><path d="M37 40H66M94 40H123" stroke="#96e0ba" stroke-width="16" stroke-linecap="round"/><rect x="36" y="74" width="23" height="15" rx="5" fill="#087b89"/><rect x="103" y="74" width="23" height="15" rx="5" fill="#087b89"/>'
};
const art = key => '<svg viewBox="0 0 165 112" aria-hidden="true">'+(shapes[key] || shapes.rov)+'</svg>';
const parts = [
 ['pipe','PVC pipe','Forms straight sections of the frame and supports the ROV components.'],
 ['elbow','PVC elbow','Connects two pipe sections at a 90-degree corner.'],
 ['tee','PVC tee','Connects three pipe sections to create a branch.'],
 ['motor','Motor','Uses electrical energy to turn the propeller.'],
 ['propeller','Propeller','Pushes water as it spins, creating thrust.'],
 ['floats','Buoyancy floats','Provide upward buoyant force. Amount affects buoyancy; placement helps adjust balance.'],
 ['tether','Tether cable','Connects the underwater ROV to its controller and carries electrical power to its motors.'],
 ['controller','Controller','Two toggles operate horizontal thrusters; two pushbuttons operate the vertical thruster. It stays on land.'],
 ['battery','Battery','Supplies electrical energy to the system from land.'],
 ['ties','Cable ties','Secure components and organize cables.']
];
function show(view) {
 ['parts','lab','play','teacher'].forEach(id => $(id).hidden = id !== view);
 document.querySelectorAll('nav [data-view]').forEach(b => { b.classList.toggle('active',b.dataset.view===view); b.setAttribute('aria-pressed',String(b.dataset.view===view)); });
}
document.querySelectorAll('[data-view]').forEach(b => b.onclick = () => show(b.dataset.view));
function selectPart(i) {
 document.querySelectorAll('.part').forEach((b,n) => { b.classList.toggle('selected',i===n);b.setAttribute('aria-pressed',String(i===n)); });
 $('partDetail').innerHTML='<strong>'+parts[i][1]+'</strong><p>'+parts[i][2]+'</p>';
}
parts.forEach((p,i) => { const b=document.createElement('button');b.className='part';b.innerHTML=art(p[0])+'<strong>'+p[1]+'</strong>';b.onclick=()=>selectPart(i);$('partsGrid').append(b); });
selectPart(0);
function lesson(page) {
 $('buoyancy').hidden=page!=='buoy';$('steering').hidden=page!=='steer';
 $('buoyTab').classList.toggle('active',page==='buoy');$('steerTab').classList.toggle('active',page==='steer');
}
function openLab(){lesson('buoy');show('lab');}
 $('buoyTab').onclick=()=>lesson('buoy');$('steerTab').onclick=()=>lesson('steer');$('toSteering').onclick=()=>lesson('steer');$('openLab').onclick=openLab;
let flotation=0,floatTimer;
$('floatBot').innerHTML=art('rov');
function floatTest(){
 clearTimeout(floatTimer);$('floatBot').style.transition='none';$('floatBot').style.top='85px';
 $('floatStatus').textContent=flotation<0?'Too little flotation: the ROV sinks. Try adding a little flotation.':flotation===0?'Near the target: the ROV rises slowly. This is slightly positive buoyancy.':'Too much flotation: the ROV rises quickly and may struggle to dive. Try reducing flotation slightly.';
 floatTimer=setTimeout(()=>{$('floatBot').style.transition=matchMedia('(prefers-reduced-motion: reduce)').matches?'none':'top 1.5s ease';$('floatBot').style.top=flotation<0?'145px':flotation===0?'58px':'-10px';},70);
}
$('lessFloat').onclick=()=>{flotation=Math.max(-2,flotation-1);floatTest();};$('moreFloat').onclick=()=>{flotation=Math.min(2,flotation+1);floatTest();};$('release').onclick=floatTest;
function pilot(){
 const l=Number($('leftMotor').value),r=Number($('rightMotor').value);let text,angle=0,move=0;
 if(l===0&&r===0)text='Horizontal thrusters off. No powered forward motion or turn.';
 else if(l===r){text=l===1?'Both forward: move forward.':'Both reverse: move backward.';move=l===1?-25:25;}
 else {const left=r>l;angle=left?-50:50;text=l===-r?'Opposite thrust: pivot '+(left?'left.':'right.'):'One horizontal thruster active: curve '+(left?'left':'right')+' while moving '+((l+r)>0?'forward.':'backward.');}
 $('pilotBot').style.transform='translateY('+move+'px) rotate('+angle+'deg)';$('pilotStatus').textContent=text;
}
$('leftMotor').onchange=pilot;$('rightMotor').onchange=pilot;
$('rise').onclick=()=>{$('depthStatus').textContent='Vertical thrust for rising: move toward the surface. Horizontal settings stay as selected.';};
$('dive').onclick=()=>{$('depthStatus').textContent='Vertical thrust for diving: move deeper. Horizontal settings stay as selected.';};
$('stop').onclick=()=>{$('leftMotor').value='0';$('rightMotor').value='0';pilot();$('depthStatus').textContent='Vertical thruster off. In water, buoyancy and drift can still cause movement.';};
const names=['Parts Expert','Float & Pilot','Frame Planner','Problem Solver','Build Ready'];
const tasks=[];
function add(level,p,q,a,c,e,h){tasks.push({level,p,q,a,c,e,h});}
add(0,'elbow','Which component is shown?',['PVC elbow','PVC tee','Buoyancy float'],0,'An elbow connects two pipe sections at a corner.','Look for two openings and a bend.');
add(0,'propeller','Which component pushes water to create thrust?',['Controller','Propeller','Battery'],1,'The motor spins the propeller, which pushes water.','Look for the component with blades.');
add(0,'tether','What connects the ROV to its controller on land?',['Cable tie','PVC pipe','Tether cable'],2,'The tether carries electrical power from the controller to the motors.','Think of the long wired connection.');
add(1,'floats','Your ROV sinks with its motors off. Which adjustment could help?',['Add a little flotation.','Remove all flotation.','Use the controller to hide the problem.'],0,'More flotation can increase upward buoyancy. Make a small change and retest.','Upward buoyancy needs to better balance the weight.');
add(1,'floats','The ROV rises quickly and struggles to dive. What could you try?',['Add more floats.','Reduce flotation slightly or add a little secured ballast.','Change the team name.'],1,'Too much positive buoyancy makes diving harder. Aim for a slow rise with motors off.','Reduce the excess upward tendency.');
add(1,'rov','The ROV floats level and rises slowly after release. What does this suggest?',['It must be sinking.','It has no buoyancy.','It is near the slightly positive buoyancy target.'],2,'A slow rise is the standard SeaPerch buoyancy target.','A little upward tendency is useful.');
add(1,'rov','The ROV tilts left. What should you investigate?',['The distribution of floats and weight.','The controller color.','The spelling of the team name.'],0,'Float and weight placement affect trim, or balance.','Compare the two sides.');
add(1,'controller','What do the two toggle switches control?',['The buoyancy floats.','The left and right horizontal thrusters.','The battery charge level.'],1,'Each toggle operates a horizontal thruster. Pushbuttons operate the vertical thruster.','Think of the two motors used for forward motion and turning.');
add(1,'controller','Both horizontal thrusters produce forward thrust. What should the ROV do?',['Move backward.','Dive straight down.','Move forward.'],2,'Equal forward thrust produces forward motion in this standard arrangement.','Both sides push in the same forward direction.');
add(1,'controller','You want to pivot left. Which thrust combination should you choose?',['Left reverse; right forward.','Left forward; right reverse.','Both forward.'],0,'Opposite thrust rotates the ROV. Left reverse and right forward produces a left pivot.','The right side moves forward while the left side moves backward.');
add(1,'controller','Which control operates the thruster used for rising and diving?',['A PVC fitting.','The two vertical-thruster pushbuttons.','The tether length adjustment.'],1,'The pushbuttons provide opposite vertical thrust directions. Confirm physical button mapping before piloting.','Depth changes use the vertical motor.');
add(2,'tee','Your frame needs a junction for three pipe sections. Choose the fitting.',['PVC elbow','Cable tie','PVC tee'],2,'A tee has three connection points.','Think of a T-shaped branch.');
add(2,'rov','What is a useful first step when planning your frame?',['Sketch and label the connections.','Attach everything immediately.','Choose parts only by color.'],0,'A sketch helps plan dimensions and connections.','Check your ideas before building.');
add(2,'floats','Why plan float placement on both sides?',['To keep the controller underwater.','To help balance the ROV.','To eliminate the tether.'],1,'Balanced placement helps the ROV stay level.','Think about left and right balance.');
add(3,'tether','The ROV stops moving when its tether becomes tight. What should you do?',['Keep driving harder.','Pull the robot by its cable.','Pause and check for safe slack or a snag.'],2,'Good tether management gives the ROV room to move.','Check whether the cable is limiting movement.');
add(3,'controller','The ROV turns right when you intended left. What is a useful response?',['Check the control mapping and your viewpoint.','Add floats without testing.','Decorate the battery.'],0,'Confirm which toggle controls each motor and use the ROV’s viewpoint.','A robot facing you has its left on your right.');
add(3,'rov','Your change made the ROV’s balance worse. What next?',['Make several unrelated changes.','Record the result, revise one change, and retest.','Skip water testing.'],1,'One change at a time helps identify cause and effect.','Use observations as evidence.');
add(4,'pipe','Before cutting PVC, what should you do?',['Guess the length.','Choose a float color.','Measure, mark, and check against the plan.'],2,'Check the planned length and follow teacher instructions.','Accuracy starts before the cut.');
add(4,'rov','Choose a useful frame-planning sequence.',['Study plan → identify parts → dry-fit → check','Attach everything → read plan → measure','Cut random lengths → choose plan'],0,'Dry-fitting reveals problems before final assembly.','Understand the plan first.');
add(4,'ties','What should you record after adjusting float placement?',['Only the new appearance.','What changed and how the ROV behaved before and after.','Nothing until competition.'],1,'Engineering notes connect changes to evidence.','Could another engineer understand your test?');
let index=0,solved=false,complete=false;
function render(){
 const current=complete?5:tasks[index].level;
 $('levels').innerHTML=names.map((name,i)=>'<div class="level '+(i<current?'done':i===current?'current':'')+'"><b>'+(i<current?'✓':i+1)+'</b>'+name+'</div>').join('');
 const done=complete?tasks.length:index;
 $('counter').textContent=done+' of '+tasks.length+' completed'+(complete?'':' · Task '+(index+1)+' of '+tasks.length);
 $('fill').style.width=done/tasks.length*100+'%';$('progress').setAttribute('aria-valuenow',done);
 $('quiz').hidden=complete;$('finish').hidden=!complete;
 if(complete){$('finish').innerHTML='<div class="eyebrow">MISSION COMPLETE</div><h2>Ready for the next step!</h2><p>You explored parts, adjusted buoyancy, and predicted controller movements.</p><div class="badges">'+names.map(n=>'<div class="badge"><span>✓</span>'+n+'</div>').join('')+'</div><p class="note">Partner challenge: An ROV tilts left and struggles to dive. Which issue would you investigate first, and why?</p><button id="replay" class="primary">Play again</button>';$('replay').onclick=reset;return;}
 const t=tasks[index];$('labNotice').hidden=t.level!==1;$('questionArt').innerHTML=art(t.p);$('stage').textContent='LEVEL '+(t.level+1)+' · '+names[t.level].toUpperCase();$('question').textContent=t.q;$('options').replaceChildren();$('feedback').hidden=true;$('next').hidden=true;
 t.a.forEach((a,i)=>{const b=document.createElement('button');b.className='option';b.textContent=String.fromCharCode(65+i)+'. '+a;b.onclick=()=>answer(i,b);$('options').append(b);});
}
function answer(i,b){
 if(solved)return;const t=tasks[index];$('feedback').hidden=false;
 if(i===t.c){solved=true;b.classList.add('correct');document.querySelectorAll('.option').forEach(x=>x.disabled=true);const earned=index===tasks.length-1||tasks[index+1].level!==t.level;$('feedback').className='note correct';$('feedback').textContent='Correct! '+t.e+(earned?' Badge earned: '+names[t.level]+'.':'');$('next').textContent=index===tasks.length-1?'See my badges →':earned?'Next level →':'Next task →';$('next').hidden=false;$('fill').style.width=(index+1)/tasks.length*100+'%';$('progress').setAttribute('aria-valuenow',index+1);$('next').focus();}
 else{b.classList.add('wrong');b.disabled=true;$('feedback').className='note';$('feedback').textContent='Try again. '+t.h;const available=$('options').querySelector('button:not(:disabled)');if(available)available.focus();}
}
$('next').onclick=()=>{const previous=tasks[index].level;index++;solved=false;complete=index===tasks.length;render();if(!complete&&previous===0&&tasks[index].level===1){openLab();$('buoyTab').focus();}else if(complete)$('replay').focus();else $('question').focus();};
$('help').onclick=()=>tasks[index].level===1?openLab():show('parts');$('start').onclick=()=>show('play');
function reset(){index=0;solved=false;complete=false;flotation=0;clearTimeout(floatTimer);$('floatBot').style.transition='none';$('floatBot').style.top='85px';$('floatStatus').textContent='Start near the target. Change the flotation, then release and observe.';$('stop').click();lesson('buoy');render();show('parts');}
$('reset').onclick=reset;
reset();
