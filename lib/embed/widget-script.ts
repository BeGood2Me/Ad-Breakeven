import { SITE_NAME, SITE_URL } from "@/lib/site";

export function buildWidgetScript(
  siteUrl: string = SITE_URL,
  siteName: string = SITE_NAME
) {
  return `(function(){
var SITE_URL=${JSON.stringify(siteUrl)};
var SITE_NAME=${JSON.stringify(siteName)};

function parseNum(value){
  var n=parseFloat(String(value).replace(/[^0-9.\\-]/g,""));
  return Number.isFinite(n)?n:0;
}

function formatCurrency(n){
  if(!Number.isFinite(n))return"—";
  return"$"+n.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:2});
}

function formatRoas(n){
  if(!Number.isFinite(n))return"—";
  return n.toFixed(2)+"×";
}

function formatCount(n){
  if(!Number.isFinite(n))return"—";
  return n.toLocaleString(undefined,{maximumFractionDigits:1});
}

function contribution(value,marginPercent,fixedCost){
  var c=value*(marginPercent/100)-fixedCost;
  return c>0?c:null;
}

function calcBreakEvenRoas(value,marginPercent,fixedCost){
  var c=contribution(value,marginPercent,fixedCost);
  if(!c)return null;
  return{contribution:c,breakEvenRoas:value/c};
}

function calcBreakEvenAds(value,marginPercent,fixedCost,adSpend,conversionRatePercent){
  var c=contribution(value,marginPercent,fixedCost);
  if(!c)return null;
  var breakEvenSales=adSpend/c;
  var maxCpc=conversionRatePercent>0?c*(conversionRatePercent/100):null;
  var breakEvenRevenue=breakEvenSales*value;
  var breakEvenRoas=adSpend>0?breakEvenRevenue/adSpend:null;
  return{contribution:c,breakEvenSales:breakEvenSales,maxCpa:c,maxCpc:maxCpc,breakEvenRoas:breakEvenRoas};
}

function calcMaxCpc(value,marginPercent,fixedCost,conversionRatePercent){
  var c=contribution(value,marginPercent,fixedCost);
  if(!c)return null;
  var maxCpc=conversionRatePercent>0?c*(conversionRatePercent/100):null;
  return{contribution:c,maxCpa:c,maxCpc:maxCpc};
}

function calcAdProfit(value,marginPercent,fixedCost,adSpend,sales){
  var c=contribution(value,marginPercent,fixedCost);
  if(!c&&sales>0)return null;
  var revenue=sales*value;
  var totalContribution=c?c*sales:null;
  var profit=totalContribution!==null?totalContribution-adSpend:null;
  var roas=adSpend>0?revenue/adSpend:null;
  var breakEvenRoas=c&&value>0?value/c:null;
  return{revenue:revenue,profit:profit,roas:roas,breakEvenRoas:breakEvenRoas,isProfitable:profit!==null?profit>0:null};
}

function styles(){
  if(document.getElementById("abw-styles"))return;
  var style=document.createElement("style");
  style.id="abw-styles";
  style.textContent=[
    ".abw{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;line-height:1.45;color:#111;max-width:480px}",
    ".abw *{box-sizing:border-box}",
    ".abw-label{display:block;font-weight:600;margin:0 0 4px}",
    ".abw-field{margin:0 0 12px}",
    ".abw-input{width:100%;padding:8px 10px;border:1px solid #ccc;border-radius:8px;font:inherit}",
    ".abw-results{margin-top:12px;padding:12px;border:1px solid #e5e5e5;border-radius:10px;background:#fafafa}",
    ".abw-result-row{display:flex;justify-content:space-between;gap:12px;margin:0 0 6px}",
    ".abw-result-row:last-child{margin-bottom:0}",
    ".abw-result-value{font-weight:700}",
    ".abw-attribution{margin:12px 0 0;font-size:13px;color:#555}",
    ".abw-attribution a{color:#1d4ed8;text-decoration:underline;font-weight:600}"
  ].join("");
  document.head.appendChild(style);
}

function attribution(label){
  return '<p class="abw-attribution">'+label+' via <a href="'+SITE_URL+'" target="_blank" rel="noopener noreferrer">'+SITE_NAME+"</a></p>";
}

function bindInputs(elements,render){
  ["input","change"].forEach(function(evt){
    elements.forEach(function(el){el.addEventListener(evt,render);});
  });
  render();
}

function mountBreakEvenRoas(container,label){
  container.innerHTML="";
  container.classList.add("abw");
  container.dataset.abMounted="true";
  var form=document.createElement("div");
  form.innerHTML=[
    '<div class="abw-field"><label class="abw-label">Average order value ($)</label><input class="abw-input" data-abw="value" type="text" inputmode="decimal" value="100"></div>',
    '<div class="abw-field"><label class="abw-label">Gross margin (%)</label><input class="abw-input" data-abw="margin" type="text" inputmode="decimal" value="50"></div>',
    '<div class="abw-field"><label class="abw-label">Fixed cost per order ($)</label><input class="abw-input" data-abw="fixed" type="text" inputmode="decimal" value="0"></div>',
    '<div class="abw-results" aria-live="polite">',
    '<div class="abw-result-row"><span>Contribution per order</span><span class="abw-result-value" data-abw-out="contribution">—</span></div>',
    '<div class="abw-result-row"><span>Break-even ROAS</span><span class="abw-result-value" data-abw-out="roas">—</span></div>',
    "</div>",
    attribution(label)
  ].join("");
  container.appendChild(form);
  var inputs={value:form.querySelector('[data-abw="value"]'),margin:form.querySelector('[data-abw="margin"]'),fixed:form.querySelector('[data-abw="fixed"]')};
  var outs={contribution:form.querySelector('[data-abw-out="contribution"]'),roas:form.querySelector('[data-abw-out="roas"]')};
  bindInputs([inputs.value,inputs.margin,inputs.fixed],function(){
    var result=calcBreakEvenRoas(parseNum(inputs.value.value),parseNum(inputs.margin.value),parseNum(inputs.fixed.value));
    if(!result){outs.contribution.textContent="—";outs.roas.textContent="—";return;}
    outs.contribution.textContent=formatCurrency(result.contribution);
    outs.roas.textContent=formatRoas(result.breakEvenRoas);
  });
}

function mountBreakEven(container){
  container.innerHTML="";
  container.classList.add("abw");
  container.dataset.abMounted="true";
  var form=document.createElement("div");
  form.innerHTML=[
    '<div class="abw-field"><label class="abw-label">Average order value ($)</label><input class="abw-input" data-abw="value" type="text" inputmode="decimal" value="100"></div>',
    '<div class="abw-field"><label class="abw-label">Gross margin (%)</label><input class="abw-input" data-abw="margin" type="text" inputmode="decimal" value="50"></div>',
    '<div class="abw-field"><label class="abw-label">Fixed cost per order ($)</label><input class="abw-input" data-abw="fixed" type="text" inputmode="decimal" value="0"></div>',
    '<div class="abw-field"><label class="abw-label">Ad spend ($)</label><input class="abw-input" data-abw="adSpend" type="text" inputmode="decimal" value="1000"></div>',
    '<div class="abw-field"><label class="abw-label">Conversion rate (%)</label><input class="abw-input" data-abw="conversion" type="text" inputmode="decimal" value="2"></div>',
    '<div class="abw-results" aria-live="polite">',
    '<div class="abw-result-row"><span>Break-even ROAS</span><span class="abw-result-value" data-abw-out="roas">—</span></div>',
    '<div class="abw-result-row"><span>Max CPA</span><span class="abw-result-value" data-abw-out="cpa">—</span></div>',
    '<div class="abw-result-row"><span>Max CPC</span><span class="abw-result-value" data-abw-out="cpc">—</span></div>',
    '<div class="abw-result-row"><span>Break-even conversions</span><span class="abw-result-value" data-abw-out="sales">—</span></div>',
    "</div>",
    attribution("Break-even ads calculator")
  ].join("");
  container.appendChild(form);
  var els={
    value:form.querySelector('[data-abw="value"]'),
    margin:form.querySelector('[data-abw="margin"]'),
    fixed:form.querySelector('[data-abw="fixed"]'),
    adSpend:form.querySelector('[data-abw="adSpend"]'),
    conversion:form.querySelector('[data-abw="conversion"]')
  };
  var outs={
    roas:form.querySelector('[data-abw-out="roas"]'),
    cpa:form.querySelector('[data-abw-out="cpa"]'),
    cpc:form.querySelector('[data-abw-out="cpc"]'),
    sales:form.querySelector('[data-abw-out="sales"]')
  };
  bindInputs([els.value,els.margin,els.fixed,els.adSpend,els.conversion],function(){
    var result=calcBreakEvenAds(parseNum(els.value.value),parseNum(els.margin.value),parseNum(els.fixed.value),parseNum(els.adSpend.value),parseNum(els.conversion.value));
    if(!result){outs.roas.textContent="—";outs.cpa.textContent="—";outs.cpc.textContent="—";outs.sales.textContent="—";return;}
    outs.roas.textContent=formatRoas(result.breakEvenRoas);
    outs.cpa.textContent=formatCurrency(result.maxCpa);
    outs.cpc.textContent=formatCurrency(result.maxCpc);
    outs.sales.textContent=formatCount(result.breakEvenSales);
  });
}

function mountMaxCpa(container){
  container.innerHTML="";
  container.classList.add("abw");
  container.dataset.abMounted="true";
  var form=document.createElement("div");
  form.innerHTML=[
    '<div class="abw-field"><label class="abw-label">Average order value ($)</label><input class="abw-input" data-abw="value" type="text" inputmode="decimal" value="100"></div>',
    '<div class="abw-field"><label class="abw-label">Gross margin (%)</label><input class="abw-input" data-abw="margin" type="text" inputmode="decimal" value="50"></div>',
    '<div class="abw-field"><label class="abw-label">Fixed cost per order ($)</label><input class="abw-input" data-abw="fixed" type="text" inputmode="decimal" value="0"></div>',
    '<div class="abw-results" aria-live="polite">',
    '<div class="abw-result-row"><span>Contribution per conversion</span><span class="abw-result-value" data-abw-out="contribution">—</span></div>',
    '<div class="abw-result-row"><span>Max CPA</span><span class="abw-result-value" data-abw-out="cpa">—</span></div>',
    "</div>",
    attribution("Max CPA calculator")
  ].join("");
  container.appendChild(form);
  var inputs={value:form.querySelector('[data-abw="value"]'),margin:form.querySelector('[data-abw="margin"]'),fixed:form.querySelector('[data-abw="fixed"]')};
  var outs={contribution:form.querySelector('[data-abw-out="contribution"]'),cpa:form.querySelector('[data-abw-out="cpa"]')};
  bindInputs([inputs.value,inputs.margin,inputs.fixed],function(){
    var c=contribution(parseNum(inputs.value.value),parseNum(inputs.margin.value),parseNum(inputs.fixed.value));
    if(!c){outs.contribution.textContent="—";outs.cpa.textContent="—";return;}
    outs.contribution.textContent=formatCurrency(c);
    outs.cpa.textContent=formatCurrency(c);
  });
}

function mountMaxCpc(container){
  container.innerHTML="";
  container.classList.add("abw");
  container.dataset.abMounted="true";
  var form=document.createElement("div");
  form.innerHTML=[
    '<div class="abw-field"><label class="abw-label">Average order value ($)</label><input class="abw-input" data-abw="value" type="text" inputmode="decimal" value="100"></div>',
    '<div class="abw-field"><label class="abw-label">Gross margin (%)</label><input class="abw-input" data-abw="margin" type="text" inputmode="decimal" value="50"></div>',
    '<div class="abw-field"><label class="abw-label">Fixed cost per order ($)</label><input class="abw-input" data-abw="fixed" type="text" inputmode="decimal" value="0"></div>',
    '<div class="abw-field"><label class="abw-label">Conversion rate (%)</label><input class="abw-input" data-abw="conversion" type="text" inputmode="decimal" value="2"></div>',
    '<div class="abw-results" aria-live="polite">',
    '<div class="abw-result-row"><span>Max CPA</span><span class="abw-result-value" data-abw-out="cpa">—</span></div>',
    '<div class="abw-result-row"><span>Max CPC</span><span class="abw-result-value" data-abw-out="cpc">—</span></div>',
    "</div>",
    attribution("Max CPC calculator")
  ].join("");
  container.appendChild(form);
  var els={value:form.querySelector('[data-abw="value"]'),margin:form.querySelector('[data-abw="margin"]'),fixed:form.querySelector('[data-abw="fixed"]'),conversion:form.querySelector('[data-abw="conversion"]')};
  var outs={cpa:form.querySelector('[data-abw-out="cpa"]'),cpc:form.querySelector('[data-abw-out="cpc"]')};
  bindInputs([els.value,els.margin,els.fixed,els.conversion],function(){
    var result=calcMaxCpc(parseNum(els.value.value),parseNum(els.margin.value),parseNum(els.fixed.value),parseNum(els.conversion.value));
    if(!result){outs.cpa.textContent="—";outs.cpc.textContent="—";return;}
    outs.cpa.textContent=formatCurrency(result.maxCpa);
    outs.cpc.textContent=formatCurrency(result.maxCpc);
  });
}

function mountAdProfit(container){
  container.innerHTML="";
  container.classList.add("abw");
  container.dataset.abMounted="true";
  var form=document.createElement("div");
  form.innerHTML=[
    '<div class="abw-field"><label class="abw-label">Average order value ($)</label><input class="abw-input" data-abw="value" type="text" inputmode="decimal" value="100"></div>',
    '<div class="abw-field"><label class="abw-label">Gross margin (%)</label><input class="abw-input" data-abw="margin" type="text" inputmode="decimal" value="50"></div>',
    '<div class="abw-field"><label class="abw-label">Fixed cost per order ($)</label><input class="abw-input" data-abw="fixed" type="text" inputmode="decimal" value="0"></div>',
    '<div class="abw-field"><label class="abw-label">Ad spend ($)</label><input class="abw-input" data-abw="adSpend" type="text" inputmode="decimal" value="500"></div>',
    '<div class="abw-field"><label class="abw-label">Sales / conversions</label><input class="abw-input" data-abw="sales" type="text" inputmode="decimal" value="15"></div>',
    '<div class="abw-results" aria-live="polite">',
    '<div class="abw-result-row"><span>Revenue</span><span class="abw-result-value" data-abw-out="revenue">—</span></div>',
    '<div class="abw-result-row"><span>Profit</span><span class="abw-result-value" data-abw-out="profit">—</span></div>',
    '<div class="abw-result-row"><span>ROAS</span><span class="abw-result-value" data-abw-out="roas">—</span></div>',
    '<div class="abw-result-row"><span>Break-even ROAS</span><span class="abw-result-value" data-abw-out="beRoas">—</span></div>',
    "</div>",
    attribution("Ad profit calculator")
  ].join("");
  container.appendChild(form);
  var els={value:form.querySelector('[data-abw="value"]'),margin:form.querySelector('[data-abw="margin"]'),fixed:form.querySelector('[data-abw="fixed"]'),adSpend:form.querySelector('[data-abw="adSpend"]'),sales:form.querySelector('[data-abw="sales"]')};
  var outs={revenue:form.querySelector('[data-abw-out="revenue"]'),profit:form.querySelector('[data-abw-out="profit"]'),roas:form.querySelector('[data-abw-out="roas"]'),beRoas:form.querySelector('[data-abw-out="beRoas"]')};
  bindInputs([els.value,els.margin,els.fixed,els.adSpend,els.sales],function(){
    var result=calcAdProfit(parseNum(els.value.value),parseNum(els.margin.value),parseNum(els.fixed.value),parseNum(els.adSpend.value),parseNum(els.sales.value));
    if(!result){outs.revenue.textContent="—";outs.profit.textContent="—";outs.roas.textContent="—";outs.beRoas.textContent="—";return;}
    outs.revenue.textContent=formatCurrency(result.revenue);
    outs.profit.textContent=formatCurrency(result.profit);
    outs.roas.textContent=formatRoas(result.roas);
    outs.beRoas.textContent=formatRoas(result.breakEvenRoas);
  });
}

function mount(container){
  var kind=container.getAttribute("data-adbreakeven-widget")||"break-even-roas";
  if(kind==="break-even-roas"){mountBreakEvenRoas(container,"Break-even ROAS calculator");return;}
  if(kind==="target-roas"){mountBreakEvenRoas(container,"Target ROAS calculator");return;}
  if(kind==="break-even"){mountBreakEven(container);return;}
  if(kind==="max-cpa"){mountMaxCpa(container);return;}
  if(kind==="max-cpc"){mountMaxCpc(container);return;}
  if(kind==="ad-profit"){mountAdProfit(container);return;}
  container.classList.add("abw");
  container.dataset.abMounted="true";
  container.innerHTML=attribution("Calculator");
}

function init(){
  styles();
  document.querySelectorAll("[data-adbreakeven-widget]").forEach(function(el){
    if(el.dataset.abMounted)return;
    mount(el);
  });
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",init);
}else{
  init();
}
})();`;
}
