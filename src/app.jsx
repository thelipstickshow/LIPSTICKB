import { useState, useEffect } from "react";

// ── SCRIPTURES ────────────────────────────────────────────────────────────
const SCRIPTURES = [
  { verse:"For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future.", ref:"Jeremiah 29:11", version:"NIV" },
  { verse:"She is clothed with strength and dignity, and she laughs without fear of the future.", ref:"Proverbs 31:25", version:"NLT" },
  { verse:"I can do all things through Christ who strengthens me.", ref:"Philippians 4:13", version:"NKJV" },
  { verse:"The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you.", ref:"Zephaniah 3:17", version:"NIV" },
  { verse:"But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", ref:"Isaiah 40:31", version:"NIV" },
  { verse:"Trust in the Lord with all your heart and lean not on your own understanding.", ref:"Proverbs 3:5", version:"NIV" },
  { verse:"No weapon formed against you shall prosper.", ref:"Isaiah 54:17", version:"NKJV" },
  { verse:"And we know that in all things God works for the good of those who love him.", ref:"Romans 8:28", version:"NIV" },
  { verse:"The Lord is my light and my salvation — whom shall I fear?", ref:"Psalm 27:1", version:"NIV" },
  { verse:"Delight yourself in the Lord, and he will give you the desires of your heart.", ref:"Psalm 37:4", version:"ESV" },
  { verse:"Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref:"Joshua 1:9", version:"NIV" },
  { verse:"She perceived that her merchandise was profitable. Her lamp did not go out at night.", ref:"Proverbs 31:18", version:"ESV" },
  { verse:"Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.", ref:"Ephesians 3:20", version:"NIV" },
  { verse:"The Lord will make you the head, not the tail. You will always be at the top, never at the bottom.", ref:"Deuteronomy 28:13", version:"NLT" },
  { verse:"Commit to the Lord whatever you do, and he will establish your plans.", ref:"Proverbs 16:3", version:"NIV" },
  { verse:"For we walk by faith, not by sight.", ref:"2 Corinthians 5:7", version:"ESV" },
  { verse:"God is within her, she will not fall.", ref:"Psalm 46:5", version:"NIV" },
  { verse:"But seek first his kingdom and his righteousness, and all these things will be given to you as well.", ref:"Matthew 6:33", version:"NIV" },
  { verse:"I praise you because I am fearfully and wonderfully made.", ref:"Psalm 139:14", version:"NIV" },
  { verse:"The blessing of the Lord brings wealth, without painful toil for it.", ref:"Proverbs 10:22", version:"NIV" },
  { verse:"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.", ref:"Matthew 7:7", version:"NIV" },
  { verse:"Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.", ref:"3 John 1:2", version:"KJV" },
  { verse:"This is the day the Lord has made; we will rejoice and be glad in it.", ref:"Psalm 118:24", version:"NKJV" },
  { verse:"For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", ref:"2 Timothy 1:7", version:"NIV" },
  { verse:"With God all things are possible.", ref:"Matthew 19:26", version:"NIV" },
  { verse:"She sets about her work vigorously; her arms are strong for her tasks.", ref:"Proverbs 31:17", version:"NIV" },
  { verse:"You are the light of the world. A town built on a hill cannot be hidden.", ref:"Matthew 5:14", version:"NIV" },
  { verse:"Cast all your anxiety on him because he cares for you.", ref:"1 Peter 5:7", version:"NIV" },
  { verse:"Give, and it will be given to you. A good measure, pressed down, shaken together and running over.", ref:"Luke 6:38", version:"NIV" },
  { verse:"The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.", ref:"Numbers 6:24-25", version:"NIV" },
];

function getDailyScripture() {
  var d = Math.floor((new Date() - new Date(new Date().getFullYear(),0,0))/86400000);
  return SCRIPTURES[d % SCRIPTURES.length];
}

// ── 21-DAY SKIN RESET ─────────────────────────────────────────────────────
var SKIN_RESET = [
  { day:1,  focus:"Exfoliate",               steps:["Cleanser","Glycolic/Salicylic Pads","Moisturizer"] },
  { day:2,  focus:"Treatment",               steps:["Cleanser","Discoloration Serum","Moisturizer"] },
  { day:3,  focus:"Recovery",                steps:["Cleanser","Oat Milk Toner","Moisturizer"] },
  { day:4,  focus:"Clay Mask",               steps:["Cleanser","Bentonite Clay (10-15 min)","Moisturizer"] },
  { day:5,  focus:"Treatment",               steps:["Cleanser","Discoloration Serum","Moisturizer"] },
  { day:6,  focus:"Exfoliate",               steps:["Cleanser","Microfoliant","Moisturizer"] },
  { day:7,  focus:"Recovery + Gold Mask",    steps:["Cleanser","Gold Mask","Moisturizer"] },
  { day:8,  focus:"Exfoliate",               steps:["Cleanser","Glycolic Toner","Moisturizer"] },
  { day:9,  focus:"Treatment",               steps:["Cleanser","Discoloration Serum","Moisturizer"] },
  { day:10, focus:"Clay Mask",               steps:["Cleanser","Charcoal Mask","Moisturizer"] },
  { day:11, focus:"Recovery",                steps:["Cleanser","Oat Milk Toner","Moisturizer"] },
  { day:12, focus:"Exfoliate",               steps:["Cleanser","Glycolic/Salicylic Pads","Moisturizer"] },
  { day:13, focus:"Treatment",               steps:["Cleanser","Discoloration Serum","Moisturizer"] },
  { day:14, focus:"Recovery + Gold Mask",    steps:["Cleanser","Gold Mask","Moisturizer"] },
  { day:15, focus:"Exfoliate",               steps:["Cleanser","Microfoliant","Moisturizer"] },
  { day:16, focus:"Treatment",               steps:["Cleanser","Discoloration Serum","Moisturizer"] },
  { day:17, focus:"Clay Mask",               steps:["Cleanser","Moroccan Red Clay","Moisturizer"] },
  { day:18, focus:"Recovery",                steps:["Cleanser","Oat Milk Toner","Moisturizer"] },
  { day:19, focus:"Exfoliate",               steps:["Cleanser","Glycolic/Salicylic Pads","Moisturizer"] },
  { day:20, focus:"Treatment",               steps:["Cleanser","Discoloration Serum","Moisturizer"] },
  { day:21, focus:"Recovery - Let Skin Breathe", steps:["Cleanser","Moisturizer only"] },
];

var AM_ROUTINE = [
  "Cleanser (Cetaphil or Neutrogena)",
  "Good Molecules Discoloration Serum",
  "Oat Milk Toner (optional)",
  "Moisturizer (Cetaphil or Versed)",
  "Urban SkinRx SPF",
];

var HAIR_DEFAULT = { 0:"Moisturize + protective style", 1:"Scalp oil + edges", 2:"Co-wash or deep condition", 3:"Moisturize + seal", 4:"Scalp check + oil", 5:"Wash day", 6:"Style + moisturize" };

// ── COLORS ────────────────────────────────────────────────────────────────
var C = {
  bg:"#FBF7F4", card:"#FFFFFF", cream:"#FAF0EC",
  border:"#EDD8DC", borderSoft:"#F5E6E9",
  rose:"#C4778A", blush:"#E8B4BC", dusty:"#D4889A", mauve:"#A0789A",
  text:"#2A1818", textMid:"#6B4A50", textSoft:"#9A7A82",
  sage:"#7A9E87", amber:"#C4956A", lavender:"#A89AC4",
};

var FONT = "'Georgia','Times New Roman',serif";

// ── STANDALONE COMPONENTS (defined OUTSIDE main component) ────────────────
function SectionLabel(props) {
  return (
    <div style={{ fontSize:"11px", letterSpacing:"0.22em", color: props.color || C.rose, marginBottom:"10px", textTransform:"uppercase", fontWeight:"600" }}>
      {props.text}
    </div>
  );
}

function ProgressBar(props) {
  return (
    <div style={{ height:"5px", background:C.borderSoft, borderRadius:"3px", marginTop:"6px" }}>
      <div style={{ height:"100%", width: props.pct + "%", background: props.color || C.rose, borderRadius:"3px", transition:"width 0.4s" }} />
    </div>
  );
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────
var WORK_DAYS = {
  1:{ label:"Monday",   start:"9:30 AM",  end:"8:00 PM",  type:"workEarly" },
  5:{ label:"Friday",   start:"9:30 AM",  end:"8:00 PM",  type:"workEarly" },
  0:{ label:"Sunday",   start:"10:30 AM", end:"9:00 PM",  type:"workLate"  },
  6:{ label:"Saturday", start:"10:30 AM", end:"9:00 PM",  type:"workLate"  },
};
var DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var DAY_FULL  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

var SUMMER = new Date("2026-06-21");
function getDaysLeft() { return Math.ceil((SUMMER - new Date().setHours(0,0,0,0))/86400000); }

function getDayType(d) { return WORK_DAYS[d] ? WORK_DAYS[d].type : "offDay"; }

function makeBlock(time, label, type, dayIdx) {
  return { id: dayIdx + "-" + time + "-" + Math.random(), time: time, label: label, type: type };
}

function getDefaultSched(dayIdx) {
  var t = getDayType(dayIdx);
  if (t === "workEarly") return [
    makeBlock("8:00 AM","Wake up + Morning Routine","routine",dayIdx),
    makeBlock("8:15 AM","Skincare AM + Vitamins","self",dayIdx),
    makeBlock("8:45 AM","Workout","self",dayIdx),
    makeBlock("9:00 AM","Breakfast + Prep","meal",dayIdx),
    makeBlock("9:30 AM","WORK SHIFT BEGINS","work",dayIdx),
    makeBlock("8:00 PM","WORK SHIFT ENDS","work",dayIdx),
    makeBlock("8:30 PM","Dinner + Decompress","meal",dayIdx),
    makeBlock("9:30 PM","Skincare PM","self",dayIdx),
    makeBlock("10:30 PM","Business Notes + Wind Down","routine",dayIdx),
    makeBlock("11:30 PM","Lights Out","sleep",dayIdx),
  ];
  if (t === "workLate") return [
    makeBlock("9:00 AM","Wake up + Morning Routine","routine",dayIdx),
    makeBlock("9:15 AM","Skincare AM + Vitamins","self",dayIdx),
    makeBlock("9:45 AM","Workout","self",dayIdx),
    makeBlock("10:00 AM","Breakfast","meal",dayIdx),
    makeBlock("10:30 AM","WORK SHIFT BEGINS","work",dayIdx),
    makeBlock("9:00 PM","WORK SHIFT ENDS","work",dayIdx),
    makeBlock("9:30 PM","Dinner + Decompress","meal",dayIdx),
    makeBlock("10:15 PM","Skincare PM + Hair","self",dayIdx),
    makeBlock("11:00 PM","Lights Out","sleep",dayIdx),
  ];
  return [
    makeBlock("8:00 AM","Wake up + Morning Routine","routine",dayIdx),
    makeBlock("8:15 AM","Skincare AM + Vitamins","self",dayIdx),
    makeBlock("9:00 AM","Workout","self",dayIdx),
    makeBlock("9:45 AM","Breakfast","meal",dayIdx),
    makeBlock("10:00 AM","Business Block - BMC / Rentals","biz",dayIdx),
    makeBlock("12:30 PM","Lunch + Break","meal",dayIdx),
    makeBlock("1:30 PM","Real Estate Course","course",dayIdx),
    makeBlock("3:30 PM","Business Block 2 / Admin","biz",dayIdx),
    makeBlock("6:00 PM","Dinner + Wind Down","meal",dayIdx),
    makeBlock("7:30 PM","Skincare PM + Hair","self",dayIdx),
    makeBlock("9:00 PM","Review Tomorrow + Notes","routine",dayIdx),
    makeBlock("10:30 PM","Lights Out","sleep",dayIdx),
  ];
}

function typeColor(t) {
  var map = { work:"#E8A5A5", meal:"#C4956A", self:"#C4778A", biz:"#A0789A", course:"#7A9E87", routine:"#A89AC4", sleep:"#9A9A9A" };
  return map[t] || "#B0A0A0";
}

var CATEGORIES = {
  personal:   { label:"Personal",      color:"#C4778A" },
  bmc:        { label:"BMC",           color:"#A0789A" },
  realestate: { label:"Real Estate",   color:"#7A9E87" },
  rentals:    { label:"Event Rentals", color:"#C4956A" },
  logistics:  { label:"Logistics",     color:"#7A8FA8" },
  work:       { label:"Work",          color:"#9A7A6A" },
};

var HABITS_LIST = [
  { id:"vitamins",    label:"Vitamins",      icon:"💊", cat:"health" },
  { id:"water",       label:"2L Water",      icon:"💧", cat:"health" },
  { id:"workout",     label:"Workout",       icon:"🏋🏽", cat:"health" },
  { id:"reading",     label:"Reading",       icon:"📚", cat:"health" },
  { id:"skincare_am", label:"Skincare AM",   icon:"🌸", cat:"skin"   },
  { id:"skincare_pm", label:"Skincare PM",   icon:"🌙", cat:"skin"   },
  { id:"spf",         label:"SPF Applied",   icon:"☀️", cat:"skin"   },
  { id:"hair",        label:"Hair Care",     icon:"✨", cat:"hair"   },
  { id:"nails",       label:"Nails/Grooming",icon:"💅🏽",cat:"hair"   },
  { id:"re_study",    label:"RE Study",      icon:"📖", cat:"biz"    },
  { id:"biz_task",    label:"Business Task", icon:"💼", cat:"biz"    },
];

var INIT_TASKS = [
  { id:1, text:"Finalize BMC brand positioning",  category:"bmc",        done:false, priority:"high" },
  { id:2, text:"Research event rental vendors",    category:"rentals",    done:false, priority:"high" },
  { id:3, text:"Logistics LLC paperwork",          category:"logistics",  done:false, priority:"high" },
  { id:4, text:"RE course - complete Module 1",    category:"realestate", done:false, priority:"high" },
  { id:5, text:"Set up business bank account",     category:"bmc",        done:false, priority:"medium" },
  { id:6, text:"Build workout routine",            category:"personal",   done:false, priority:"medium" },
];

var RE_MODULES = [
  { id:"m1", title:"Real Estate Principles",         lessons:12 },
  { id:"m2", title:"Property Valuation & Appraisal", lessons:8  },
  { id:"m3", title:"Contracts & Closings",           lessons:10 },
  { id:"m4", title:"Finance & Mortgages",            lessons:9  },
  { id:"m5", title:"Florida Real Estate Law",        lessons:11 },
  { id:"m6", title:"Ethics & Standards",             lessons:6  },
  { id:"m7", title:"Market Analysis & Investment",   lessons:10 },
  { id:"m8", title:"Exam Prep & Practice Tests",     lessons:15 },
];

var INIT_T1 = [
  { id:"bmc",       name:"BMC",                color:"#C4778A", phases:[{id:0,label:"Brand identity locked",done:false},{id:1,label:"LLC filed",done:false},{id:2,label:"Website live",done:false},{id:3,label:"First client",done:false},{id:4,label:"Revenue target hit",done:false}] },
  { id:"re",        name:"Real Estate",         color:"#7A9E87", phases:[{id:0,label:"RE course enrolled",done:false},{id:1,label:"Course 50% done",done:false},{id:2,label:"License exam passed",done:false},{id:3,label:"License activated",done:false},{id:4,label:"First deal closed",done:false}] },
  { id:"rentals",   name:"Party/Event Rentals", color:"#C4956A", phases:[{id:0,label:"Inventory sourced",done:false},{id:1,label:"LLC filed",done:false},{id:2,label:"Insurance secured",done:false},{id:3,label:"First booking",done:false},{id:4,label:"Summer fully booked",done:false}] },
  { id:"logistics", name:"Logistics Co.",       color:"#7A8FA8", phases:[{id:0,label:"Business structure filed",done:false},{id:1,label:"First truck/contract",done:false},{id:2,label:"DOT compliance done",done:false},{id:3,label:"Driver network built",done:false},{id:4,label:"First lane profitable",done:false}] },
];

var INIT_T2 = [
  { id:"bnt",    name:"BNT",                   desc:"Full consulting conglomerate", color:"#A0789A" },
  { id:"taf",    name:"TAF",                   desc:"Coming soon",                  color:"#C4778A" },
  { id:"htu",    name:"HTU - Heartthrob Univ", desc:"Education / personal brand",   color:"#C4956A" },
  { id:"ksy",    name:"KSY - K. Symone",       desc:"Personal brand",               color:"#E8A5B8" },
  { id:"igs",    name:"IGS - It Girl Studio",  desc:"Creative studio venture",       color:"#A89AC4" },
  { id:"social", name:"Social Club",           desc:"Community + events concept",   color:"#7A9E87" },
];

// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function Dashboard() {
  var [now, setNow] = useState(new Date());
  var [tab, setTab] = useState("today");
  var [habits, setHabits] = useState({});
  var [skinAmChecked, setSkinAmChecked] = useState({});
  var [skinPmChecked, setSkinPmChecked] = useState({});
  var [hairChecked, setHairChecked] = useState({});
  var [hairRoutines, setHairRoutines] = useState(HAIR_DEFAULT);
  var [editHairDay, setEditHairDay] = useState(null);
  var [hairEditVal, setHairEditVal] = useState("");
  var [skinResetStart, setSkinResetStart] = useState(null);
  var [tasks, setTasks] = useState(INIT_TASKS);
  var [editingTaskId, setEditingTaskId] = useState(null);
  var [editingTaskText, setEditingTaskText] = useState("");
  var [newTask, setNewTask] = useState("");
  var [newCat, setNewCat] = useState("personal");
  var [newPriority, setNewPriority] = useState("medium");
  var [schedules, setSchedules] = useState(function() {
    var s = {};
    for (var d = 0; d < 7; d++) s[d] = getDefaultSched(d);
    return s;
  });
  var [viewDay, setViewDay] = useState(new Date().getDay());
  var [editBlockId, setEditBlockId] = useState(null);
  var [editBlockVal, setEditBlockVal] = useState({ time:"", label:"" });
  var [addingBlock, setAddingBlock] = useState(false);
  var [newBlock, setNewBlock] = useState({ time:"", label:"", type:"routine" });
  var [appointments, setAppointments] = useState([{ id:1, title:"Vendor call - rentals", date:"2026-04-25", done:false }]);
  var [deadlines, setDeadlines] = useState([{ id:1, title:"RE Course Module 1", date:"2026-05-15", done:false }]);
  var [newAppt, setNewAppt] = useState({ title:"", date:"" });
  var [newDL, setNewDL] = useState({ title:"", date:"" });
  var [editApptId, setEditApptId] = useState(null);
  var [editApptVal, setEditApptVal] = useState({ title:"", date:"" });
  var [editDLId, setEditDLId] = useState(null);
  var [editDLVal, setEditDLVal] = useState({ title:"", date:"" });
  var [weeklyFocus, setWeeklyFocus] = useState({});
  var [summerGoals, setSummerGoals] = useState([
    { id:1, text:"Reach goal weight", done:false },
    { id:2, text:"Launch event rentals", done:false },
    { id:3, text:"Complete RE course", done:false },
    { id:4, text:"Clear skin - consistent routine", done:false },
    { id:5, text:"Stack savings goal", done:false },
  ]);
  var [newSGoal, setNewSGoal] = useState("");
  var [editSGoalId, setEditSGoalId] = useState(null);
  var [editSGoalText, setEditSGoalText] = useState("");
  var [goals, setGoals] = useState({
    targetWeight:"", currentWeight:"",
    measurements:{ chest:"", waist:"", hips:"", arms:"", thighs:"" },
    skinGoal:"", healthGoal:"", accomplishments:[""],
  });
  var [reProgress, setReProgress] = useState({});
  var [reNotes, setReNotes] = useState({});
  var [editReNote, setEditReNote] = useState(null);
  var [reNoteVal, setReNoteVal] = useState("");
  var [t1Bizs, setT1Bizs] = useState(INIT_T1);
  var [t2Bizs, setT2Bizs] = useState(INIT_T2);
  var [editPhaseKey, setEditPhaseKey] = useState(null);
  var [editPhaseVal, setEditPhaseVal] = useState("");
  var [newPhase, setNewPhase] = useState({});
  var [newT2, setNewT2] = useState({ name:"", desc:"" });
  var [editT2Id, setEditT2Id] = useState(null);
  var [editT2Val, setEditT2Val] = useState({ name:"", desc:"" });
  var [upNext, setUpNext] = useState([
    { id:1, text:"Research HTU course platform", keep:null },
    { id:2, text:"KSY brand mood board", keep:null },
  ]);
  var [newUpNext, setNewUpNext] = useState("");
  var [editUpId, setEditUpId] = useState(null);
  var [editUpText, setEditUpText] = useState("");
  var [tabNotes, setTabNotes] = useState({});
  var [editNoteTab, setEditNoteTab] = useState(null);
  var [noteText, setNoteText] = useState("");

  useEffect(function() {
    var t = setInterval(function() { setNow(new Date()); }, 1000);
    return function() { clearInterval(t); };
  }, []);

  var day    = now.getDay();
  var dk     = now.toDateString();
  var isWork = !!WORK_DAYS[day];
  var wi     = WORK_DAYS[day];
  var daysLeft   = getDaysLeft();
  var scripture  = getDailyScripture();
  var th = habits[dk] || {};
  var hScore = HABITS_LIST.filter(function(h) { return th[h.id]; }).length;
  var hPct   = Math.round(hScore / HABITS_LIST.length * 100);
  var topTasks = tasks.filter(function(t) { return t.priority === "high" && !t.done; }).slice(0,5);
  var reTot  = RE_MODULES.reduce(function(a,m) { return a + m.lessons; }, 0);
  var reDone = RE_MODULES.reduce(function(a,m) { return a + Math.min(reProgress[m.id] || 0, m.lessons); }, 0);
  var rePct  = Math.round(reDone / reTot * 100);
  var summerDone = summerGoals.filter(function(g) { return g.done; }).length;
  var summerPct  = Math.round(summerDone / summerGoals.length * 100);
  var skinResetDay = skinResetStart ? Math.min(21, Math.floor((new Date().setHours(0,0,0,0) - new Date(skinResetStart).setHours(0,0,0,0)) / 86400000) + 1) : null;
  var todayPM = skinResetDay ? SKIN_RESET[skinResetDay - 1] : null;
  var timeStr = now.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
  var dateStr = now.toLocaleDateString([], { weekday:"long", month:"long", day:"numeric" });

  var weekStart = new Date(now);
  weekStart.setDate(now.getDate() - ((now.getDay()+6)%7));
  var wk = weekStart.toDateString();

  function toggleH(id) { setHabits(function(h) { var dk2 = new Date().toDateString(); var t2 = h[dk2] || {}; return Object.assign({}, h, { [dk2]: Object.assign({}, t2, { [id]: !t2[id] }) }); }); }
  function toggleT(id) { setTasks(function(ts) { return ts.map(function(t) { return t.id === id ? Object.assign({}, t, { done: !t.done }) : t; }); }); }
  function saveTaskEdit(id) { setTasks(function(ts) { return ts.map(function(t) { return t.id === id ? Object.assign({}, t, { text: editingTaskText }) : t; }); }); setEditingTaskId(null); }
  function deleteTask(id) { setTasks(function(ts) { return ts.filter(function(t) { return t.id !== id; }); }); }
  function addTask() { if (!newTask.trim()) return; setTasks(function(ts) { return [...ts, { id:Date.now(), text:newTask, category:newCat, done:false, priority:newPriority }]; }); setNewTask(""); }
  function daysAway(date) { return Math.ceil((new Date(date) - new Date().setHours(0,0,0,0)) / 86400000); }
  function urgencyColor(da) { return da <= 3 ? "#C45A5A" : da <= 7 ? C.amber : C.textSoft; }

  var TABS = [
    { id:"today",    label:"Today" },
    { id:"summer",   label:"☀️ " + daysLeft + "d til Summer" },
    { id:"schedule", label:"Schedule" },
    { id:"focus",    label:"Weekly Focus" },
    { id:"tasks",    label:"Tasks" },
    { id:"habits",   label:"Habits & Self Care" },
    { id:"goals",    label:"Goals" },
    { id:"re",       label:"RE Course" },
    { id:"biz",      label:"Businesses" },
    { id:"upnext",   label:"Up Next" },
  ];

  // Style helpers — return plain objects, not JSX
  function cardStyle(extra) { return Object.assign({ background:C.card, border:"1px solid " + C.border, borderRadius:"14px", padding:"18px", marginBottom:"14px" }, extra); }
  function inpStyle(extra) { return Object.assign({ background:C.cream, border:"1px solid " + C.border, borderRadius:"8px", padding:"10px 12px", color:C.text, fontSize:"14px", fontFamily:FONT, boxSizing:"border-box", outline:"none", width:"100%" }, extra); }
  function btnStyle(bg, extra) { return Object.assign({ background: bg || C.rose, border:"none", borderRadius:"8px", padding:"9px 16px", color:"#fff", fontSize:"13px", fontWeight:"600", cursor:"pointer", fontFamily:FONT }, extra); }

  function NoteBlock(props) {
    var tabId = props.tabId;
    return (
      <div style={{ marginTop:"20px", borderTop:"1px solid " + C.borderSoft, paddingTop:"16px" }}>
        <SectionLabel text="Notes" />
        {editNoteTab === tabId ? (
          <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
            <textarea value={noteText} onChange={function(e) { setNoteText(e.target.value); }} rows={4} placeholder="Write notes here..." style={Object.assign(inpStyle(), { resize:"vertical" })} />
            <div style={{ display:"flex", gap:"7px" }}>
              <button onClick={function() { setTabNotes(function(n) { return Object.assign({}, n, { [tabId]: noteText }); }); setEditNoteTab(null); }} style={btnStyle(C.rose)}>Save</button>
              <button onClick={function() { setEditNoteTab(null); }} style={btnStyle("#B0A0A0")}>Cancel</button>
            </div>
          </div>
        ) : (
          <div onClick={function() { setEditNoteTab(tabId); setNoteText(tabNotes[tabId] || ""); }} style={{ fontSize:"14px", color: tabNotes[tabId] ? C.textMid : C.textSoft, fontStyle: tabNotes[tabId] ? "normal" : "italic", cursor:"pointer", padding:"8px 0" }}>
            {tabNotes[tabId] || "Tap to add notes..."}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:FONT, fontSize:"15px", color:C.text, lineHeight:"1.6" }}>

      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#FFF0F3 0%,#FAF5F0 100%)", borderBottom:"1px solid " + C.border, padding:"16px 20px 12px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:"11px", letterSpacing:"0.25em", color:C.rose, marginBottom:"3px", fontWeight:"600" }}>
              {isWork ? "WORK DAY · " + wi.start + "–" + wi.end : "BUILD DAY · YOUR TIME"}
            </div>
            <div style={{ fontSize:"19px", fontWeight:"700", color:C.text }}>{dateStr}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"24px", fontWeight:"300", color:C.dusty }}>{timeStr}</div>
            <div style={{ fontSize:"11px", color:C.rose, fontWeight:"600" }}>☀️ {daysLeft} days til summer</div>
          </div>
        </div>
        <div style={{ marginTop:"9px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"3px" }}>
            <span style={{ fontSize:"10px", letterSpacing:"0.18em", color:C.textSoft }}>DAILY CONSISTENCY</span>
            <span style={{ fontSize:"10px", color:C.rose, fontWeight:"600" }}>{hScore}/{HABITS_LIST.length} · {hPct}%</span>
          </div>
          <ProgressBar pct={hPct} color={C.rose} />
        </div>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", background:"#FFF8FA", borderBottom:"1px solid " + C.border, overflowX:"auto" }}>
        {TABS.map(function(t) {
          return (
            <button key={t.id} onClick={function() { setTab(t.id); }} style={{ flex:"none", padding:"12px 13px", background:"transparent", border:"none", borderBottom: tab === t.id ? "2px solid " + C.rose : "2px solid transparent", color: tab === t.id ? C.rose : C.textSoft, fontSize:"11px", letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", fontFamily:FONT, fontWeight: tab === t.id ? "700" : "400" }}>
              {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding:"18px 18px 60px", maxWidth:"700px", margin:"0 auto" }}>

        {/* ── TODAY ── */}
        {tab === "today" && (
          <div>
            <div style={cardStyle({ background:"linear-gradient(135deg,#FFF0F3,#FAF5F0)", border:"1px solid " + C.blush })}>
              <div style={{ fontSize:"22px", fontWeight:"700", color:C.rose, marginBottom:"10px" }}>Blessed Rising 🌸</div>
              <div style={{ fontSize:"15px", color:C.textMid, fontStyle:"italic", lineHeight:"1.7", marginBottom:"10px" }}>"{scripture.verse}"</div>
              <div style={{ fontSize:"12px", color:C.textSoft, fontWeight:"600" }}>{scripture.ref} · {scripture.version}</div>
              <div style={{ marginTop:"12px", fontSize:"14px", color:C.textMid }}>
                {isWork ? "Your shift starts at " + wi.start + ". Everything before it is yours. Walk in purpose today." : "Build day. No shift, full focus. Walk in it."}
              </div>
            </div>

            <div style={cardStyle()}>
              <SectionLabel text="Quick Habit Check" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px" }}>
                {HABITS_LIST.filter(function(h) { return ["vitamins","water","workout","reading","skincare_am","skincare_pm"].indexOf(h.id) > -1; }).map(function(h) {
                  return (
                    <button key={h.id} onClick={function() { toggleH(h.id); }} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 11px", background: th[h.id] ? "#FFF0F3" : C.cream, border:"1px solid " + (th[h.id] ? C.blush : C.borderSoft), borderRadius:"9px", cursor:"pointer", textAlign:"left" }}>
                      <span style={{ fontSize:"15px" }}>{h.icon}</span>
                      <span style={{ fontSize:"13px", color: th[h.id] ? C.rose : C.textSoft, flex:1 }}>{h.label}</span>
                      {th[h.id] && <span style={{ color:C.rose, fontSize:"12px" }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={cardStyle({ background:"#FFF8FA", border:"1px solid " + C.blush })}>
              <SectionLabel text="Goal Snapshot" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                <div style={{ padding:"12px", background:C.cream, borderRadius:"10px", border:"1px solid " + C.borderSoft }}>
                  <div style={{ fontSize:"11px", color:C.textSoft, letterSpacing:"0.1em", marginBottom:"4px" }}>WEIGHT GOAL</div>
                  {goals.currentWeight && goals.targetWeight ? (
                    <div>
                      <div style={{ fontSize:"18px", fontWeight:"700", color:C.rose }}>
                        {parseFloat(goals.currentWeight) > parseFloat(goals.targetWeight) ? (parseFloat(goals.currentWeight) - parseFloat(goals.targetWeight)).toFixed(1) + " lbs" : "Goal hit! 🎉"}
                      </div>
                      <div style={{ fontSize:"11px", color:C.textSoft }}>to go · target {goals.targetWeight} lbs</div>
                      <ProgressBar pct={Math.min(100, Math.round((1 - (parseFloat(goals.currentWeight) - parseFloat(goals.targetWeight)) / parseFloat(goals.currentWeight)) * 100))} color={C.rose} />
                    </div>
                  ) : <div style={{ fontSize:"13px", color:C.textSoft, fontStyle:"italic" }}>Set in Goals tab</div>}
                </div>
                <div style={{ padding:"12px", background:C.cream, borderRadius:"10px", border:"1px solid " + C.borderSoft }}>
                  <div style={{ fontSize:"11px", color:C.textSoft, letterSpacing:"0.1em", marginBottom:"4px" }}>SUMMER GOALS</div>
                  <div style={{ fontSize:"18px", fontWeight:"700", color:C.rose }}>{summerDone}/{summerGoals.length}</div>
                  <div style={{ fontSize:"11px", color:C.textSoft, marginBottom:"4px" }}>completed · {daysLeft}d left</div>
                  <ProgressBar pct={summerPct} color={C.amber} />
                </div>
              </div>
            </div>

            <div style={cardStyle()}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                <SectionLabel text="Today's Focus" />
                <button onClick={function() { setTab("tasks"); }} style={{ background:"transparent", border:"1px solid " + C.blush, borderRadius:"20px", padding:"4px 12px", color:C.rose, fontSize:"11px", cursor:"pointer", fontFamily:FONT }}>Edit Tasks →</button>
              </div>
              {topTasks.length === 0 ? (
                <div style={{ fontSize:"14px", color:C.sage, textAlign:"center", padding:"10px", fontStyle:"italic" }}>🌿 Nothing urgent — you're clear.</div>
              ) : topTasks.map(function(task) {
                return (
                  <div key={task.id} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 0", borderBottom:"1px solid " + C.borderSoft }}>
                    <button onClick={function() { toggleT(task.id); }} style={{ width:"20px", height:"20px", borderRadius:"50%", border:"2px solid " + (CATEGORIES[task.category] ? CATEGORIES[task.category].color : C.rose), background:"transparent", cursor:"pointer", flexShrink:0 }} />
                    <span style={{ fontSize:"14px", color:C.textMid, flex:1 }}>{task.text}</span>
                    <span style={{ fontSize:"10px", padding:"2px 8px", background: (CATEGORIES[task.category] ? CATEGORIES[task.category].color : C.rose) + "18", color: CATEGORIES[task.category] ? CATEGORIES[task.category].color : C.rose, borderRadius:"20px", fontWeight:"600", flexShrink:0 }}>
                      {CATEGORIES[task.category] ? CATEGORIES[task.category].label : ""}
                    </span>
                  </div>
                );
              })}
            </div>
            <NoteBlock tabId="today" />
          </div>
        )}

        {/* ── SUMMER ── */}
        {tab === "summer" && (
          <div>
            <div style={cardStyle({ background:"linear-gradient(135deg,#FFF0F3,#FFF8F0)", border:"1px solid " + C.blush, textAlign:"center", padding:"30px 20px" })}>
              <div style={{ fontSize:"64px", fontWeight:"300", color:C.rose, lineHeight:"1" }}>{daysLeft}</div>
              <div style={{ fontSize:"14px", letterSpacing:"0.3em", color:C.textSoft, marginTop:"6px" }}>DAYS UNTIL SUMMER</div>
              <div style={{ fontSize:"13px", color:C.textSoft, marginTop:"4px" }}>June 21, 2026</div>
              <div style={{ marginTop:"14px", fontSize:"15px", color:C.textMid, fontStyle:"italic" }}>
                {daysLeft <= 7 ? "🔥 It's almost here. Are you ready?" : daysLeft <= 30 ? "Final stretch. Lock in." : "Every day counts. Stay consistent."}
              </div>
            </div>
            <div style={cardStyle()}>
              <SectionLabel text="Summer Goals" />
              <div style={{ fontSize:"12px", color:C.textSoft, marginBottom:"12px", fontStyle:"italic" }}>Tap any goal to edit it.</div>
              {summerGoals.map(function(g) {
                return (
                  <div key={g.id} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 0", borderBottom:"1px solid " + C.borderSoft }}>
                    <button onClick={function() { setSummerGoals(function(gs) { return gs.map(function(x) { return x.id === g.id ? Object.assign({}, x, { done: !x.done }) : x; }); }); }} style={{ width:"22px", height:"22px", borderRadius:"50%", border:"2px solid " + (g.done ? C.rose : C.border), background: g.done ? C.rose : "transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", color:"#fff" }}>
                      {g.done ? "✓" : ""}
                    </button>
                    {editSGoalId === g.id ? (
                      <input value={editSGoalText} onChange={function(e) { setEditSGoalText(e.target.value); }}
                        onBlur={function() { setSummerGoals(function(gs) { return gs.map(function(x) { return x.id === g.id ? Object.assign({}, x, { text: editSGoalText }) : x; }); }); setEditSGoalId(null); }}
                        onKeyDown={function(e) { if (e.key === "Enter") { setSummerGoals(function(gs) { return gs.map(function(x) { return x.id === g.id ? Object.assign({}, x, { text: editSGoalText }) : x; }); }); setEditSGoalId(null); } }}
                        autoFocus style={Object.assign(inpStyle(), { flex:1, padding:"4px 8px", fontSize:"14px" })} />
                    ) : (
                      <span onClick={function() { setEditSGoalId(g.id); setEditSGoalText(g.text); }} style={{ fontSize:"14px", color: g.done ? C.textSoft : C.textMid, textDecoration: g.done ? "line-through" : "none", flex:1, cursor:"text" }}>{g.text}</span>
                    )}
                    <button onClick={function() { setSummerGoals(function(gs) { return gs.filter(function(x) { return x.id !== g.id; }); }); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"16px", flexShrink:0 }}>×</button>
                  </div>
                );
              })}
              <div style={{ display:"flex", gap:"7px", marginTop:"12px" }}>
                <input value={newSGoal} onChange={function(e) { setNewSGoal(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter" && newSGoal.trim()) { setSummerGoals(function(g) { return [...g, { id:Date.now(), text:newSGoal, done:false }]; }); setNewSGoal(""); } }} placeholder="Add a summer goal..." style={inpStyle()} />
                <button onClick={function() { if (!newSGoal.trim()) return; setSummerGoals(function(g) { return [...g, { id:Date.now(), text:newSGoal, done:false }]; }); setNewSGoal(""); }} style={btnStyle(C.rose, { padding:"9px 14px", flexShrink:0 })}>Add</button>
              </div>
            </div>
            <NoteBlock tabId="summer" />
          </div>
        )}

        {/* ── SCHEDULE ── */}
        {tab === "schedule" && (
          <div>
            <div style={cardStyle()}>
              <SectionLabel text="Week at a Glance" />
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"4px" }}>
                {[1,2,3,4,5,6,0].map(function(d) {
                  var isToday = d === now.getDay();
                  var isSelected = d === viewDay;
                  var isW = !!WORK_DAYS[d];
                  return (
                    <button key={d} onClick={function() { setViewDay(d); }} style={{ padding:"8px 4px", background: isSelected ? "#FFF0F3" : isToday ? "#FFF8FA" : C.cream, border:"1px solid " + (isSelected ? C.rose : isToday ? C.blush : C.borderSoft), borderRadius:"8px", cursor:"pointer", textAlign:"center" }}>
                      <div style={{ fontSize:"10px", fontWeight:"700", color: isSelected ? C.rose : isToday ? C.dusty : C.textSoft }}>{DAY_NAMES[d]}</div>
                      <div style={{ fontSize:"9px", marginTop:"3px", color: isW ? "#C45A5A" : C.sage }}>{isW ? "Work" : "Off"}</div>
                      {isToday && <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:C.rose, margin:"3px auto 0" }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={cardStyle()}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
                <SectionLabel text={DAY_FULL[viewDay] + " Schedule"} />
                <button onClick={function() { setAddingBlock(true); }} style={{ background:"transparent", border:"1px solid " + C.rose, borderRadius:"20px", padding:"4px 12px", color:C.rose, fontSize:"11px", cursor:"pointer", fontFamily:FONT }}>+ Block</button>
              </div>

              {addingBlock && (
                <div style={{ padding:"12px", background:"#FFF8FA", border:"1px solid " + C.blush, borderRadius:"10px", marginBottom:"12px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"7px", marginBottom:"7px" }}>
                    <input value={newBlock.time} onChange={function(e) { setNewBlock(function(b) { return Object.assign({}, b, { time: e.target.value }); }); }} placeholder="9:00 AM" style={inpStyle()} />
                    <input value={newBlock.label} onChange={function(e) { setNewBlock(function(b) { return Object.assign({}, b, { label: e.target.value }); }); }} placeholder="Block description..." style={inpStyle()} />
                  </div>
                  <select value={newBlock.type} onChange={function(e) { setNewBlock(function(b) { return Object.assign({}, b, { type: e.target.value }); }); }} style={Object.assign(inpStyle(), { marginBottom:"7px" })}>
                    {["routine","self","meal","biz","course","work","sleep"].map(function(t) { return <option key={t} value={t}>{t}</option>; })}
                  </select>
                  <div style={{ display:"flex", gap:"7px" }}>
                    <button onClick={function() {
                      if (!newBlock.time || !newBlock.label) return;
                      setSchedules(function(s) { var d2 = Object.assign({}, s); d2[viewDay] = [...(d2[viewDay] || []), Object.assign({ id: Date.now() }, newBlock)]; return d2; });
                      setNewBlock({ time:"", label:"", type:"routine" }); setAddingBlock(false);
                    }} style={btnStyle(C.rose)}>Add</button>
                    <button onClick={function() { setAddingBlock(false); }} style={btnStyle("#B0A0A0")}>Cancel</button>
                  </div>
                </div>
              )}

              {(schedules[viewDay] || []).map(function(block, i) {
                return (
                  <div key={block.id} style={{ display:"flex", gap:"12px", alignItems:"flex-start" }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                      <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:typeColor(block.type), marginTop:"4px" }} />
                      {i < (schedules[viewDay] || []).length - 1 && <div style={{ width:"1px", height:"32px", background:C.borderSoft, margin:"3px 0" }} />}
                    </div>
                    <div style={{ flex:1, paddingBottom:"14px" }}>
                      {editBlockId === block.id ? (
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"6px", marginBottom:"6px" }}>
                          <input value={editBlockVal.time} onChange={function(e) { setEditBlockVal(function(v) { return Object.assign({}, v, { time: e.target.value }); }); }} style={inpStyle({ fontSize:"12px", padding:"6px 8px" })} />
                          <input value={editBlockVal.label} onChange={function(e) { setEditBlockVal(function(v) { return Object.assign({}, v, { label: e.target.value }); }); }} autoFocus
                            onKeyDown={function(e) { if (e.key === "Enter") { setSchedules(function(s) { var d2 = Object.assign({}, s); d2[viewDay] = d2[viewDay].map(function(b) { return b.id === block.id ? Object.assign({}, b, editBlockVal) : b; }); return d2; }); setEditBlockId(null); } }}
                            style={inpStyle({ fontSize:"12px", padding:"6px 8px" })} />
                          <button onClick={function() { setSchedules(function(s) { var d2 = Object.assign({}, s); d2[viewDay] = d2[viewDay].map(function(b) { return b.id === block.id ? Object.assign({}, b, editBlockVal) : b; }); return d2; }); setEditBlockId(null); }} style={btnStyle(C.rose, { padding:"6px 10px", fontSize:"12px" })}>Save</button>
                          <button onClick={function() { setSchedules(function(s) { var d2 = Object.assign({}, s); d2[viewDay] = d2[viewDay].filter(function(b) { return b.id !== block.id; }); return d2; }); }} style={btnStyle("#E8A5A5", { padding:"6px 10px", fontSize:"12px", color:"#C45A5A" })}>Remove</button>
                        </div>
                      ) : (
                        <div>
                          <div onClick={function() { setEditBlockId(block.id); setEditBlockVal({ time:block.time, label:block.label }); }} style={{ fontSize:"11px", color:C.textSoft, letterSpacing:"0.1em", marginBottom:"2px", cursor:"pointer" }}>{block.time}</div>
                          <div onClick={function() { setEditBlockId(block.id); setEditBlockVal({ time:block.time, label:block.label }); }} style={{ fontSize:"14px", color: block.type === "work" ? "#C45A5A" : C.textMid, fontWeight: block.type === "work" ? "700" : "400", padding: block.type === "work" ? "8px 10px" : "0", background: block.type === "work" ? "#FFF0F0" : "transparent", border: block.type === "work" ? "1px solid #E8C5C5" : "none", borderRadius: block.type === "work" ? "8px" : "0", cursor:"pointer" }}>
                            {block.label}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div style={{ fontSize:"12px", color:C.textSoft, marginTop:"6px", fontStyle:"italic" }}>Tap any block to edit. Changes save to this day only.</div>
            </div>

            {/* APPOINTMENTS */}
            <div style={cardStyle()}>
              <SectionLabel text="Appointments" />
              {appointments.sort(function(a,b) { return new Date(a.date) - new Date(b.date); }).map(function(appt) {
                var da = daysAway(appt.date);
                return (
                  <div key={appt.id} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 0", borderBottom:"1px solid " + C.borderSoft }}>
                    <button onClick={function() { setAppointments(function(a) { return a.map(function(x) { return x.id === appt.id ? Object.assign({}, x, { done: !x.done }) : x; }); }); }} style={{ width:"20px", height:"20px", borderRadius:"4px", border:"2px solid " + (appt.done ? C.rose : C.border), background: appt.done ? C.rose : "transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", color:"#fff" }}>
                      {appt.done ? "✓" : ""}
                    </button>
                    {editApptId === appt.id ? (
                      <div style={{ display:"flex", gap:"6px", flex:1 }}>
                        <input value={editApptVal.title} onChange={function(e) { setEditApptVal(function(v) { return Object.assign({}, v, { title: e.target.value }); }); }} style={Object.assign(inpStyle(), { flex:1, padding:"5px 8px" })} />
                        <input type="date" value={editApptVal.date} onChange={function(e) { setEditApptVal(function(v) { return Object.assign({}, v, { date: e.target.value }); }); }} style={inpStyle({ width:"130px", flexShrink:0, padding:"5px 8px" })} />
                        <button onClick={function() { setAppointments(function(a) { return a.map(function(x) { return x.id === appt.id ? Object.assign({}, x, editApptVal) : x; }); }); setEditApptId(null); }} style={btnStyle(C.rose, { padding:"5px 10px", flexShrink:0 })}>✓</button>
                      </div>
                    ) : (
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", flex:1 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:"14px", color: appt.done ? C.textSoft : C.textMid, textDecoration: appt.done ? "line-through" : "none" }}>{appt.title}</div>
                          <div style={{ fontSize:"12px", color:C.textSoft }}>{new Date(appt.date).toLocaleDateString([], { month:"long", day:"numeric", year:"numeric" })}</div>
                        </div>
                        <span style={{ fontSize:"11px", fontWeight:"600", color:urgencyColor(da), flexShrink:0 }}>{da === 0 ? "TODAY" : da < 0 ? "PAST" : da + "d"}</span>
                        <button onClick={function() { setEditApptId(appt.id); setEditApptVal({ title:appt.title, date:appt.date }); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"14px" }}>✎</button>
                        <button onClick={function() { setAppointments(function(a) { return a.filter(function(x) { return x.id !== appt.id; }); }); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"16px" }}>×</button>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ display:"flex", gap:"7px", marginTop:"12px", flexWrap:"wrap" }}>
                <input value={newAppt.title} onChange={function(e) { setNewAppt(function(a) { return Object.assign({}, a, { title: e.target.value }); }); }} placeholder="Appointment name..." style={Object.assign(inpStyle(), { flex:1, minWidth:"140px" })} />
                <input type="date" value={newAppt.date} onChange={function(e) { setNewAppt(function(a) { return Object.assign({}, a, { date: e.target.value }); }); }} style={inpStyle({ width:"140px", flexShrink:0 })} />
                <button onClick={function() { if (!newAppt.title || !newAppt.date) return; setAppointments(function(a) { return [...a, { id:Date.now(), title:newAppt.title, date:newAppt.date, done:false }]; }); setNewAppt({ title:"", date:"" }); }} style={btnStyle(C.rose, { flexShrink:0 })}>Add</button>
              </div>
            </div>

            {/* DEADLINES */}
            <div style={cardStyle({ background:"#FFF8FA", border:"1px solid " + C.blush })}>
              <SectionLabel text="Deadlines" color={C.dusty} />
              {deadlines.sort(function(a,b) { return new Date(a.date) - new Date(b.date); }).map(function(dl) {
                var da = daysAway(dl.date);
                return (
                  <div key={dl.id} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 0", borderBottom:"1px solid " + C.borderSoft }}>
                    <button onClick={function() { setDeadlines(function(d) { return d.map(function(x) { return x.id === dl.id ? Object.assign({}, x, { done: !x.done }) : x; }); }); }} style={{ width:"20px", height:"20px", borderRadius:"4px", border:"2px solid " + (dl.done ? C.dusty : C.border), background: dl.done ? C.dusty : "transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", color:"#fff" }}>
                      {dl.done ? "✓" : ""}
                    </button>
                    {editDLId === dl.id ? (
                      <div style={{ display:"flex", gap:"6px", flex:1 }}>
                        <input value={editDLVal.title} onChange={function(e) { setEditDLVal(function(v) { return Object.assign({}, v, { title: e.target.value }); }); }} style={Object.assign(inpStyle(), { flex:1, padding:"5px 8px" })} />
                        <input type="date" value={editDLVal.date} onChange={function(e) { setEditDLVal(function(v) { return Object.assign({}, v, { date: e.target.value }); }); }} style={inpStyle({ width:"130px", flexShrink:0, padding:"5px 8px" })} />
                        <button onClick={function() { setDeadlines(function(d) { return d.map(function(x) { return x.id === dl.id ? Object.assign({}, x, editDLVal) : x; }); }); setEditDLId(null); }} style={btnStyle(C.dusty, { padding:"5px 10px", flexShrink:0 })}>✓</button>
                      </div>
                    ) : (
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", flex:1 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:"14px", color: dl.done ? C.textSoft : C.textMid, textDecoration: dl.done ? "line-through" : "none" }}>{dl.title}</div>
                          <div style={{ fontSize:"12px", color:C.textSoft }}>{new Date(dl.date).toLocaleDateString([], { month:"long", day:"numeric", year:"numeric" })}</div>
                        </div>
                        <span style={{ fontSize:"11px", fontWeight:"600", color:urgencyColor(da), flexShrink:0 }}>{da === 0 ? "TODAY" : da < 0 ? "PAST" : da + "d"}</span>
                        <button onClick={function() { setEditDLId(dl.id); setEditDLVal({ title:dl.title, date:dl.date }); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"14px" }}>✎</button>
                        <button onClick={function() { setDeadlines(function(d) { return d.filter(function(x) { return x.id !== dl.id; }); }); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"16px" }}>×</button>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ display:"flex", gap:"7px", marginTop:"12px", flexWrap:"wrap" }}>
                <input value={newDL.title} onChange={function(e) { setNewDL(function(d) { return Object.assign({}, d, { title: e.target.value }); }); }} placeholder="Deadline name..." style={Object.assign(inpStyle(), { flex:1, minWidth:"140px" })} />
                <input type="date" value={newDL.date} onChange={function(e) { setNewDL(function(d) { return Object.assign({}, d, { date: e.target.value }); }); }} style={inpStyle({ width:"140px", flexShrink:0 })} />
                <button onClick={function() { if (!newDL.title || !newDL.date) return; setDeadlines(function(d) { return [...d, { id:Date.now(), title:newDL.title, date:newDL.date, done:false }]; }); setNewDL({ title:"", date:"" }); }} style={btnStyle(C.dusty, { flexShrink:0 })}>Add</button>
              </div>
            </div>
            <NoteBlock tabId="schedule" />
          </div>
        )}

        {/* ── WEEKLY FOCUS ── */}
        {tab === "focus" && (
          <div>
            <div style={cardStyle({ background:"#FFF8FA", border:"1px solid " + C.blush })}>
              <div style={{ fontSize:"14px", color:C.textMid, lineHeight:"1.6" }}>🎯 Three big moves per venture this week. These feed your high-priority tasks on the Today tab.</div>
            </div>
            {Object.keys(CATEGORIES).map(function(cat) {
              var ci = CATEGORIES[cat];
              var key = wk + "-" + cat;
              var moves = weeklyFocus[key] || ["","",""];
              return (
                <div key={cat} style={cardStyle()}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                    <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:ci.color }} />
                    <div style={{ fontSize:"12px", letterSpacing:"0.18em", color:ci.color, fontWeight:"700" }}>{ci.label.toUpperCase()}</div>
                  </div>
                  {moves.map(function(m, i) {
                    return (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"9px", marginBottom:"8px" }}>
                        <span style={{ fontSize:"13px", color:C.textSoft, flexShrink:0, width:"18px" }}>{i+1}.</span>
                        <input value={m} onChange={function(e) { var updated = [...moves]; updated[i] = e.target.value; setWeeklyFocus(function(f) { return Object.assign({}, f, { [key]: updated }); }); }} placeholder={"Big move " + (i+1) + "..."} style={inpStyle()} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <NoteBlock tabId="focus" />
          </div>
        )}

        {/* ── TASKS ── */}
        {tab === "tasks" && (
          <div>
            <div style={cardStyle({ background:"#FFF8FA", border:"1px solid " + C.blush })}>
              <SectionLabel text="Add Task" />
              <input value={newTask} onChange={function(e) { setNewTask(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") addTask(); }} placeholder="What needs to get done..." style={Object.assign(inpStyle(), { marginBottom:"8px" })} />
              <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
                <select value={newCat} onChange={function(e) { setNewCat(e.target.value); }} style={Object.assign(inpStyle(), { flex:1, marginBottom:0, minWidth:"120px" })}>
                  {Object.entries(CATEGORIES).map(function(entry) { return <option key={entry[0]} value={entry[0]}>{entry[1].label}</option>; })}
                </select>
                <select value={newPriority} onChange={function(e) { setNewPriority(e.target.value); }} style={inpStyle({ width:"110px", marginBottom:0, flexShrink:0 })}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button onClick={addTask} style={btnStyle(C.rose, { flexShrink:0 })}>Add</button>
              </div>
            </div>
            <div style={{ fontSize:"12px", color:C.textSoft, marginBottom:"12px", fontStyle:"italic", padding:"0 4px" }}>Tap any task text to edit. High priority tasks appear on Today tab.</div>
            {Object.entries(CATEGORIES).map(function(entry) {
              var cat = entry[0]; var ci = entry[1];
              var ct = tasks.filter(function(t) { return t.category === cat; });
              if (!ct.length) return null;
              var dn = ct.filter(function(t) { return t.done; }).length;
              return (
                <div key={cat} style={{ marginBottom:"18px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                      <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:ci.color }} />
                      <span style={{ fontSize:"11px", letterSpacing:"0.18em", color:ci.color, fontWeight:"700" }}>{ci.label.toUpperCase()}</span>
                    </div>
                    <span style={{ fontSize:"11px", color:C.textSoft }}>{dn}/{ct.length}</span>
                  </div>
                  {ct.map(function(task) {
                    return (
                      <div key={task.id} style={{ display:"flex", alignItems:"center", gap:"9px", padding:"10px 12px", background:C.card, border:"1px solid " + (task.priority === "high" ? C.blush : C.borderSoft), borderRadius:"9px", marginBottom:"5px" }}>
                        <button onClick={function() { toggleT(task.id); }} style={{ width:"20px", height:"20px", borderRadius:"50%", border:"2px solid " + (task.done ? ci.color : C.border), background: task.done ? ci.color : "transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", color:"#fff" }}>
                          {task.done ? "✓" : ""}
                        </button>
                        {editingTaskId === task.id ? (
                          <input value={editingTaskText} onChange={function(e) { setEditingTaskText(e.target.value); }} onBlur={function() { saveTaskEdit(task.id); }} onKeyDown={function(e) { if (e.key === "Enter") saveTaskEdit(task.id); }} autoFocus style={Object.assign(inpStyle(), { flex:1, padding:"4px 8px", fontSize:"14px", marginBottom:0 })} />
                        ) : (
                          <span onClick={function() { if (!task.done) { setEditingTaskId(task.id); setEditingTaskText(task.text); } }} style={{ fontSize:"14px", color: task.done ? C.textSoft : C.textMid, textDecoration: task.done ? "line-through" : "none", flex:1, cursor: task.done ? "default" : "text" }}>{task.text}</span>
                        )}
                        {task.priority === "high" && !task.done && <span style={{ fontSize:"9px", color:"#C45A5A", fontWeight:"700", letterSpacing:"0.1em", flexShrink:0 }}>HIGH</span>}
                        <button onClick={function() { deleteTask(task.id); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"16px", flexShrink:0 }}>×</button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <NoteBlock tabId="tasks" />
          </div>
        )}

        {/* ── HABITS & SELF CARE ── */}
        {tab === "habits" && (
          <div>
            <div style={cardStyle({ background:"linear-gradient(135deg,#FFF0F3,#FFF8F0)", border:"1px solid " + C.blush, textAlign:"center", padding:"22px" })}>
              <div style={{ fontSize:"44px", fontWeight:"300", color:C.rose }}>{hPct}%</div>
              <div style={{ fontSize:"11px", letterSpacing:"0.28em", color:C.textSoft }}>TODAY'S CONSISTENCY</div>
              <div style={{ fontSize:"14px", color:C.textMid, marginTop:"6px" }}>
                {hPct === 100 ? "🌸 Perfect. This is the standard." : hPct >= 70 ? "Strong day. Keep going." : hPct >= 40 ? "Halfway there. Lock back in." : "Day's not over. Get after it."}
              </div>
            </div>

            <div style={cardStyle()}>
              <SectionLabel text="Health & Wellness" />
              {HABITS_LIST.filter(function(h) { return h.cat === "health"; }).map(function(h) {
                return (
                  <button key={h.id} onClick={function() { toggleH(h.id); }} style={{ display:"flex", alignItems:"center", gap:"13px", width:"100%", padding:"13px", marginBottom:"7px", background: th[h.id] ? "#FFF0F3" : C.cream, border:"1px solid " + (th[h.id] ? C.blush : C.borderSoft), borderRadius:"10px", cursor:"pointer", textAlign:"left" }}>
                    <span style={{ fontSize:"18px" }}>{h.icon}</span>
                    <span style={{ fontSize:"15px", color: th[h.id] ? C.rose : C.textMid, flex:1 }}>{h.label}</span>
                    <div style={{ width:"22px", height:"22px", borderRadius:"50%", border:"2px solid " + (th[h.id] ? C.rose : C.border), background: th[h.id] ? C.rose : "transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", color:"#fff", flexShrink:0 }}>{th[h.id] ? "✓" : ""}</div>
                  </button>
                );
              })}
            </div>

            <div style={cardStyle()}>
              <SectionLabel text="Skincare AM — Daily Routine" color={C.dusty} />
              <div style={{ fontSize:"12px", color:C.textSoft, marginBottom:"10px", fontStyle:"italic" }}>Same every morning.</div>
              {AM_ROUTINE.map(function(step) {
                var k = "am-" + step + "-" + dk;
                return (
                  <button key={step} onClick={function() { setSkinAmChecked(function(s) { return Object.assign({}, s, { [k]: !s[k] }); }); }} style={{ display:"flex", alignItems:"center", gap:"12px", width:"100%", padding:"11px", marginBottom:"6px", background: skinAmChecked[k] ? "#FFF0F3" : C.cream, border:"1px solid " + (skinAmChecked[k] ? C.blush : C.borderSoft), borderRadius:"9px", cursor:"pointer", textAlign:"left" }}>
                    <span style={{ fontSize:"14px" }}>🌸</span>
                    <span style={{ fontSize:"14px", color: skinAmChecked[k] ? C.rose : C.textMid, flex:1 }}>{step}</span>
                    {skinAmChecked[k] && <span style={{ color:C.rose, fontSize:"12px" }}>✓</span>}
                  </button>
                );
              })}
            </div>

            <div style={cardStyle({ background:"#FFF5FF", border:"1px solid #DDB8E0" })}>
              <SectionLabel text="Skincare PM — 21-Day Skin Reset" color={C.mauve} />
              {!skinResetStart ? (
                <div style={{ textAlign:"center", padding:"12px" }}>
                  <div style={{ fontSize:"14px", color:C.textMid, marginBottom:"12px" }}>Start your 21-day skin reset. Each day shows your specific PM routine.</div>
                  <button onClick={function() { setSkinResetStart(new Date().toISOString().split("T")[0]); }} style={btnStyle(C.mauve)}>Start 21-Day Reset Today</button>
                </div>
              ) : skinResetDay > 21 ? (
                <div style={{ textAlign:"center", padding:"12px" }}>
                  <div style={{ fontSize:"18px", color:C.mauve, fontWeight:"700", marginBottom:"8px" }}>🎉 21 Days Complete!</div>
                  <button onClick={function() { setSkinResetStart(new Date().toISOString().split("T")[0]); }} style={btnStyle(C.mauve)}>Restart Plan</button>
                </div>
              ) : (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
                    <div>
                      <div style={{ fontSize:"20px", fontWeight:"700", color:C.mauve }}>Day {skinResetDay} of 21</div>
                      <div style={{ fontSize:"13px", color:C.textSoft }}>{todayPM ? todayPM.focus : ""}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <ProgressBar pct={Math.round(skinResetDay/21*100)} color={C.mauve} />
                      <div style={{ fontSize:"11px", color:C.textSoft, marginTop:"4px" }}>{21 - skinResetDay} days remaining</div>
                    </div>
                  </div>
                  {todayPM && todayPM.steps.map(function(step) {
                    var k = "pm-" + step + "-" + dk;
                    return (
                      <button key={step} onClick={function() { setSkinPmChecked(function(s) { return Object.assign({}, s, { [k]: !s[k] }); }); }} style={{ display:"flex", alignItems:"center", gap:"12px", width:"100%", padding:"11px", marginBottom:"6px", background: skinPmChecked[k] ? "#F8F0FF" : C.cream, border:"1px solid " + (skinPmChecked[k] ? "#DDB8E0" : C.borderSoft), borderRadius:"9px", cursor:"pointer", textAlign:"left" }}>
                        <span style={{ fontSize:"14px" }}>🌙</span>
                        <span style={{ fontSize:"14px", color: skinPmChecked[k] ? C.mauve : C.textMid, flex:1 }}>{step}</span>
                        {skinPmChecked[k] && <span style={{ color:C.mauve, fontSize:"12px" }}>✓</span>}
                      </button>
                    );
                  })}
                  <button onClick={function() { setSkinResetStart(null); }} style={{ background:"transparent", border:"1px solid " + C.textSoft, borderRadius:"20px", padding:"4px 12px", color:C.textSoft, fontSize:"11px", cursor:"pointer", fontFamily:FONT, marginTop:"10px" }}>Reset Plan</button>
                </div>
              )}
            </div>

            <div style={cardStyle()}>
              <SectionLabel text="Hair Care" color={C.amber} />
              <div style={{ fontSize:"12px", color:C.textSoft, marginBottom:"10px", fontStyle:"italic" }}>Tap any day to edit your hair routine.</div>
              {[1,2,3,4,5,6,0].map(function(d) {
                var isToday = d === now.getDay();
                var doneKey = "hair-done-" + d + "-" + dk;
                return (
                  <div key={d} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", marginBottom:"6px", background: isToday ? "#FFF8F0" : C.cream, border:"1px solid " + (isToday ? "#F0D5B8" : C.borderSoft), borderRadius:"9px" }}>
                    <div style={{ fontSize:"11px", fontWeight:"700", color: isToday ? C.amber : C.textSoft, width:"36px", flexShrink:0 }}>{DAY_NAMES[d]}{isToday ? " ✦" : ""}</div>
                    {editHairDay === d ? (
                      <input value={hairEditVal} onChange={function(e) { setHairEditVal(e.target.value); }}
                        onBlur={function() { setHairRoutines(function(r) { return Object.assign({}, r, { [d]: hairEditVal }); }); setEditHairDay(null); }}
                        onKeyDown={function(e) { if (e.key === "Enter") { setHairRoutines(function(r) { return Object.assign({}, r, { [d]: hairEditVal }); }); setEditHairDay(null); } }}
                        autoFocus style={Object.assign(inpStyle(), { flex:1, padding:"4px 8px", fontSize:"13px", marginBottom:0 })} />
                    ) : (
                      <span onClick={function() { setEditHairDay(d); setHairEditVal(hairRoutines[d] || ""); }} style={{ fontSize:"13px", color:C.textMid, flex:1, cursor:"text" }}>{hairRoutines[d] || "tap to add..."}</span>
                    )}
                    <button onClick={function() { setHairChecked(function(h) { return Object.assign({}, h, { [doneKey]: !h[doneKey] }); }); }} style={{ width:"22px", height:"22px", borderRadius:"50%", border:"2px solid " + (hairChecked[doneKey] ? C.amber : C.border), background: hairChecked[doneKey] ? C.amber : "transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", color:"#fff" }}>
                      {hairChecked[doneKey] ? "✓" : ""}
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={cardStyle()}>
              <SectionLabel text="Business Habits" color={C.sage} />
              {HABITS_LIST.filter(function(h) { return h.cat === "biz"; }).map(function(h) {
                return (
                  <button key={h.id} onClick={function() { toggleH(h.id); }} style={{ display:"flex", alignItems:"center", gap:"13px", width:"100%", padding:"13px", marginBottom:"7px", background: th[h.id] ? "#F5FAF6" : C.cream, border:"1px solid " + (th[h.id] ? "#C5DEC9" : C.borderSoft), borderRadius:"10px", cursor:"pointer", textAlign:"left" }}>
                    <span style={{ fontSize:"18px" }}>{h.icon}</span>
                    <span style={{ fontSize:"15px", color: th[h.id] ? C.sage : C.textMid, flex:1 }}>{h.label}</span>
                    <div style={{ width:"22px", height:"22px", borderRadius:"50%", border:"2px solid " + (th[h.id] ? C.sage : C.border), background: th[h.id] ? C.sage : "transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", color:"#fff", flexShrink:0 }}>{th[h.id] ? "✓" : ""}</div>
                  </button>
                );
              })}
            </div>
            <NoteBlock tabId="habits" />
          </div>
        )}

        {/* ── GOALS ── */}
        {tab === "goals" && (
          <div>
            <div style={cardStyle()}>
              <SectionLabel text="Weight Goals" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"10px" }}>
                <div>
                  <div style={{ fontSize:"12px", color:C.textSoft, marginBottom:"5px" }}>Current Weight</div>
                  <input value={goals.currentWeight} onChange={function(e) { setGoals(function(g) { return Object.assign({}, g, { currentWeight: e.target.value }); }); }} placeholder="lbs" style={inpStyle()} />
                </div>
                <div>
                  <div style={{ fontSize:"12px", color:C.textSoft, marginBottom:"5px" }}>Goal Weight</div>
                  <input value={goals.targetWeight} onChange={function(e) { setGoals(function(g) { return Object.assign({}, g, { targetWeight: e.target.value }); }); }} placeholder="lbs" style={inpStyle()} />
                </div>
              </div>
              {goals.currentWeight && goals.targetWeight && (
                <div style={{ padding:"10px", background:"#FFF0F3", borderRadius:"8px", fontSize:"14px", color:C.rose, textAlign:"center", fontWeight:"600" }}>
                  {parseFloat(goals.currentWeight) > parseFloat(goals.targetWeight) ? (parseFloat(goals.currentWeight) - parseFloat(goals.targetWeight)).toFixed(1) + " lbs to goal 💪🏽" : "🎉 Goal weight reached!"}
                </div>
              )}
            </div>

            <div style={cardStyle()}>
              <SectionLabel text="Body Measurements" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                {Object.entries(goals.measurements).map(function(entry) {
                  var key = entry[0]; var val = entry[1];
                  return (
                    <div key={key}>
                      <div style={{ fontSize:"12px", color:C.textSoft, marginBottom:"5px", textTransform:"capitalize" }}>{key}</div>
                      <input value={val} onChange={function(e) { var v = e.target.value; setGoals(function(g) { var m = Object.assign({}, g.measurements, { [key]: v }); return Object.assign({}, g, { measurements: m }); }); }} placeholder={key + " (in)"} style={inpStyle()} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={cardStyle()}>
              <SectionLabel text="Skin Goal" color={C.dusty} />
              <textarea value={goals.skinGoal} onChange={function(e) { setGoals(function(g) { return Object.assign({}, g, { skinGoal: e.target.value }); }); }} placeholder="Clear skin, even tone, glow..." rows={2} style={Object.assign(inpStyle(), { resize:"vertical" })} />
            </div>

            <div style={cardStyle({ background:"#F5FAF6", border:"1px solid #C5DEC9" })}>
              <SectionLabel text="Health Goal" color={C.sage} />
              <textarea value={goals.healthGoal} onChange={function(e) { setGoals(function(g) { return Object.assign({}, g, { healthGoal: e.target.value }); }); }} placeholder="Energy, sleep, nutrition goals..." rows={2} style={Object.assign(inpStyle(), { resize:"vertical" })} />
            </div>

            <div style={cardStyle({ background:"#FFF8FA", border:"1px solid " + C.blush })}>
              <SectionLabel text="Accomplishments 🏆" />
              <div style={{ fontSize:"13px", color:C.textSoft, marginBottom:"10px" }}>Every win counts. Document them all.</div>
              {goals.accomplishments.map(function(acc, i) {
                return (
                  <div key={i} style={{ display:"flex", gap:"7px", marginBottom:"7px" }}>
                    <span style={{ color:C.rose, fontSize:"16px", flexShrink:0, marginTop:"8px" }}>✦</span>
                    <input value={acc} onChange={function(e) { var v = e.target.value; setGoals(function(g) { var a = [...g.accomplishments]; a[i] = v; return Object.assign({}, g, { accomplishments: a }); }); }} placeholder="Write a win..." style={inpStyle()} />
                    <button onClick={function() { setGoals(function(g) { return Object.assign({}, g, { accomplishments: g.accomplishments.filter(function(_, idx) { return idx !== i; }) }); }); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"18px", flexShrink:0 }}>×</button>
                  </div>
                );
              })}
              <button onClick={function() { setGoals(function(g) { return Object.assign({}, g, { accomplishments: [...g.accomplishments, ""] }); }); }} style={btnStyle(C.blush, { color:C.rose, background:"#FFF0F3", border:"1px solid " + C.blush, marginTop:"4px" })}>+ Add Win</button>
            </div>
            <NoteBlock tabId="goals" />
          </div>
        )}

        {/* ── RE COURSE ── */}
        {tab === "re" && (
          <div>
            <div style={cardStyle({ background:"#F5FAF6", border:"1px solid #C5DEC9", textAlign:"center", padding:"22px" })}>
              <div style={{ fontSize:"44px", fontWeight:"300", color:C.sage }}>{rePct}%</div>
              <div style={{ fontSize:"11px", letterSpacing:"0.25em", color:C.textSoft }}>COURSE COMPLETE</div>
              <ProgressBar pct={rePct} color={C.sage} />
              <div style={{ fontSize:"13px", color:C.textSoft, marginTop:"8px" }}>{reDone} of {reTot} lessons</div>
              <div style={{ fontSize:"14px", color:C.textMid, marginTop:"6px" }}>{rePct === 100 ? "🎓 Done. Schedule that exam NOW." : rePct >= 50 ? "Halfway - don't slow down." : "Every lesson is a step toward that license."}</div>
            </div>
            {RE_MODULES.map(function(mod) {
              var done = Math.min(reProgress[mod.id] || 0, mod.lessons);
              var pct = Math.round(done / mod.lessons * 100);
              return (
                <div key={mod.id} style={cardStyle()}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
                    <div style={{ fontSize:"14px", color: pct === 100 ? C.sage : C.textMid, flex:1, lineHeight:"1.4" }}>{mod.title}</div>
                    <div style={{ fontSize:"12px", color:C.sage, marginLeft:"8px", flexShrink:0 }}>{done}/{mod.lessons}</div>
                  </div>
                  <ProgressBar pct={pct} color={C.sage} />
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", marginTop:"12px", marginBottom:"10px" }}>
                    <button onClick={function() { setReProgress(function(p) { var v = Math.max((p[mod.id] || 0) - 1, 0); return Object.assign({}, p, { [mod.id]: v }); }); }} style={{ width:"34px", height:"34px", background:C.cream, border:"1px solid " + C.border, borderRadius:"7px", color:C.textSoft, fontSize:"18px", cursor:"pointer" }}>-</button>
                    <div style={{ flex:1, textAlign:"center", fontSize:"12px", color:C.textSoft, letterSpacing:"0.1em" }}>{pct === 100 ? "✓ MODULE COMPLETE" : pct + "% done"}</div>
                    <button onClick={function() { setReProgress(function(p) { var v = Math.min((p[mod.id] || 0) + 1, mod.lessons); return Object.assign({}, p, { [mod.id]: v }); }); }} style={{ width:"34px", height:"34px", background: pct === 100 ? "#F5FAF6" : "#FFF0F3", border:"1px solid " + (pct === 100 ? "#C5DEC9" : C.blush), borderRadius:"7px", color: pct === 100 ? C.sage : C.rose, fontSize:"18px", cursor:"pointer" }}>+</button>
                  </div>
                  {editReNote === mod.id ? (
                    <div style={{ display:"flex", gap:"6px" }}>
                      <input value={reNoteVal} onChange={function(e) { setReNoteVal(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") { setReNotes(function(n) { return Object.assign({}, n, { [mod.id]: reNoteVal }); }); setEditReNote(null); } }} autoFocus placeholder="Key notes / takeaways..." style={Object.assign(inpStyle(), { flex:1, fontSize:"13px" })} />
                      <button onClick={function() { setReNotes(function(n) { return Object.assign({}, n, { [mod.id]: reNoteVal }); }); setEditReNote(null); }} style={btnStyle(C.sage, { padding:"8px 12px" })}>✓</button>
                    </div>
                  ) : (
                    <div onClick={function() { setEditReNote(mod.id); setReNoteVal(reNotes[mod.id] || ""); }} style={{ fontSize:"13px", color: reNotes[mod.id] ? C.textSoft : "#C0A8AC", fontStyle: reNotes[mod.id] ? "normal" : "italic", cursor:"pointer", borderTop:"1px solid " + C.borderSoft, paddingTop:"8px" }}>
                      {reNotes[mod.id] || "Tap to add module notes..."}
                    </div>
                  )}
                </div>
              );
            })}
            <NoteBlock tabId="re" />
          </div>
        )}

        {/* ── BUSINESSES ── */}
        {tab === "biz" && (
          <div>
            <div style={{ fontSize:"12px", letterSpacing:"0.22em", color:C.rose, fontWeight:"700", marginBottom:"12px" }}>TIER 1 - IN PROGRESS</div>
            {t1Bizs.map(function(biz) {
              var done = biz.phases.filter(function(p) { return p.done; }).length;
              var pct = biz.phases.length ? Math.round(done / biz.phases.length * 100) : 0;
              return (
                <div key={biz.id} style={cardStyle({ borderLeft:"3px solid " + biz.color })}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"4px" }}>
                    <div style={{ fontSize:"16px", fontWeight:"700", color:C.text }}>{biz.name}</div>
                    <span style={{ fontSize:"11px", color:C.textSoft }}>{done}/{biz.phases.length} · {pct}%</span>
                  </div>
                  <ProgressBar pct={pct} color={biz.color} />
                  <div style={{ marginTop:"12px" }}>
                    {biz.phases.map(function(phase, i) {
                      var phKey = biz.id + "-" + phase.id;
                      return (
                        <div key={phase.id} style={{ display:"flex", alignItems:"center", gap:"9px", marginBottom:"5px" }}>
                          <button onClick={function() { setT1Bizs(function(bs) { return bs.map(function(b) { return b.id === biz.id ? Object.assign({}, b, { phases: b.phases.map(function(p) { return p.id === phase.id ? Object.assign({}, p, { done: !p.done }) : p; }) }) : b; }); }); }} style={{ width:"20px", height:"20px", borderRadius:"50%", border:"2px solid " + (phase.done ? biz.color : C.border), background: phase.done ? biz.color : "transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", color:"#fff" }}>
                            {phase.done ? "✓" : i+1}
                          </button>
                          {editPhaseKey === phKey ? (
                            <input value={editPhaseVal} onChange={function(e) { setEditPhaseVal(e.target.value); }}
                              onBlur={function() { setT1Bizs(function(bs) { return bs.map(function(b) { return b.id === biz.id ? Object.assign({}, b, { phases: b.phases.map(function(p) { return p.id === phase.id ? Object.assign({}, p, { label: editPhaseVal }) : p; }) }) : b; }); }); setEditPhaseKey(null); }}
                              onKeyDown={function(e) { if (e.key === "Enter") { setT1Bizs(function(bs) { return bs.map(function(b) { return b.id === biz.id ? Object.assign({}, b, { phases: b.phases.map(function(p) { return p.id === phase.id ? Object.assign({}, p, { label: editPhaseVal }) : p; }) }) : b; }); }); setEditPhaseKey(null); } }}
                              autoFocus style={Object.assign(inpStyle(), { flex:1, padding:"4px 8px", fontSize:"13px", marginBottom:0 })} />
                          ) : (
                            <span onClick={function() { setEditPhaseKey(phKey); setEditPhaseVal(phase.label); }} style={{ fontSize:"13px", color: phase.done ? C.textSoft : C.textMid, textDecoration: phase.done ? "line-through" : "none", flex:1, cursor:"text" }}>{phase.label}</span>
                          )}
                          <button onClick={function() { setT1Bizs(function(bs) { return bs.map(function(b) { return b.id === biz.id ? Object.assign({}, b, { phases: b.phases.filter(function(p) { return p.id !== phase.id; }) }) : b; }); }); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"14px" }}>×</button>
                        </div>
                      );
                    })}
                    <div style={{ display:"flex", gap:"6px", marginTop:"8px" }}>
                      <input value={newPhase[biz.id] || ""} onChange={function(e) { var v = e.target.value; setNewPhase(function(p) { return Object.assign({}, p, { [biz.id]: v }); }); }} placeholder="Add milestone..." style={Object.assign(inpStyle(), { flex:1, padding:"7px 10px", fontSize:"13px" })} />
                      <button onClick={function() {
                        var t = newPhase[biz.id] || "";
                        if (!t.trim()) return;
                        setT1Bizs(function(bs) { return bs.map(function(b) { return b.id === biz.id ? Object.assign({}, b, { phases: [...b.phases, { id:Date.now(), label:t, done:false }] }) : b; }); });
                        setNewPhase(function(p) { return Object.assign({}, p, { [biz.id]: "" }); });
                      }} style={btnStyle(biz.color, { padding:"7px 12px", flexShrink:0, fontSize:"12px" })}>Add</button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{ fontSize:"12px", letterSpacing:"0.22em", color:C.mauve, fontWeight:"700", margin:"20px 0 12px" }}>TIER 2 - IN DEVELOPMENT</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"14px" }}>
              {t2Bizs.map(function(biz) {
                return (
                  <div key={biz.id} style={{ background:C.card, border:"1px solid " + C.border, borderRadius:"12px", padding:"14px", borderTop:"3px solid " + biz.color }}>
                    {editT2Id === biz.id ? (
                      <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                        <input value={editT2Val.name} onChange={function(e) { setEditT2Val(function(v) { return Object.assign({}, v, { name: e.target.value }); }); }} style={inpStyle({ padding:"5px 8px", fontSize:"13px" })} />
                        <input value={editT2Val.desc} onChange={function(e) { setEditT2Val(function(v) { return Object.assign({}, v, { desc: e.target.value }); }); }} style={inpStyle({ padding:"5px 8px", fontSize:"12px" })} />
                        <div style={{ display:"flex", gap:"5px" }}>
                          <button onClick={function() { setT2Bizs(function(bs) { return bs.map(function(b) { return b.id === biz.id ? Object.assign({}, b, editT2Val) : b; }); }); setEditT2Id(null); }} style={btnStyle(biz.color, { padding:"5px 10px", fontSize:"11px" })}>Save</button>
                          <button onClick={function() { setT2Bizs(function(bs) { return bs.filter(function(b) { return b.id !== biz.id; }); }); }} style={btnStyle("#E8A5A5", { padding:"5px 10px", fontSize:"11px", color:"#C45A5A" })}>Remove</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize:"14px", fontWeight:"700", color:C.text, marginBottom:"4px" }}>{biz.name}</div>
                        <div style={{ fontSize:"12px", color:C.textSoft, marginBottom:"8px" }}>{biz.desc}</div>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <div style={{ fontSize:"11px", fontWeight:"600", color:biz.color }}>IN DEVELOPMENT</div>
                          <button onClick={function() { setEditT2Id(biz.id); setEditT2Val({ name:biz.name, desc:biz.desc }); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"13px" }}>✎</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={cardStyle({ background:"#FFF8FA", border:"1px solid " + C.blush })}>
              <SectionLabel text="Add to Tier 2" />
              <input value={newT2.name} onChange={function(e) { setNewT2(function(v) { return Object.assign({}, v, { name: e.target.value }); }); }} placeholder="Business name..." style={Object.assign(inpStyle(), { marginBottom:"7px" })} />
              <input value={newT2.desc} onChange={function(e) { setNewT2(function(v) { return Object.assign({}, v, { desc: e.target.value }); }); }} placeholder="Brief description..." style={Object.assign(inpStyle(), { marginBottom:"7px" })} />
              <button onClick={function() { if (!newT2.name.trim()) return; setT2Bizs(function(bs) { return [...bs, { id:"t2-" + Date.now(), name:newT2.name, desc:newT2.desc, color:C.blush }]; }); setNewT2({ name:"", desc:"" }); }} style={btnStyle(C.mauve)}>Add Business</button>
            </div>
            <NoteBlock tabId="biz" />
          </div>
        )}

        {/* ── UP NEXT ── */}
        {tab === "upnext" && (
          <div>
            <div style={cardStyle({ background:"#FFF8FA", border:"1px solid " + C.blush })}>
              <div style={{ fontSize:"14px", color:C.textMid, lineHeight:"1.6" }}>💭 Your idea incubator. Scratch what doesn't fit. Keep what does. This is where your next chapter starts forming.</div>
            </div>
            {upNext.map(function(item) {
              return (
                <div key={item.id} style={cardStyle({ borderLeft:"3px solid " + (item.keep === true ? C.sage : item.keep === false ? "#E8A5A5" : C.border) })}>
                  {editUpId === item.id ? (
                    <input value={editUpText} onChange={function(e) { setEditUpText(e.target.value); }}
                      onBlur={function() { setUpNext(function(u) { return u.map(function(x) { return x.id === item.id ? Object.assign({}, x, { text: editUpText }) : x; }); }); setEditUpId(null); }}
                      onKeyDown={function(e) { if (e.key === "Enter") { setUpNext(function(u) { return u.map(function(x) { return x.id === item.id ? Object.assign({}, x, { text: editUpText }) : x; }); }); setEditUpId(null); } }}
                      autoFocus style={Object.assign(inpStyle(), { marginBottom:"10px" })} />
                  ) : (
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
                      <span onClick={function() { setEditUpId(item.id); setEditUpText(item.text); }} style={{ fontSize:"15px", color:C.textMid, flex:1, cursor:"text" }}>{item.text}</span>
                      <button onClick={function() { setEditUpId(item.id); setEditUpText(item.text); }} style={{ background:"transparent", border:"none", color:C.textSoft, cursor:"pointer", fontSize:"13px", marginLeft:"8px" }}>✎</button>
                    </div>
                  )}
                  <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
                    <button onClick={function() { setUpNext(function(u) { return u.map(function(x) { return x.id === item.id ? Object.assign({}, x, { keep: true }) : x; }); }); }} style={btnStyle(item.keep === true ? C.sage : C.cream, { color: item.keep === true ? "#fff" : C.sage, border:"1px solid " + C.sage, fontSize:"12px", padding:"7px 12px" })}>Keep</button>
                    <button onClick={function() { setUpNext(function(u) { return u.map(function(x) { return x.id === item.id ? Object.assign({}, x, { keep: false }) : x; }); }); }} style={btnStyle(item.keep === false ? "#C45A5A" : C.cream, { color: item.keep === false ? "#fff" : "#C45A5A", border:"1px solid #E8A5A5", fontSize:"12px", padding:"7px 12px" })}>Scratch</button>
                    <button onClick={function() { setUpNext(function(u) { return u.map(function(x) { return x.id === item.id ? Object.assign({}, x, { keep: null }) : x; }); }); }} style={btnStyle(C.cream, { color:C.textSoft, border:"1px solid " + C.border, fontSize:"12px", padding:"7px 12px" })}>Reset</button>
                    <button onClick={function() { setUpNext(function(u) { return u.filter(function(x) { return x.id !== item.id; }); }); }} style={btnStyle(C.cream, { color:C.textSoft, border:"1px solid " + C.border, fontSize:"12px", padding:"7px 12px" })}>Remove</button>
                  </div>
                </div>
              );
            })}
            <div style={cardStyle()}>
              <SectionLabel text="Add Idea" />
              <div style={{ display:"flex", gap:"7px" }}>
                <input value={newUpNext} onChange={function(e) { setNewUpNext(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter" && newUpNext.trim()) { setUpNext(function(u) { return [...u, { id:Date.now(), text:newUpNext, keep:null }]; }); setNewUpNext(""); } }} placeholder="What's next on your radar..." style={inpStyle()} />
                <button onClick={function() { if (!newUpNext.trim()) return; setUpNext(function(u) { return [...u, { id:Date.now(), text:newUpNext, keep:null }]; }); setNewUpNext(""); }} style={btnStyle(C.rose, { flexShrink:0 })}>Add</button>
              </div>
            </div>
            <NoteBlock tabId="upnext" />
          </div>
        )}

      </div>
    </div>
  );
}
