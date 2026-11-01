import { html, render, Component } from './vendor/htm-preact-standalone.module.js';

const view = (v) => html`
<div class="app-root" style="height: 100vh; min-height: 560px; overflow: hidden; display: flex; flex-direction: column; background: #ffffff; color: #0f141a; font-family: 'Hind', 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 20px">

  
  <header style="flex: none; position: relative; z-index: 60; height: 44px; background: #161d26; display: flex; align-items: center; gap: 14px; padding: 0 16px; border-bottom: 1px solid #424650">
    ${v.anyMenu ? html`<div onClick=${v.closeMenus} style="position: fixed; inset: 0; z-index: 45"></div>` : null}
    <div style="position: relative; z-index: 56">
    <button class="tnav" onClick=${v.menuServices} aria-expanded=${v.mServices} aria-label="All services" title="All services" style="background: none; border: 0; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 6px; border-radius: 4px; color: #dedee3; font: 700 14px 'Hind', 'Open Sans', sans-serif">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="#dedee3" aria-hidden="true"><rect x="1" y="1" width="4" height="4" rx="1"></rect><rect x="6" y="1" width="4" height="4" rx="1"></rect><rect x="11" y="1" width="4" height="4" rx="1"></rect><rect x="1" y="6" width="4" height="4" rx="1"></rect><rect x="6" y="6" width="4" height="4" rx="1"></rect><rect x="11" y="6" width="4" height="4" rx="1"></rect><rect x="1" y="11" width="4" height="4" rx="1"></rect><rect x="6" y="11" width="4" height="4" rx="1"></rect><rect x="11" y="11" width="4" height="4" rx="1"></rect></svg>
    </button>
    ${v.mServices ? html`
      <div class="svc-menu" role="menu" style="position: absolute; top: 36px; z-index: 55; background: #ffffff; border-radius: 8px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0; left: 0; width: 560px; padding: 12px 0; display: grid; grid-template-columns: 1fr 1fr">
        ${(v.svcMenu || []).map((g) => html`
          <div style="padding: 4px 8px 8px">
            <div style="padding: 4px 8px; font-weight: 700; font-size: 12px; color: #656871; text-transform: none">${g.cat}</div>
            ${(g.items || []).map((it) => html`
              <button role="menuitem" onClick=${it.pick} style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box; padding: 5px 8px; border-radius: 6px">
                <img src=${it.icon} alt="" style="width: 24px; height: 24px; border-radius: 4px" />
                <span style="display: flex; flex-direction: column"><strong style="font-weight: 700">${it.label}</strong><span style="font-size: 12px; color: #656871">${it.title}</span></span>
              </button>
            `)}
          </div>
        `)}
      </div>
    ` : null}
    </div>
    <div style="position: relative; flex: 0 1 560px; min-width: 0"><label class="search" style="display: flex; align-items: center; gap: 8px; height: 30px; padding: 0 10px; border: 1px solid #656871; border-radius: 8px; background: #0f141a; color: #a4a4ad; box-sizing: border-box">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#a4a4ad" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m11 11 4 4M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10Z"></path></svg>
      <input type="search" placeholder="Search" aria-label="Search" value=${v.q} onInput=${v.onSearch} onKeyDown=${v.onSearchKey} style="flex: 1; min-width: 0; background: transparent; border: 0; outline: none; color: #f9f9fa; font: 400 14px 'Hind', 'Open Sans', sans-serif" />
      <span style="font-size: 12px; color: #a4a4ad; white-space: nowrap">[Alt+S]</span><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="#c6c6cd" stroke-width="1.6"></circle><circle cx="8" cy="8" r="2.2" fill="#c6c6cd"></circle></svg>
    </label>
    ${v.hasResults ? html`
      <div role="listbox" style="position: absolute; left: 0; right: 0; top: 34px; z-index: 50; background: #ffffff; border-radius: 8px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0; overflow: hidden">
        ${(v.results || []).map((res) => html`
          <button onClick=${res.pick} style="display: flex; width: 100%; align-items: center; gap: 10px; padding: 6px 14px; background: none; border: 0; cursor: pointer; text-align: left; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">
            <img src=${res.icon} alt="" style="width: 24px; height: 24px; border-radius: 4px" />
            <span style="display: flex; flex-direction: column"><strong style="font-weight: 700">${res.label}</strong><span style="font-size: 12px; color: #656871">${res.title}</span></span>
          </button>
        `)}
        ${v.noResults ? html`
          <div style="padding: 6px 14px; color: #656871">No matching services</div>
        ` : null}
      </div>
    ` : null}
    </div>
    <span style="flex: 1"></span>
    <button class="tnav" onClick=${v.toggleTerm} aria-label="CloudShell" title="CloudShell" style="background: none; border: 0; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 4px 6px; border-radius: 4px; color: #dedee3; font: 700 14px 'Hind', 'Open Sans', sans-serif"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#dedee3" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M15 1H1v14h14V1Z"></path><path d="M12 11H9"></path><path d="M4.71 11.3 8 8 4.71 4.71"></path></svg></button>
    <span aria-hidden="true" style="width: 1px; height: 24px; background: #424650; flex: none"></span>
    <div style="position: relative; z-index: 56">
      <button class="tnav" onClick=${v.menuBell} aria-label="Notifications" title="Notifications" style="background: none; border: 0; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 4px 6px; border-radius: 4px; color: #dedee3; font: 700 14px 'Hind', 'Open Sans', sans-serif; position: relative"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#dedee3" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M14 12H2c-.39 0-.63-.44-.41-.76L4 8V5c0-2.21 1.79-4 4-4s4 1.79 4 4v3l2.41 3.24c.22.33-.02.76-.41.76Z"></path><path d="M6 13c0 1.1.9 2 2 2s2-.9 2-2"></path></svg>${v.bellDot ? html`<span style="position: absolute; top: 3px; right: 4px; width: 7px; height: 7px; border-radius: 50%; background: #FF9900"></span>` : null}</button>
      ${v.mBell ? html`
        <div role="menu" style="position: absolute; top: 36px; z-index: 55; background: #ffffff; border-radius: 8px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0; right: 0; width: 340px">
          <div style="padding: 6px 16px 8px; font-weight: 700; border-bottom: 1px solid #ebebf0">Notifications</div>
          ${(v.notes || []).map((nt) => html`
            <a href=${nt.href} target="_blank" rel="noopener" style="display: block; padding: 8px 16px; border-bottom: 1px solid #ebebf0; color: #0f141a; text-decoration: none"><strong style="display: block; font-weight: 700">${nt.title}</strong><span style="font-size: 12px; color: #656871">${nt.sub}</span></a>
          `)}
        </div>
      ` : null}
    </div>
    <span aria-hidden="true" class="hide-m" style="width: 1px; height: 24px; background: #424650; flex: none"></span>
    <div style="position: relative; z-index: 56">
      <button class="tnav hide-m" onClick=${v.menuHelp} aria-label="Help" title="Help" style="background: none; border: 0; cursor: pointer; display: flex; align-items: center; gap: 4px; padding: 4px 6px; border-radius: 4px; color: #dedee3; font: 700 14px 'Hind', 'Open Sans', sans-serif"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#dedee3" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"></circle><path d="M5.75 6.338c.13-1.178.811-2.339 2.37-2.339 1.472 0 2.435 1.312 2.042 2.468-.215.633-.916 1.132-1.385 1.578C8.162 8.631 8 9.2 8 10"></path><path d="M8 12.01h.01V12H8v.01Z"></path></svg></button>
      ${v.mHelp ? html`
        <div role="menu" style="position: absolute; top: 36px; z-index: 55; background: #ffffff; border-radius: 8px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0; right: 0; width: 260px">
          <button role="menuitem" onClick=${v.helpCommands} style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">CloudShell commands</button>
          <button role="menuitem" onClick=${v.helpTour} style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">Take the tour (autoplay)</button>
          <button role="menuitem" onClick=${v.helpCurl} style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">Send a request</button>
          <div style="height: 1px; background: #ebebf0; margin: 4px 0"></div>
          <button role="menuitem" onClick=${v.helpContact} style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">Contact Ivan</button>
        </div>
      ` : null}
    </div>
    <div style="position: relative; z-index: 56">
      ${v.mRegion ? html`
        <div role="menu" style="position: absolute; top: 36px; z-index: 55; background: #ffffff; border-radius: 8px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0; right: 0; width: 280px">
          ${(v.regions || []).map((rg) => html`
            <button role="menuitem" onClick=${rg.pick} style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box; justify-content: space-between; font-weight: ${rg.w}"><span>${rg.name}</span><span style="font-size: 12px; color: #656871">${rg.code} ${rg.check}</span></button>
          `)}
        </div>
      ` : null}
    </div>
    <span aria-hidden="true" class="hide-m" style="width: 1px; height: 24px; background: #424650; flex: none"></span>
    <div style="position: relative; z-index: 56">
      <button class="tnav hide-m" onClick=${v.menuAccount} style="background: none; border: 0; cursor: pointer; display: flex; flex-direction: column; align-items: flex-end; padding: 2px 6px; border-radius: 4px; color: #ffffff; font: 700 12px/15px 'Hind', 'Open Sans', sans-serif"><span style="display: flex; align-items: center; gap: 4px">Student Builder <svg width="10" height="10" viewBox="0 0 16 16" aria-hidden="true"><path d="m8 11 4-6H4l4 6Z" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"></path></svg></span><span style="font-weight: 400; color: #dedee3">IVAN DMITRIEV</span></button>
      ${v.mAccount ? html`
        <div role="menu" style="position: absolute; top: 36px; z-index: 55; background: #ffffff; border-radius: 8px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0; right: 0; width: 280px">
          <div style="padding: 8px 16px 10px; border-bottom: 1px solid #ebebf0"><strong style="display: block">Ivan Dmitriev</strong><span style="font-size: 12px; color: #656871">AWS Student Builder Group Leader · UC3M</span></div>
          <a role="menuitem" href="https://www.linkedin.com/in/ivan-dmitriev-uc3m/" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">LinkedIn</a>
          <a role="menuitem" href="https://github.com/hardvanika" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">GitHub</a>
          <a role="menuitem" href=${v.bcUrl} target="_blank" rel="noopener" style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">AWS Builder Center</a>
          <button role="menuitem" onClick=${v.helpContact} style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">Contact</button>
          <div style="height: 1px; background: #ebebf0; margin: 4px 0"></div>
          <button role="menuitem" onClick=${v.signOut} style="display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-decoration: none; box-sizing: border-box">Sign out</button>
        </div>
      ` : null}
    </div>
  </header>

  <div class="crumbbar" style="flex: none; height: 40px; display: flex; align-items: center; gap: 12px; padding: 0 12px; background: #ffffff; border-bottom: 1px solid #c6c6cd; font-size: 14px">
    <button class="hamb" onClick=${v.toggleNav} aria-label="Toggle navigation" style="width: 30px; height: 30px; border-radius: 50%; border: 0; background: #006ce0; cursor: pointer; display: flex; align-items: center; justify-content: center; flex: none"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#ffffff" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M15 3H1M15 8H1M15 13H1"></path></svg></button>
    <a href="#" onClick=${v.restart} style="text-decoration: underline; text-underline-offset: 3px">ivan-dmitriev</a>
    <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><path d="M3 2 L7 6 L3 10" fill="none" stroke="#656871" stroke-width="2"></path></svg>
    <span style="font-weight: 700; color: #424650">Architecture</span>
    <span style="flex: 1"></span>
    <button onClick=${v.menuInfo} aria-label="About this page" title="About this page" style="background: none; border: 0; cursor: pointer; padding: 6px; display: flex"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0f141a" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"></circle><path d="M8 12V7M8 6V4"></path></svg></button>
    <span aria-hidden="true" style="width: 1px; height: 24px; background: #c6c6cd"></span>
    <button onClick=${v.toggleTerm} aria-label="CloudShell" title="CloudShell" style="background: none; border: 0; cursor: pointer; padding: 6px; display: flex"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0f141a" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M1 1h14v10H9l-3 3v-3H1V1Z"></path><path d="M4 4.5l2 1.5-2 1.5M8 7.5h3"></path></svg></button>
  </div>
  <div class="app-body" style="flex: 1 1 auto; min-height: 0; display: flex">
    
    <nav class="sidenav" aria-label="Services" style="display: ${v.navDisp}; flex: none; width: 260px; border-right: 1px solid #c6c6cd; padding: 22px 0 20px; overflow-y: auto; box-sizing: border-box; flex-direction: column">
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 16px 14px 28px">
        <a href="#" onClick=${v.restart} style="color: #0f141a; font-size: 18px; line-height: 22px; font-weight: 700; text-decoration: none">Ivan Dmitriev</a>
        <button onClick=${v.toggleNav} aria-label="Close navigation" title="Close navigation" style="background: none; border: 0; cursor: pointer; padding: 4px; display: flex"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#424650" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M11 2 5 8l6 6"></path></svg></button>
      </div>
      <a class="navlink" href="#" onClick=${v.restart} style="display: block; padding: 4px 24px 4px 28px; color: #424650; text-decoration: none">Overview</a>
      <a class="navlink" href="#" onClick=${v.menuInfo} style="display: block; padding: 4px 24px 4px 28px; color: #424650; text-decoration: none">About this page</a>
      <a class="navlink" href="https://github.com/hardvanika/aws-console" target="_blank" rel="noopener" style="display: block; padding: 4px 24px 4px 28px; color: #424650; text-decoration: none; font-weight: 400">Source code</a>
      <button onClick=${v.toggleReq} aria-expanded=${v.reqOpen} style="display: flex; align-items: center; gap: 8px; width: 100%; background: none; border: 0; cursor: pointer; padding: 14px 24px 6px 10px; font: 700 18px/22px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-align: left"><svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style="transform: rotate(${v.reqRot}deg); transition: transform .15s"><path d="M1 2 H9 L5 8 Z" fill="#0f141a"></path></svg>Request path</button>
      ${v.reqOpen ? html`
        ${(v.nodes || []).map((n) => html`
          <a class="navlink" href="#" onClick=${n.pick} style="display: flex; align-items: center; gap: 12px; padding: 4px 16px 4px 28px; color: ${n.navC}; font-weight: ${n.navW}; text-decoration: none">${n.num}. ${n.label}${n.isNew ? html`<span style="font-size: 12px; font-weight: 700; color: #006ce0; border-bottom: 1px dashed #006ce0; line-height: 15px">New</span>` : null}</a>
        `)}
      ` : null}
      <button onClick=${v.toggleSoc} aria-expanded=${v.socOpen} style="display: flex; align-items: center; gap: 8px; width: 100%; background: none; border: 0; cursor: pointer; padding: 14px 24px 6px 10px; font: 700 18px/22px 'Hind', 'Open Sans', sans-serif; color: #0f141a; text-align: left"><svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style="transform: rotate(${v.socRot}deg); transition: transform .15s"><path d="M1 2 H9 L5 8 Z" fill="#0f141a"></path></svg>Socials</button>
      ${v.socOpen ? html`
        <a class="navlink" target="_blank" rel="noopener" href="https://www.linkedin.com/in/ivan-dmitriev-uc3m/" style="display: block; padding: 4px 24px 4px 28px; color: #424650; font-weight: 400">LinkedIn</a>
        <a class="navlink" target="_blank" rel="noopener" href="https://github.com/hardvanika" style="display: block; padding: 4px 24px 4px 28px; color: #424650; font-weight: 400">GitHub</a>
        <a class="navlink" target="_blank" rel="noopener" href=${v.bcUrl} style="display: block; padding: 4px 24px 4px 28px; color: #424650; font-weight: 400">AWS Builder Center</a>
      ` : null}
    </nav>

    
    <main class="app-main" style="flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; padding: 14px 32px 16px; gap: 12px; box-sizing: border-box">
      
      ${v.bannerOpen ? html`
        <div class="banner" style="flex: none; position: relative; border: 1px solid #c8c3d8; border-radius: 16px; padding: 14px 52px 16px 20px">
          <h1 style="margin: 0; font-size: 24px; line-height: 30px; font-weight: 700; position: relative">Ivan Dmitriev <span style="font-weight: 700">|</span> <i style="font-weight: 400">Student Builder</i> <a href="#" onClick=${v.menuInfo} style="font-size: 12px; font-weight: 700; margin-left: 6px; vertical-align: middle">Info</a>
            ${v.mInfo ? html`
              <div class="info-pop" role="dialog" style="position: absolute; top: 34px; z-index: 100; background: #ffffff; border-radius: 8px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 14px 16px; left: 0; width: 420px; font-size: 14px; line-height: 20px; font-weight: 400; color: #0f141a">
                <strong style="display: block; font-size: 16px; margin-bottom: 6px">About this page</strong>
                <p style="margin: 0 0 8px">You are an HTTP request travelling through an AWS architecture. Each service holds one part of my story.</p>
                <p style="margin: 0 0 8px"><b>Global edge:</b> who I am. <b>Public subnet:</b> my communities. <b>Private subnet:</b> my tech superpowers and projects (Lambda), certifications, security training and work. <b>Outside the cloud:</b> how to reach me.</p>
                <p style="margin: 0">Press <b>Send request</b>, click any service, use the search bar, or type <code>curl https://ivan.dmitriev</code> in CloudShell.</p>
              </div>
            ` : null}</h1>
          <div style="margin-top: 4px; color: #0f141a; max-width: 980px">Born in Moscow, moved between Bulgaria, Greece and Spain, now in Madrid. Communities opened doors for me, so now I open them for others: AWS Student Builder Group Leader at UC3M and VP of I2C. Borders changed, the builder didn't.</div>
          <button onClick=${v.closeBanner} aria-label="Dismiss" style="position: absolute; right: 14px; top: 12px; background: none; border: 0; cursor: pointer; padding: 4px; display: flex"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#424650" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m2 1.71 12 12M2 13.71l12-12"></path></svg></button>
        </div>
      ` : null}
      
      <section style="flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; background: #ffffff; border-radius: 16px; border: 1px solid #c6c6cd">
        <div style="flex: none; padding: 14px 20px 6px; display: flex; flex-direction: column; gap: 10px">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px">
            <div style="min-width: 0">
              <h2 style="margin: 0; font-size: 20px; line-height: 24px; font-weight: 700; display: flex; align-items: center; gap: 8px"><svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true" fill="#656871"><circle cx="2" cy="3" r="1.4"></circle><circle cx="8" cy="3" r="1.4"></circle><circle cx="2" cy="8" r="1.4"></circle><circle cx="8" cy="8" r="1.4"></circle><circle cx="2" cy="13" r="1.4"></circle><circle cx="8" cy="13" r="1.4"></circle></svg>Architecture <span style="font-weight: 400; color: #656871">(10)</span> <a href="#" onClick=${v.menuInfo} style="font-size: 12px; font-weight: 700">Info</a></h2>
              <div style="margin-top: 2px; color: #424650; font-size: 14px">Each service holds one part of my story. Request: GET /ivan · hop ${v.hopNum}/10 · ${v.ms} ms</div>
            </div>
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px">
              <button class="btnN" onClick=${v.restart} aria-label="Restart request" title="Restart request" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #006ce0; background: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#006ce0" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M15 8c0 3.87-3.13 7-7 7s-7-3.13-7-7 3.13-7 7-7c2.79 0 5.2 1.63 6.33 4"></path><path d="M15 1v4h-4"></path></svg></button>
          <button class="btnN" onClick=${v.togglePlay} style="min-height: 30px; padding: 4px 20px; border-radius: 20px; border: 2px solid #006ce0; background: #ffffff; color: #006ce0; font: 700 14px 'Hind', 'Open Sans', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 8px"><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d=${v.playIcon} fill="#006ce0" stroke="#006ce0" stroke-width="2" stroke-linejoin="round"></path></svg>${v.playLabel}</button>
          <button class="btnP" onClick=${v.primary} style="min-height: 30px; padding: 4px 20px; border-radius: 20px; border: 2px solid #FF9900; background: #FF9900; color: #0f141a; font: 700 14px 'Hind', 'Open Sans', sans-serif; cursor: pointer">${v.primaryLabel}</button>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 16px">
            <div style="position: relative; flex: 0 1 640px; min-width: 0">
              <label style="display: flex; align-items: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid #8c8c94; border-radius: 8px; background: #ffffff; box-sizing: border-box">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#424650" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m11 11 4 4M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10Z"></path></svg>
                <input type="search" placeholder="Find services by name or keyword" aria-label="Find services" value=${v.qArch} onInput=${v.onSearch2} onKeyDown=${v.onSearchKey} style="flex: 1; min-width: 0; background: transparent; border: 0; outline: none; color: #0f141a; font: 400 14px 'Hind', 'Open Sans', sans-serif" />
              </label>
    ${v.hasResults2 ? html`
      <div role="listbox" style="position: absolute; left: 0; right: 0; top: 36px; z-index: 50; background: #ffffff; border-radius: 8px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0; overflow: hidden">
        ${(v.results || []).map((res) => html`
          <button onClick=${res.pick} style="display: flex; width: 100%; align-items: center; gap: 10px; padding: 6px 14px; background: none; border: 0; cursor: pointer; text-align: left; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">
            <img src=${res.icon} alt="" style="width: 24px; height: 24px; border-radius: 4px" />
            <span style="display: flex; flex-direction: column"><strong style="font-weight: 700">${res.label}</strong><span style="font-size: 12px; color: #656871">${res.title}</span></span>
          </button>
        `)}
        ${v.noResults ? html`
          <div style="padding: 6px 14px; color: #656871">No matching services</div>
        ` : null}
      </div>
    ` : null}
            </div>
            <span style="flex: 1"></span>
            <div class="hide-m" style="display: flex; align-items: center; gap: 4px; color: #424650">
              <button onClick=${v.pagePrev} aria-label="Previous hop" style="background: none; border: 0; cursor: pointer; padding: 4px; display: flex"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#424650" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M11 2 5 8l6 6"></path></svg></button>
              ${(v.pages || []).map((pg) => html`<button onClick=${pg.pick} aria-label=${pg.aria} style="min-width: 26px; height: 26px; padding: 0 4px; border: 0; background: none; cursor: pointer; font: ${pg.w} 14px 'Hind', 'Open Sans', sans-serif; color: ${pg.c}; border-radius: 6px">${pg.num}</button>`)}
              <button onClick=${v.pageNext} aria-label="Next hop" style="background: none; border: 0; cursor: pointer; padding: 4px; display: flex"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#424650" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m5 2 6 6-6 6"></path></svg></button>
            </div>
          </div>
        </div>
        <div class="stage" ref=${v.stageRef} style="flex: 1 1 auto; min-height: 0; position: relative; overflow: hidden">
    <div style="position: absolute; left: 50%; top: 50%; width: 1200px; height: 640px; transform: translate(-50%, -50%) scale(${v.k}); transform-origin: 50% 50%">

        
        <div style="position: absolute; left: 150px; top: 14px; width: 1040px; height: 622px; border: 2px solid #232F3E; border-radius: 6px; box-sizing: border-box"></div>
        <div style="position: absolute; left: 150px; top: 14px; display: flex; align-items: center; gap: 10px"><img src="assets/icons/AWSCloudlogo.svg" alt="" style="width: 40px; height: 40px" /><a href="#" onClick=${v.restart} style="font-weight: 700; font-size: 16px; color: #0f141a; text-decoration: none">AWS Cloud</a></div>

        
        <div style="position: absolute; left: 170px; top: 104px; width: 290px; height: 198px; border: 2px dashed #8C8C94; border-radius: 4px; box-sizing: border-box"></div>
        <button onClick=${v.goEdge} style="position: absolute; left: 182px; top: 110px; background: none; border: 0; padding: 0; cursor: pointer; font: 700 12px 'Hind', 'Open Sans', sans-serif; color: #5F6B7A">Edge locations · global</button>

        
        <div style="position: absolute; left: 480px; top: 64px; width: 694px; height: 548px; border: 2px solid #00A4A6; border-radius: 4px; box-sizing: border-box"></div>
        <div style="position: absolute; left: 480px; top: 64px; display: flex; align-items: center; gap: 8px"><img src="assets/icons/Region.svg" alt="" style="width: 30px; height: 30px" /><a href="#" onClick=${v.regionLink} style="font-weight: 700; font-size: 13px; color: #007A7C; text-decoration: underline; position: relative; z-index: 2">AWS Region in Spain (eu-south-2) · multiple Availability Zones</a></div>

        
        <div style="position: absolute; left: 500px; top: 104px; width: 654px; height: 198px; border: 2px dashed #7AA116; border-radius: 4px; box-sizing: border-box"></div>
        <button onClick=${v.goPub} style="position: absolute; left: 512px; top: 110px; background: none; border: 0; padding: 0; cursor: pointer; font: 700 12px 'Hind', 'Open Sans', sans-serif; color: #5A7A0F">Public subnet</button>

        
        <div style="position: absolute; left: 500px; top: 330px; width: 654px; height: 262px; border: 2px dashed #00A4A6; border-radius: 4px; box-sizing: border-box"></div>
        <button onClick=${v.goPriv} style="position: absolute; left: 512px; top: 336px; background: none; border: 0; padding: 0; cursor: pointer; font: 700 12px 'Hind', 'Open Sans', sans-serif; color: #007A7C">Private subnet</button>

        
        ${(v.segs || []).map((s) => html`
          <div class=${s.cls} aria-hidden="true" style="position: absolute; left: ${s.x}px; top: ${s.y}px; width: ${s.w}px; height: ${s.h}px; background-image: ${s.bg}; animation-direction: ${s.dir}"></div>
        `)}
        ${(v.heads || []).map((hd) => html`
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" style="position: absolute; left: ${hd.x}px; top: ${hd.y}px; transform: rotate(${hd.rot}deg)"><path d="M1 1 L11 6 L1 11 Z" fill=${hd.c}></path></svg>
        `)}

        
        <button onClick=${v.restart} aria-label="You, the client" style="position: absolute; left: 30px; top: 280px; width: 60px; height: 60px; border-radius: 50%; border: 2px solid #232F3E; background: #FFFFFF; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#232F3E" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"></path></svg>
        </button>
        <div style="position: absolute; left: 10px; top: 344px; width: 100px; text-align: center; font-weight: 700; font-size: 13px">You</div>

        
        ${(v.nodes || []).map((n) => html`
          <button class="node" onClick=${n.pick} style="position: absolute; left: ${n.left}px; top: ${n.top}px; width: 150px; background: none; border: 0; padding: 0; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: ${n.op}; transition: opacity .4s">
            <span style="position: relative; width: 64px; height: 64px; display: block; border-radius: 6px; box-shadow: ${n.ring}">
              <img src=${n.icon} alt="" style="width: 64px; height: 64px; display: block; border-radius: 6px" />
              <span style="position: absolute; left: -16px; bottom: -12px; width: 30px; height: 30px; border-radius: 50%; background: #232F3E; color: #FFFFFF; font: 700 14px 'Hind', 'Open Sans', sans-serif; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; z-index: 3">${n.num}</span>
            </span>
            <span class="lbl" style="max-width: 118px; padding: 1px 4px; border-radius: 4px; background: #FFFFFF; font: 700 13px/1.25 'Hind', 'Open Sans', sans-serif; color: #232F3E; text-align: center; text-wrap: balance">${n.label}</span>
          </button>
        `)}

        
        <div aria-hidden="true" class="pulse" style="position: absolute; left: ${v.dotX}px; top: ${v.dotY}px; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: #FF9900; border: 2px solid #FFFFFF; z-index: 4; opacity: ${v.dotO}; transition: opacity .15s"></div>

        
        ${v.showHint ? html`
          <div style="position: absolute; left: 10px; top: 390px; width: 200px; padding: 10px 12px 10px 10px; border-radius: 12px; border: 2px solid #006ce0; background: #f0fbff; box-sizing: border-box; font-size: 13px; line-height: 18px; color: #0f141a; display: flex; gap: 8px"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#006ce0" stroke-width="2" stroke-linejoin="round" aria-hidden="true" style="flex: none; margin-top: 2px"><circle cx="8" cy="8" r="7"></circle><path d="M8 12V7M8 6V4"></path></svg><span><strong>You are the request.</strong> Press Send request or click any service to travel through the network.</span></div>
        ` : null}

        
        ${v.hasWin ? html`
          <section class="win" style="position: absolute; ${v.winPos} width: 500px; max-height: 600px; display: flex; flex-direction: column; z-index: 6; background: #FFFFFF; border-radius: 16px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; overflow: hidden">
            <div style="background: #ffffff; color: #0f141a; height: 44px; display: flex; align-items: center; gap: 10px; padding: 0 10px 0 20px; border-bottom: 1px solid #ebebf0">
              <img src=${v.win.icon} alt="" style="width: 20px; height: 20px; border-radius: 3px" />
              <span style="font-weight: 700; font-size: 14px">${v.win.service}</span>
              <span style="flex: 1"></span>
              <span style="font-size: 12px; color: #656871">${v.win.region}</span>
              <button onClick=${v.close} aria-label="Close window" style="width: 32px; height: 32px; background: none; border: 0; color: #424650; cursor: pointer; font-size: 20px">×</button>
            </div>
            <div style="flex: 1 1 auto; min-height: 0; overflow-y: auto; padding: 14px 20px 20px; display: flex; flex-direction: column; gap: 12px">
              <div style="font-size: 12px"><a href="#" onClick=${v.closeA} style="color: #006ce0">${v.win.crumbs}</a> <span style="color: #656871">› ${v.win.leaf}</span></div>
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap">
                <h2 style="margin: 0; font-size: 20px; line-height: 24px; font-weight: 700">${v.win.title}</h2>
                <span style="font-size: 12px; font-weight: 700; color: #00802f; display: inline-flex; align-items: center; gap: 4px"><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#00802f"></circle><path d="M4.5 8.2 L7 10.5 L11.5 5.8" stroke="#FFFFFF" stroke-width="1.8" fill="none"></path></svg>${v.win.status}</span>
              </div>

              ${v.s1 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">I was born in Moscow in 2006 and grew up on the move: my family travelled a lot, so new countries became normal early. In 2022 we left for Bulgaria, then Greece, then Spain, and in 2024 I moved to Madrid for university. Every move meant a new language, new friends and someone kind enough to show me how things worked.</p>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div class="thead" style="display: grid; grid-template-columns: 110px 70px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd; font-size: 14px"><span>Record</span><span>Type</span><span>Value</span></div>
                  <div style="display: grid; grid-template-columns: 110px 70px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>ivan.dmitriev</span><span>A</span><span>Madrid, Spain</span></div>
                  <div style="display: grid; grid-template-columns: 110px 70px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>born</span><span>TXT</span><span>"Moscow, 2006"</span></div>
                  <div style="display: grid; grid-template-columns: 110px 70px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px"><span>route</span><span>CNAME</span><span>Bulgaria → Greece → Spain → Madrid</span></div>
                </div>
              ` : null}

              ${v.s2 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">Since 2024 I study the dual degree in Business Administration and Computer Science at Universidad Carlos III de Madrid, on the Colmenarejo campus. Beyond classes I got involved in how the university works: I was elected to the University Senate (Claustro) and sit on the Coexistence Committee.</p>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px">
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Origin</div><div>Universidad Carlos III de Madrid</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Degree</div><div>BBA and Computer Science, 3rd year</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Edge location</div><div>MAD · Colmenarejo campus</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Also at UC3M</div><div>University Senate member</div></div>
                </div>
              ` : null}

              ${v.s8 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">I learn security by doing. On TryHackMe I completed the Cyber Security 101 path, covering networking, Linux, web basics and the core offensive and defensive tools, and I'm now 56% through Defending AWS, the path on detecting and stopping attacks in AWS environments.</p>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div class="thead" style="display: grid; grid-template-columns: minmax(0, 1fr) 70px 110px; gap: 8px; padding: 8px 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd; font-size: 14px"><span>Training path</span><span>Type</span><span>Status</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 70px 110px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>TryHackMe · Cyber Security 101</span><span>Path</span><span style="color: #00802f; font-weight: 700">Completed</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 70px 110px; gap: 8px; padding: 8px 14px; font-size: 14px"><span>TryHackMe · Defending AWS</span><span>Path</span><span style="color: #006ce0; font-weight: 700">In progress · 56%</span></div>
                </div>
                <div style="font-size: 14px; color: #424650">I learn security by attacking labs, not by reading about them. <a href="https://tryhackme.com/p/100553235" target="_blank" rel="noopener">My TryHackMe profile</a></div>
              ` : null}

              ${v.s3 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">In September 2026 I founded the AWS Student Builder Group at UC3M and became its Group Leader. I built a core team of five leads (tech, workshops, marketing, multimedia and outreach) and on 21 October 2026 we ran our first event on campus, with speakers from AWS and industry. In November we run three hands-on workshops on Lambda, S3 and EC2, with Cloud Practitioner Essentials as the starting point for every member.</p>
                <div style="padding: 12px 14px; border-radius: 12px; background: #f0fbff; border: 1px solid #006ce0; font-weight: 700; color: #0f141a">Student Builder Group Leader and Founder · Amazon Web Services</div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px">
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Group</div><div>AWS SBG UC3M · Colmenarejo</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Since</div><div>September 2026</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">First event</div><div>21 Oct 2026, speakers from AWS and industry</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Stages · November</div><div>Lambda · S3 · EC2 workshops</div></div>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap">
                  <a href="https://www.meetup.com/aws-sbg-at-charles-iii-univ-of-madrid-colmenarejo-campus/" target="_blank" rel="noopener" style="padding: 6px 20px; border-radius: 20px; border: 2px solid #FF9900; background: #FF9900; color: #0f141a; font-weight: 700; text-decoration: none">Join on Meetup</a>
                </div>
              ` : null}

              ${v.s6 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">Small things I build to learn and to help the communities I'm part of. With I2C we built the ML feed algorithm for Open, the UC3M student social network. And this site is itself hosted on AWS Amplify: every box you open is a chapter of my story.</p>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div class="thead" style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd; font-size: 14px"><span>Function</span><span>Description</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><a href="https://openuc3m.com/" target="_blank" rel="noopener">open-feed</a><span>ML feed for Open, the UC3M student social network</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px"><a href="#" onClick=${v.restart}>this-site</a><span>You are inside it</span></div>
                </div>
                <h3 style="margin: 6px 0 0; font-size: 16px; line-height: 20px; font-weight: 700">Tech superpowers</h3>
                <div style="font-size: 12px; color: #656871">Layers (5) · attached to every function I run</div>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd"><span>Layer</span><span>Contents</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><strong>cloud</strong><span>AWS: Lambda, S3, EC2, API Gateway, DynamoDB, Amplify · Cloud Practitioner Essentials</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><strong>code</strong><span>Python · machine learning (KNN, recommender systems, OpenVINO) · HTML, CSS, JavaScript</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><strong>security</strong><span>TryHackMe: Cyber Security 101, Defending AWS · networking and Linux basics</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><strong>people</strong><span>Building and leading communities · organising events and hands-on workshops</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px"><strong>languages</strong><span>Russian (native) · English (CPE, IELTS 8) · Spanish (C1) · Italian</span></div>
                </div>
              ` : null}

              ${v.s7 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">My latest certifications, read straight from the table. This is just the start: the table keeps growing and new items get written here as I finish them.</p>
                <div style="font-size: 12px; color: #656871">Latest items (5) · more being written</div>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd"><span>certification</span><span>issuer</span><span>date</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>AWS SBG Leader Badge</span><span>Amazon Web Services</span><span>Oct 2026</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>IELTS · overall 8 (Listening 9, Reading 9)</span><span>British Council</span><span>Oct 2026</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>Cyber Security 101 (SEC1)</span><span>TryHackMe</span><span>Jun 2026</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>McKinsey.org Forward Program</span><span>McKinsey & Company</span><span>Jun 2026</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px"><span>Defending AWS (56%, in progress)</span><span>TryHackMe</span><span>—</span></div>
                  <div class="writing" style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; color: #656871; font-style: italic; border-top: 1px solid #ebebf0; background: #f9f9fa"><span>Next certification · writing item…</span><span>More to come</span><span>Soon</span></div>
                </div>
                <div style="font-size: 14px"><a target="_blank" rel="noopener" href="https://www.linkedin.com/in/ivan-dmitriev-uc3m/details/certifications/">Load more on LinkedIn</a></div>
              ` : null}

              ${v.s4 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">I2C (Informática To Colme) is the computer science association of the Colmenarejo campus, and I'm its Vice President. This year we restructured it: new areas for talent and marketing, a welcome guide for new members, a new visual identity and a WhatsApp community with a group for every area. Our name comes from the I²C bus, two wires that let many devices talk; that's what we try to do with people.</p>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px">
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Role</div><div>Vice President</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Association</div><div>Informática To Colme, UC3M</div></div>
                  <div style="grid-column: span 2"><div style="font-size: 14px; font-weight: 700; color: #0f141a">Named after</div><div>The I²C bus (Philips, 1982): two wires, many devices talking. We do the same with people.</div></div>
                </div>
                <div style="font-size: 14px; font-weight: 700; color: #0f141a">Rules → targets</div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px">
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">AI</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">Cybersecurity</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">Robotics</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">IBM Z</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFF4E5; color: #0f141a; border: 1px solid #FF9900; font-size: 12px; font-weight: 600">AWS SBG</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">I2C x Open</span>
                </div>
                <div style="font-size: 14px; color: #424650">With Open, the UC3M student social network, we built its ML feed algorithm.</div>
              ` : null}

              ${v.s5 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">I like being where student voices get heard. At RITSI, the national association of computer science students, I represent UC3M and, since July 2026, I run the Social Collaboration area, which promotes social, educational and outreach initiatives. At UC3M I'm part of the Student Delegation, in the University Senate and the Coexistence Committee.</p>
                <div style="font-size: 12px; color: #656871">Messages available (4) · student representation</div>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div class="thead" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd; font-size: 14px"><span>Org</span><span>Role</span><span>Since</span></div>
                  <div style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>RITSI</span><span>UC3M representative</span><span>Nov 2025</span></div>
                  <div style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>RITSI</span><span>Social Collaboration officer</span><span>Jul 2026</span></div>
                  <div style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>UC3M Delegation</span><span>University Senate (Claustro)</span><span>Jun 2026</span></div>
                  <div style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-size: 14px"><span>UC3M Delegation</span><span>Coexistence Committee</span><span>Mar 2025</span></div>
                </div>
              ` : null}

              ${v.s9 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">Since September 2026 I'm an operations intern at MAPFRE, in the Corporate Operations Area of Mawdy's central services. I work on supplier operations, learning from the inside how a large company keeps its operations running.</p>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px">
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Role</div><div>Operations intern</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Company</div><div>MAPFRE · Mawdy central services</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Area</div><div>Corporate Operations · suppliers</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Since</div><div>September 2026 · Madrid, on-site</div></div>
                </div>
              ` : null}

              ${v.s10 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">Whether it's a workshop, a collaboration, a project or just a question about AWS, I'll answer. Pick a channel and the message is delivered straight to me.</p>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap">
                  <a href="mailto:100553235@alumnos.uc3m.es" style="padding: 6px 20px; border-radius: 20px; border: 2px solid #FF9900; background: #FF9900; color: #0f141a; font-weight: 700; text-decoration: none">Send email</a>
                  <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/ivan-dmitriev-uc3m/" style="padding: 6px 16px; border-radius: 20px; border: 2px solid #006ce0; color: #006ce0; font-weight: 700; text-decoration: none">LinkedIn</a>
                  <a target="_blank" rel="noopener" href="https://github.com/hardvanika" style="padding: 6px 16px; border-radius: 20px; border: 2px solid #006ce0; color: #006ce0; font-weight: 700; text-decoration: none">GitHub</a>
                  <a href=${v.bcUrl} target="_blank" rel="noopener" style="padding: 6px 16px; border-radius: 20px; border: 2px solid #006ce0; color: #006ce0; font-weight: 700; text-decoration: none">Builder Center</a>
                </div>
              ` : null}

              ${v.s11 ? html`
                <div style="font: 700 42px Monaco, Menlo, Consolas, 'Courier New', monospace; color: #00802f; letter-spacing: -0.02em">200 OK</div>
                <div style="font-size: 14px; color: #424650">Request completed in 84 ms. Thanks for travelling through my network.</div>
                <div><button onClick=${v.restart} style="padding: 8px 18px; border-radius: 20px; border: 2px solid #006ce0; background: #ffffff; color: #006ce0; font: 700 14px 'Hind', 'Open Sans', sans-serif; cursor: pointer; min-height: 40px">Replay request</button></div>
              ` : null}
            </div>
          </section>
        ` : null}
    </div>
        </div>
      </section>

    </main>
      
      ${v.hasWin ? html`
          <section class="win win-m" style="position: absolute; ${v.winPos} width: 500px; max-height: 600px; display: flex; flex-direction: column; z-index: 6; background: #FFFFFF; border-radius: 16px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; overflow: hidden">
            <div style="background: #ffffff; color: #0f141a; height: 44px; display: flex; align-items: center; gap: 10px; padding: 0 10px 0 20px; border-bottom: 1px solid #ebebf0">
              <img src=${v.win.icon} alt="" style="width: 20px; height: 20px; border-radius: 3px" />
              <span style="font-weight: 700; font-size: 14px">${v.win.service}</span>
              <span style="flex: 1"></span>
              <span style="font-size: 12px; color: #656871">${v.win.region}</span>
              <button onClick=${v.close} aria-label="Close window" style="width: 32px; height: 32px; background: none; border: 0; color: #424650; cursor: pointer; font-size: 20px">×</button>
            </div>
            <div style="flex: 1 1 auto; min-height: 0; overflow-y: auto; padding: 14px 20px 20px; display: flex; flex-direction: column; gap: 12px">
              <div style="font-size: 12px"><a href="#" onClick=${v.closeA} style="color: #006ce0">${v.win.crumbs}</a> <span style="color: #656871">› ${v.win.leaf}</span></div>
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap">
                <h2 style="margin: 0; font-size: 20px; line-height: 24px; font-weight: 700">${v.win.title}</h2>
                <span style="font-size: 12px; font-weight: 700; color: #00802f; display: inline-flex; align-items: center; gap: 4px"><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#00802f"></circle><path d="M4.5 8.2 L7 10.5 L11.5 5.8" stroke="#FFFFFF" stroke-width="1.8" fill="none"></path></svg>${v.win.status}</span>
              </div>

              ${v.s1 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">I was born in Moscow in 2006 and grew up on the move: my family travelled a lot, so new countries became normal early. In 2022 we left for Bulgaria, then Greece, then Spain, and in 2024 I moved to Madrid for university. Every move meant a new language, new friends and someone kind enough to show me how things worked.</p>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div class="thead" style="display: grid; grid-template-columns: 110px 70px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd; font-size: 14px"><span>Record</span><span>Type</span><span>Value</span></div>
                  <div style="display: grid; grid-template-columns: 110px 70px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>ivan.dmitriev</span><span>A</span><span>Madrid, Spain</span></div>
                  <div style="display: grid; grid-template-columns: 110px 70px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>born</span><span>TXT</span><span>"Moscow, 2006"</span></div>
                  <div style="display: grid; grid-template-columns: 110px 70px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px"><span>route</span><span>CNAME</span><span>Bulgaria → Greece → Spain → Madrid</span></div>
                </div>
              ` : null}

              ${v.s2 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">Since 2024 I study the dual degree in Business Administration and Computer Science at Universidad Carlos III de Madrid, on the Colmenarejo campus. Beyond classes I got involved in how the university works: I was elected to the University Senate (Claustro) and sit on the Coexistence Committee.</p>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px">
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Origin</div><div>Universidad Carlos III de Madrid</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Degree</div><div>BBA and Computer Science, 3rd year</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Edge location</div><div>MAD · Colmenarejo campus</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Also at UC3M</div><div>University Senate member</div></div>
                </div>
              ` : null}

              ${v.s8 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">I learn security by doing. On TryHackMe I completed the Cyber Security 101 path, covering networking, Linux, web basics and the core offensive and defensive tools, and I'm now 56% through Defending AWS, the path on detecting and stopping attacks in AWS environments.</p>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div class="thead" style="display: grid; grid-template-columns: minmax(0, 1fr) 70px 110px; gap: 8px; padding: 8px 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd; font-size: 14px"><span>Training path</span><span>Type</span><span>Status</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 70px 110px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>TryHackMe · Cyber Security 101</span><span>Path</span><span style="color: #00802f; font-weight: 700">Completed</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 70px 110px; gap: 8px; padding: 8px 14px; font-size: 14px"><span>TryHackMe · Defending AWS</span><span>Path</span><span style="color: #006ce0; font-weight: 700">In progress · 56%</span></div>
                </div>
                <div style="font-size: 14px; color: #424650">I learn security by attacking labs, not by reading about them. <a href="https://tryhackme.com/p/100553235" target="_blank" rel="noopener">My TryHackMe profile</a></div>
              ` : null}

              ${v.s3 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">In September 2026 I founded the AWS Student Builder Group at UC3M and became its Group Leader. I built a core team of five leads (tech, workshops, marketing, multimedia and outreach) and on 21 October 2026 we ran our first event on campus, with speakers from AWS and industry. In November we run three hands-on workshops on Lambda, S3 and EC2, with Cloud Practitioner Essentials as the starting point for every member.</p>
                <div style="padding: 12px 14px; border-radius: 12px; background: #f0fbff; border: 1px solid #006ce0; font-weight: 700; color: #0f141a">Student Builder Group Leader and Founder · Amazon Web Services</div>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px">
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Group</div><div>AWS SBG UC3M · Colmenarejo</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Since</div><div>September 2026</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">First event</div><div>21 Oct 2026, speakers from AWS and industry</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Stages · November</div><div>Lambda · S3 · EC2 workshops</div></div>
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap">
                  <a href="https://www.meetup.com/aws-sbg-at-charles-iii-univ-of-madrid-colmenarejo-campus/" target="_blank" rel="noopener" style="padding: 6px 20px; border-radius: 20px; border: 2px solid #FF9900; background: #FF9900; color: #0f141a; font-weight: 700; text-decoration: none">Join on Meetup</a>
                </div>
              ` : null}

              ${v.s6 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">Small things I build to learn and to help the communities I'm part of. With I2C we built the ML feed algorithm for Open, the UC3M student social network. And this site is itself hosted on AWS Amplify: every box you open is a chapter of my story.</p>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div class="thead" style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd; font-size: 14px"><span>Function</span><span>Description</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><a href="https://openuc3m.com/" target="_blank" rel="noopener">open-feed</a><span>ML feed for Open, the UC3M student social network</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px"><a href="#" onClick=${v.restart}>this-site</a><span>You are inside it</span></div>
                </div>
                <h3 style="margin: 6px 0 0; font-size: 16px; line-height: 20px; font-weight: 700">Tech superpowers</h3>
                <div style="font-size: 12px; color: #656871">Layers (5) · attached to every function I run</div>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd"><span>Layer</span><span>Contents</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><strong>cloud</strong><span>AWS: Lambda, S3, EC2, API Gateway, DynamoDB, Amplify · Cloud Practitioner Essentials</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><strong>code</strong><span>Python · machine learning (KNN, recommender systems, OpenVINO) · HTML, CSS, JavaScript</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><strong>security</strong><span>TryHackMe: Cyber Security 101, Defending AWS · networking and Linux basics</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><strong>people</strong><span>Building and leading communities · organising events and hands-on workshops</span></div>
                  <div style="display: grid; grid-template-columns: 130px minmax(0, 1fr); gap: 8px; padding: 8px 14px; font-size: 14px"><strong>languages</strong><span>Russian (native) · English (CPE, IELTS 8) · Spanish (C1) · Italian</span></div>
                </div>
              ` : null}

              ${v.s7 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">My latest certifications, read straight from the table. This is just the start: the table keeps growing and new items get written here as I finish them.</p>
                <div style="font-size: 12px; color: #656871">Latest items (5) · more being written</div>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd"><span>certification</span><span>issuer</span><span>date</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>AWS SBG Leader Badge</span><span>Amazon Web Services</span><span>Oct 2026</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>IELTS · overall 8 (Listening 9, Reading 9)</span><span>British Council</span><span>Oct 2026</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>Cyber Security 101 (SEC1)</span><span>TryHackMe</span><span>Jun 2026</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>McKinsey.org Forward Program</span><span>McKinsey & Company</span><span>Jun 2026</span></div>
                  <div style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px"><span>Defending AWS (56%, in progress)</span><span>TryHackMe</span><span>—</span></div>
                  <div class="writing" style="display: grid; grid-template-columns: minmax(0, 1fr) 150px 80px; gap: 8px; padding: 8px 14px; font-size: 14px; color: #656871; font-style: italic; border-top: 1px solid #ebebf0; background: #f9f9fa"><span>Next certification · writing item…</span><span>More to come</span><span>Soon</span></div>
                </div>
                <div style="font-size: 14px"><a target="_blank" rel="noopener" href="https://www.linkedin.com/in/ivan-dmitriev-uc3m/details/certifications/">Load more on LinkedIn</a></div>
              ` : null}

              ${v.s4 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">I2C (Informática To Colme) is the computer science association of the Colmenarejo campus, and I'm its Vice President. This year we restructured it: new areas for talent and marketing, a welcome guide for new members, a new visual identity and a WhatsApp community with a group for every area. Our name comes from the I²C bus, two wires that let many devices talk; that's what we try to do with people.</p>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px">
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Role</div><div>Vice President</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Association</div><div>Informática To Colme, UC3M</div></div>
                  <div style="grid-column: span 2"><div style="font-size: 14px; font-weight: 700; color: #0f141a">Named after</div><div>The I²C bus (Philips, 1982): two wires, many devices talking. We do the same with people.</div></div>
                </div>
                <div style="font-size: 14px; font-weight: 700; color: #0f141a">Rules → targets</div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px">
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">AI</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">Cybersecurity</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">Robotics</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">IBM Z</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFF4E5; color: #0f141a; border: 1px solid #FF9900; font-size: 12px; font-weight: 600">AWS SBG</span>
                  <span style="padding: 2px 10px; border-radius: 4px; background: #FFFFFF; color: #424650; border: 1px solid #c6c6cd; font-size: 12px; font-weight: 600">I2C x Open</span>
                </div>
                <div style="font-size: 14px; color: #424650">With Open, the UC3M student social network, we built its ML feed algorithm.</div>
              ` : null}

              ${v.s5 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">I like being where student voices get heard. At RITSI, the national association of computer science students, I represent UC3M and, since July 2026, I run the Social Collaboration area, which promotes social, educational and outreach initiatives. At UC3M I'm part of the Student Delegation, in the University Senate and the Coexistence Committee.</p>
                <div style="font-size: 12px; color: #656871">Messages available (4) · student representation</div>
                <div style="border: 1px solid #ebebf0; border-radius: 12px; overflow: hidden">
                  <div class="thead" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-weight: 700; color: #424650; border-bottom: 1px solid #c6c6cd; font-size: 14px"><span>Org</span><span>Role</span><span>Since</span></div>
                  <div style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>RITSI</span><span>UC3M representative</span><span>Nov 2025</span></div>
                  <div style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>RITSI</span><span>Social Collaboration officer</span><span>Jul 2026</span></div>
                  <div style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-size: 14px; border-bottom: 1px solid #ebebf0"><span>UC3M Delegation</span><span>University Senate (Claustro)</span><span>Jun 2026</span></div>
                  <div style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 110px; gap: 8px; padding: 8px 14px; font-size: 14px"><span>UC3M Delegation</span><span>Coexistence Committee</span><span>Mar 2025</span></div>
                </div>
              ` : null}

              ${v.s9 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">Since September 2026 I'm an operations intern at MAPFRE, in the Corporate Operations Area of Mawdy's central services. I work on supplier operations, learning from the inside how a large company keeps its operations running.</p>
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 18px">
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Role</div><div>Operations intern</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Company</div><div>MAPFRE · Mawdy central services</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Area</div><div>Corporate Operations · suppliers</div></div>
                  <div><div style="font-size: 14px; font-weight: 700; color: #0f141a">Since</div><div>September 2026 · Madrid, on-site</div></div>
                </div>
              ` : null}

              ${v.s10 ? html`
                <p style="margin: 0; color: #0f141a; font-size: 14px; line-height: 20px">Whether it's a workshop, a collaboration, a project or just a question about AWS, I'll answer. Pick a channel and the message is delivered straight to me.</p>
                
                <div style="display: flex; gap: 10px; flex-wrap: wrap">
                  <a href="mailto:100553235@alumnos.uc3m.es" style="padding: 6px 20px; border-radius: 20px; border: 2px solid #FF9900; background: #FF9900; color: #0f141a; font-weight: 700; text-decoration: none">Send email</a>
                  <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/ivan-dmitriev-uc3m/" style="padding: 6px 16px; border-radius: 20px; border: 2px solid #006ce0; color: #006ce0; font-weight: 700; text-decoration: none">LinkedIn</a>
                  <a target="_blank" rel="noopener" href="https://github.com/hardvanika" style="padding: 6px 16px; border-radius: 20px; border: 2px solid #006ce0; color: #006ce0; font-weight: 700; text-decoration: none">GitHub</a>
                  <a href=${v.bcUrl} target="_blank" rel="noopener" style="padding: 6px 16px; border-radius: 20px; border: 2px solid #006ce0; color: #006ce0; font-weight: 700; text-decoration: none">Builder Center</a>
                </div>
              ` : null}

              ${v.s11 ? html`
                <div style="font: 700 42px Monaco, Menlo, Consolas, 'Courier New', monospace; color: #00802f; letter-spacing: -0.02em">200 OK</div>
                <div style="font-size: 14px; color: #424650">Request completed in 84 ms. Thanks for travelling through my network.</div>
                <div><button onClick=${v.restart} style="padding: 8px 18px; border-radius: 20px; border: 2px solid #006ce0; background: #ffffff; color: #006ce0; font: 700 14px 'Hind', 'Open Sans', sans-serif; cursor: pointer; min-height: 40px">Replay request</button></div>
              ` : null}
            </div>
          </section>
        ` : null}
  </div>

      
  ${v.termOpen ? html`
    <section class="shell" ref=${v.shellRef} aria-label="CloudShell" style="${v.shellStyle} display: flex; flex-direction: column; background: #0f1b2a; border-top: 1px solid #414d5c; overflow: visible">
      ${v.notMax ? html`<div onMouseDown=${v.dragStart} title="Drag to resize" style="position: absolute; left: 0; right: 0; top: -5px; height: 18px; cursor: ns-resize; z-index: 5; display: flex; justify-content: center; align-items: center"><svg width="16" height="8" viewBox="0 0 16 8" aria-hidden="true"><path d="M1 2 H15 M1 6 H15" stroke="#c6c6cd" stroke-width="2"></path></svg></div>` : null}
      <div style="flex: none; display: flex; flex-wrap: wrap; align-items: stretch; color: #f9f9fa; padding: 14px 16px 0 24px; gap: 6px; border-bottom: 1px solid #414d5c">
        <span class="shell-title" style="order: 1; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 18px; height: 34px; margin-right: 10px"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#f9f9fa" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M15 1H1v14h14V1Z"></path><path d="M12 11H9"></path><path d="M4.71 11.3 8 8 4.71 4.71"></path></svg>CloudShell</span>
        <div aria-hidden="true" style="order: 2; flex-basis: 100%; height: 0"></div>
            <div style="order: 3; display: flex; align-items: stretch; min-width: 0; overflow-x: auto; height: 40px; margin-top: 4px">
          ${(v.tabs || []).map((tb) => html`
            <span onClick=${tb.pick} style="display: flex; align-items: center; gap: 8px; padding: 0 12px 0 20px; font-size: 14px; white-space: nowrap; cursor: pointer; color: ${tb.color}; border-bottom: 3px solid ${tb.line}; border-right: 1px solid #414d5c; font-weight: ${tb.weight}">${tb.label} <button onClick=${tb.close} aria-label="Close tab" style="background: none; border: 0; padding: 0 2px; color: #a4a4ad; cursor: pointer; font-size: 15px; line-height: 1">×</button></span>
          `)}
        </div>
        <div style="order: 4; position: relative; display: flex; align-items: center; height: 40px; margin-top: 4px; flex: 1 1 auto">
          <button onClick=${v.togglePlus} aria-label="New tab" style="height: 30px; display: flex; align-items: center; padding: 0 12px; background: none; border: 0; color: #42b4ff; font-size: 22px; cursor: pointer">+</button>
          ${v.plusOpen ? html`
            <div role="menu" style="position: absolute; left: 0; ${v.menuSide} width: 240px; z-index: 120; background: #ffffff; border-radius: 4px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0">
              <button role="menuitem" onClick=${v.newTab} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">New tab (eu-south-2)</button>
              <div style="padding: 6px 16px 2px; font: 700 12px 'Hind', 'Open Sans', sans-serif; color: #656871">Open in another Region</div>
              <button role="menuitem" onClick=${v.newTabIE} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">eu-west-1 · Ireland</button>
              <button role="menuitem" onClick=${v.newTabUS} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">us-east-1 · N. Virginia</button>
              <button role="menuitem" onClick=${v.newTabDE} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">eu-central-1 · Frankfurt</button>
            </div>
          ` : null}
        </div>
        <span style="order: 1; flex: 1"></span>
        <div style="order: 1; position: relative; display: flex; align-items: center">
          <button class="shbtn" onClick=${v.toggleActions} style="height: 32px; padding: 0 20px; border-radius: 20px; border: 2px solid #42b4ff; background: transparent; color: #42b4ff; font: 700 14px 'Hind', 'Open Sans', sans-serif; cursor: pointer">Actions <span style="font-size: 11px; margin-left: 4px">▼</span></button>
          ${v.actionsOpen ? html`
            <div role="menu" style="position: absolute; right: 0; ${v.menuSide} width: 220px; z-index: 120; background: #ffffff; border-radius: 4px; box-shadow: 0px 1px 1px 1px #e9ebed, 0px 6px 36px #0007161a; padding: 6px 0">
              <button role="menuitem" onClick=${v.runCurl} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">Send request (curl)</button>
              <button role="menuitem" onClick=${v.runLs} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">List services</button>
              <button role="menuitem" onClick=${v.runHelp} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">Show commands</button>
              <div style="height: 1px; background: #ebebf0; margin: 4px 0"></div>
              <button role="menuitem" onClick=${v.runDownload} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">Download file</button>
              <div style="height: 1px; background: #ebebf0; margin: 4px 0"></div>
              <button role="menuitem" onClick=${v.runReset} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">Restart environment</button>
              <button role="menuitem" onClick=${v.runClear} style="display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: 0; cursor: pointer; font: 400 14px 'Hind', 'Open Sans', sans-serif; color: #0f141a">Clear screen</button>
            </div>
          ` : null}
        </div>
        <button onClick=${v.toggleMax} aria-label=${v.maxLabel} title=${v.maxLabel} style="order: 1; display: flex; align-items: center; padding: 0 6px; background: none; border: 0; cursor: pointer"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#f9f9fa" stroke-width="2"><path d=${v.maxPath}></path></svg></button>
        <button class="hide-m" onClick=${v.openWindow} aria-label="Open in new browser tab" title="Open in new browser tab" style="order: 1; display: flex; align-items: center; padding: 0 6px; background: none; border: 0; cursor: pointer"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#dedee3" stroke-width="2"><path d="M9 2 H14 V7 M14 2 L7 9 M12 10 V14 H2 V4 H6"></path></svg></button>
        <button onClick=${v.toggleTerm} aria-label="Close CloudShell" style="order: 1; width: 32px; background: none; border: 0; color: #dedee3; cursor: pointer; font-size: 20px">×</button>
      </div>
      <div onClick=${v.focusTerm} style="flex: 1 1 auto; min-height: 0; overflow-y: auto; display: flex; flex-direction: column-reverse; padding: 8px 24px; font: 12px/16px Monaco, Menlo, Consolas, 'Courier Prime', Courier, 'Courier New', monospace">
        <div style="display: flex; align-items: center; gap: 6px">
          <span style="color: #f0f0f0; white-space: nowrap">${v.prompt}</span>
          <input ref=${v.termRef} type="text" aria-label="CloudShell command" value=${v.cmd} onInput=${v.onCmd} onKeyDown=${v.onCmdKey} spellcheck="false" autocomplete="off" style="flex: 1; min-width: 0; background: transparent; border: 0; outline: none; color: #f0f0f0; font: 12px/16px Monaco, Menlo, Consolas, 'Courier Prime', Courier, 'Courier New', monospace; caret-color: #f0f0f0" />
        </div>
        ${(v.lines || []).map((ln) => html`
          <div style="white-space: pre-wrap; color: #f0f0f0">${ln.t}</div>
        `)}
      </div>
    </section>
  ` : null}
  <footer class="app-foot" style="flex: none; height: 30px; background: #161d26; color: #c6c6cd; display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: 20px; padding: 0 16px; font-size: 12px">
    <span style="display: flex; gap: 20px"><button onClick=${v.toggleTerm} style="background: none; border: 0; padding: 0; color: ${v.footC}; font: 500 12px 'Hind', 'Open Sans', sans-serif; cursor: pointer; display: flex; align-items: center; gap: 6px"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M15 1H1v14h14V1Z"></path><path d="M12 11H9"></path><path d="M4.71 11.3 8 8 4.71 4.71"></path></svg>CloudShell</button><a href="mailto:100553235@alumnos.uc3m.es?subject=Feedback%20on%20your%20site" style="color: #ebebf0; text-decoration: none">Feedback</a></span><span style="text-align: center">© 2026 Ivan Dmitriev · personal site, not affiliated with Amazon Web Services</span><span></span>
  </footer>
