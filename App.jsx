import React, { useMemo, useRef, useState } from 'react';
import {
  Activity, Apple, ArrowDownRight, ArrowRight, Bell, BookOpen, Camera,
  Check, ChevronDown, ChevronRight, CircleHelp, Clock3, CloudUpload,
  CookingPot, Flame, Gauge, Leaf, Menu, MessageCircle, MoreHorizontal,
  Plus, Search, Settings2, ShieldCheck, Sparkles, Sprout, TrendingUp,
  Upload, Utensils, Video, X, ScanLine, Droplets, Salad, CalendarDays
} from 'lucide-react';

const navGroups = [
  { label: 'WORKSPACE', items: [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'food-scan', label: 'Food scan', icon: ScanLine, badge: 'AI' },
    { id: 'freshness', label: 'Freshness check', icon: Sprout },
    { id: 'hygiene', label: 'Hygiene monitor', icon: ShieldCheck },
  ]},
  { label: 'YOUR KITCHEN', items: [
    { id: 'cook', label: 'Cooking assistant', icon: CookingPot },
    { id: 'nutrition', label: 'Nutrition planner', icon: Apple },
  ]}
];

const demoMeals = [
  { name: 'Avocado toast', type: 'Breakfast', kcal: 320, protein: '9g', carbs: '34g', fat: '18g', color: 'mint', emoji: '🥑' },
  { name: 'Rainbow grain bowl', type: 'Lunch', kcal: 485, protein: '21g', carbs: '58g', fat: '16g', color: 'peach', emoji: '🥗' },
  { name: 'Berry yogurt cup', type: 'Snack', kcal: 190, protein: '12g', carbs: '24g', fat: '5g', color: 'lavender', emoji: '🫐' },
];

const recipes = [
  { title: 'Creamy lemon pasta', time: '20 min', tag: 'Quick & easy', emoji: '🍝', desc: 'A bright, creamy pasta with lemon, herbs and parmesan.', ingredients: ['Pasta', 'Lemon', 'Greek yogurt or cream', 'Parmesan', 'Parsley'] },
  { title: 'Green power bowl', time: '15 min', tag: 'High fiber', emoji: '🥑', desc: 'A fresh bowl with grains, greens, avocado and a citrus dressing.', ingredients: ['Quinoa or rice', 'Avocado', 'Spinach', 'Cucumber', 'Lemon'] },
  { title: 'Crispy chickpea tacos', time: '25 min', tag: 'Plant based', emoji: '🌮', desc: 'Spiced chickpeas, crunchy slaw and a cool yogurt sauce.', ingredients: ['Chickpeas', 'Tortillas', 'Cabbage', 'Yogurt', 'Smoked paprika'] },
];

