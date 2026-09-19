const event = {
  title: "Wedding Ceremony — Avishka & Anush",
  description: "Wedding ceremony of Avishka & Anush. Please join us for our special day.",
  location: "Arangala Forest Lodge, Sri Lanka",
  start: "20260101T100000",
  end: "20260101T140000"
};

function pad(n){return String(n).padStart(2,"0")}
function googleCalendarUrl(){
  const p = new URLSearchParams({
    action:"TEMPLATE",
    text:event.title,
    dates:`${event.start}/${event.end}`,
    details:event.description,
    location:event.location
  });
  return "https://calendar.google.com/calendar/render?" + p.toString();
}
function addToCalendar(){
  const ics = [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//AvishkaAndAnush//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN","METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${event.start}`,`DTEND:${event.end}`,
    `SUMMARY:${event.title}`,`DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED","END:VEVENT","END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([ics],{type:"text/calendar;charset=utf-8"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Avishka-Anush-Wedding-2026.ics";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(a.href);
  showToast("Calendar file added — open it to save the wedding date.");
}
document.getElementById("calendarBtn").addEventListener("click", addToCalendar);
document.getElementById("calendarBtn2").addEventListener("click", addToCalendar);

document.getElementById("copyLocation").addEventListener("click", async ()=>{
  try{
    await navigator.clipboard.writeText("Arangala Forest Lodge — https://maps.app.goo.gl/MHwdkMTHvmZjKQhC8");
    showToast("Location link copied.");
  }catch(e){ showToast("Please use the Google Maps button to open the location."); }
});

function showToast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.classList.remove("show"),3200);
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("visible"); observer.unobserve(e.target); }});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const menu=document.querySelector(".menu-btn"), links=document.querySelector(".nav-links");
menu.addEventListener("click",()=>{
  const open=links.classList.toggle("open");
  menu.setAttribute("aria-expanded",open);
});
links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));

if("serviceWorker" in navigator){ window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{})); }
