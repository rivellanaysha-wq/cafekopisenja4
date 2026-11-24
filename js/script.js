'use strict';
/* ====== DATA (mudah diubah) ====== */
const WA='6285784960252'; // ganti dengan nomor WhatsApp asli
const QRIS_IMG='image/qris.jpeg'; // ganti jika nama file gambar QRIS berbeda
const MAPS='https://www.google.com/maps/search/?api=1&query=Jalan+Diponegoro+Madiun';
const HOURS=[ // 0=Minggu ... 6=Sabtu, format 24 jam
 {d:'Minggu',o:7,c:24},{d:'Senin',o:9,c:22},{d:'Selasa',o:9,c:22},{d:'Rabu',o:9,c:22},{d:'Kamis',o:9,c:22},{d:'Jumat',o:9,c:23},{d:'Sabtu',o:7,c:24}];
const IMG={hero:'image/barr.png',cafe:'image/hadapjalan.png',bar:'image/dpnbar.png',int:'image/dpnbar3.png',work:'image/dpnbar2.png',cup:'1495474472287-4d71bcdd2085',out:'image/dpnn.png',beans:'image/hadapjalan.png',cozy:'image/mam.png',cta:'image/hadapjalan.png'};
const U=(src,w=1200)=>{
 if(!src)return '';
 if(src.startsWith('http')||src.startsWith('image/')||src.startsWith('./')||src.startsWith('../'))return src;
 return `https://images.unsplash.com/photo-${src}?auto=format&fit=crop&w=${w}&q=75`;
};
const MENU=[
 {id:'c1',cat:'Coffee',name:'Espresso',desc:'Kopi pekat dengan cita rasa kuat, aroma khas, dan sentuhan pahit yang nikmat.',price:22000,img:'image/espreco.png'},
 {id:'c2',cat:'Coffee',name:'Caffe Latte',desc:'Perpaduan espresso dan susu creamy dengan rasa lembut serta sedikit sentuhan manis.',price:25000,img:'image/caffe.png'},
 {id:'c3',cat:'Coffee',name:'Americano',desc:'Espresso yang dipadukan dengan air, menghasilkan kopi hitam ringan dengan cita rasa khas.',price:20000,img:'image/amer.png'},
 {id:'n1',cat:'Non-Coffee',name:'Chocolate Hazelnut',desc:'Perpaduan cokelat kaya rasa dengan aroma hazelnut yang harum dan nikmat.',price:25000,img:'image/chocohzlnt.png'},
 {id:'n2',cat:'Non-Coffee',name:'Matcha Latte',desc:'Matcha pilihan dengan susu creamy, menghadirkan rasa khas yang lembut dan sedikit earthy.',price:25000,img:'image/mtcha.png'},
 {id:'n3',cat:'Non-Coffee',name:'Red Velvet',desc:'Perpaduan rasa creamy dan manis khas redvelvet yang lembut dan nikmat.',price:25000,img:'image/redvelvet.png'},
 {id:'s1',cat:'Signature',name:'Kopi Senja',desc:'Racikan kopi special dengan perpaduan rasa yang lembut dan manis.',price:28000,img:'image/kopsen.png'},
 {id:'s2',cat:'Signature',name:'Sea Salt Caramel Latte',desc:'Perpaduan espresso, susu creamy, caramel manis dan sentuhan sea salt yang gurih.',price:28000,img:'image/sisalt.png'},
 {id:'t1',cat:'Tea',name:'Jasmine Tea',desc:'Teh melati dengan aroma bunga yang harum dan rasa ringan menyegarkan.',price:15000,img:'image/jasmin.png'},
 {id:'t2',cat:'Tea',name:'Lemon Tea',desc:'Perpaduan teh pilihan dan lemon segar dengan cita rasa manis serta asam yang menyegarkan.',price:15000,img:'image/lemon.png'},
 {id:'p1',cat:'Croissant',name:'Butter Croissant',desc:'Croissant renyah diluar lembut di dalam, dan aroma butter yang menggugah selera.',price:20000,img:'image/buttercroissant.png'},
 {id:'p2',cat:'Croissant',name:'Mix Berry Croissant',desc:'Croissant renyah berisi perpaduan isi buah berry dengan sensasi manis dan sedikit asam yang segar.',price:25000,img:'image/mixberry.png'},
 {id:'p3',cat:'Croissant',name:'Pistachio Croissant',desc:'Croissant berlapis renyah dengan isian pistachio yang creamy, gurih, dan kaya rasa.',price:25000,img:'image/pistachio.png'}];