function Brand() {
  return <div className="brand-mark"><span className="brand-icon"><Sprout size={21} strokeWidth={2.4} /></span><span>foodverse<span className="brand-ai">.ai</span></span></div>;
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return <>
    {mobileOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><Brand /><button className="icon-button sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18}/></button></div>
      <div className="workspace-select"><div className="workspace-avatar">F</div><div><strong>My kitchen</strong><span>Personal workspace</span></div><ChevronDown size={15} /></div>
      <nav className="main-nav">
        {navGroups.map(group => <div className="nav-group" key={group.label}>
          <p className="nav-label">{group.label}</p>
          {group.items.map(item => {
            const Icon = item.icon;
            return <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => { setActive(item.id); setMobileOpen(false); }}>
              <Icon size={18} strokeWidth={1.8}/><span>{item.label}</span>{item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>;
          })}
        </div>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="tip-card"><div className="tip-icon"><Sparkles size={16}/></div><strong>A little smarter, every day.</strong><p>Your food insights help you build healthier habits over time.</p><button onClick={() => setActive('nutrition')}>Explore your plan <ArrowRight size={14}/></button></div>
        <button className="nav-item bottom-link" onClick={() => setActive('settings')}><Settings2 size={18}/><span>Settings</span></button>
        <div className="profile-row"><div className="profile-avatar">S</div><div className="profile-text"><strong>Sam Taylor</strong><span>Free plan</span></div><MoreHorizontal size={19}/></div>
      </div>
    </aside>
  </>;
}

function Header({ active, search, setSearch, setMobileOpen, onNotifications }) {
  const titles = { overview: ['Good evening, Sam', 'Here’s your food intelligence at a glance.'], 'food-scan': ['Food scan', 'Turn a food photo into useful, understandable insights.'], freshness: ['Freshness check', 'A visual first look at the food you’re about to enjoy.'], hygiene: ['Hygiene monitor', 'Review kitchen and food-handling observations.'], cook: ['Cooking assistant', 'Find inspiration and make your next meal with confidence.'], nutrition: ['Nutrition planner', 'Build a balanced day around your needs and preferences.'], settings: ['Your settings', 'Make FoodVerse work better for you.'] };
  const [title, subtitle] = titles[active] || titles.overview;
  return <header className="topbar">
    <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20}/></button>
    <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14}/><strong>{active === 'overview' ? 'Overview' : title}</strong></div>
    <div className="top-actions"><label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search anything..." aria-label="Search dashboard"/><kbd>⌘ K</kbd></label><button className="icon-button notification-button" onClick={onNotifications} aria-label="Notifications"><Bell size={19}/><i/></button><div className="top-avatar">S</div></div>
  </header>;
}

function SectionHeading({ eyebrow, title, action, onAction }) {
  return <div className="section-heading"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{action && <button className="text-button" onClick={onAction}>{action}<ArrowRight size={15}/></button>}</div>;
}

function StatCard({ icon: Icon, label, value, unit, change, tone, progress }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19}/></div><div className="stat-label">{label}</div><div className="stat-value">{value}<span>{unit}</span></div><div className="stat-foot"><span className="trend"><TrendingUp size={13}/>{change}</span><span className="muted">vs. last week</span></div>{progress !== undefined && <div className="mini-progress"><span style={{width: `${progress}%`}}/></div>}</div>;
}

