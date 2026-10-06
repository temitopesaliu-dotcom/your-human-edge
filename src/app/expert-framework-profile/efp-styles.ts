/**
 * Styles for the Expert Framework Profile pages. Rendered as a scoped inline
 * <style> block (the site convention for newer funnels) and every class is
 * prefixed efp- so nothing leaks into other funnels.
 */
export const EFP_CSS = `
.efp{--p:#fbfaff;--s:#fff;--ink:#221a2e;--mut:#6b6176;--ln:#e7e0f2;--v:#7c3aed;--vi:#5b21b6;--vs:#f1eafd;--band:#0f1b2d;--tl:#0f766e;--acc:#7c3aed;
  --serif:'Playfair Display',Georgia,serif;--sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  background:var(--p);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.6;min-height:100vh;
  padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){.efp{--p:#15111b;--s:#1e1827;--ink:#f2edf8;--mut:#a99db6;--ln:#332a3f;--v:#a78bfa;--vi:#c4b5fd;--vs:#2a2040}}
.efp *,.efp *::before,.efp *::after{box-sizing:border-box}
.efp a{color:inherit}
.efp :focus-visible{outline:2px solid var(--v);outline-offset:3px;border-radius:6px}
.efp-wrap{max-width:1080px;margin:0 auto;padding:0 20px}
.efp-nav{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--p) 90%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--ln)}
.efp-nav .efp-wrap{display:flex;justify-content:space-between;align-items:center;height:58px}
.efp-nav b{font-family:var(--serif);font-weight:600}
.efp-nav a{font-size:14px;color:var(--mut);text-decoration:none}
.efp-btn{display:inline-block;background:var(--v);color:#fff!important;border:0;border-radius:999px;padding:15px 30px;font-weight:600;font-size:16px;text-decoration:none;cursor:pointer;box-shadow:0 14px 30px -14px rgba(124,58,237,.7);font-family:var(--sans)}
.efp-btn:hover{background:var(--vi)}
.efp-btn.efp-big{padding:17px 38px;font-size:17px}
.efp-hero{text-align:center;padding:64px 0 36px}
.efp-pill{display:inline-block;font-size:13px;font-weight:500;color:var(--vi);background:var(--vs);border-radius:999px;padding:5px 14px;margin-bottom:22px}
.efp-hero h1{font-family:var(--serif);font-weight:600;font-size:clamp(32px,5.4vw,58px);line-height:1.08;margin:0 auto 22px;max-width:17ch}
.efp-hero h1 .efp-soft{color:var(--mut)}
.efp-hero h1 em{color:var(--v);font-style:italic}
.efp-lede{font-size:18px;color:var(--mut);max-width:52ch;margin:0 auto 28px}
.efp-facts{display:flex;justify-content:center;flex-wrap:wrap;margin:0 auto 30px}
.efp-facts div{padding:0 22px;border-left:1px solid var(--ln)}
.efp-facts div:first-child{border-left:0}
.efp-facts b{display:block;font-size:22px;font-weight:600}
.efp-facts span{font-size:13px;color:var(--mut)}
.efp-h2{font-family:var(--serif);font-weight:600;font-size:clamp(26px,3.4vw,36px);margin:0 0 8px;text-align:center}
.efp-sub{color:var(--mut);margin:0 auto 18px;max-width:56ch;text-align:center}
.efp-switch{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:18px 0 22px}
.efp-switch button{background:var(--s);border:1px solid var(--ln);border-radius:999px;padding:7px 14px;font-size:14px;cursor:pointer;color:var(--ink);font-family:var(--sans)}
.efp-switch button[aria-pressed="true"]{background:var(--ink);color:var(--p);border-color:var(--ink)}
.efp-switch a{background:var(--v);color:#fff;border-radius:999px;padding:7px 16px;font-size:14px;font-weight:600;text-decoration:none}
.efp-stagewrap{position:relative;max-width:900px;margin:0 auto 70px}
.efp-browser{border:1px solid var(--ln);border-radius:18px;overflow:hidden;background:var(--s);box-shadow:0 40px 80px -40px rgba(34,26,46,.5)}
.efp-chrome{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--ln);background:var(--p)}
.efp-dots{display:flex;gap:6px}.efp-dots i{width:10px;height:10px;border-radius:50%;background:var(--ln);display:block}
.efp-url{flex:1;background:var(--s);border:1px solid var(--ln);border-radius:8px;padding:5px 10px;font-size:13px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.efp-gapline{padding:26px 30px 6px}
.efp-gapline small{display:block;color:var(--mut);font-size:14px}
.efp-gapline h3,.efp-gap h2{font-family:var(--serif);font-size:clamp(22px,3vw,32px);font-weight:600;line-height:1.15;margin:4px 0 0;max-width:26ch}
.efp-site{background:#f7f7f4;color:#1c1917}
@media (prefers-color-scheme:dark){.efp-site{background:#1b1622;color:var(--ink)}}
.efp-snav{display:flex;justify-content:space-between;align-items:center;padding:14px 22px;font-size:14px;gap:12px}
.efp-snav b{font-family:var(--serif)}
.efp-chip{background:var(--acc);color:#fff;border-radius:999px;padding:6px 13px;font-size:12.5px;font-weight:600;white-space:nowrap}
.efp-chip.efp-ghost{background:transparent;color:inherit;border:1px solid currentColor}
.efp-shero{padding:14px 22px 26px}
.efp-kick{font-size:12.5px;color:var(--acc);font-weight:600;margin:0 0 6px}
.efp-shero h4,.efp-shero h1{font-family:var(--serif);font-size:clamp(22px,3vw,34px);line-height:1.15;margin:0 0 10px;max-width:24ch}
.efp-shero p{margin:0 0 14px;color:inherit;opacity:.75;font-size:15px;max-width:60ch}
.efp-ctas{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 12px}
.efp-priceline{font-size:13.5px;opacity:.8}
.efp-band{background:var(--band);color:#f3f0f8;display:grid;grid-template-columns:repeat(4,1fr);text-align:center;padding:16px 10px;gap:8px}
@media (max-width:600px){.efp-band{grid-template-columns:repeat(2,1fr)}}
.efp-band b{display:block;font-family:var(--serif);font-size:20px}
.efp-band span{font-size:12px;opacity:.75}
.efp-ssec{padding:22px}
.efp-ssec h2{font-family:var(--serif);font-size:22px;margin:0 0 4px}
.efp-ssec .efp-sh{margin:0 0 12px;opacity:.7;font-size:14px}
.efp-thoughts{display:grid;gap:10px;grid-template-columns:repeat(3,1fr)}
@media (max-width:760px){.efp-thoughts{grid-template-columns:1fr}}
.efp-thoughts q{display:block;background:rgba(127,110,150,.08);border-radius:12px;padding:12px 14px;font-size:14.5px}
.efp-tiers{display:grid;gap:10px;grid-template-columns:repeat(3,1fr)}
@media (max-width:760px){.efp-tiers{grid-template-columns:1fr}}
.efp-tier{border:1px solid rgba(127,110,150,.25);border-radius:14px;padding:14px;background:rgba(255,255,255,.5)}
@media (prefers-color-scheme:dark){.efp-tier{background:rgba(0,0,0,.15)}}
.efp-tier.efp-pick{border-color:var(--acc);box-shadow:0 0 0 1px var(--acc)}
.efp-tag{font-size:12px;opacity:.7}
.efp-tier h4{margin:4px 0;font-size:15.5px}
.efp-price{font-family:var(--serif);font-size:22px;font-weight:600}
.efp-unit{font-size:12.5px;opacity:.7}
.efp-tier p{font-size:13.5px;opacity:.8;margin:6px 0 0}
.efp-locked{margin:0 22px 22px;border:1px dashed rgba(127,110,150,.5);border-radius:14px;padding:16px 18px;background:repeating-linear-gradient(135deg,transparent 0 10px,rgba(127,110,150,.06) 10px 20px)}
.efp-locked p{margin:0 0 10px;font-weight:600}
.efp-locked ul{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0;padding:0}
.efp-locked li{font-size:13px;opacity:.75;border:1px solid rgba(127,110,150,.3);border-radius:999px;padding:4px 12px}
.efp-locked.efp-first{text-align:center}
.efp-locked.efp-first ul{justify-content:center}
.efp-locked.efp-first p{font-family:var(--serif);font-size:20px}
.efp-ctarow{display:flex;margin-top:14px}
.efp-ctarow.efp-center{justify-content:center}
.efp-ctarow.efp-right{justify-content:flex-end}
.efp-veil{position:absolute;left:1px;right:1px;bottom:1px;height:260px;border-radius:0 0 18px 18px;background:linear-gradient(180deg,transparent,var(--p) 62%);display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:0 20px 30px;text-align:center}
.efp-veil p{font-family:var(--serif);font-size:clamp(19px,2.4vw,23px);font-weight:600;margin:0 0 14px;max-width:30ch}
.efp-items{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:26px 0 70px}
@media (max-width:900px){.efp-items{grid-template-columns:repeat(2,1fr)}}
@media (max-width:520px){.efp-items{grid-template-columns:1fr}}
.efp-items div{background:var(--s);border:1px solid var(--ln);border-radius:16px;padding:18px}
.efp-items b{display:block;margin-bottom:4px}
.efp-items span{color:var(--mut);font-size:14px}
.efp-quizsec{background:var(--vs);padding:64px 0}
.efp-card{max-width:640px;margin:0 auto;background:var(--s);border:1px solid var(--ln);border-radius:22px;box-shadow:0 30px 60px -36px rgba(34,26,46,.45);overflow:hidden}
.efp-bar{display:flex;align-items:center;gap:12px;padding:16px 24px;border-bottom:1px solid var(--ln)}
.efp-track{flex:1;height:5px;background:var(--ln);border-radius:5px;overflow:hidden}
.efp-track i{display:block;height:100%;background:var(--v);transition:width .3s}
.efp-bar span{font-size:13px;color:var(--mut);white-space:nowrap}
.efp-body{padding:26px 24px}
.efp-qn{font-size:13px;color:var(--vi);font-weight:600;margin:0 0 6px}
.efp-body h3{font-family:var(--serif);font-size:24px;font-weight:600;line-height:1.2;margin:0 0 6px}
.efp-help{color:var(--mut);font-size:14px;margin:0 0 10px}
.efp-ex{background:var(--vs);border-radius:10px;padding:9px 12px;font-size:13.5px;margin:0 0 8px}
.efp-req{color:#dc2626;font-weight:600}
.efp-opts{display:grid;gap:8px}
.efp-opt,.efp-optn{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--ln);border-radius:12px;cursor:pointer;background:var(--s);text-align:left;width:100%;color:var(--ink);font-family:var(--sans);font-size:15px}
.efp-opt .efp-r{width:18px;height:18px;border-radius:50%;border:1.5px solid var(--ln);flex:none}
.efp-opt[aria-checked="true"]{border-color:var(--v);background:var(--vs)}
.efp-opt[aria-checked="true"] .efp-r{border:5px solid var(--v)}
.efp-optn{border-style:dashed;margin-top:10px;font-size:14.5px;color:var(--mut)}
.efp-optn .efp-r{width:18px;height:18px;border-radius:4px;border:1.5px solid var(--ln);flex:none}
.efp-optn[aria-checked="true"]{border:1px solid var(--v);background:var(--vs);color:var(--ink)}
.efp-optn[aria-checked="true"] .efp-r{background:var(--v);border-color:var(--v)}
.efp textarea,.efp input[type=text],.efp input[type=email]{width:100%;border:1px solid var(--ln);border-radius:12px;padding:12px 14px;background:var(--s);font-size:15px;color:var(--ink);font-family:var(--sans)}
.efp textarea{min-height:110px;resize:vertical}
.efp textarea:disabled{opacity:.45}
.efp-fl{display:block;font-size:13.5px;font-weight:500;margin:12px 0 6px}
.efp-mt{margin-top:10px}
.efp-combo{position:relative}
.efp-clist{position:absolute;left:0;right:0;top:100%;margin:4px 0 0;padding:6px;list-style:none;background:var(--s);border:1px solid var(--ln);border-radius:12px;box-shadow:0 18px 36px -18px rgba(34,26,46,.45);z-index:4;max-height:240px;overflow:auto}
.efp-clist li{padding:9px 10px;border-radius:8px;cursor:pointer}
.efp-clist li[aria-selected="true"],.efp-clist li:hover{background:var(--vs)}
.efp-cstat{font-size:13px;color:var(--tl);margin:6px 0 0;min-height:18px}
.efp-cstat.efp-bad{color:#dc2626}
.efp-consent{display:flex;gap:10px;align-items:flex-start;margin-top:16px;font-size:14px;color:var(--mut);cursor:pointer}
.efp-consent input{width:18px;height:18px;margin-top:2px;accent-color:var(--v);flex:none}
.efp-nav2{display:flex;justify-content:space-between;align-items:center;padding:0 24px 24px}
.efp-back{background:transparent;border:1px solid var(--ln);border-radius:10px;padding:10px 16px;cursor:pointer;color:var(--ink);font-family:var(--sans)}
.efp-next{background:var(--v);color:#fff;border:0;border-radius:10px;padding:11px 20px;font-weight:600;cursor:pointer;font-family:var(--sans)}
.efp-next:disabled{opacity:.4;cursor:not-allowed}
.efp-err{color:#dc2626;font-size:14px;margin:10px 0 0}
.efp-log{list-style:none;margin:10px 0 0;padding:0}
.efp-log li{padding:5px 0;opacity:.3;transition:opacity .3s}
.efp-log li.efp-done{opacity:1}
.efp-log li.efp-done::before{content:"✓ ";color:var(--tl);font-weight:600}
.efp-log li:not(.efp-done)::before{content:"· "}
.efp-footer{padding:28px 0 40px;color:var(--mut);font-size:13px;border-top:1px solid var(--ln)}
/* results page */
.efp-res{max-width:900px;margin:0 auto;padding:36px 20px 20px}
.efp-hello h1{font-family:var(--serif);font-weight:600;font-size:clamp(26px,3.6vw,38px);line-height:1.15;margin:0 0 22px}
.efp-gap{margin:0 0 22px}
.efp-gap small{display:block;color:var(--mut);font-size:14.5px}
.efp-caption{color:var(--mut);font-size:13.5px;margin:10px 4px 0}
.efp-sec{margin:44px 0 0}
.efp-sec h3{font-family:var(--serif);font-size:26px;margin:0 0 4px}
.efp-why{color:var(--mut);margin:0 0 16px;font-size:14.5px}
.efp-icp{display:grid;gap:12px;grid-template-columns:1.2fr 1fr 1fr}
@media (max-width:760px){.efp-icp{grid-template-columns:1fr}}
.efp-box{background:var(--s);border:1px solid var(--ln);border-radius:16px;padding:16px}
.efp-box h4{margin:0 0 8px;font-size:14px;color:var(--vi)}
.efp-box ul{margin:0;padding-left:18px}
.efp-box li{margin-bottom:4px;font-size:14.5px}
.efp-sec .efp-locked{margin:14px 0 0}
.efp-cos{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
@media (max-width:760px){.efp-cos{grid-template-columns:1fr}}
.efp-cot{background:var(--s);border:1px solid var(--ln);border-radius:16px;padding:14px}
.efp-cot header{margin-bottom:8px}
.efp-cot header b{display:block}
.efp-cot header span{font-size:12.5px;color:var(--mut)}
.efp-co{border-top:1px solid var(--ln);padding:10px 0}
.efp-co b{display:block;font-size:14.5px}
.efp-co span{display:block;font-size:13px;color:var(--mut)}
.efp-more{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin:14px 0 0;background:var(--vs);border-radius:16px;padding:16px 18px}
.efp-more span{color:var(--mut);font-size:14px}
.efp-note{color:var(--mut);font-size:12.5px;margin:8px 0 0}
.efp-next-sec{margin:52px 0 30px;background:var(--s);border:1px solid var(--ln);border-radius:20px;padding:26px}
.efp-next-sec h3{font-family:var(--serif);font-size:28px;margin:0 0 8px}
.efp-steps{list-style:none;counter-reset:s;margin:16px 0;padding:0;display:grid;gap:10px}
.efp-steps li{counter-increment:s;display:grid;grid-template-columns:34px 1fr;gap:4px 10px}
.efp-steps li::before{content:counter(s);grid-row:span 2;width:28px;height:28px;border-radius:50%;background:var(--vs);color:var(--vi);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px}
.efp-steps span{color:var(--mut);font-size:14px}
.efp-buy{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}
.efp-buy small{color:var(--mut)}
.efp-stage{opacity:0;transform:translateY(8px);transition:opacity .5s,transform .5s}
.efp-stage.efp-on{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.efp-stage{opacity:1;transform:none;transition:none}.efp-track i,.efp-log li{transition:none}}
`;