const FAQS=[
 ['Apakah tersedia WiFi gratis?','Ya, WiFi cepat gratis untuk semua pengunjung. Tanyakan password ke barista kami.'],
 ['Apakah cafe cocok untuk WFC?','Sangat cocok. Banyak colokan, meja lebar, pencahayaan nyaman, dan suasana tenang di jam kerja.'],
 ['Apakah bisa reservasi tempat?','Bisa. Hubungi kami lewat WhatsApp minimal sehari sebelumnya, sebutkan jumlah orang dan jam kedatangan.'],
 ['Area apa saja yang tersedia?','Indoor ber-AC, semi-outdoor, dan teras sore untuk menikmati senja.'],
 ['Apakah tersedia smoking area?','Ada, di area outdoor terpisah sehingga area indoor tetap bebas asap.'],
 ['Apakah parkir gratis?','Ya, parkir motor dan mobil tersedia gratis di depan dan samping cafe.'],
 ['Bagaimana cara menghubungi Kopi Senja?','Lewat WhatsApp 085784960252, Instagram @kopisenja4_, atau langsung datang ke Jalan Diponegoro, Madiun.']];
const REVIEWS=[
 {n:'Anindya',r:5,t:'Tempat favorit WFC di Madiun. Latte-nya mantap, colokan banyak, dan sorenya cantik sekali.'},
 {n:'Nayca',r:5,t:'Menunya ENAKK ENAKKKK!!!!!!.'},
 {n:'Reza',r:5,t:'Croissant-nya renyah banget. Suasananya hangat, cocok buat ngobrol lama.'},
 {n:'Dewi',r:4,t:'Interiornya estetik dan tenang. Kopi Senja signature wajib dicoba.'},
 {n:'Bagas',r:5,t:'Meeting kecil di sini nyaman. Pelayanan ramah dan cepat.'},
 {n:'Salsa',r:5,t:'Teras saat golden hour juara. Pasti balik lagi.'}];
/* ====== HELPERS ====== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rp=n=>'Rp '+n.toLocaleString('id-ID');
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const find=id=>MENU.find(m=>m.id===id);
const page=document.body.dataset.page;
/* ====== LAYOUT ====== */
const NAV=[['index','Beranda'],['about','Tentang'],['menu','Menu'],['review','Review'],['hours','Jam Buka'],['faq','FAQ'],['location','Lokasi']];
const lightPages=['about','menu','order','review','hours','faq','location'];
function layout(){
 const m=$('main'),light=lightPages.includes(page);
 document.body.insertAdjacentHTML('afterbegin',`<div id="loader"><span>Kopi Senja</span></div>
 <header class="nav ${light?'light':''}" id="nav"><div class="wrap"><a class="logo" href="index.html" aria-label="Kopi Senja"><i></i>KOPI SENJA</a>
 <ul class="links" id="links">${NAV.map(([p,l])=>`<li><a href="${p}.html" class="${p===page?'active':''}">${l}</a></li>`).join('')}</ul>
 <div class="right"><a class="cart" href="order.html" aria-label="Keranjang pesanan">&#128717;<span>Pesan</span><b id="count">0</b></a><button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span></button></div></div></header>`);
 m.insertAdjacentHTML('afterend',`<footer><div class="wrap"><div class="fgrid"><div><a class="logo" href="index.html"><i></i>KOPI SENJA</a><p class="big">Kopi hangat,<br><em>sore yang pelan.</em></p><p style="opacity:.7;max-width:24rem">Cafe cozy untuk ngopi, WFC, dan berkumpul di Madiun.</p></div>
 <div><h4>Jelajahi</h4><ul>${NAV.map(([p,l])=>`<li><a href="${p}.html">${l}</a></li>`).join('')}</ul></div>
 <div><h4>Kunjungi</h4><ul><li>Jalan Diponegoro<br>Madiun, Jawa Timur</li><li>Senin–Kamis: 09.00 – 22.00 WIB<br>Jumat: 09.00 – 23.00 WIB<br>Sabtu–Minggu: 07.00 – 00.00 WIB</li></ul></div>
 <div><h4>Terhubung</h4><ul><li><a href="https://instagram.com/kopisenja4_" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="${MAPS}" target="_blank" rel="noopener">Google Maps</a></li></ul></div></div>
 <div class="copy"><span>© ${new Date().getFullYear()} Kopi Senja. Semua hak dilindungi.</span><span>Dibuat dengan secangkir kopi.</span></div></div></footer>
 <div class="modal" id="modal" role="dialog" aria-modal="true"><div class="box" id="box"></div></div><div id="toast" role="status"></div>`);
 $$('[data-i]').forEach(i=>{i.src=U(IMG[i.dataset.i]||i.dataset.i,+i.dataset.w||1200);i.loading=i.closest('.hero')?'eager':'lazy';});
 $$('[data-bg]').forEach(i=>i.style.background=`url(${U(IMG[i.dataset.bg],1800)}) center/cover`);
 $('#burger').onclick=e=>{const o=$('#nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
 const sc=()=>$('#nav').classList.toggle('scrolled',scrollY>40);sc();addEventListener('scroll',sc,{passive:true});
 $$('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||a.target)return;e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,350)}));
 addEventListener('load',()=>setTimeout(()=>{$('#loader').classList.add('hide');document.body.classList.add('ready')},500));
 setTimeout(()=>{$('#loader').classList.add('hide');document.body.classList.add('ready')},2500);
 addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});
}
/* ====== UI ====== */
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2400)}
function modal(html){$('#box').innerHTML=`<button class="x" aria-label="Tutup">✕</button>${html}`;$('#modal').classList.add('on');$('#box .x').onclick=closeModal;$('#box .x').focus()}
function closeModal(){$('#modal').classList.remove('on')}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});$$('.rv').forEach(e=>io.observe(e))}
function parallax(){const els=$$('.hero .bg');if(!els.length||matchMedia('(prefers-reduced-motion:reduce)').matches)return;addEventListener('scroll',()=>{if(scrollY<innerHeight)els.forEach(e=>e.style.transform=`translateY(${scrollY*.25}px)`)},{passive:true})}
function slider(){const s=$('.slider');if(!s)return;const t=$('.track',s),n=t.children.length;let i=0,tm;const go=k=>{i=(k+n)%n;t.style.transform=`translateX(-${i*100}%)`};
 $('.p',s).onclick=()=>{go(i-1);rs()};$('.n',s).onclick=()=>{go(i+1);rs()};const rs=()=>{clearInterval(tm);tm=setInterval(()=>go(i+1),5000)};rs()}