function Overview({ setActive, search }) {
  const filteredMeals = demoMeals.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.type.toLowerCase().includes(search.toLowerCase()));
  return <div className="page-content">
    <div className="welcome-row"><div><div className="date-chip"><span className="live-dot"/> TUESDAY, OCTOBER 28</div><h1>Good evening, Sam <span className="wave">✳</span></h1><p className="page-subtitle">Small choices add up. Here's your daily snapshot.</p></div><button className="primary-button" onClick={() => setActive('food-scan')}><Plus size={17}/> New food scan</button></div>
    <div className="hero-banner"><div className="hero-copy"><div className="hero-kicker"><Sparkles size={14}/> YOUR DAILY FOOD INTELLIGENCE</div><h2>Eat well. Waste less.<br/><em>Feel your best.</em></h2><p>Your kitchen, with a little more intelligence. Explore today's insights and make your next food decision count.</p><button className="hero-button" onClick={() => setActive('nutrition')}>View daily insights <ArrowRight size={16}/></button></div><div className="hero-art" aria-label="Illustration of a healthy meal"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-leaf leaf-one">✦</div><div className="food-plate"><div className="plate-inner"><span className="food-piece f1">🥑</span><span className="food-piece f2">🥕</span><span className="food-piece f3">🥦</span><span className="food-piece f4">🍅</span><span className="food-piece f5">🫛</span><span className="food-piece f6">🌽</span></div></div><div className="floating-note"><span className="note-check"><Check size={13}/></span><span><b>Looking balanced</b><small>3 food groups detected</small></span></div><div className="art-sparkle">✳</div></div></div>
    <SectionHeading eyebrow="YOUR DAY AT A GLANCE" title="Daily overview" action="See nutrition plan" onAction={() => setActive('nutrition')}/>
    <div className="stats-grid">
      <StatCard icon={Flame} label="Calories consumed" value="1,245" unit="/ 2,000 kcal" change="12%" tone="orange" progress={62}/>
      <StatCard icon={Sprout} label="Nutrition score" value="86" unit="/ 100" change="8 pts" tone="green" progress={86}/>
      <StatCard icon={Droplets} label="Water intake" value="1.5" unit="/ 2.5 L" change="2 glasses" tone="blue" progress={60}/>
      <StatCard icon={ShieldCheck} label="Food waste saved" value="0.8" unit=" kg" change="0.2 kg" tone="purple" progress={72}/>
    </div>
    <div className="content-grid">
      <section className="panel meals-panel"><SectionHeading eyebrow="FUEL FOR YOUR DAY" title="Today's food log" action="Full food log" onAction={() => setActive('nutrition')}/><div className="meal-list">{filteredMeals.map((meal, i) => <div className="meal-row" key={meal.name}><div className={`meal-emoji ${meal.color}`}>{meal.emoji}</div><div className="meal-info"><strong>{meal.name}</strong><span>{meal.type} <i/> {['8:30 AM','12:45 PM','3:20 PM'][i]}</span></div><div className="meal-macros"><strong>{meal.kcal} <small>kcal</small></strong><span>P {meal.protein} · C {meal.carbs} · F {meal.fat}</span></div><ChevronRight className="meal-chevron" size={17}/></div>)}{filteredMeals.length === 0 && <div className="empty-state">No meals match “{search}”. Try another search.</div>}</div><button className="add-meal-button" onClick={() => setActive('food-scan')}><Plus size={16}/> Add a meal</button></section>
      <section className="panel insight-panel"><SectionHeading eyebrow="POWERED BY FOODVERSE AI" title="Your smart insights"/><div className="insight-feature"><div className="insight-illustration">🥬</div><div><span className="insight-tag">NUTRITION TIP</span><h3>Make room for more greens</h3><p>You're doing great today. Adding a serving of leafy greens at dinner can help round out your fiber intake.</p></div></div><div className="insight-footer"><div className="insight-ai"><Sparkles size={14}/> Personalized for you</div><button onClick={() => setActive('nutrition')}>See recommendations <ArrowRight size={14}/></button></div></section>
    </div>
    <SectionHeading eyebrow="YOUR FOOD TOOLKIT" title="Explore FoodVerse" />
    <div className="tool-grid">
      <ToolCard icon={ScanLine} tone="green" title="Food recognition" desc="Identify ingredients and get an instant nutrition estimate." action="Scan your food" onClick={() => setActive('food-scan')}/>
      <ToolCard icon={Sprout} tone="orange" title="Freshness check" desc="Review visual freshness cues before you cook." action="Check freshness" onClick={() => setActive('freshness')}/>
      <ToolCard icon={ShieldCheck} tone="blue" title="Hygiene monitor" desc="Review visible food-handling and kitchen hygiene cues." action="Review hygiene" onClick={() => setActive('hygiene')}/>
      <ToolCard icon={CookingPot} tone="purple" title="Cooking assistant" desc="Get inspired by recipes matched to your ingredients." action="Find a recipe" onClick={() => setActive('cook')}/>
    </div>
  </div>;
}

function ToolCard({ icon: Icon, tone, title, desc, action, onClick }) {
  return <button className="tool-card" onClick={onClick}><div className={`tool-icon ${tone}`}><Icon size={20}/></div><h3>{title}</h3><p>{desc}</p><span>{action}<ArrowRight size={15}/></span></button>;
}

function UploadPanel({ onFile, preview, fileInputRef, title = 'Drop your food photo here', sub = 'JPG, PNG or WEBP · up to 10 MB' }) {
  const [dragging, setDragging] = useState(false);
  function acceptFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Please choose an image file.'); return; }
    if (file.size > 10 * 1024 * 1024) { alert('Please choose an image smaller than 10 MB.'); return; }
    onFile(file);
  }
  return <div className={`upload-panel ${dragging ? 'dragging' : ''}`} onDragOver={e => {e.preventDefault(); setDragging(true);}} onDragLeave={() => setDragging(false)} onDrop={e => {e.preventDefault(); setDragging(false); acceptFile(e.dataTransfer.files?.[0]);}}>
    {preview ? <div className="preview-wrap"><img src={preview} alt="Selected food preview"/><div className="preview-overlay"><Check size={15}/> Image ready to analyze</div></div> : <><div className="upload-icon"><CloudUpload size={25}/></div><h3>{title}</h3><p>{sub}</p></>}
    <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={e => acceptFile(e.target.files?.[0])}/>
    <button className="secondary-button" onClick={() => fileInputRef.current?.click()}><Upload size={15}/>{preview ? 'Change image' : 'Choose an image'}</button>
  </div>;
}

