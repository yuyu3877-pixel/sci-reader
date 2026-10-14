(() => {
  const $ = id => document.getElementById(id);
  const WPM = 130; // 残り時間の目安に使う読書速度
  let article = null; // {title, emoji, grad, sections:[{en, ja?}]}
  let idx = 0;
  let shown = false;
  const jaCache = new Map();

  // ---------- views ----------
  function view(name) {
    for (const v of ["home", "reader", "finish"]) $(v).classList.toggle("hidden", v !== name);
    $("actions").classList.toggle("hidden", name !== "reader");
    if (name !== "reader") stopSpeech();
    if (name === "home") {
      $("progressLabel").innerHTML = "<b>Sci Reader</b>";
      $("barFill").style.width = "0";
    }
    window.scrollTo(0, 0);
  }

  // ---------- home ----------
  function renderHome() {
    $("articleList").innerHTML = ARTICLES.map((a, i) => `
      <button class="art" data-i="${i}" style="background:linear-gradient(135deg,${a.grad[0]},${a.grad[1]})">
        <span class="em">${a.emoji}</span>
        <span><div class="t">${a.title}</div><div class="j">${a.titleJa}</div>
        <div class="m">${a.sections.length} sections ・ 約${Math.max(1, Math.round(words(a.sections) / WPM))}分</div></span>
      </button>`).join("");
    $("siteList").innerHTML = SITES.map(s => `
      <a class="link" href="${s.url}" target="_blank" rel="noopener noreferrer">
        ${s.emoji} <b>${s.name}</b><small>${s.desc}</small></a>`).join("");
  }
  const words = secs => secs.reduce((n, s) => n + s.en.split(/\s+/).length, 0);

  $("articleList").addEventListener("click", e => {
    const b = e.target.closest(".art");
    if (b) start(ARTICLES[+b.dataset.i]);
  });

  // ---------- reader ----------
  function start(a) {
    article = a; idx = 0;
    view("reader");
    render();
  }

  function render() {
    const s = article.sections[idx];
    shown = false;
    stopSpeech();
    $("hero").style.background = `linear-gradient(135deg,${article.grad[0]},${article.grad[1]})`;
    $("hero").textContent = article.emoji;
    $("en").textContent = s.en;
    $("ja").classList.add("hidden");
    $("ja").textContent = "";
    $("trans").classList.remove("on");
    $("trans").innerHTML = "<span>👁</span>訳を見る";
    $("next").classList.remove("hl");
    $("prev").disabled = idx === 0;
    $("next").innerHTML = idx === article.sections.length - 1 ? "<span>🏁</span>読了" : "<span>▶</span>次へ";
    updateProgress();
    window.scrollTo(0, 0);
  }

  function updateProgress() {
    const total = article.sections.length;
    const remainWords = words(article.sections.slice(idx));
    const min = remainWords / WPM;
    const t = min < 0.75 ? "残り1分未満" : `残り約${Math.round(min)}分`;
    $("progressLabel").innerHTML = `<b>Section ${idx + 1} / ${total}</b>（${t}）`;
    $("barFill").style.width = ((idx + 1) / total * 100) + "%";
  }

  function go(d) {
    const n = idx + d;
    if (n < 0) return;
    if (n >= article.sections.length) {
      $("barFill").style.width = "100%";
      view("finish");
      return;
    }
    idx = n;
    render();
  }

  async function toggleTranslation() {
    if (shown) {
      shown = false;
      $("ja").classList.add("hidden");
      $("trans").classList.remove("on");
      $("trans").innerHTML = "<span>👁</span>訳を見る";
      $("next").classList.remove("hl");
      return;
    }
    shown = true;
    const s = article.sections[idx];
    $("trans").classList.add("on");
    $("trans").innerHTML = "<span>🙈</span>訳を隠す";
    $("ja").classList.remove("hidden");
    $("next").classList.add("hl");
    if (s.ja) { $("ja").textContent = s.ja; return; }
    $("ja").textContent = "翻訳中…";
    const myIdx = idx;
    const ja = await translate(s.en);
    if (idx === myIdx && shown) $("ja").textContent = ja;
  }

  // ---------- translation (MyMemory fallback) ----------
  async function translate(text) {
    if (jaCache.has(text)) return jaCache.get(text);
    try {
      const parts = chunk(text, 450);
      const out = [];
      for (const p of parts) {
        const r = await fetch("https://api.mymemory.translated.net/get?langpair=en|ja&q=" + encodeURIComponent(p));
        const j = await r.json();
        if (!j.responseData || !j.responseData.translatedText) throw new Error("no result");
        out.push(j.responseData.translatedText);
      }
      const res = out.join("");
      jaCache.set(text, res);
      return res;
    } catch {
      return "（翻訳を取得できませんでした。ネット接続を確認してください）";
    }
  }
  function chunk(text, max) {
    const sents = splitSentences(text), parts = [];
    let cur = "";
    for (const s of sents) {
      if ((cur + " " + s).length > max && cur) { parts.push(cur); cur = s; }
      else cur = cur ? cur + " " + s : s;
    }
    if (cur) parts.push(cur);
    return parts;
  }

  // ---------- text-to-speech ----------
  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices().filter(v => /^en[-_]US/i.test(v.lang));
    voice = vs.find(v => /Google US English|Samantha|Aria|Jenny|Natural/i.test(v.name)) || vs[0] || null;
  }
  if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }

  function stopSpeech() {
    if (synth) synth.cancel();
    setSpeaking(false);
  }
  function setSpeaking(on) {
    $("speak").classList.toggle("on", on);
    $("speak").innerHTML = on ? "<span>⏹</span>停止" : "<span>🔊</span>読み上げ";
  }
  function speak() {
    if (!synth) { alert("このブラウザは音声読み上げに対応していません。"); return; }
    if (synth.speaking) { stopSpeech(); return; }
    const u = new SpeechSynthesisUtterance(article.sections[idx].en);
    u.lang = "en-US";
    u.rate = 0.92;
    if (voice) u.voice = voice;
    u.onend = u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(u);
  }

  // ---------- custom text → cards ----------
  function splitSentences(text) {
    const t = text.replace(/\s+/g, " ").trim()
      .replace(/\b(Mr|Mrs|Ms|Dr|St|vs|etc|e\.g|i\.e|No|U\.S)\./g, m => m.replace(/\./g, "§"));
    const m = t.match(/[^.!?]+(?:[.!?]+["'”’)\]]*|$)/g) || [];
    return m.map(s => s.replace(/§/g, ".").trim()).filter(Boolean);
  }
  function makeSections(raw) {
    const out = [];
    const blocks = raw.split(/\n\s*\n|\r?\n/).map(b => b.trim()).filter(Boolean);
    for (const b of blocks) {
      const ss = splitSentences(b);
      let i = 0;
      while (i < ss.length) {
        const left = ss.length - i;
        let n = left <= 4 ? left : 3;
        if (left === 5) n = 3; // 3 + 2
        out.push({ en: ss.slice(i, i + n).join(" ") });
        i += n;
      }
    }
    return out;
  }
  // ---------- URL → text ----------
  function cleanText(md) {
    const body = md.includes("Markdown Content:") ? md.split("Markdown Content:").slice(1).join("") : md;
    return body.split(/\r?\n/).map(l => l
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[*_`>]+/g, "").trim())
      .filter(l => !/^#{1,6}\s/.test(l) && !/^[-+•]\s/.test(l) && l.split(/\s+/).length >= 8 && /[.!?]["'”’)]?$/.test(l))
      .join("\n");
  }
  async function fetchArticle(url) {
    try {
      const r = await fetch("https://r.jina.ai/" + url);
      if (r.ok) { const t = cleanText(await r.text()); if (t.length > 100) return t; }
    } catch {}
    try { // fallback: raw HTML via proxy, take <p> tags
      const r = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(url));
      const doc = new DOMParser().parseFromString(await r.text(), "text/html");
      const t = [...doc.querySelectorAll("p")].map(p => p.textContent.trim())
        .filter(x => x.split(/\s+/).length >= 8).join("\n");
      if (t.length > 100) return t;
    } catch {}
    return "";
  }

  $("startCustom").addEventListener("click", async () => {
    let raw = $("customText").value.trim();
    if (/^https?:\/\/\S+$/i.test(raw)) {
      const btn = $("startCustom");
      btn.disabled = true; btn.textContent = "記事を取得中…";
      raw = await fetchArticle(raw);
      btn.disabled = false; btn.textContent = "貼り付けて読み始める";
      if (!raw) { alert("記事の本文を取得できませんでした。本文をコピーして貼り付けてください。"); return; }
    }
    const secs = makeSections(raw);
    if (!secs.length) { alert("英文またはURLを貼り付けてください。"); return; }
    start({ title: "My Text", emoji: "📖", grad: ["#334155", "#6366f1"], sections: secs });
  });

  // ---------- events ----------
  $("prev").addEventListener("click", () => go(-1));
  $("next").addEventListener("click", () => go(1));
  $("speak").addEventListener("click", speak);
  $("trans").addEventListener("click", toggleTranslation);
  $("homeBtn").addEventListener("click", () => view("home"));
  $("finishHome").addEventListener("click", () => view("home"));
  $("againBtn").addEventListener("click", () => start(article));
  const openSites = () => $("drawer").classList.remove("hidden");
  $("sitesBtn").addEventListener("click", openSites);
  $("sitesBtn2").addEventListener("click", openSites);
  $("closeDrawer").addEventListener("click", () => $("drawer").classList.add("hidden"));
  $("drawer").addEventListener("click", e => { if (e.target === $("drawer")) $("drawer").classList.add("hidden"); });

  renderHome();
  view("home");
})();