/* ====== CART ====== */
let cart=store.get('ks_cart',{});
const cartCount=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const cartTotal=()=>Object.entries(cart).reduce((a,[id,q])=>a+find(id).price*q,0);
function saveCart(){store.set('ks_cart',cart);$('#count').textContent=cartCount();if(page==='order')renderCart()}
function addCart(id,d=1){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];saveCart();if(d>0){toast(`${find(id).name} ditambahkan`);const c=$('.cart');c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump')}}
/* ====== MENU DETAIL ====== */
function detail(id){const m=find(id);modal(`<div class="ph2"><img src="${U(m.img,900)}" alt="${m.name}"></div><div class="bd"><small class="eyebrow">${m.cat}</small><h3>${m.name}</h3><p>${m.desc}</p><div style="display:flex;justify-content:space-between;align-items:center"><span class="price" style="font-size:1.4rem">${rp(m.price)}</span><button class="btn solid" id="dadd">Tambah ke Pesanan</button></div></div>`);$('#dadd').onclick=()=>{addCart(id);closeModal()}}
/* ====== POP-UP KONFIRMASI & QRIS ====== */
function openQrisModal({no,nama,tot,waUrl}){
 modal(`<div class="bd" style="text-align:center;padding:2.5rem 2rem">
  <small class="eyebrow">Pembayaran QRIS</small>
  <h3>Scan QRIS Kopi Senja</h3>
  <p style="margin:.5rem 0 1rem">Pesanan <b>${no}</b> · Atas nama <b>${nama}</b><br>Total bayar: <b class="price" style="font-size:1.25rem">${rp(tot)}</b></p>
  <div style="max-width:240px;margin:0 auto 1.2rem;padding:.9rem;background:#fff;border-radius:10px;border:1px solid #3b231622">
   <img src="${U(QRIS_IMG,600)}" alt="Kode QRIS Kopi Senja" style="width:100%;height:auto;aspect-ratio:1/1;object-fit:contain;background:#fff">
  </div>
  <p style="font-size:.85rem;opacity:.75;margin:0 0 1.4rem">Setelah scan &amp; bayar, klik tombol di bawah untuk konfirmasi pesanan ke WhatsApp.</p>
  <div class="btns" style="justify-content:center;margin-top:0">
   <a class="btn solid" href="${waUrl}" target="_blank" rel="noopener">Konfirmasi ke WhatsApp</a>
   <button class="btn" type="button" id="backConfirm">Kembali</button>
  </div>
 </div>`);
 $('#backConfirm').onclick=()=>openConfirmModal({no,nama,pay:'QRIS',tot,waUrl});
}
function openConfirmModal({no,nama,pay,tot,waUrl}){
 const isQris=pay==='QRIS';
 modal(`<div class="bd" style="text-align:center;padding:2.8rem 2rem">
  <div style="font-size:2.8rem">☕</div>
  <h3>Konfirmasi Pesanan</h3>
  <p>Terima kasih, <b>${nama}</b>. Pesanan <b>${no}</b> sebesar <b>${rp(tot)}</b> sudah tercatat dengan metode pembayaran <b>${pay}</b>.${isQris?' Klik tombol di bawah untuk memunculkan QRIS pembayaran.':''}</p>
  <div class="btns" style="justify-content:center">
   ${isQris
    ?'<button class="btn solid" type="button" id="showQrisBtn">Tampilkan QRIS</button>'
    :`<a class="btn solid" href="${waUrl}" target="_blank" rel="noopener">Kirim ke WhatsApp</a>`}
   <a class="btn" href="menu.html">Lihat Menu</a>
  </div>
 </div>`);
 const qbtn=$('#showQrisBtn');
 if(qbtn)qbtn.onclick=()=>openQrisModal({no,nama,tot,waUrl});
}
/* ====== PAGES ====== */
const init={
 index(){const f=$('#favs');f.innerHTML=['s1','c2','p1','n2'].map(id=>{const m=find(id);return `<article class="fav rv" data-id="${id}"><div class="zoom"><img src="${U(m.img,700)}" alt="${m.name}" loading="lazy"></div><h3>${m.name}</h3><p>${m.desc}</p><span class="price">${rp(m.price)}</span></article>`}).join('');
  $$('.fav',f).forEach(e=>e.onclick=()=>detail(e.dataset.id));},
 menu(){const cats=['Semua',...new Set(MENU.map(m=>m.cat))],tb=$('#tabs'),l=$('#mlist');
  tb.innerHTML=cats.map((c,i)=>`<button class="tab ${i?'':'on'}" data-c="${c}">${c}</button>`).join('');
  const draw=c=>{l.innerHTML=MENU.filter(m=>c==='Semua'||m.cat===c).map((m,i)=>`<article class="mitem" data-id="${m.id}" style="animation-delay:${i*.08}s"><div class="zoom"><img src="${U(m.img,900)}" alt="${m.name}" loading="lazy"></div><div><small>${m.cat}</small><div class="row"><h3>${m.name}</h3><span class="price">${rp(m.price)}</span></div><p>${m.desc}</p><button class="more">Lihat detail</button></div></article>`).join('');$$('.mitem',l).forEach(e=>e.onclick=()=>detail(e.dataset.id))};
  tb.onclick=e=>{const b=e.target.closest('.tab');if(!b)return;$$('.tab',tb).forEach(t=>t.classList.toggle('on',t===b));draw(b.dataset.c)};draw('Semua')},
 order(){$('#olist').innerHTML=MENU.map(m=>`<div class="orow"><img src="${U(m.img,300)}" alt="${m.name}" loading="lazy"><div><h3>${m.name}</h3><p>${m.cat}</p><span class="price">${rp(m.price)}</span></div><button class="addb" data-id="${m.id}">+ Tambah</button></div>`).join('');
  $('#olist').onclick=e=>{const b=e.target.closest('.addb');if(b)addCart(b.dataset.id)};
  $('#cart').onclick=e=>{const b=e.target.closest('[data-q]');if(b)addCart(b.dataset.id,+b.dataset.q)};
  $('#oform').onsubmit=e=>{e.preventDefault();if(!cartCount())return toast('Keranjang masih kosong');
   const f=new FormData(e.target),nama=f.get('name'),catatan=(f.get('note')||f.get('notes')||f.get('catatan')||'').trim(),pay=f.get('pay'),no='KS-'+Math.floor(1000+Math.random()*9000),tot=cartTotal();
   const items=Object.entries(cart).map(([id,q])=>{const m=find(id);return `- ${m.name} x${q} (${rp(m.price*q)})`}).join('\n');
   const pesan=`Halo Kopi Senja, saya mau konfirmasi pesanan *${no}*:\n\nNama: ${nama}\nPembayaran: ${pay}\n${catatan?`Catatan: ${catatan}\n`:''}\n*Detail Pesanan:*\n${items}\n\n*Total: ${rp(tot)}*`;
   const waUrl=`https://wa.me/${WA}?text=${encodeURIComponent(pesan)}`;
   openConfirmModal({no,nama,pay,tot,waUrl});
   cart={};saveCart();e.target.reset()};renderCart()},
 review(){const all=()=>[...store.get('ks_rev',[]),...REVIEWS],g=$('#rgrid'),st='★★★★★';
  const draw=()=>{g.innerHTML=all().map(r=>`<article class="rev rv in"><div class="stars" aria-label="${r.r} dari 5">${st.slice(0,r.r)}${'☆'.repeat(5-r.r)}</div><p>“${r.t}”</p><small>— ${r.n}</small></article>`).join('')};draw();
  let rate=0;const si=$('#starin');si.innerHTML=[1,2,3,4,5].map(n=>`<button type="button" data-n="${n}" aria-label="${n} bintang">★</button>`).join('');
  const paint=n=>$$('button',si).forEach(b=>b.classList.toggle('on',+b.dataset.n<=n));si.onclick=e=>{const b=e.target.closest('button');if(b){rate=+b.dataset.n;paint(rate)}};
  si.onmouseover=e=>{const b=e.target.closest('button');if(b)paint(+b.dataset.n)};si.onmouseleave=()=>paint(rate);
  $('#rform').onsubmit=e=>{e.preventDefault();if(!rate)return toast('Pilih rating bintang dulu');const f=new FormData(e.target);store.set('ks_rev',[{n:f.get('name'),r:rate,t:f.get('text')},...store.get('ks_rev',[])]);draw();
   modal(`<div class="bd" style="text-align:center;padding:3rem 2rem"><div class="stars" style="font-size:2rem">${st.slice(0,rate)}</div><h3>Terima kasih, ${f.get('name')}!</h3><p>Ulasanmu sudah kami terima dan tampil di halaman ini.</p><button class="btn solid" id="ok">Tutup</button></div>`);$('#ok').onclick=closeModal;e.target.reset();rate=0;paint(0)}},
 hours(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Jakarta',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
  const map={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
  const wd=parts.find(p=>p.type==='weekday')?.value;
  const hr=+(parts.find(p=>p.type==='hour')?.value||0);
  const mn=+(parts.find(p=>p.type==='minute')?.value||0);
  const d=wd in map?map[wd]:new Date().getDay(),h=hr+mn/60,t=HOURS[d],open=h>=t.o&&h<t.c,f=n=>String(n%24).padStart(2,'0')+'.00';
  $('#status').className='status '+(open?'open':'closed');$('#status').innerHTML=`<i></i>${open?`Sedang buka · tutup pukul ${f(t.c)} WIB`:`Sedang tutup · buka pukul ${f(t.o)} WIB`}`;
  $('#days').innerHTML=HOURS.map((x,i)=>`<div class="day rv ${i===d?'today':''}"><span>${x.d}</span><span>${f(x.o)} – ${f(x.c)} WIB</span></div>`).join('')},
 faq(){const l=$('#faqs');l.innerHTML=FAQS.map(([q,a])=>`<div class="faq"><button aria-expanded="false">${q}<i>+</i></button><div><p>${a}</p></div></div>`).join('');
  l.onclick=e=>{const b=e.target.closest('button');if(!b)return;const f=b.parentElement,o=f.classList.toggle('open');b.setAttribute('aria-expanded',o)}},
 location(){$('#wa').href=`https://wa.me/${WA}?text=${encodeURIComponent('Halo Kopi Senja, saya ingin bertanya...')}`;$$('.gm').forEach(a=>a.href=MAPS)}};
function renderCart(){const ids=Object.keys(cart),c=$('#cart');
 c.innerHTML=ids.length?ids.map(id=>{const m=find(id);return `<div class="crow"><span style="flex:1">${m.name}<br><small>${rp(m.price)}</small></span><div class="qty"><button data-q="-1" data-id="${id}" aria-label="Kurangi">−</button><b>${cart[id]}</b><button data-q="1" data-id="${id}" aria-label="Tambah">+</button></div><span>${rp(m.price*cart[id])}</span></div>`}).join(''):'<p class="empty">Belum ada pesanan. Pilih menu di sebelah kiri.</p>';
 $('#total').textContent=rp(cartTotal())}
/* ====== START ====== */
document.addEventListener('DOMContentLoaded',()=>{layout();$('#count').textContent=cartCount();init[page]&&init[page]();reveal();parallax();slider();
 $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()})});