function FoodScan() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(false);
  const [scanType, setScanType] = useState('nutrition');
  const inputRef = useRef(null);
  function selectFile(f) {
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(f); setPreview(URL.createObjectURL(f)); setResult(false);
  }
  return <div className="page-content inner-page">
    <div className="welcome-row"><div><div className="date-chip"><span className="live-dot"/> MULTIMODAL ANALYSIS</div><h1>Food scan <span className="heading-spark">✳</span></h1><p className="page-subtitle">One photo, a clearer picture of what's on your plate.</p></div></div>
    <div className="scan-layout"><section className="panel scan-main"><div className="panel-top"><div><span className="step-label">STEP 01</span><h2>Upload your food</h2><p>Choose a clear photo of a meal or ingredient.</p></div><div className="scan-icon"><Camera size={21}/></div></div><UploadPanel onFile={selectFile} preview={preview} fileInputRef={inputRef}/><div className="scan-options"><span className="form-label">WHAT WOULD YOU LIKE TO EXPLORE?</span><div className="choice-grid">{[{id:'nutrition',icon:Apple,label:'Nutrition estimate',desc:'Calories & macros'},{id:'freshness',icon:Sprout,label:'Freshness cues',desc:'Visible condition'},{id:'ingredients',icon:Salad,label:'Food recognition',desc:'Identify ingredients'}].map(o => {const Icon=o.icon;return <button key={o.id} className={`choice-card ${scanType===o.id?'selected':''}`} onClick={() => setScanType(o.id)}><Icon size={18}/><b>{o.label}</b><span>{o.desc}</span>{scanType===o.id && <Check className="choice-check" size={15}/>}</button>})}</div></div><button className="primary-button scan-submit" disabled={!file} onClick={() => setResult(true)}><Sparkles size={16}/>{result ? 'Demo analysis complete' : 'Analyze food'}<ArrowRight size={16}/></button><p className="disclaimer"><CircleHelp size={14}/> Demo mode: results are illustrative, not medical or food-safety advice.</p></section>
    <aside className="scan-side"><div className="panel side-info"><div className="side-info-icon"><Sparkles size={18}/></div><h3>How FoodVerse sees your food</h3><p>Our planned multimodal workflow combines image understanding with contextual reasoning to help make food decisions easier.</p><div className="process-step"><span>01</span><div><b>See</b><small>Identify visible food and ingredients</small></div></div><div className="process-step"><span>02</span><div><b>Understand</b><small>Consider the context you provide</small></div></div><div className="process-step"><span>03</span><div><b>Guide</b><small>Share useful, transparent suggestions</small></div></div></div><div className="safety-note"><ShieldCheck size={18}/><div><b>Safety first</b><p>A photo cannot reliably confirm whether food is safe to eat. When in doubt, follow official food-safety guidance.</p></div></div></aside></div>
    {result && <section className="panel result-panel"><div className="result-heading"><div><span className="insight-tag">DEMO RESULT</span><h2>{scanType==='freshness'?'Visual freshness review':scanType==='ingredients'?'Food recognition summary':'Nutrition estimate'}</h2></div><span className="demo-pill">Illustrative</span></div><div className="result-body">{preview && <img src={preview} alt="Food selected for demo analysis"/>}<div className="result-text"><h3>{file?.name || 'Your food image'}</h3><p>This is a sample interface result to demonstrate the workflow. No AI model has analyzed this image.</p><div className="result-metrics"><div><span>Estimated energy</span><b>~350 kcal</b></div><div><span>Visible items</span><b>3–5 items</b></div><div><span>Confidence</span><b>Not measured</b></div></div><p className="result-caveat">Actual nutrition depends on ingredients, quantities and preparation. Visual appearance alone cannot verify freshness or hygiene.</p></div></div></section>}
  </div>;
}

