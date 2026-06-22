/* Limn site i18n. Add a language = add to LANGS + I18N. Privacy legal body is
   English-only (see privacy.html); these strings cover the landing + support +
   shared chrome. */
const LANGS = [
  { code:"en", name:"English" },
  { code:"tr", name:"Türkçe" },
];

const I18N = {
  en: {
    "nav.home":"Home", "nav.privacy":"Privacy", "nav.support":"Support",
    "hero.tag":"A calm puzzle of light and line.",
    "hero.sub":"Rotate the pipes, guide every color home, and find your flow across 250 hand-crafted levels.",
    "hero.cta":"Coming soon to the App Store",
    "feat.title":"A quiet place to unwind",
    "feat.lead":"Limn is a meditative puzzle about light, line, and color.",
    "f1.t":"250 levels, five worlds", "f1.b":"From Dawn to the Universe — each world with its own mood and original music.",
    "f2.t":"No timers, no rush", "f2.b":"A calm space to think. Play entirely at your own pace.",
    "f3.t":"Learn by playing", "f3.b":"New ideas arrive gently, one at a time, each with a quiet little lesson.",
    "f4.t":"One elegant solution", "f4.b":"Soft hand-crafted art, ambient music, and a single graceful path in every level.",
    "foot.rights":"All rights reserved.",
    "sup.title":"Support",
    "sup.intro":"Questions, feedback, or found a bug? We'd love to hear from you — we usually reply within a couple of days.",
    "sup.email":"Email us", "sup.faq":"Frequently asked",
    "faq.q1":"How do I remove ads?", "faq.a1":"Open the in-game Store and choose “Remove Ads.” It's a one-time purchase that removes banner and full-screen ads.",
    "faq.q2":"I bought something but don't see it", "faq.a2":"Open the Store and tap “Restore Purchases.” Make sure you're signed in with the same Apple ID used for the purchase.",
    "faq.q3":"How is my progress saved?", "faq.a3":"Your progress is stored locally on your device. Deleting the app removes it.",
    "priv.note":"This Privacy Policy is provided in English.",
    "priv.back":"← Back to home",
  },
  tr: {
    "nav.home":"Ana sayfa", "nav.privacy":"Gizlilik", "nav.support":"Destek",
    "hero.tag":"Işık ve çizginin dingin bulmacası.",
    "hero.sub":"Boruları çevir, her rengi yuvasına götür; elle tasarlanmış 250 bölümde akışını bul.",
    "hero.cta":"Yakında App Store'da",
    "feat.title":"Huzur bulacağın sakin bir yer",
    "feat.lead":"Limn; ışık, çizgi ve renk üzerine dingin bir bulmaca.",
    "f1.t":"250 bölüm, beş dünya", "f1.b":"Şafak'tan Evren'e — her dünyanın kendi atmosferi ve özgün müziği.",
    "f2.t":"Sayaç yok, acele yok", "f2.b":"Düşünmek için sakin bir alan. Tamamen kendi temponda oyna.",
    "f3.t":"Oynayarak öğren", "f3.b":"Yeni fikirler teker teker, her biri küçük ve sessiz bir dersle gelir.",
    "f4.t":"Tek zarif çözüm", "f4.b":"Yumuşak el işi görseller, atmosferik müzik ve her bölümde tek bir zarif yol.",
    "foot.rights":"Tüm hakları saklıdır.",
    "sup.title":"Destek",
    "sup.intro":"Soru, geri bildirim ya da bir hata mı buldun? Seni duymak isteriz — genelde birkaç gün içinde yanıtlıyoruz.",
    "sup.email":"Bize e-posta gönder", "sup.faq":"Sık sorulanlar",
    "faq.q1":"Reklamları nasıl kaldırırım?", "faq.a1":"Oyun içi Mağaza'yı aç ve “Reklamsız”ı seç. Banner ve tam ekran reklamları kaldıran tek seferlik bir satın alımdır.",
    "faq.q2":"Bir şey aldım ama görünmüyor", "faq.a2":"Mağaza'yı açıp “Satın Alımları Geri Yükle”ye dokun. Satın alımı yaptığın Apple Kimliği ile giriş yaptığından emin ol.",
    "faq.q3":"İlerlemem nasıl kaydediliyor?", "faq.a3":"İlerlemen cihazında yerel olarak saklanır. Uygulamayı silmek bunu kaldırır.",
    "priv.note":"Bu Gizlilik Politikası İngilizce olarak sunulmaktadır.",
    "priv.back":"← Ana sayfaya dön",
  },
};

function setLang(code){
  const d = I18N[code] || I18N.en;
  document.documentElement.lang = code;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    const v = (d[k] !== undefined) ? d[k] : I18N.en[k];
    if (v !== undefined) el.textContent = v;
  });
  const menu = document.querySelector(".langmenu");
  if (menu) menu.querySelectorAll("button").forEach(b=>b.classList.toggle("active", b.dataset.code===code));
  const cur = LANGS.find(l=>l.code===code);
  const lc = document.querySelector(".langcur");
  if (cur && lc) lc.textContent = cur.name;
  try { localStorage.setItem("limn_lang", code); } catch(e){}
}

function initLang(){
  const menu = document.querySelector(".langmenu");
  const btn = document.querySelector(".langbtn");
  if (menu){
    LANGS.forEach(l=>{
      const b = document.createElement("button");
      b.dataset.code = l.code;
      b.textContent = l.name;                       // textContent — no HTML injection
      b.addEventListener("click", ()=>{ setLang(l.code); menu.classList.remove("open"); });
      menu.appendChild(b);
    });
  }
  if (btn && menu) btn.addEventListener("click", e=>{ e.stopPropagation(); menu.classList.toggle("open"); });
  document.addEventListener("click", ()=>menu && menu.classList.remove("open"));
  let saved = "en";
  try { saved = localStorage.getItem("limn_lang") || (navigator.language||"en").slice(0,2); } catch(e){}
  if (!I18N[saved]) saved = "en";
  setLang(saved);
}
document.addEventListener("DOMContentLoaded", initLang);
