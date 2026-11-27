/* =========================================================
   HAIR PALACE — script.js
========================================================= */
var WHATSAPP = "27792989749"; // South Africa international format
var WA_DISPLAY = "079 298 9749";

function waLink(msg){
  var text = encodeURIComponent(msg || "Hi Hair Palace! I'd like to book an appointment.");
  return "https://wa.me/" + WHATSAPP + "?text=" + text;
}

var SERVICES = [
  { cat:"Braids", name:"Knotless Braids", items:[
    {label:"Short — Small", now:250, old:300},
    {label:"Short — Medium", now:200, old:250},
    {label:"Short — Large", now:150, old:200},
    {label:"Normal — Small", now:300, old:350},
    {label:"Normal — Medium", now:250, old:300},
    {label:"Normal — Large", now:200, old:250},
    {label:"Long — Small", now:400, old:450},
    {label:"Long — Medium", now:350, old:400},
    {label:"Long — Large", now:300, old:350}
  ]},
  { cat:"Braids", name:"Butterfly Locks", items:[
    {label:"Normal", now:400, old:450}
  ]},
  { cat:"Braids", name:"Twist", items:[
    {label:"Short", now:150, old:200},
    {label:"Medium", now:200, old:250},
    {label:"Long", now:250, old:300}
  ]},
  { cat:"Braids", name:"Lemonade Braids", items:[
    {label:"Small", now:250, old:300},
    {label:"Medium", now:200, old:250}
  ]},
  { cat:"Braids", name:"Straight Up / Back / Side", items:[
    {label:"Small", now:200, old:250},
    {label:"Medium", now:150, old:200},
    {label:"Large", now:100, old:150}
  ], note:"Add-ons: curls +R30 · messy curls +R50 · koroba rolls +R50"},
  { cat:"Braids", name:"Sweet and Sour", items:[
    {label:"Small", now:300, old:350},
    {label:"Medium", now:250, old:300}
  ]},
  { cat:"Installation", name:"Installation", items:[
    {label:"Basic", now:150, old:200},
    {label:"Style", now:200, old:250},
    {label:"Natural Pony", now:150, old:200},
    {label:"Frontal Ponytail (incl. relaxer)", now:200, old:250}
  ]},
  { cat:"Nails", name:"Acrylic Plain with Tips", items:[
    {label:"Short", now:70, old:120},
    {label:"Medium", now:100, old:150},
    {label:"Long", now:120, old:170}
  ]},
  { cat:"Nails", name:"Design Add-Ons", items:[
    {label:"2D Design", now:10, old:null, unit:"per finger"},
    {label:"3D Design", now:20, old:null, unit:"per finger"}
  ]},
  { cat:"Lashes & Brows", name:"Lashes & Brows", items:[
    {label:"Cluster — Normal", now:50, old:100},
    {label:"Cluster — Hybrid", now:100, old:150},
    {label:"Individuals — Normal", now:150, old:200},
    {label:"Individuals — Hybrid", now:200, old:250}
  ]}
];

var CATEGORIES = ["All","Braids","Installation","Nails","Lashes & Brows"];

var galleryImages = [
  {src:"images/braids.jpg", alt:"Box braids", label:"Box Braids"},
  {src:"images/natural-styling.jpg", alt:"Natural styling", label:"Natural Styles"},
  {src:"images/luxury-finish.jpg", alt:"Salon hair", label:"Luxury Finish", tall:true},
  {src:"images/salon-stylist.jpg", alt:"Hair Palace salon interior", label:"Our Salon"},
  {src:"images/acrylic-nails.jpg", alt:"Nails", label:"Acrylic Nails"},
  {src:"images/beauty-care.jpg", alt:"Beauty", label:"Glow & Care"}
];

function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

function renderFilters(){
  var wrap = document.getElementById('filters');
  if(!wrap) return;
  wrap.innerHTML = CATEGORIES.map(function(c,i){
    return '<button class="filter '+(i===0?'active':'')+'" data-cat="'+esc(c)+'">'+esc(c)+'</button>';
  }).join('');
  wrap.addEventListener('click', function(e){
    var btn = e.target.closest('.filter'); if(!btn) return;
    wrap.querySelectorAll('.filter').forEach(function(b){b.classList.remove('active');});
    btn.classList.add('active');
    renderServices(btn.getAttribute('data-cat'));
  });
}

function renderServices(cat){
  var grid = document.getElementById('servicesGrid');
  if(!grid) return;
  var list = (cat && cat!=="All") ? SERVICES.filter(function(s){return s.cat===cat;}) : SERVICES;
  grid.innerHTML = list.map(function(s){
    var rows = s.items.map(function(it){
      var oldHtml = it.old ? '<span class="old">R'+it.old+'</span>' : '';
      var unitHtml = it.unit ? ' <span style="color:var(--muted);font-size:.8rem">'+esc(it.unit)+'</span>' : '';
      return '<div class="price-row"><span>'+esc(it.label)+unitHtml+'</span>'+
             '<span><span class="now">R'+it.now+'</span>'+oldHtml+'</span></div>';
    }).join('');
    var note = s.note ? '<div class="note">'+esc(s.note)+'</div>' : '';
    return '<div class="service-card reveal in" data-cat="'+esc(s.cat)+'">'+
           '<div class="cat">'+esc(s.cat)+'</div>'+
           '<h3>'+esc(s.name)+'</h3>'+
           '<div style="height:6px"></div>'+rows+note+'</div>';
  }).join('');
}

function renderGallery(){
  var g = document.getElementById('galleryGrid');
  if(!g) return;
  g.innerHTML = galleryImages.map(function(img){
    return '<div class="gallery-item '+(img.tall?'tall':'')+'">'+
           '<img src="'+img.src+'" alt="'+esc(img.alt)+'" loading="lazy">'+
           '<div class="overlay"><span>'+esc(img.label)+'</span></div></div>';
  }).join('');
}

/* Nav */
var nav = document.getElementById('nav');
window.addEventListener('scroll', function(){
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

var burger = document.getElementById('burger');
var navLinks = document.getElementById('navLinks');
if(burger && navLinks){
  burger.addEventListener('click', function(){
    var open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.addEventListener('click', function(e){
    if(e.target.tagName === 'A'){
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open menu');
    }
  });
}

/* Reveal */
var observer = ('IntersectionObserver' in window)
  ? new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); observer.unobserve(en.target); }
      });
    }, {threshold:.12})
  : null;

function observeReveals(){
  var els = document.querySelectorAll('.reveal');
  if(observer){ els.forEach(function(el){ observer.observe(el); }); }
  else { els.forEach(function(el){ el.classList.add('in'); }); }
}

document.addEventListener('DOMContentLoaded', function(){
  renderFilters();
  renderServices();
  renderGallery();
  observeReveals();
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
});