function Freshness() {
  const [file, setFile] = useState(null), [preview, setPreview] = useState(''), [checked, setChecked] = useState(false);
  const ref = useRef(null);
  function select(f) { if (!f) return; if (!f.type.startsWith('image/')) return alert('Please choose an image file.'); if (f.size > 10*1024*1024) return alert('Please choose an image smaller than 10 MB.'); if(preview) URL.revokeObjectURL(preview); setFile(f);setPreview(URL.createObjectURL(f));setChecked(false); }
  return <div className="page-content inner-page"><div className="welcome-row"><div><div className="date-chip"><span className="live-dot"/> FRESHNESS INTELLIGENCE</div><h1>Freshness check <span className="heading-spark">✳</span></h1><p className="page-subtitle">Spot visible changes and make more informed food decisions.</p></div></div><div className="feature-grid"><section className="panel feature-main"><div className="panel-top"><div><span className="step-label">VISUAL REVIEW</span><h2>Check an ingredient</h2><p>Upload a clear image of produce, packaged food, or leftovers.</p></div><div className="scan-icon orange"><Sprout size={21}/></div></div><UploadPanel onFile={select} preview={preview} fileInputRef={ref} title="Add a photo to get started" sub="A clear, well-lit image works best"/><button className="primary-button full-button" disabled={!file} onClick={() => setChecked(true)}><ScanLine size={16}/>{checked?'Review ready':'Review visible cues'}<ArrowRight size={16}/></button>{checked && <div className="demo-callout"><Sparkles size={17}/><div><b>Demo review prepared</b><p>The image is ready for a connected AI service. This prototype does not determine actual freshness or edibility.</p></div></div>}</section><section className="panel cues-panel"><span className="eyebrow">WHAT TO LOOK FOR</span><h2>Visual cues can help</h2><div className="cue-row"><span className="cue-icon green"><Leaf size={18}/></span><div><b>Color changes</b><p>Unusual discoloration may be a reason to inspect food more closely.</p></div></div><div className="cue-row"><span className="cue-icon orange"><Droplets size={18}/></span><div><b>Texture & moisture</b><p>Unexpected sliminess or leaking can be a warning sign.</p></div></div><div className="cue-row"><span className="cue-icon purple"><Clock3 size={18}/></span><div><b>Storage & time</b><p>Storage conditions and time matter more than appearance alone.</p></div></div><div className="warning-box"><ShieldCheck size={17}/><p><b>Important:</b> Harmful bacteria may not change food's smell, taste, or appearance. Never taste food to test its safety.</p></div></section></div></div>;
}

