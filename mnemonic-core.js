/* Focus Recall v3: original, generated memory tasks; no network or dependencies. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.FocusMnemonics=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const LEVELS=[3,5,7,10];
const GROUPS={mnemonic:'Mnemonic techniques',visual:'Visual & spatial',sequence:'Sequences & numbers',everyday:'Everyday & reading'};
const SPECS={
 palace:{name:'Memory palace',group:'mnemonic',unit:'items',desc:'Place vivid images along a familiar route, then mentally walk it in order.',tip:'Make each object interact with its location. Keep one fixed direction around the route.',transfer:'Use the same locations to hold the key points of an article.'},
 story:{name:'Story links',group:'mnemonic',unit:'items',desc:'Connect a list through one memorable chain of actions.',tip:'Make one object cause something to happen to the next. A causal link is easier to follow than unrelated images.',transfer:'Try linking the steps of an explanation you have just read.'},
 pegs:{name:'Numbered pegs',group:'mnemonic',unit:'items',desc:'Attach items to a fixed set of number-rhyme images.',tip:'Learn the peg sequence first. Give every peg a distinctive interaction with its target.',transfer:'Use numbered pegs for ordered talking points or a short checklist.'},
 pairs:{name:'Paired associations',group:'mnemonic',unit:'pairs',cued:true,desc:'Link two words so one becomes a cue for the other.',tip:'Imagine both objects doing something together. The cue will remain visible in recall.',transfer:'Build a connection between a new term and its definition.'},
 digits:{name:'Digit images',group:'mnemonic',unit:'digits',desc:'Turn individual digits into familiar shape-images and link them.',tip:'Use the same image for each digit every time. Keep repeated digits in their own positions.',transfer:'Practise with invented reference numbers, never passwords or private codes.'},
 acrostic:{name:'First-letter cues',group:'mnemonic',unit:'words',cued:true,desc:'Make an initial-letter sentence and use the initials to recover a list.',tip:'Write a sentence whose words start with the target initials. During recall only the initials remain, not your sentence.',transfer:'Use initial letters to prompt the headings or subpoints in a text.'},
 grid:{name:'Grid snapshot',group:'visual',unit:'cells',unordered:true,desc:'Study a pattern, hide it, then tap the cells you remember.',tip:'Look for small shapes and relationships: a diagonal, a corner, a pair. You will rebuild the pattern on a blank 4 × 4 grid.',transfer:'Apply the same attention to the layout of a diagram or page.'},
 locations:{name:'Object locations',group:'visual',unit:'objects',cued:true,desc:'Remember where each object sits in a small visual map.',tip:'Bind the object to its row and column, not only to the objects around it. Recall uses A1–D4 coordinates.',transfer:'Notice the relation between an item and its place rather than remembering them separately.'},
 dice:{name:'Dice snapshot',group:'visual',unit:'dice',desc:'Read a row of dice and retrieve the values in order.',tip:'Notice the pip patterns, then group the dice into small visual chunks. Study is self-paced.',transfer:'Experiment with grouping short number sequences into meaningful units.'},
 missing:{name:'Vanishing objects',group:'visual',unit:'missing objects',unordered:true,desc:'Inspect an object tray, then recover the items that disappear.',tip:'Group the whole tray before hiding it. On recall the survivors are shown in a different order; name only the missing objects.',transfer:'Practise checking a remembered set against what is currently present.'},
 updates:{name:'Map updates',group:'visual',unit:'moves',cued:true,desc:'Hold a starting map in mind while following a sequence of moves.',tip:'Each instruction moves one object to an empty cell. Follow the moves one at a time; the finished map is never shown before recall.',transfer:'Practise keeping track of changes in a set of written instructions.'},
 symbols:{name:'Symbol sequence',group:'sequence',unit:'symbols',desc:'Watch a self-paced stream of symbols and reconstruct the order.',tip:'Name or picture each symbol, then group the sequence. Use Next to reveal only one symbol at a time.',transfer:'Use ordering cues when a text describes a process or chain of events.'},
 reverse:{name:'Reverse span',group:'sequence',unit:'digits',desc:'Study digits one at a time and recall them in reverse order.',tip:'Hold small groups together, then start from the last digit. This is a reversal task, not normal forward recall.',transfer:'Compare strategies on this task; do not treat it as a score for your overall memory.'},
 chunks:{name:'Number chunks',group:'sequence',unit:'chunks',desc:'Learn invented numbers grouped into three-digit blocks.',tip:'Give each block a rhythm, association, or image. Preserve zeros and the order of the blocks.',transfer:'Try deliberate grouping when learning a long reference number.'},
 ordering:{name:'Order reconstruction',group:'sequence',unit:'steps',cued:true,desc:'Study a short routine, then rebuild its order from shuffled step tiles.',tip:'Link each step to the next. All step tiles return during recall, so the task measures cued ordering, not free recall.',transfer:'Use it as rehearsal for following a multi-step process.'},
 names:{name:'Names & introductions',group:'everyday',unit:'people',cued:true,desc:'Link fictional names to a role and a distinctive object badge.',tip:'Create a sound or image link between the name and the introduction. Badges are symbolic cues, not a face-recognition test.',transfer:'After a real introduction, connect the name to something you actually noticed.'},
 appointments:{name:'Appointment diary',group:'everyday',unit:'appointments',cued:true,desc:'Remember the time attached to each fictional appointment.',tip:'Picture the event together with its time. Enter answers in 24-hour HH:MM format; the event remains as your cue.',transfer:'Use a link between an event and its time while keeping your real calendar as a backup.'},
 categories:{name:'Category clusters',group:'everyday',unit:'words',unordered:true,desc:'Organize a mixed list into categories, then recover it in any order.',tip:'Look for shared categories and make a small image for each group. Category labels disappear during recall.',transfer:'Group related facts from a passage instead of trying to hold an undifferentiated list.'},
 casefile:{name:'Case-file details',group:'everyday',unit:'details',cued:true,desc:'Read a fictional field note and retrieve precise details from questions.',tip:'Notice who, what, where, when, and the unusual details. Link each answer to the question it will resolve.',transfer:'Finish a real article by asking yourself a few specific factual questions.'},
 sources:{name:'Who said what?',group:'everyday',unit:'statements',cued:true,desc:'Read a fictional discussion and connect each statement to its speaker.',tip:'Give each speaker a distinct scene and place each statement there. During recall the statements remain as cues.',transfer:'Keep track of which person or source made each claim in an article.'}
};
const KINDS=Object.keys(SPECS),NAMES=Object.fromEntries(KINDS.map(k=>[k,SPECS[k].name]));
const PEGS=['sun','shoe','tree','door','hive','sticks','heaven','gate','vine','hen'];
const SHAPES=['hoop','candle','swan','trident','sailboat','hook','cherry','boomerang','snowman','balloon'];
const WORDS=('anchor apron balloon basket bell bicycle blanket book bottle bridge broom bucket button camera candle carpet carrot castle cherry clock cloud compass crown cup curtain diamond drum feather fence flute flower fountain fox glove hammer hat helmet honey island jacket kettle key kite ladder lamp lantern leaf lemon mirror mountain mushroom needle notebook ocean orange owl paintbrush pancake pear pencil piano pillow pineapple pirate planet pocket pumpkin rabbit radio rainbow ribbon ring river rocket rope sandwich scarf shell shoe shovel spoon squirrel suitcase sun telescope tent ticket tiger tomato toothbrush tower train tree trumpet turtle umbrella violin volcano wagon waterfall whale window windmill zebra zipper').split(' ');

const OBJECTS={anchor:'⚓',balloon:'🎈',basket:'🧺',bell:'🔔',bicycle:'🚲',book:'📖',bottle:'🍼',broom:'🧹',button:'🔘',camera:'📷',candle:'🕯',carrot:'🥕',cherry:'🍒',clock:'🕰',cloud:'☁',compass:'🧭',crown:'👑',cup:'☕',diamond:'💎',drum:'🥁',feather:'🪶',flower:'🌻',fox:'🦊',glove:'🧤',hammer:'🔨',hat:'🎩',key:'🔑',kite:'🪁',ladder:'🪜',lamp:'💡',leaf:'🍃',lemon:'🍋',mirror:'🪞',mushroom:'🍄',notebook:'📓',orange:'🍊',owl:'🦉',pencil:'✏',piano:'🎹',rabbit:'🐇',radio:'📻',rainbow:'🌈',ring:'💍',rocket:'🚀',scarf:'🧣',shell:'🐚',shoe:'👟',spoon:'🥄',suitcase:'🧳',sun:'☀',tent:'⛺',ticket:'🎟',tiger:'🐅',tomato:'🍅',train:'🚂',tree:'🌳',turtle:'🐢',umbrella:'☂',violin:'🎻',whale:'🐋',zebra:'🦓'};
const SYMBOLS={circle:'●',triangle:'▲',square:'■',diamond:'◆',star:'★',plus:'✚',heart:'♥',moon:'☾'};
const CELLS=Array.from({length:16},(_,i)=>'ABCD'[Math.floor(i/4)]+(i%4+1));
const FIRST_NAMES='Maya Leo Nora Omar Iris Theo Lina Felix Ada Hugo Sana Luca Mina Elias Rosa Amir Eva Jonas Mila Noah Zara Finn Alma Arlo'.split(' ');
const ROLES=['Baker','Potter','Gardener','Musician','Translator','Architect','Teacher','Designer','Cyclist','Writer','Painter','Librarian','Dancer','Chef','Photographer','Carpenter'];
const EVENTS=['Library visit','Guitar lesson','Team meeting','Parcel pickup','Lunch with a friend','Garden club','Museum tour','Book discussion','Drawing class','Train departure','Evening walk','Workshop','Call with a friend','Coffee break','Theatre rehearsal','Market visit'];
const CATEGORIES={Fruit:['apple','pear','banana','lemon','peach','plum'],Tools:['hammer','saw','wrench','drill','pliers','chisel'],Clothes:['scarf','jacket','shirt','sock','hat','glove'],Instruments:['piano','violin','flute','drum','trumpet','guitar'],Animals:['tiger','rabbit','zebra','fox','whale','owl'],Kitchen:['spoon','kettle','plate','fork','bowl','pan']};
const ACTIONS=['Open the wooden box','Unfold the blue map','Place a coin on the desk','Read the small label','Pick up the red ribbon','Ring the silver bell','Turn over the postcard','Move the pencil to the shelf','Put the key beside the lamp','Fold the paper in half','Close the green notebook','Tie the ribbon around the parcel','Slide the card into the envelope','Lay the scarf on the chair','Carry the cup to the table','Open the striped umbrella','Stack the two empty bowls','Place the ticket under the clock'];
const STATEMENTS=['The book club meets on Friday.','The north entrance is being painted.','The new exhibit includes small wooden boats.','The blue folder is on the top shelf.','The rehearsal starts after lunch.','The library has a quiet courtyard.','The last delivery contained glass jars.','The yellow bicycle belongs to the workshop.','The poster needs a larger heading.','The key is attached to a green ribbon.','The afternoon tour begins at the fountain.','The photographs will be displayed upstairs.','The garden gate closes at sunset.','The next parcel contains drawing paper.','The music room has three tall windows.','The notice board is beside the lift.'];
const normal=x=>String(x??'').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const id=prefix=>prefix+'-'+(typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));
const safeId=x=>typeof x==='string'&&/^(?:mem|palace|mtry)-[A-Za-z0-9_-]{1,100}$/.test(x);
function blank(){return {schemaVersion:2,level:3,favorites:[],palaces:[{id:'palace-example',name:'Example home',places:['Front door','Coat hook','Sofa','Table','Kitchen sink','Fridge','Hall mirror','Desk','Bookshelf','Window']}],drills:[],records:[],active:null};}
function shuffle(a,rng=Math.random){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function create(kind,count,palace,now=Date.now(),rng=Math.random){
 if(!KINDS.includes(kind)||!LEVELS.includes(count))throw Error('Choose a supported exercise and size.');
 if(kind==='palace'&&(!palace||palace.places.length<count))throw Error('Add a route with at least '+count+' distinct places, or choose a smaller set.');
 const take=(a,n=count)=>shuffle(a,rng).slice(0,n),digit=()=>String(Math.floor(rng()*10)),all=take(WORDS,count*2),spec=SPECS[kind];
 const d={id:id('mem'),kind,title:spec.name+' · '+count+' '+spec.unit,level:count,targets:all.slice(0,count),anchors:[],images:Array(count).fill(''),story:'',palaceName:kind==='palace'?palace.name:'',meta:{},createdAt:now,lastExposedAt:now,lastReviewed:0,stage:0,reps:0,due:now};
 d.title+=' · '+d.id.slice(-6).toUpperCase();
 if(kind==='palace')d.anchors=palace.places.slice(0,count);
 if(kind==='pegs')d.anchors=PEGS.slice(0,count);
 if(kind==='pairs')d.anchors=all.slice(count,count*2);
 if(kind==='digits'){d.targets=Array.from({length:count},digit);d.anchors=d.targets.map(t=>SHAPES[Number(t)]);}
 if(kind==='acrostic')d.anchors=d.targets.map(w=>w[0].toUpperCase());
 if(kind==='grid'){d.targets=take(CELLS);d.meta.source=d.targets.slice();}
 if(kind==='locations'||kind==='updates'){
  d.anchors=take(Object.keys(OBJECTS));d.targets=take(CELLS);d.meta.positions=d.targets.slice();
  if(kind==='updates'){
   const current=d.targets.slice(),moves=[];
   for(let i=0;i<count;i++){const next=take(CELLS.filter(c=>!current.includes(c)),1)[0];moves.push('Move '+d.anchors[i]+' from '+current[i]+' to '+next+'.');current[i]=next;}
   d.targets=current;d.meta.lines=moves;
  }
 }
 if(kind==='dice')d.targets=Array.from({length:count},()=>String(1+Math.floor(rng()*6)));
 if(kind==='missing'){const tray=take(Object.keys(OBJECTS),count*2);d.targets=tray.slice(0,count);d.meta.source=shuffle(tray,rng);d.meta.pool=shuffle(tray.slice(count),rng);}
 if(kind==='symbols'){d.targets=Array.from({length:count},()=>take(Object.keys(SYMBOLS),1)[0]);d.meta.source=d.targets.slice();d.meta.pool=Object.keys(SYMBOLS);}
 if(kind==='reverse'){d.meta.source=Array.from({length:count},digit);d.targets=d.meta.source.slice().reverse();}
 if(kind==='chunks')d.targets=Array.from({length:count},()=>digit()+digit()+digit());
 if(kind==='ordering'){d.targets=take(ACTIONS);d.meta.pool=shuffle(d.targets,rng);}
 if(kind==='names'){d.targets=take(FIRST_NAMES);const badges=take(Object.keys(OBJECTS)),roles=take(ROLES);d.anchors=roles.map((role,i)=>role+' · '+badges[i]+' badge');d.meta.items=badges;}
 if(kind==='appointments'){d.anchors=take(EVENTS);d.targets=take(Array.from({length:40},(_,i)=>String(8+Math.floor(i/4)).padStart(2,'0')+':'+String((i%4)*15).padStart(2,'0')));}
 if(kind==='categories'){
  const cats=take(Object.keys(CATEGORIES),count<=5?2:3),items=[];
  cats.forEach(cat=>take(CATEGORIES[cat],Math.ceil(count/cats.length)).forEach(word=>items.push({word,cat})));
  const selected=shuffle(items,rng).slice(0,count);d.targets=selected.map(x=>x.word);d.anchors=selected.map(x=>x.cat);
 }
 if(kind==='casefile'){
  const name=take(FIRST_NAMES,1)[0],place=take(['greenhouse','workshop','courtyard','bookshop','gallery','station','cafe','theatre'],1)[0],obj=take(['compass','notebook','camera','umbrella','key','scarf'],1)[0],color=take(['blue','green','red','yellow','purple','orange'],1)[0],day=take(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],1)[0],time=take(['09:15','10:30','11:45','13:00','14:20','16:10'],1)[0],transport=take(['bicycle','tram','bus','taxi','train','ferry'],1)[0],material=take(['wood','metal','glass','paper','stone','fabric'],1)[0],qty=String(2+Math.floor(rng()*8)),destination=take(['harbour','museum','park','library','market','observatory'],1)[0];
  const facts=[['Who made the visit?',name,name+' made the visit.'],['Where did the visit take place?',place,'The visit took place at the '+place+'.'],['Which item was carried?',obj,'The visitor carried a '+obj+'.'],['What colour was the bag?',color,'The bag was '+color+'.'],['On which day?',day,'The visit was on '+day+'.'],['At what time?',time,'It started at '+time+'.'],['Which form of transport was used?',transport,'The visitor arrived by '+transport+'.'],['What material was the souvenir made from?',material,'A souvenir was made from '+material+'.'],['How many postcards were collected?',qty,qty+' postcards were collected.'],['What was the next destination?',destination,'The next destination was the '+destination+'.']].slice(0,count);
  d.targets=facts.map(x=>x[1]);d.anchors=facts.map(x=>x[0]);d.meta.lines=facts.map(x=>x[2]);
 }
 if(kind==='sources'){
  const speakers=take(FIRST_NAMES,count<=5?3:4);d.anchors=take(STATEMENTS);d.targets=Array.from({length:count},(_,i)=>speakers[i%speakers.length]);d.meta.lines=d.anchors.map((line,i)=>d.targets[i]+': “'+line+'”');d.meta.pool=speakers;
 }
 return d;
}
function canonical(kind,value){
 const raw=String(value??'').trim();
 if(kind==='appointments'||kind==='casefile'){
  const t=raw.match(/^(\d{1,2})[:.](\d{2})$/);if(t&&Number(t[1])<24&&Number(t[2])<60)return t[1].padStart(2,'0')+':'+t[2];
 }
 if(['grid','locations','updates'].includes(kind))return raw.replace(/\s+/g,'').toLowerCase();
 return normal(raw);
}
function score(drill,answers){
 const expected=drill.targets.map(t=>canonical(drill.kind,t)),actual=expected.map((_,i)=>canonical(drill.kind,answers?.[i]));
 const position=expected.map((v,i)=>v===actual[i]?1:0),positionScore=position.reduce((a,b)=>a+b,0)/expected.length;
 const bag=new Map();actual.forEach(x=>bag.set(x,(bag.get(x)||0)+1));
 const recovered=expected.map(x=>{if(bag.get(x)>0){bag.set(x,bag.get(x)-1);return 1;}return 0;});
 const contentScore=recovered.reduce((a,b)=>a+b,0)/expected.length,unordered=SPECS[drill.kind]?.unordered===true;
 return {score:unordered?contentScore:positionScore,positionScore,contentScore,perItem:unordered?recovered:position};
}
function recommendation(records,kind,count){const last=records.filter(r=>r.kind===kind&&r.level===count&&r.lagMs>=86400000&&!r.interrupted).slice(-3);return last.length===3&&last.every(r=>r.score>=.85)&&count<10?LEVELS[LEVELS.indexOf(count)+1]:null;}
function validate(input,{resume=false}={}){
 if(input==null)return blank();
 if(![1,2].includes(input.schemaVersion)||!Array.isArray(input.palaces)||!Array.isArray(input.drills)||!Array.isArray(input.records)||input.palaces.length>12||input.drills.length>150||input.records.length>1000)throw Error('Mnemonic backup is invalid or too large.');
 const out=blank(),text=(v,n)=>typeof v==='string'&&v.length<=n,arr=(a,n,max)=>Array.isArray(a)&&a.length<=n&&a.every(v=>text(v,max)),num=x=>Number.isFinite(x)&&x>=0&&x<=1e14;
 out.level=LEVELS.includes(input.level)?input.level:3;out.favorites=Array.isArray(input.favorites)?[...new Set(input.favorites.filter(k=>KINDS.includes(k)))]:[];out.palaces=[];out.drills=[];out.records=[];const seen=new Set();
 for(const p of input.palaces){if(!p||!safeId(p.id)||seen.has(p.id)||!text(p.name,60)||!p.name.trim()||!arr(p.places,12,80)||p.places.length<3||p.places.some(v=>!v.trim())||new Set(p.places.map(normal)).size!==p.places.length)throw Error('A memory route is invalid.');seen.add(p.id);out.palaces.push({id:p.id,name:p.name,places:p.places.slice()});}
 for(const d of input.drills){
  if(!d||!safeId(d.id)||seen.has(d.id)||!KINDS.includes(d.kind)||!LEVELS.includes(d.level)||!text(d.title,100)||!arr(d.targets,10,200)||d.targets.length!==d.level||d.targets.some(v=>!normal(v))||!arr(d.anchors,10,200)||!arr(d.images,10,500)||!text(d.story,3000)||!num(d.due)||!num(d.lastExposedAt)||!num(d.createdAt)||!num(d.lastReviewed)||!Number.isInteger(d.stage)||d.stage<0||d.stage>4||!Number.isInteger(d.reps)||d.reps<0||d.reps>1e6)throw Error('A mnemonic exercise is invalid.');
  if((['palace','pegs','pairs','digits','acrostic','locations','updates','names','appointments','categories','casefile','sources'].includes(d.kind))&&d.anchors.length!==d.level)throw Error('A mnemonic exercise has missing anchors.');
  if(['digits','reverse'].includes(d.kind)&&!d.targets.every(x=>/^\d$/.test(x)))throw Error('A digit exercise is invalid.');
  if(d.kind==='chunks'&&!d.targets.every(x=>/^\d{3}$/.test(x)))throw Error('Number chunks are invalid.');
  if(d.kind==='dice'&&!d.targets.every(x=>/^[1-6]$/.test(x)))throw Error('Dice are invalid.');
  if(['grid','locations','updates'].includes(d.kind)&&(!d.targets.every(x=>CELLS.includes(x))||new Set(d.targets).size!==d.level))throw Error('Grid positions are invalid.');
  const meta={};
  if(d.meta!=null){if(typeof d.meta!=='object'||Array.isArray(d.meta))throw Error('Exercise metadata is invalid.');for(const key of ['source','positions','items','pool','lines']){if(d.meta[key]!=null){if(!arr(d.meta[key],40,key==='lines'?500:200))throw Error('Exercise metadata is invalid.');meta[key]=d.meta[key].slice();}}}
  if(['grid','symbols','reverse'].includes(d.kind)&&(!meta.source||meta.source.length!==d.level))throw Error('The study sequence is missing.');
  if(['locations','updates'].includes(d.kind)&&(!meta.positions||meta.positions.length!==d.level||!meta.positions.every(x=>CELLS.includes(x))||new Set(meta.positions).size!==d.level))throw Error('The starting map is invalid.');
  if(d.kind==='updates'&&(!meta.lines||meta.lines.length!==d.level))throw Error('Map instructions are missing.');
  if(d.kind==='symbols'&&(!d.targets.every(x=>Object.prototype.hasOwnProperty.call(SYMBOLS,x))||!meta.pool||!meta.pool.every(x=>Object.prototype.hasOwnProperty.call(SYMBOLS,x))))throw Error('Symbols are invalid.');
  if(d.kind==='names'&&(!meta.items||meta.items.length!==d.level||!meta.items.every(x=>Object.prototype.hasOwnProperty.call(OBJECTS,x))))throw Error('Introduction badges are invalid.');
  if(d.kind==='grid'&&(!meta.source.every(x=>CELLS.includes(x))||!d.targets.every(x=>meta.source.includes(x))))throw Error('The study grid is inconsistent.');
  if(d.kind==='reverse'&&(!meta.source.every(x=>/^\d$/.test(x))||d.targets.some((x,i)=>x!==meta.source[d.level-1-i])))throw Error('The reversed sequence is inconsistent.');
  if(d.kind==='symbols'&&d.targets.some((x,i)=>x!==meta.source[i]))throw Error('The symbol sequence is inconsistent.');
  if(d.kind==='ordering'&&(!meta.pool||meta.pool.length!==d.level||new Set(meta.pool).size!==d.level||!d.targets.every(x=>meta.pool.includes(x))))throw Error('Ordering tiles are invalid.');
  if(d.kind==='missing'&&(!meta.source||meta.source.length!==d.level*2||!meta.pool||meta.pool.length!==d.level||new Set(meta.source).size!==meta.source.length||!d.targets.every(x=>meta.source.includes(x)&&!meta.pool.includes(x))||!meta.pool.every(x=>meta.source.includes(x))))throw Error('The object tray is invalid.');
  if(['casefile','sources'].includes(d.kind)&&(!meta.lines||meta.lines.length!==d.level))throw Error('The field note is missing.');
  seen.add(d.id);out.drills.push({id:d.id,kind:d.kind,title:d.title,level:d.level,targets:d.targets.slice(),anchors:d.anchors.slice(),images:Array.from({length:d.level},(_,i)=>d.images[i]||''),story:d.story,palaceName:text(d.palaceName,60)?d.palaceName:'',meta,createdAt:d.createdAt,lastExposedAt:d.lastExposedAt,lastReviewed:d.lastReviewed,stage:d.stage,reps:d.reps,due:d.due});
 }
 const recordIds=new Set();
 for(const r of input.records){if(!r||!safeId(r.id)||recordIds.has(r.id)||!out.drills.some(d=>d.id===r.drillId&&d.kind===r.kind&&d.level===r.level)||!num(r.at)||!num(r.lagMs)||!['new','review','early'].includes(r.phase)||!arr(r.original,10,300)||r.original.length!==r.level||![r.score,r.positionScore,r.contentScore].every(x=>typeof x==='number'&&x>=0&&x<=1))throw Error('A mnemonic result is invalid.');recordIds.add(r.id);out.records.push({id:r.id,drillId:r.drillId,kind:r.kind,level:r.level,at:r.at,lagMs:r.lagMs,phase:r.phase,original:r.original.slice(),assisted:arr(r.assisted,10,300)&&r.assisted.length===r.level?r.assisted.slice():null,score:r.score,positionScore:r.positionScore,contentScore:r.contentScore,interrupted:r.interrupted===true});}
 if(resume&&input.active){const a=input.active,d=out.drills.find(d=>d.id===a.drillId),stages=['study','recall','choice','assisted','feedback','result'];
  if(d&&stages.includes(a.stage)&&arr(a.answers,10,300)&&a.answers.length===d.level&&num(a.hiddenAt)&&num(a.lagMs)&&['new','review','early'].includes(a.phase)&&(['study','recall'].includes(a.stage)||arr(a.original,10,300)&&a.original.length===d.level))out.active={drillId:a.drillId,stage:a.stage,phase:a.phase,answers:a.answers.slice(),original:a.original?.slice()||null,assisted:arr(a.assisted,10,300)&&a.assisted.length===d.level?a.assisted.slice():null,hiddenAt:a.hiddenAt,lagMs:a.lagMs,interrupted:true,savedId:typeof a.savedId==='string'?a.savedId:null,studyIndex:Math.max(0,Math.min(d.level,Number.isInteger(a.studyIndex)?a.studyIndex:0))};
 }
 return out;
}
return {KINDS,NAMES,SPECS,GROUPS,LEVELS,PEGS,SHAPES,WORDS,OBJECTS,SYMBOLS,CELLS,normal,canonical,id,safeId,blank,shuffle,create,score,recommendation,validate};
});