</div>
`;

class Site extends Component {
  constructor(props) {
    super(props);
    this.P = [[60, 310], [240, 182], [390, 182], [580, 182], [825, 182], [1075, 182], [1075, 452], [910, 452], [745, 452], [580, 452], [300, 452], [60, 310]];
    this.state = { step: 0, open: false, x: 60, y: 310, playing: false, moving: false, q: '' };
    this.raf = 0; this.timer = 0; this.stageEl = null; this.trip = 0; this.hist = []; this.hi = 0;
    this.state.termOpen = true; this.state.cmd = ''; this.state.bannerOpen = true;
    this.state.actionsOpen = false;
    this.WELCOME = [
      { t: 'Preparing your terminal...', c: '#a4a4ad' },
      { t: 'Try these commands to get started:', c: '#ffffff' },
      { t: 'aws help  or  aws <command> help  or  aws <command> --cli-auto-prompt', c: '#ffffff' },
      { t: '', c: '#ffffff' },
      { t: 'You are the request. Send it through my network:  curl https://ivan.dmitriev', c: '#ff9900' },
      { t: 'More: ls · open <service> · whoami · contact · help', c: '#a4a4ad' }
    ];
    this.tabSeq = 1; this.files = ['README.md', 'ivan-dmitriev.txt'];
    this.state.tabs = [{ id: 1, region: 'eu-south-2', ip: '10-0-24-162', lines: this.WELCOME.slice() }];
    this.state.menu = ''; this.state.region = 'eu-south-2'; this.state.seenBell = false; this.BC = 'https://builder.aws.com/'; this.state.active = 0; this.state.plusOpen = false; this.state.max = false; this.state.shH = 220;
    this.onDrag = (e) => { if (!this.drag) return; var h = this.drag.h0 + (this.drag.y0 - e.clientY); h = Math.max(120, Math.min(window.innerHeight - 160, h)); this.setState({ shH: h }); };
    this.onDragEnd = () => { if (this.drag) { this.drag = null; setTimeout(this.onResize, 30); } };
    this.onFs = () => { if (!document.fullscreenElement && this.state.max && this.nativeFs) { this.nativeFs = false; this.setState({ max: false }); setTimeout(this.onResize, 30); } };
    this.SV = [
      { id: 'route53', alias: ['route53','r53','dns','who','whoami'], name: 'Route 53', act: 'resolve ivan.dmitriev → Madrid, ES', ms: 12 },
      { id: 'cloudfront', alias: ['cloudfront','cf','uc3m','university','edge'], name: 'CloudFront', act: 'edge MAD · UC3M', ms: 19 },
      { id: 'apigateway', alias: ['apigateway','api','apigw','sbg','aws-sbg'], name: 'API Gateway', act: 'POST /aws-sbg-uc3m → 202 Group Leader', ms: 27 },
      { id: 'eventbridge', alias: ['eventbridge','eb','i2c','bus'], name: 'EventBridge', act: 'put-events → bus i2c (VP)', ms: 34 },
      { id: 'sqs', alias: ['sqs','queue','ritsi','delegation','representation'], name: 'SQS', act: 'receive student-voice.fifo', ms: 41 },
      { id: 'lambda', alias: ['lambda','projects','fn'], name: 'Lambda', act: 'invoke projects()', ms: 48 },
      { id: 'dynamodb', alias: ['dynamodb','ddb','certs','certifications'], name: 'DynamoDB', act: 'query certifications', ms: 55 },
      { id: 'guardduty', alias: ['guardduty','gd','security','tryhackme','thm'], name: 'GuardDuty', act: 'findings TryHackMe → Defending AWS 56%', ms: 63 },
      { id: 'cloudwatch', alias: ['cloudwatch','cw','mapfre','work'], name: 'CloudWatch', act: 'dashboard operations · MAPFRE', ms: 72 },
      { id: 'ses', alias: ['ses','email','contact','mail'], name: 'SES', act: 'send-email → ivan', ms: 81 }
    ];
    this.CAT = {"1": ["I was born in Moscow in 2006 and grew up on the move: my family travelled a lot, so new countries became normal early. In 2022 we left for Bulgaria, then Greece, then Spain, and in 2024 I moved to Madrid for university. Every move meant a new language, new friends and someone kind enough to show me how things worked.", "Record · Type · Value", "ivan.dmitriev · A · Madrid, Spain", "born · TXT · \"Moscow, 2006\"", "route · CNAME · Bulgaria → Greece → Spain → Madrid"], "2": ["Since 2024 I study the dual degree in Business Administration and Computer Science at Universidad Carlos III de Madrid, on the Colmenarejo campus. Beyond classes I got involved in how the university works: I was elected to the University Senate (Claustro) and sit on the Coexistence Committee.", "Origin", "Universidad Carlos III de Madrid", "Degree", "BBA and Computer Science, 3rd year", "Edge location", "MAD · Colmenarejo campus", "Also at UC3M", "University Senate member"], "3": ["In September 2026 I founded the AWS Student Builder Group at UC3M and became its Group Leader. I built a core team of five leads (tech, workshops, marketing, multimedia and outreach) and on 21 October 2026 we ran our first event on campus, with speakers from AWS and industry. In November we run three hands-on workshops on Lambda, S3 and EC2, with Cloud Practitioner Essentials as the starting point for every member.", "Student Builder Group Leader and Founder · Amazon Web Services", "Group", "AWS SBG UC3M · Colmenarejo", "Since", "September 2026", "First event", "21 Oct 2026, speakers from AWS and industry", "Stages · November", "Lambda · S3 · EC2 workshops", "Join on Meetup"], "4": ["I2C (Informática To Colme) is the computer science association of the Colmenarejo campus, and I'm its Vice President. This year we restructured it: new areas for talent and marketing, a welcome guide for new members, a new visual identity and a WhatsApp community with a group for every area. Our name comes from the I²C bus, two wires that let many devices talk; that's what we try to do with people.", "Role", "Vice President", "Association", "Informática To Colme, UC3M", "Named after", "The I²C bus (Philips, 1982): two wires, many devices talking. We do the same with people.", "Rules → targets", "AI · Cybersecurity · Robotics · IBM Z · AWS SBG · I2C x Open", "With Open, the UC3M student social network, we built its ML feed algorithm."], "5": ["I like being where student voices get heard. At RITSI, the national association of computer science students, I represent UC3M and, since July 2026, I run the Social Collaboration area, which promotes social, educational and outreach initiatives. At UC3M I'm part of the Student Delegation, in the University Senate and the Coexistence Committee.", "Messages available (4) · student representation", "Org · Role · Since", "RITSI · UC3M representative · Nov 2025", "RITSI · Social Collaboration officer · Jul 2026", "UC3M Delegation · University Senate (Claustro) · Jun 2026", "UC3M Delegation · Coexistence Committee · Mar 2025"], "6": ["Small things I build to learn and to help the communities I'm part of. With I2C we built the ML feed algorithm for Open, the UC3M student social network. And this site is itself hosted on AWS Amplify: every box you open is a chapter of my story.", "Function · Description", "open-feed · ML feed for Open, the UC3M student social network", "this-site · You are inside it", "Tech superpowers", "Layers (5) · attached to every function I run", "Layer · Contents", "cloud · AWS: Lambda, S3, EC2, API Gateway, DynamoDB, Amplify · Cloud Practitioner Essentials", "code · Python · machine learning (KNN, recommender systems, OpenVINO) · HTML, CSS, JavaScript", "security · TryHackMe: Cyber Security 101, Defending AWS · networking and Linux basics", "people · Building and leading communities · organising events and hands-on workshops", "languages · Russian (native) · English (CPE, IELTS 8) · Spanish (C1) · Italian"], "7": ["My latest certifications, read straight from the table. This is just the start: the table keeps growing and new items get written here as I finish them.", "Latest items (5) · more being written", "certification · issuer · date", "AWS SBG Leader Badge · Amazon Web Services · Oct 2026", "IELTS · overall 8 (Listening 9, Reading 9) · British Council · Oct 2026", "Cyber Security 101 (SEC1) · TryHackMe · Jun 2026", "McKinsey.org Forward Program · McKinsey & Company · Jun 2026", "Defending AWS (56%, in progress) · TryHackMe · —", "Next certification · writing item… · More to come · Soon", "Load more on LinkedIn ↗"], "8": ["I learn security by doing. On TryHackMe I completed the Cyber Security 101 path, covering networking, Linux, web basics and the core offensive and defensive tools, and I'm now 56% through Defending AWS, the path on detecting and stopping attacks in AWS environments.", "Training path · Type · Status", "TryHackMe · Cyber Security 101 · Path · Completed", "TryHackMe · Defending AWS · Path · In progress · 56%", "I learn security by attacking labs, not by reading about them. My TryHackMe profile ↗"], "9": ["Since September 2026 I'm an operations intern at MAPFRE, in the Corporate Operations Area of Mawdy's central services. I work on supplier operations, learning from the inside how a large company keeps its operations running.", "Role", "Operations intern", "Company", "MAPFRE · Mawdy central services", "Area", "Corporate Operations · suppliers", "Since", "September 2026 · Madrid, on-site"], "10": ["Whether it's a workshop, a collaboration, a project or just a question about AWS, I'll answer. Pick a channel and the message is delivered straight to me.", "Send email", "LinkedIn", "GitHub", "Builder Center"]};
    this.state.k = 1;
    this.onResize = () => this.fit();
  }
  componentDidMount() { window.addEventListener('resize', this.onResize); window.addEventListener('mousemove', this.onDrag); window.addEventListener('mouseup', this.onDragEnd); document.addEventListener('fullscreenchange', this.onFs); setTimeout(this.onResize, 0); setTimeout(this.onResize, 400); }
  fit() {
    var el = this.stageEl; if (!el) return;
    var w = el.clientWidth - 16, h = el.clientHeight - 8;
    if (w <= 0 || h <= 0) return;
    var k = Math.min(w / 1200, h / 640);
    if (Math.abs(k - this.state.k) > 0.002) this.setState({ k: k });
  }
  componentWillUnmount() { window.removeEventListener('mousemove', this.onDrag); window.removeEventListener('mouseup', this.onDragEnd); document.removeEventListener('fullscreenchange', this.onFs); if (this.trip) clearTimeout(this.trip); window.removeEventListener('resize', this.onResize); if (this.raf) cancelAnimationFrame(this.raf); if (this.timer) clearInterval(this.timer); }
  seg(k) {
    var P = this.P;
    if (k === 1) return [P[0], [60, 182], P[1]];
    if (k === 11) return [P[10], [60, 452], P[11]];
    return [P[k - 1], P[k]];
  }
  pathTo(from, to) {
    var pts = [], k, sg;
    if (to > from) {
      for (k = from + 1; k <= to; k++) { sg = this.seg(k); pts = pts.concat(pts.length ? sg.slice(1) : sg); }
    } else {
      for (k = from; k > to; k--) { sg = this.seg(k).slice().reverse(); pts = pts.concat(pts.length ? sg.slice(1) : sg); }
    }
    return pts;
  }
  go(to) {
    if (to < 0 || to > 11 || this.state.moving) return;
    if (to === this.state.step && to !== 0) { this.setState({ open: true }); return; }
    if (this.state.step === 11 && to === 0) { this.setState({ step: 0, open: false, x: 60, y: 310 }); return; }
    var from = this.state.step, dirn = to > from ? 1 : -1;
    var pts = this.pathTo(from, to);
    var lens = [], total = 0;
    for (var i = 1; i < pts.length; i++) { var l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); lens.push(l); total += l; }
    var ends = [], acc = 0;
    for (var h = from; h !== to; h += dirn) { var sg = this.seg(dirn > 0 ? h + 1 : h); for (var j = 1; j < sg.length; j++) acc += Math.hypot(sg[j][0] - sg[j - 1][0], sg[j][1] - sg[j - 1][1]); ends.push(acc); }
    var hops = Math.abs(to - from);
    var dur = hops <= 1 ? (this.props.speed ?? 700) : Math.min(5200, 520 * hops);
    var t0 = performance.now();
    this.setState({ moving: true, reach: from, from0: from });
    var tick = (now) => {
      var u = Math.min(1, (now - t0) / dur);
      var e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      var dd = e * total, passed = 0;
      while (passed < ends.length && dd >= ends[passed] - 0.5) passed++;
      var reach = from + dirn * passed;
      var d = dd, k = 0;
      while (k < lens.length - 1 && d > lens[k]) { d -= lens[k]; k++; }
      var f = lens[k] ? Math.min(1, d / lens[k]) : 1;
      var x = pts[k][0] + (pts[k + 1][0] - pts[k][0]) * f;
      var y = pts[k][1] + (pts[k + 1][1] - pts[k][1]) * f;
      if (u < 1) { this.setState({ x: x, y: y, reach: reach }); this.raf = requestAnimationFrame(tick); }
      else { this.raf = 0; this.setState({ x: pts[pts.length - 1][0], y: pts[pts.length - 1][1], step: to, open: to !== 0 && (!this.tripOn || to === 11), moving: false }); if (this.onArrive) this.onArrive(to); }
    };
    this.raf = requestAnimationFrame(tick);
  }
  print(arr) { this.setState((prev) => ({ tabs: prev.tabs.map((t, i) => i === prev.active ? Object.assign({}, t, { lines: t.lines.concat(arr).slice(-160) }) : t) })); }
  fileText() {
    return ['Ivan Dmitriev', 'AWS Student Builder Group Leader · UC3M (Colmenarejo)', 'VP of I2C · BBA + Computer Science at UC3M', '', 'Route: Moscow → Bulgaria → Greece → Spain → Madrid', 'Borders changed, the builder didn\'t.', '', 'linkedin.com/in/ivan-dmitriev-uc3m', 'github.com/hardvanika'].join('\n');
  }
  togglePlayFn() {
    if (this.timer) { clearInterval(this.timer); this.timer = 0; this.setState({ playing: false }); return; }
    this.setState({ playing: true });
    if (this.state.step >= 11) this.go(0); else this.go(this.state.step + 1);
    this.timer = setInterval(() => {
      if (this.state.moving) return;
      if (this.state.step >= 11) { clearInterval(this.timer); this.timer = 0; this.setState({ playing: false }); return; }
      this.go(this.state.step + 1);
    }, 4200);
  }
  promptOf(t) { return '~ $'; }
  addTab(region) {
    this.tabSeq++;
    var ip = '10-0-' + (10 + Math.floor(Math.random() * 200)) + '-' + (10 + Math.floor(Math.random() * 240));
    var t = { id: this.tabSeq, region: region, ip: ip, lines: [{ t: 'Preparing your terminal...', c: '#a4a4ad' }, { t: 'Region: ' + region + ' · new environment ready. Type help to see commands.', c: '#ffffff' }] };
    this.setState((prev) => ({ tabs: prev.tabs.concat([t]), active: prev.tabs.length, plusOpen: false, termOpen: true, cmd: '' }));
    setTimeout(() => { if (this.termEl) this.termEl.focus(); }, 40);
  }
  closeTab(i) {
    this.setState((prev) => {
      var tabs = prev.tabs.filter((_, j) => j !== i);
      if (!tabs.length) { this.tabSeq++; return { tabs: [{ id: this.tabSeq, region: 'eu-south-2', ip: '10-0-24-162', lines: this.WELCOME.slice() }], active: 0, termOpen: false, max: false }; }
      var a = prev.active; if (i < a || a >= tabs.length) a = Math.max(0, a - 1);
      return { tabs: tabs, active: a };
    });
    setTimeout(this.onResize, 30);
  }
  setMax(on) {
    this.setState({ max: on, plusOpen: false, actionsOpen: false });
    var el = this.shellEl;
    try {
      if (on && el && el.requestFullscreen && !document.fullscreenElement) { this.nativeFs = true; el.requestFullscreen().catch(() => { this.nativeFs = false; }); }
      else if (!on && document.fullscreenElement && document.exitFullscreen) { this.nativeFs = false; document.exitFullscreen().catch(() => {}); }
    } catch (err) { this.nativeFs = false; }
    setTimeout(() => { this.onResize(); if (this.termEl) this.termEl.focus(); }, 60);
  }
  findSvc(w) { w = (w || '').toLowerCase(); for (var i = 0; i < this.SV.length; i++) { if (this.SV[i].alias.indexOf(w) >= 0 || String(i + 1) === w) return i + 1; } return 0; }
  callApi() {
    var base = (window.SITE_CONFIG && window.SITE_CONFIG.apiUrl) || '';
    if (!base) return Promise.resolve(null);
    var t0 = performance.now();
    return fetch(base.replace(/\/$/, '') + '/request', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' })
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d ? Object.assign({ rtt: Math.round(performance.now() - t0) }, d) : null)
      .catch(() => null);
  }
  runTrip() {
    if (this.tripOn) return;
    this.tripOn = true;
    this.live = this.callApi();
    var G = '#00c75f', D = '#a4a4ad';
    this.print([{ t: '> GET / HTTP/2  Host: ivan.dmitriev  User-Agent: you', c: D }]);
    var next = 1;
    this.onArrive = (k) => {
      if (k >= 1 && k <= 10) { var v = this.SV[k - 1]; this.print([{ t: '  ' + String(k).padStart(2, ' ') + '  ' + v.name.padEnd(12, ' ') + v.act.padEnd(40, ' ') + v.ms + ' ms', c: G }]); }
      if (k === 11) {
        this.tripOn = false; this.onArrive = null;
        var live = this.live || Promise.resolve(null);
        live.then((d) => {
          if (d) this.print([
            { t: '< HTTP/2 200 OK  · real round trip ' + d.rtt + ' ms · Lambda ' + (d.region || 'eu-south-2'), c: '#FF9900' },
            { t: '< x-amzn-requestid: ' + (d.requestId || '-'), c: D },
            { t: '< you are request #' + d.visits + ' to this network, logged in DynamoDB', c: '#00c75f' },
            { t: 'Open any hop with: open <service>   e.g. open i2c', c: D }
          ]);
          else this.print([{ t: '< HTTP/2 200 OK  · 84 ms · 10 hops', c: '#FF9900' }, { t: 'Open any hop with: open <service>   e.g. open i2c', c: D }]);
        });
        return;
      }
      next = k + 1;
      this.trip = setTimeout(() => this.go(next), 380);
    };
    if (this.state.step !== 0) this.setState({ step: 0, x: 60, y: 310, open: false });
    this.trip = setTimeout(() => this.go(1), 120);
  }
  exec(raw) {
    var line = (raw || '').trim();
    var D = '#a4a4ad', W = '#f9f9fa', E = '#ff7a7a';
    var tb = this.state.tabs[this.state.active] || this.state.tabs[0]; var out = [{ t: this.promptOf(tb) + ' ' + line, c: W }];
    if (!line) { this.print(out); return; }
    this.hist.push(line); this.hi = this.hist.length;
    var parts = line.split(/\s+/), c = parts[0].toLowerCase(), arg = (parts[1] || '').toLowerCase();
    if (c === 'clear') { this.setState((prev) => ({ cmd: '', tabs: prev.tabs.map((t, i) => i === prev.active ? Object.assign({}, t, { lines: [] }) : t) })); return; }
    if (c === 'exit' || c === 'logout') { this.setState({ cmd: '' }); this.closeTab(this.state.active); return; }
    if (c === 'pwd') { this.setState({ cmd: '' }); this.print(out.concat([{ t: '/home/cloudshell-user', c: D }])); return; }
    if (c === 'files' || c === 'dir' || (c === 'ls' && (arg === '-a' || arg === '-la' || arg === '-l' || arg === '~'))) { this.setState({ cmd: '' }); this.print(out.concat(this.files.map((f) => ({ t: f, c: '#5fb3ff' })))); return; }
    if (c === 'cat' || c === 'less' || c === 'more' || c === 'describe') { this.setState({ cmd: '' }); var fl = parts[1] || ''; if (!fl) { this.print(out.concat([{ t: 'usage: cat <service>   e.g. cat route53 · cat 7 · cat i2c', c: D }])); return; } var ks = this.findSvc(fl.toLowerCase().replace(/\.(json|txt|md)$/, '')); if (ks) { var sv = this.SV[ks - 1]; this.print(out.concat([{ t: '── ' + sv.id + ' · ' + sv.name + ' ──', c: '#ff9900' }], this.CAT[ks].map((x) => ({ t: x, c: W })), [{ t: '', c: D }])); this.go(ks); return; } if (fl === 'README.md' || fl === 'ivan-dmitriev.txt') this.print(out.concat(this.fileText().split('\n').map((x) => ({ t: x, c: D })))); else if (this.files.indexOf(fl) >= 0) this.print(out.concat([{ t: '(binary or uploaded file, ' + fl + ')', c: D }])); else this.print(out.concat([{ t: 'cat: ' + (fl || '') + ': No such file or directory', c: E }])); return; }
    if (c === 'aws' && arg === 'configure' && (parts[2] || '').toLowerCase() === 'get' && (parts[3] || '').toLowerCase() === 'region') { this.setState({ cmd: '' }); this.print(out.concat([{ t: tb.region, c: D }])); return; }
    this.setState({ cmd: '' });
    if (c === 'help' || (c === 'aws' && (arg === 'help' || arg === ''))) { this.print(out.concat([
      { t: 'curl https://ivan.dmitriev   send the request through every service', c: D },
      { t: 'ls                           list the services in the path', c: D },
      { t: 'cat <service>                read a service, e.g. cat route53 · cat 7', c: D },
      { t: 'open <service|n>             travel to one service, e.g. open waf, open 7', c: D },
      { t: 'whoami                       who I am', c: D },
      { t: 'aws dynamodb scan            my certifications', c: D },
      { t: 'contact                      how to reach me', c: D },
      { t: 'reset · clear                back to the start · clear the screen', c: D }])); return; }
    if (c === 'curl' || (c === 'get') || c === 'send' || c === 'ping') { this.print(out); this.runTrip(); return; }
    if (c === 'ls') { this.print(out.concat(this.SV.map((v, i) => ({ t: String(i + 1).padStart(2, ' ') + '  ' + v.id.padEnd(12, ' ') + v.act, c: D })), [{ t: 'Read any of them with: cat <name>   e.g. cat route53 · cat 7', c: '#ff9900' }])); return; }
    if (c === 'whoami') { this.print(out.concat([{ t: 'Ivan Dmitriev · Moscow → Bulgaria → Greece → Spain → Madrid', c: W }, { t: 'AWS Student Builder Group Leader (UC3M) · VP of I2C · BBA + CS at UC3M', c: D }, { t: 'Borders changed, the builder didn\'t.', c: '#FF9900' }])); this.go(1); return; }
    if (c === 'contact') { this.print(out.concat([{ t: 'linkedin.com/in/ivan-dmitriev-uc3m · github.com/hardvanika · 100553235@alumnos.uc3m.es', c: D }])); this.go(10); return; }
    if (c === 'reset') { this.print(out); this.go(0); return; }
    if (c === 'aws') {
      var k = this.findSvc(arg);
      if (k) { this.print(out.concat([{ t: 'Request sent to ' + this.SV[k - 1].name + ' …', c: D }])); this.go(k); return; }
      this.print(out.concat([{ t: 'aws: unknown service "' + arg + '". Try: ls', c: E }])); return;
    }
    if (c === 'open' || c === 'cd' || c === 'goto') {
      var k2 = this.findSvc(arg);
      if (k2) { this.print(out.concat([{ t: 'Routing to ' + this.SV[k2 - 1].name + ' …', c: D }])); this.go(k2); return; }
      this.print(out.concat([{ t: 'open: no such service "' + arg + '". Try: ls', c: E }])); return;
    }
    var k3 = this.findSvc(c);
    if (k3) { this.print(out); this.go(k3); return; }
    if (c === 'sudo') { this.print(out.concat([{ t: 'Nice try. Permission denied: IAM policy says no.', c: E }])); return; }
    this.print(out.concat([{ t: c + ': command not found. Try: help', c: E }]));
  }
  renderVals() {
    var st = this.state, step = st.step, lit = st.moving ? st.reach : step;
    var ICON = {
      r53: 'assets/icons/AmazonRoute53.svg', cf: 'assets/icons/AmazonCloudFront.svg', waf: 'assets/icons/AWSWAF.svg',
      apigw: 'assets/icons/AmazonAPIGateway.svg', lambda: 'assets/icons/AWSLambda.svg', ddb: 'assets/icons/AmazonDynamoDB.svg',
      eb: 'assets/icons/AmazonEventBridge.svg', gd: 'assets/icons/AmazonGuardDuty.svg', sqs: 'assets/icons/AmazonSimpleQueueService.svg', cw: 'assets/icons/AmazonCloudWatch.svg',
      ses: 'assets/icons/AmazonSimpleEmailService.svg', cloud: 'assets/icons/AWSCloudlogo.svg'
    };
    var N = [
      { label: 'Amazon Route 53', icon: ICON.r53, service: 'Route 53', region: 'Global', crumbs: 'Route 53 › Hosted zones', leaf: 'ivan.dmitriev', title: 'Who is Ivan', status: 'Resolved', ms: 12 },
      { label: 'Amazon CloudFront', icon: ICON.cf, service: 'CloudFront', region: 'Global', crumbs: 'CloudFront › Distributions', leaf: 'uc3m', title: 'Served from Madrid', status: 'Enabled', ms: 19 },
      { label: 'Amazon API Gateway', icon: ICON.apigw, service: 'API Gateway', region: 'Spain', crumbs: 'API Gateway › APIs', leaf: 'aws-sbg-uc3m', title: 'AWS Student Builder Group Leader', status: 'Authorized', ms: 27 },
      { label: 'Amazon EventBridge', icon: ICON.eb, service: 'EventBridge', region: 'Spain', crumbs: 'EventBridge › Event buses', leaf: 'i2c', title: 'I2C, we connect', status: 'Running', ms: 34 },
      { label: 'Amazon SQS', icon: ICON.sqs, service: 'Simple Queue Service', region: 'Spain', crumbs: 'SQS › Queues', leaf: 'student-voice.fifo', title: 'Student representation', status: 'Available', ms: 41 },
      { label: 'AWS Lambda', icon: ICON.lambda, service: 'Lambda', region: 'Spain', crumbs: 'Lambda › Functions', leaf: 'projects', title: 'Tech superpowers & things I built', status: 'Active', ms: 48 },
      { label: 'Amazon DynamoDB', icon: ICON.ddb, service: 'DynamoDB', region: 'Spain', crumbs: 'DynamoDB › Tables › certifications', leaf: 'Explore items', title: 'Latest certifications', status: 'Active', ms: 55 },
      { label: 'Amazon GuardDuty', icon: ICON.gd, service: 'GuardDuty', region: 'Spain', crumbs: 'GuardDuty › Findings', leaf: 'tryhackme', title: 'Security training', status: 'Learning', ms: 63 },
      { label: 'Amazon CloudWatch', icon: ICON.cw, service: 'CloudWatch', region: 'Spain', crumbs: 'CloudWatch › Dashboards', leaf: 'operations', title: 'MAPFRE · Operations', status: 'In alarm: OK', ms: 72 },
      { label: 'Amazon SES', icon: ICON.ses, service: 'Simple Email Service', region: 'Spain', crumbs: 'SES › Verified identities', leaf: 'ivan', title: 'Get in touch', status: 'Verified', ms: 81 },
      { label: 'You', icon: ICON.cloud, service: 'Response', region: 'Client', crumbs: 'Request', leaf: 'GET /ivan', title: 'Delivered', status: '200', ms: 84 }
    ];
    var KW = ["who born moscow bulgaria greece castellon madrid countries", "uc3m university degree business computer science colmenarejo claustro senate", "aws student builder group sbg leader founder workshops lambda s3 ec2 event community", "i2c association vice president vp bus open", "sqs queue ritsi delegation representation students senate committee claustro", "projects lambda open feed ml site built skills superpowers tech python aws security languages layers", "certifications certs dynamodb linkedin", "tryhackme security cyber hacking guardduty defending aws threats", "mapfre mawdy operations intern work", "contact email linkedin github ses message"];
    var q = (st.q || '').trim().toLowerCase();
    var results = [];
    if (q) N.slice(0, 10).forEach((n, i) => { var hay = (n.label + ' ' + n.title + ' ' + KW[i]).toLowerCase(); if (hay.indexOf(q) >= 0) results.push({ label: n.label, title: n.title, icon: n.icon, pick: () => { this.setState({ q: '' }); this.go(i + 1); } }); });
    results = results.slice(0, 6);
    var P = this.P;
    var nodes = N.slice(0, 10).map((n, i) => {
      var k = i + 1;
      return {
        label: n.label, icon: n.icon, num: k,
        hasHead: [1, 3, 6, 10].indexOf(k) >= 0, head: { 1: 'Personal', 3: 'Social', 6: 'Technical & work', 10: 'Contact' }[k] || '',
        left: P[k][0] - 75, top: P[k][1] - 32,
        op: lit >= k ? 1 : (lit === 0 ? 0.85 : 0.5),
        ring: step === k && !st.moving ? '0 0 0 3px #FFFFFF, 0 0 0 6px #FF9900' : (st.moving && st.reach === k && k !== st.from0 ? '0 0 0 3px #FFFFFF, 0 0 0 5px #FFD49A' : 'none'),
        navC: step === k ? '#006ce0' : '#424650',
        navW: step === k ? 700 : 400,
        isNew: false,
        pick: (e) => { if (e && e.preventDefault) e.preventDefault(); this.go(k); }
      };
    });
    var seg = [], heads = [];
    var add = (x1, y1, x2, y2, idx, head) => {
      var done = lit >= idx;
      var c = done ? '#FF9900' : '#232F3E';
      if (y1 === y2) {
        seg.push({ cls: 'segH', x: Math.min(x1, x2), y: y1 - 1, w: Math.abs(x2 - x1), h: 2, dir: x2 > x1 ? 'normal' : 'reverse', bg: 'repeating-linear-gradient(90deg, ' + c + ' 0 7px, transparent 7px 12px)' });
        if (head) heads.push({ x: x2 > x1 ? x2 - 11 : x2 - 1, y: y1 - 6, rot: x2 > x1 ? 0 : 180, c: c });
      } else {
        seg.push({ cls: 'segV', x: x1 - 1, y: Math.min(y1, y2), w: 2, h: Math.abs(y2 - y1), dir: y2 > y1 ? 'normal' : 'reverse', bg: 'repeating-linear-gradient(180deg, ' + c + ' 0 7px, transparent 7px 12px)' });
        if (head) heads.push({ x: x1 - 6, y: y2 > y1 ? y2 - 11 : y2 - 1, rot: y2 > y1 ? 90 : -90, c: c });
      }
    };
    add(60, 278, 60, 182, 1, false); add(60, 182, 204, 182, 1, true);
    add(276, 182, 354, 182, 2, true); add(426, 182, 544, 182, 3, true); add(616, 182, 789, 182, 4, true);
    add(861, 182, 1039, 182, 5, true);
    add(1075, 246, 1075, 416, 6, true);
    add(1039, 452, 946, 452, 7, true); add(874, 452, 781, 452, 8, true); add(709, 452, 616, 452, 9, true);
    add(544, 452, 336, 452, 10, true);
    add(264, 452, 60, 452, 11, false); add(60, 452, 60, 372, 11, true);
    var win = step >= 1 ? N[step - 1] : N[0];
    var cx = P[step][0], cy = P[step][1];
    var left = Math.max(0, Math.min(1200 - 474, cx - 235));
    var winPos;
    if (step === 11) winPos = 'left: 130px; top: 120px;';
    else if (cx < 640) winPos = 'left: ' + (cx < 300 ? 640 : 655) + 'px; top: 20px;';
    else winPos = 'left: ' + (cx > 950 ? 150 : 140) + 'px; top: 20px;';
    var flags = {};
    for (var i = 1; i <= 11; i++) flags['s' + i] = st.open && step === i;
    var bitsArr = ['01001001', '01110110', '01100001', '01101110'];
    var nextLabel = step === 0 ? 'Send request' : (step >= 11 ? 'Send again' : 'Next service →');
    return Object.assign({
      nodes: nodes, segs: seg, heads: heads,
      q: st.qw === 'arch' ? '' : st.q, qArch: st.qw === 'arch' ? st.q : '', results: results, hasResults: !!q && st.qw !== 'arch', hasResults2: !!q && st.qw === 'arch', noResults: !!q && results.length === 0,
      onSearch: (e) => this.setState({ q: e.target.value, qw: 'top' }),
      onSearch2: (e) => this.setState({ q: e.target.value, qw: 'arch' }),
      pageNext: () => this.go(Math.min(11, this.state.step + 1)), pagePrev: () => this.go(Math.max(0, this.state.step - 1)), pageNum: st.step > 10 ? 10 : st.step,
      pages: [1,2,3,4,5,6,7,8,9,10].map((k) => ({ num: k, aria: 'Hop ' + k, w: st.step === k ? 700 : 400, c: st.step === k ? '#0f141a' : '#656871', pick: () => this.go(k) })),
      playIcon: st.playing ? 'M4 2v12M12 2v12' : 'M4 2v12l9-6z',
      onSearchKey: (e) => { if (e.key === 'Enter' && results.length) results[0].pick(); if (e.key === 'Escape') this.setState({ q: '' }); },
      k: this.state.k.toFixed(4),
      stageRef: (el) => { this.stageEl = el; if (el) { setTimeout(this.onResize, 0); if (window.ResizeObserver && !this.ro) { this.ro = new ResizeObserver(() => this.onResize()); this.ro.observe(el); } } },
      dotX: st.x.toFixed(1), dotY: st.y.toFixed(1),
      dotO: st.moving ? 1 : 0,
      bits: bitsArr[Math.floor((st.x + st.y) / 40) % 4],
      showHint: true,
      hasWin: st.open && step >= 1,
      win: win, winPos: winPos,
      hopNum: Math.min(step, 10), ms: step >= 1 ? N[step - 1].ms : 0,
      primaryLabel: nextLabel,
      playLabel: st.playing ? 'Pause' : 'Autoplay',
      primary: () => { if (this.state.step >= 11) this.go(0); else this.go(this.state.step + 1); },
      prev: () => this.go(Math.max(0, this.state.step - 1)),
      restart: (e) => { if (e && e.preventDefault) e.preventDefault(); this.go(0); },
      close: () => this.setState({ open: false }),
      termOpen: st.termOpen, cmd: st.cmd,
      bannerOpen: st.bannerOpen,
      reqOpen: !st.reqClosed, reqRot: st.reqClosed ? -90 : 0, toggleReq: () => this.setState({ reqClosed: !this.state.reqClosed }),
      socOpen: !st.socClosed, socRot: st.socClosed ? -90 : 0, toggleSoc: () => this.setState({ socClosed: !this.state.socClosed }),
      footC: st.termOpen ? '#42b4ff' : '#ebebf0',
      navDisp: st.navHidden ? 'none' : 'flex',
      toggleNav: () => { if (window.innerWidth <= 900) { this.setState({ menu: this.state.menu === 'services' ? '' : 'services' }); return; } this.setState({ navHidden: !this.state.navHidden }); setTimeout(this.onResize, 30); },
      closeBanner: () => { this.setState({ bannerOpen: false }); setTimeout(this.onResize, 30); },
      bcUrl: this.BC,
      mInfo: st.menu === 'info',
      menuInfo: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ bannerOpen: true, menu: this.state.menu === 'info' ? '' : 'info' }); },
      closeA: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ open: false }); },
      goEdge: () => this.go(1), goPub: () => this.go(3), goPriv: () => this.go(6), goContact: () => this.go(10),
      regionLink: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ menu: 'region' }); },
      anyMenu: !!st.menu || st.plusOpen || st.actionsOpen,
      closeMenus: () => this.setState({ menu: '', plusOpen: false, actionsOpen: false }),
      mServices: st.menu === 'services', mBell: st.menu === 'bell', mHelp: st.menu === 'help', mRegion: st.menu === 'region', mAccount: st.menu === 'account',
      menuServices: () => this.setState({ menu: this.state.menu === 'services' ? '' : 'services' }),
      menuBell: () => this.setState({ menu: this.state.menu === 'bell' ? '' : 'bell', seenBell: true }),
      menuHelp: () => this.setState({ menu: this.state.menu === 'help' ? '' : 'help' }),
      menuRegion: () => this.setState({ menu: this.state.menu === 'region' ? '' : 'region' }),
      menuAccount: () => this.setState({ menu: this.state.menu === 'account' ? '' : 'account' }),
      bellDot: !st.seenBell,
      svcMenu: [['Networking & Content Delivery', [1, 2, 3]], ['Application Integration', [4, 5]], ['Compute', [6]], ['Database', [7]], ['Security, Identity & Compliance', [8]], ['Management & Governance', [9]], ['Business Applications', [10]]].map((g) => ({ cat: g[0], items: g[1].map((k) => ({ label: N[k - 1].label, title: N[k - 1].title, icon: N[k - 1].icon, pick: () => { this.setState({ menu: '' }); this.go(k); } })) })),
      notes: [
        { title: 'Lambda workshop · Wed 11 Nov, 14:00', sub: 'AWS SBG UC3M · Colmenarejo · Meetup', href: 'https://www.meetup.com/aws-sbg-at-charles-iii-univ-of-madrid-colmenarejo-campus/' },
        { title: 'S3 workshop · Wed 18 Nov, 14:00', sub: 'AWS SBG UC3M · Colmenarejo · Meetup', href: 'https://www.meetup.com/aws-sbg-at-charles-iii-univ-of-madrid-colmenarejo-campus/' },
        { title: 'EC2 workshop · Wed 25 Nov, 14:00', sub: 'AWS SBG UC3M · Colmenarejo · Meetup', href: 'https://www.meetup.com/aws-sbg-at-charles-iii-univ-of-madrid-colmenarejo-campus/' }
      ],
      helpCommands: () => { this.setState({ menu: '', termOpen: true }); this.exec('help'); },
      helpTour: () => { this.setState({ menu: '' }); if (!this.timer) this.togglePlayFn(); },
      helpCurl: () => { this.setState({ menu: '', termOpen: true }); this.exec('curl https://ivan.dmitriev'); },
      helpContact: () => { this.setState({ menu: '' }); this.go(10); },
      signOut: () => { this.setState({ menu: '' }); this.print([{ t: 'Signed out. Thanks for visiting. Session reset.', c: '#a4a4ad' }]); this.go(0); },
      regionName: { 'eu-south-2': 'Spain', 'eu-west-1': 'Ireland', 'eu-central-1': 'Frankfurt', 'eu-north-1': 'Stockholm', 'us-east-1': 'N. Virginia' }[st.region],
      regions: [['Europe (Spain)', 'eu-south-2'], ['Europe (Ireland)', 'eu-west-1'], ['Europe (Frankfurt)', 'eu-central-1'], ['Europe (Stockholm)', 'eu-north-1'], ['US East (N. Virginia)', 'us-east-1']].map((r) => ({ name: r[0], code: r[1], check: r[1] === st.region ? '✓' : '', w: r[1] === st.region ? 700 : 400,
        pick: () => { this.setState({ menu: '', region: r[1] }); if (r[1] !== this.state.region) this.print([{ t: 'Console Region switched to ' + r[0] + ' (' + r[1] + ').' + (r[1] === 'eu-south-2' ? '' : ' Note: this network is deployed in eu-south-2, requests still route through Spain.'), c: '#a4a4ad' }]); } })),
      lines: ((st.tabs[st.active] || st.tabs[0]).lines).slice().reverse(),
      prompt: this.promptOf(st.tabs[st.active] || st.tabs[0]),
      tabs: st.tabs.map((t, i) => ({ label: t.region + (st.tabs.filter((u) => u.region === t.region).length > 1 ? ' (' + (st.tabs.filter((u, j) => u.region === t.region && j <= i).length) + ')' : ''), color: i === st.active ? '#42b4ff' : '#c6c6cd', line: i === st.active ? '#42b4ff' : 'transparent', weight: i === st.active ? 700 : 400,
        pick: () => { this.setState({ active: i, cmd: '' }); setTimeout(() => { if (this.termEl) this.termEl.focus(); }, 20); },
        close: (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.closeTab(i); } })),
      plusOpen: st.plusOpen,
      togglePlus: () => this.setState({ plusOpen: !this.state.plusOpen, actionsOpen: false }),
      newTab: () => this.addTab('eu-south-2'),
      newTabIE: () => this.addTab('eu-west-1'),
      newTabUS: () => this.addTab('us-east-1'),
      newTabDE: () => this.addTab('eu-central-1'),
      notMax: !st.max,
      menuSide: st.max ? 'top: 34px;' : 'bottom: 34px;',
      shellStyle: st.max ? 'position: fixed; inset: 0; z-index: 100; height: auto;' : 'position: relative; flex: none; height: ' + st.shH + 'px;',
      maxLabel: st.max ? 'Exit full screen' : 'Full screen',
      maxPath: st.max ? 'M10 1v5h5M10.71 5.29 15 1M1 10h5v5M5.3 10.7 1 15' : 'M14 7V2H9M10 6l4-4M6.99 14H2V9M6 10l-4 4M9 14h5V9M10 10l4 4M2 6.99V2h5M6 6 2 2',
      toggleMax: () => this.setMax(!this.state.max),
      openWindow: () => { var w = null; try { w = window.open(window.location.href, '_blank', 'noopener'); } catch (err) { w = null; } if (!w) this.setMax(true); },
      shellRef: (el) => { this.shellEl = el; },
      fileRef: (el) => { this.fileEl = el; },
      dragStart: (e) => { e.preventDefault(); this.drag = { y0: e.clientY, h0: this.state.shH }; },
      runDownload: () => {
        this.setState({ actionsOpen: false });
        try { var b = new Blob([this.fileText() + '\n'], { type: 'text/plain' }); var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'ivan-dmitriev.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); this.print([{ t: 'Download complete: /home/cloudshell-user/ivan-dmitriev.txt', c: '#00c75f' }]); }
        catch (err) { this.print([{ t: 'Download blocked by the browser. Try: cat ivan-dmitriev.txt', c: '#ff7a7a' }]); }
      },
      runUpload: () => { this.setState({ actionsOpen: false }); if (this.fileEl) this.fileEl.click(); },
      onUpload: (e) => { var f = e.target.files && e.target.files[0]; if (!f) return; if (this.files.indexOf(f.name) < 0) this.files.push(f.name); this.print([{ t: 'Upload complete: ' + f.name + ' (' + f.size + ' bytes) → /home/cloudshell-user/' + f.name, c: '#00c75f' }]); e.target.value = ''; },
      onCmd: (e) => this.setState({ cmd: e.target.value }),
      onCmdKey: (e) => {
        if (e.key === 'Enter') { e.preventDefault(); this.exec(e.target.value); }
        else if (e.key === 'ArrowUp' && this.hist.length) { e.preventDefault(); this.hi = Math.max(0, this.hi - 1); this.setState({ cmd: this.hist[this.hi] }); }
        else if (e.key === 'ArrowDown' && this.hist.length) { e.preventDefault(); this.hi = Math.min(this.hist.length, this.hi + 1); this.setState({ cmd: this.hist[this.hi] || '' }); }
      },
      runCurl: () => { this.setState({ actionsOpen: false }); this.exec('curl https://ivan.dmitriev'); },
      runHelp: () => { this.setState({ actionsOpen: false }); this.exec('help'); },
      runLs: () => { this.setState({ actionsOpen: false }); this.exec('ls'); },
      runReset: () => { this.setState({ actionsOpen: false }); this.exec('reset'); },
      runClear: () => { this.setState({ actionsOpen: false }); this.exec('clear'); },
      actionsOpen: st.actionsOpen,
      toggleActions: () => this.setState({ actionsOpen: !this.state.actionsOpen, plusOpen: false }),
      termRef: (el) => { this.termEl = el; },
      focusTerm: () => { if (this.termEl) this.termEl.focus(); },
      toggleTerm: () => { if (this.state.max) this.setMax(false); this.setState({ termOpen: !this.state.termOpen }); setTimeout(this.onResize, 30); },
      togglePlay: () => this.togglePlayFn(),
      _unusedPlay: () => {
        if (this.timer) { clearInterval(this.timer); this.timer = 0; this.setState({ playing: false }); return; }
        this.setState({ playing: true });
        if (this.state.step >= 11) this.go(0); else this.go(this.state.step + 1);
        this.timer = setInterval(() => {
          if (this.state.step >= 11) { clearInterval(this.timer); this.timer = 0; this.setState({ playing: false }); return; }
          this.go(this.state.step + 1);
        }, 4200);
      }
    }, flags);
  }
}

Site.prototype.render = function () { return view(this.renderVals()); };
Site.defaultProps = { speed: 700 };

render(html`<${Site} />`, document.getElementById('app'));