function Hygiene() {
  const [kind, setKind] = useState('image'), [file, setFile] = useState(null), [preview, setPreview] = useState(''), [reviewed, setReviewed] = useState(false);
  const ref = useRef(null);
  function select(f) { if (!f) return; if (!f.type.startsWith('image/') && !f.type.startsWith('video/')) return alert('Please choose an image or video file.'); if (f.size > 30*1024*1024) return alert('Please choose a file smaller than 30 MB.'); if(preview) URL.revokeObjectURL(preview); setFile(f); setPreview(URL.createObjectURL(f)); setReviewed(false); }
  return <div className="page-content inner-page"><div className="welcome-row"><div><div className="date-chip"><span className="live-dot"/> KITCHEN OBSERVATION</div><h1>Hygiene monitor <span className="heading-spark">✳</span></h1><p className="page-subtitle">Review visible food-handling practices and kitchen setup cues.</p></div></div><div className="scan-layout"><section className="panel scan-main"><div className="panel-top"><div><span className="step-label">OBSERVATION INPUT</span><h2>Add a kitchen snapshot</h2><p>Choose an image or a short video for a demo review flow.</p></div><div className="scan-icon blue"><ShieldCheck size={21}/></div></div><div className="media-tabs"><button className={kind==='image'?'active':''} onClick={() => {setKind('image');setFile(null);setPreview('');setReviewed(false);}}><Camera size={15}/> Image</button><button className={kind==='video'?'active':''} onClick={() => {setKind('video');setFile(null);setPreview('');setReviewed(false);}}><Video size={15}/> Video</button></div><div className="upload-panel hygiene-upload">{preview ? <div className="preview-wrap">{kind==='video'?<video src={preview} controls/>:<img src={preview} alt="Kitchen upload preview"/>}<div className="preview-overlay"><Check size={15}/> Media ready</div></div>:<><div className="upload-icon blue"><CloudUpload size={25}/></div><h3>Upload {kind === 'video' ? 'a kitchen video' : 'a kitchen image'}</h3><p>{kind==='video'?'MP4, WEBM or MOV · up to 30 MB':'JPG, PNG or WEBP · up to 30 MB'}</p></>}<input ref={ref} hidden type="file" accept={kind==='video'?'video/*':'image/*'} onChange={e=>select(e.target.files?.[0])}/><button className="secondary-button" onClick={()=>ref.current?.click()}><Upload size={15}/>{preview?'Change file':'Choose file'}</button></div><button className="primary-button full-button" disabled={!file} onClick={()=>setReviewed(true)}><Sparkles size={16}/>{reviewed?'Demo review complete':'Review visible hygiene cues'}<ArrowRight size={16}/></button>{reviewed && <div className="demo-callout"><Sparkles size={17}/><div><b>Demo workflow complete</b><p>In production, a vision model could flag visible observations for human review. This demo has not evaluated your media.</p></div></div>}<p className="disclaimer"><CircleHelp size={14}/> This tool is not a certified inspection or compliance assessment.</p></section><aside className="scan-side"><div className="panel side-info"><div className="side-info-icon blue"><ShieldCheck size={18}/></div><h3>Observation checklist</h3><p>Use this checklist alongside your standard food-safety procedures.</p>{['Handwashing facilities available','Raw and ready-to-eat foods separated','Food-contact surfaces cleaned','Food stored at appropriate temperatures','Waste handled and removed safely'].map((t,i)=><label className="check-row" key={t}><input type="checkbox"/><span>{t}</span></label>)}</div><div className="safety-note"><ShieldCheck size={18}/><div><b>Human review matters</b><p>Camera views can miss important details. Use your local food-safety rules and trained inspectors for compliance.</p></div></div></aside></div></div>;
}

