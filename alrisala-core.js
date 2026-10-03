(function(){
'use strict';
const KEY='alrisalaLang', ROLE='user_role';
const dict={
'الرئيسية':'Accueil','دخول':'Connexion','تسجيل':'Inscription','تسجيل الدخول':'Connexion','تواصل معنا':'Contactez-nous','الإعلانات والبلاغات':'Annonces et avis','البرامج التعليمية':'Programmes éducatifs','أقسام المؤسسة':'Cycles scolaires','مؤسسة الرسالة للتعليم الخصوصي':'Groupe Scolaire Al Risala','مؤسسة الرسالة':'Groupe Scolaire Al Risala','الإدارة':'Administration','الأستاذ':'Enseignant','الأساتذة':'Enseignants','ولي الأمر':'Parent','أولياء الأمور':'Parents','التلميذ':'Élève','التلاميذ':'Élèves','حفظ':'Enregistrer','بحث':'Rechercher','إغلاق':'Fermer','عودة':'Retour','إرسال':'Envoyer','عرض':'Afficher','الجدول الدراسي':'Emploi du temps','الحضور والغياب':'Présence et absences','النقط':'Notes','الإشعارات':'Notifications','المعدل العام':'Moyenne générale','المستوى':'Niveau','القسم':'Classe','المادة':'Matière','التاريخ':'Date','الاسم الكامل':'Nom complet','الحالة':'Statut','الرسائل':'Messages','المالية':'Finance'};
const routes={
 index:'index.html',login:'login.html',register:'register.html',programs:'programs.html',announcements:'announcements.html',contact:'contact.html',admin:'admin.html',teacher:'teacher.html',parent:'parent.html',student:'student.html'
};
function lang(){return localStorage.getItem(KEY)==='fr'?'fr':'ar'}
function apply(langValue){
 const l=langValue==='fr'?'fr':'ar'; localStorage.setItem(KEY,l);
 document.documentElement.lang=l; document.documentElement.dir=l==='fr'?'ltr':'rtl';
 document.body&&document.body.setAttribute('data-language',l);
 document.querySelectorAll('[data-ar][data-fr]').forEach(el=>{el.textContent=l==='fr'?el.dataset.fr:el.dataset.ar});
 document.querySelectorAll('[data-ar-placeholder][data-fr-placeholder]').forEach(el=>el.placeholder=l==='fr'?el.dataset.frPlaceholder:el.dataset.arPlaceholder);
 document.querySelectorAll('[data-ar-title][data-fr-title]').forEach(el=>el.title=l==='fr'?el.dataset.frTitle:el.dataset.arTitle);
 document.querySelectorAll('title[data-ar][data-fr]').forEach(el=>el.textContent=l==='fr'?el.dataset.fr:el.dataset.ar);
 const btn=document.getElementById('alr-lang-switch'); if(btn){btn.textContent=l==='fr'?'العربية':'Français';btn.setAttribute('aria-label',l==='fr'?'Passer à l’arabe':'Passer au français')}
 const legacy=document.getElementById('langToggleBtn'); if(legacy) legacy.textContent=l==='fr'?'العربية':'FR / العربية';
 document.querySelectorAll('[data-lang-ar][data-lang-fr]').forEach(el=>el.textContent=l==='fr'?el.dataset.langFr:el.dataset.langAr);
 syncLinks();
}
function syncLinks(){
 document.querySelectorAll('a[href]').forEach(a=>{
  const href=a.getAttribute('href'); if(!href||href.startsWith('#')||href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('tel:')) return;
  a.dataset.alrRoute=a.getAttribute('href');
 });
 document.querySelectorAll('a[data-route]').forEach(a=>{const r=a.dataset.route; if(r&&routes[r]) a.href=routes[r]});
 const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 document.querySelectorAll('a[href]').forEach(a=>{const h=(a.getAttribute('href')||'').split('?')[0].split('#')[0].toLowerCase();a.classList.toggle('alr-current',h===page)});
}
function toggle(){apply(lang()==='fr'?'ar':'fr')}
function addUI(){
 if(document.getElementById('alr-lang-switch')) return;
 const b=document.createElement('button'); b.id='alr-lang-switch'; b.type='button'; b.textContent=lang()==='fr'?'العربية':'Français';
 b.style.cssText='position:fixed;bottom:18px;left:18px;z-index:99999;border:1px solid rgba(7,59,107,.14);background:rgba(255,255,255,.96);color:#073b6b;padding:9px 13px;border-radius:14px;font:800 12px Cairo,sans-serif;box-shadow:0 10px 30px rgba(7,59,107,.15);cursor:pointer;backdrop-filter:blur(12px)';
 b.onclick=toggle; document.body.appendChild(b);
}
function toast(msg,type){let x=document.getElementById('alr-toast');if(!x){x=document.createElement('div');x.id='alr-toast';x.style.cssText='position:fixed;top:82px;right:18px;z-index:99998;max-width:min(420px,calc(100vw - 36px));padding:13px 16px;border-radius:14px;background:#10243b;color:#fff;font:700 13px Cairo,sans-serif;box-shadow:0 18px 45px rgba(7,59,107,.22);transform:translateY(-12px);opacity:0;transition:.35s cubic-bezier(.22,1,.36,1)';document.body.appendChild(x)}x.textContent=msg;x.style.opacity='1';x.style.transform='translateY(0)';clearTimeout(x._t);x._t=setTimeout(()=>{x.style.opacity='0';x.style.transform='translateY(-12px)'},2800)}
function enhance(){
 const s=document.createElement('style');s.id='alr-core-style';s.textContent=`body{animation:alrIn .45s ease both}.alr-current{font-weight:900!important}.alr-focus{outline:3px solid rgba(14,165,233,.22);outline-offset:3px}@keyframes alrIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){body{animation:none!important}}`;document.head.appendChild(s);
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a&&!a.target&&a.getAttribute('href')&&!a.getAttribute('href').startsWith('#')) localStorage.setItem(KEY,lang())});
}
window.AlRisala={applyLanguage:apply,toggleLanguage:toggle,toast,language:lang,role:()=>localStorage.getItem(ROLE)||null,routes};
window.toggleLanguage=toggle;
document.addEventListener('DOMContentLoaded',()=>{enhance();apply(localStorage.getItem(KEY)||document.documentElement.lang||'ar');addUI();});
})();