function Cooking() {
  const [query, setQuery] = useState(''), [selected, setSelected] = useState(null), [saved, setSaved] = useState([]);
  const shown = recipes.filter(r => `${r.title} ${r.desc} ${r.tag} ${r.ingredients.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="page-content inner-page"><div className="welcome-row"><div><div className="date-chip"><span className="live-dot"/> YOUR PERSONAL SOUS-CHEF</div><h1>Cooking assistant <span className="heading-spark">✳</span></h1><p className="page-subtitle">Good food starts with what you already have.</p></div></div><div className="cook-hero"><div><span className="hero-kicker"><Sparkles size={14}/> A FRESH IDEA</span><h2>What's in your<br/><em>fridge today?</em></h2><p>Explore flexible recipes and turn everyday ingredients into something delicious.</p><div className="cook-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search ingredients or recipes..."/></div></div><div className="cook-hero-art">🥕<span>🥦</span><b>🍋</b><i>🍅</i></div></div><SectionHeading eyebrow="CURATED FOR YOUR KITCHEN" title="Recipes to try" action={`${shown.length} recipes`}/><div className="recipe-grid">{shown.map((r,i)=><article className="recipe-card" key={r.title}><div className={`recipe-art recipe-${i%3}`}><span>{r.emoji}</span><button className={`save-recipe ${saved.includes(r.title)?'saved':''}`} onClick={()=>setSaved(old=>old.includes(r.title)?old.filter(x=>x!==r.title):[...old,r.title])} aria-label={`Save ${r.title}`}>{saved.includes(r.title)?<Check size={17}/>:<Plus size={17}/>}</button><span className="recipe-time"><Clock3 size={13}/>{r.time}</span></div><div className="recipe-copy"><span className="recipe-tag">{r.tag}</span><h3>{r.title}</h3><p>{r.desc}</p><button className="text-button" onClick={()=>setSelected(r)}>View recipe <ArrowRight size={14}/></button></div></article>)}</div>{shown.length===0&&<div className="panel empty-state">No recipes found. Try searching for pasta, lemon, greens or chickpeas.</div>}{selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="recipe-modal" onClick={e=>e.stopPropagation()}><button className="icon-button modal-close" onClick={()=>setSelected(null)} aria-label="Close recipe"><X size={18}/></button><div className="modal-emoji">{selected.emoji}</div><span className="recipe-tag">{selected.tag} · {selected.time}</span><h2>{selected.title}</h2><p>{selected.desc}</p><h3>Ingredients to gather</h3><ul>{selected.ingredients.map(i=><li key={i}><Check size={15}/>{i}</li>)}</ul><div className="demo-callout"><BookOpen size={17}/><div><b>Cooking tip</b><p>Adjust portions and seasonings to your taste. Check ingredient labels for allergens.</p></div></div><button className="primary-button full-button" onClick={()=>setSelected(null)}>Got it</button></div></div>}</div>;
}

function Nutrition() {
  const [goal, setGoal] = useState('Balanced'), [diet, setDiet] = useState('No preference'), [water, setWater] = useState(3), [saved, setSaved] = useState(false);
  return <div className="page-content inner-page"><div className="welcome-row"><div><div className="date-chip"><span className="live-dot"/> YOUR PERSONAL FOOD PLAN</div><h1>Nutrition planner <span className="heading-spark">✳</span></h1><p className="page-subtitle">Build a flexible plan around your preferences, not the other way around.</p></div></div><div className="nutrition-layout"><section className="panel plan-panel"><div className="panel-top"><div><span className="step-label">YOUR PREFERENCES</span><h2>Make it yours</h2><p>Choose the focus that feels right for you.</p></div><div className="scan-icon green"><Apple size={21}/></div></div><label className="form-label" htmlFor="goal">YOUR DAILY FOCUS</label><div className="goal-options">{['Balanced','More protein','Plant forward','Simple & quick'].map(g=><button key={g} className={`goal-option ${goal===g?'selected':''}`} onClick={()=>{setGoal(g);setSaved(false)}}>{g}{goal===g&&<Check size={15}/>}</button>)}</div><label className="form-label" htmlFor="diet">DIETARY PREFERENCE</label><select id="diet" className="select-input" value={diet} onChange={e=>{setDiet(e.target.value);setSaved(false)}}><option>No preference</option><option>Vegetarian</option><option>Vegan</option><option>Pescatarian</option><option>Dairy-free</option><option>Gluten-free</option></select><label className="form-label">WATER GOAL</label><div className="water-adjust"><button className="water-control" onClick={()=>{setWater(Math.max(1,water-1));setSaved(false)}} aria-label="Decrease water goal">−</button><div><Droplets size={20}/><strong>{water * 0.5} L</strong><span>{water} glasses · 250 ml each</span></div><button className="water-control" onClick={()=>{setWater(Math.min(12,water+1));setSaved(false)}} aria-label="Increase water goal">+</button></div><button className="primary-button full-button" onClick={()=>setSaved(true)}><Check size={16}/>{saved?'Preferences saved':'Save my preferences'}</button>{saved&&<div className="success-message"><Check size={15}/> Your demo preferences have been saved for this session.</div>}<p className="disclaimer"><CircleHelp size={14}/> General wellness guidance only. Needs vary by person; consult a qualified professional for medical nutrition advice.</p></section><aside className="nutrition-side"><div className="panel plan-summary"><span className="eyebrow">YOUR PLAN PREVIEW</span><h2>A day that fits you.</h2><p>Based on your current demo preferences.</p><div className="summary-row"><span className="summary-icon peach">☀️</span><div><b>Breakfast</b><span>{goal==='More protein'?'Protein-rich yogurt bowl':'Avocado toast & fruit'}</span></div></div><div className="summary-row"><span className="summary-icon mint">🥗</span><div><b>Lunch</b><span>{diet==='Vegan'?'Chickpea and quinoa bowl':'Rainbow grain bowl'}</span></div></div><div className="summary-row"><span className="summary-icon lavender">🌙</span><div><b>Dinner</b><span>{diet==='Vegetarian'||diet==='Vegan'?'Roasted vegetable plate':'Lemon herb chicken or tofu'}</span></div></div><div className="summary-note"><Sparkles size={15}/><span>This is a sample plan, not a personalized medical diet.</span></div></div><div className="panel balanced-tip"><div className="tip-icon"><Leaf size={17}/></div><h3>Think in patterns, not perfection.</h3><p>Variety, consistency and meals you enjoy can all support a sustainable routine.</p></div></aside></div></div>;
}

function Settings() {
  const [units, setUnits] = useState('Metric'), [notifications, setNotifications] = useState(true), [personalization, setPersonalization] = useState(true), [saved, setSaved] = useState(false);
  return <div className="page-content inner-page"><div className="welcome-row"><div><div className="date-chip"><span className="live-dot"/> YOUR WORKSPACE</div><h1>Settings <span className="heading-spark">✳</span></h1><p className="page-subtitle">Manage your demo preferences and how FoodVerse supports you.</p></div></div><section className="panel settings-panel"><div className="settings-section"><div><h3>Measurement units</h3><p>Choose how quantities and measurements are displayed.</p></div><div className="segmented">{['Metric','Imperial'].map(u=><button key={u} className={units===u?'active':''} onClick={()=>{setUnits(u);setSaved(false)}}>{u}</button>)}</div></div><div className="settings-section"><div><h3>Daily reminders</h3><p>Get gentle nudges to check in with your food log.</p></div><button className={`toggle ${notifications?'on':''}`} onClick={()=>{setNotifications(!notifications);setSaved(false)}} aria-label="Toggle daily reminders"><span/></button></div><div className="settings-section"><div><h3>Personalized suggestions</h3><p>Use your selected food preferences to tailor demo recommendations.</p></div><button className={`toggle ${personalization?'on':''}`} onClick={()=>{setPersonalization(!personalization);setSaved(false)}} aria-label="Toggle personalized suggestions"><span/></button></div><div className="settings-actions"><button className="primary-button" onClick={()=>setSaved(true)}><Check size={16}/>{saved?'Settings saved':'Save settings'}</button>{saved&&<span className="success-inline">Saved for this session.</span>}</div></section><div className="safety-note settings-note"><ShieldCheck size={18}/><div><b>Privacy & transparency</b><p>This demo runs in your browser and does not upload your selected media to an AI service. A production version should document data retention, consent and model providers clearly.</p></div></div></div>;
}

function App() {
  const [active, setActive] = useState('overview'), [search, setSearch] = useState(''), [mobileOpen, setMobileOpen] = useState(false), [notice, setNotice] = useState(false);
  const content = useMemo(() => {
    switch(active) {
      case 'food-scan': return <FoodScan/>;
      case 'freshness': return <Freshness/>;
      case 'hygiene': return <Hygiene/>;
      case 'cook': return <Cooking/>;
      case 'nutrition': return <Nutrition/>;
      case 'settings': return <Settings/>;
      default: return <Overview setActive={setActive} search={search}/>;
    }
  }, [active, search]);
  return <div className="app-shell"><Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/><main className="main-area"><Header active={active} search={search} setSearch={setSearch} setMobileOpen={setMobileOpen} onNotifications={()=>setNotice(!notice)}/>{notice&&<div className="notification-popover"><div className="notification-pop-head"><b>Notifications</b><button className="icon-button" onClick={()=>setNotice(false)} aria-label="Close notifications"><X size={16}/></button></div><div className="notification-content"><span className="notification-icon"><Sparkles size={16}/></span><div><b>Your daily insights are ready</b><p>Check out your nutrition snapshot and today's suggestion.</p><small>Just now · Demo notification</small></div></div><button className="text-button" onClick={()=>{setNotice(false);setActive('nutrition')}}>View insights <ArrowRight size={14}/></button></div>}<div className="main-scroll">{content}<footer className="app-footer"><Brand/><span>Thoughtful food decisions, powered by intelligence.</span><span className="footer-right">FoodVerse AI <i/> Demo experience</span></footer></div></main></div>;
}

export default App;