(function(root){
'use strict';
const blankAsset=()=>({name:'',kind:'unknown',owner:'unknown',rights:'unknown',replacement:'unknown',funding:'unknown'});
const sapAssets=()=>[{...blankAsset(),name:'Integration tools',kind:'bespoke',funding:'upfront'},{...blankAsset(),name:'Supplier support tools',funding:'fee'}];
function decide(inputs,relationship={}){
 const c=relationship.complementarity||'unknown',i=inputs.critical||'unknown',reuse=inputs.supplierReuse||'unknown';
 const trace=[],conditions=[];let title='Establish how the assets depend on each other',alternative='Customer ownership, supplier ownership and separate ownership remain open.';
 if(c==='unknown')trace.push('We do not yet know whether the assets need to be controlled together.');
 if(c==='independent'){
  title='Separate ownership is the starting point';trace.push('Each asset remains useful without the other. Keeping them separate can preserve each party’s investment incentive.');alternative='Combine ownership only if a specific investment or coordination benefit justifies it.';
 }else if(c==='complementary'){
  trace.push('The assets have little useful value apart: assess unified ownership of the essential, transferable assets.');
  if(i==='customer'){title='Customer unified ownership is the leading candidate';trace.push('The customer’s additional, hard-to-contract investment matters most. Control can strengthen its incentive to invest.');alternative='Compare supplier ownership if customer control would substantially weaken essential supplier development.';}
  else if(i==='supplier'){title='Supplier unified ownership is the leading candidate';trace.push('The supplier’s additional, hard-to-contract investment matters most. Control can strengthen its incentive to invest.');alternative='Compare customer ownership if supplier control would substantially weaken essential customer investment.';}
  else if(i==='both'){title='Keep the essential assets together; compare who owns them';trace.push('Both parties’ investments are critical. Complementarity supports common ownership but does not identify the better owner.');alternative='Compare customer and supplier ownership. Assess benefit sharing separately; both parties investing does not require shared ownership.';}
  else {title='Unified ownership: owner still to be determined';trace.push('Identify whose additional investment depends most on control before choosing the owner.');alternative='Compare customer and supplier ownership after answering the investment question.';}
  conditions.push('Check that the relevant assets can actually be transferred and used together. People’s expertise cannot be transferred by an ownership clause.');
 }
 if(reuse==='reusable'){
  trace.push('The supplier can reuse much of its investment elsewhere. This may preserve some incentive even without ownership of the customer-specific assets; it does not determine the owner by itself.');
  if(c==='complementary'&&i==='customer')conditions.push('Test customer ownership of the essential customer-specific assets while allowing supplier reuse of its background tools. Check licences and technical dependencies.');
 }else if(reuse==='specific')conditions.push('The supplier has little reuse elsewhere. Check whether loss of control would discourage its essential investment.');
 if(c!=='unknown')conditions.push('These are screening rules, not a calculated optimum. Compare the investment incentives lost under each alternative.');
 return {title,trace,alternative,conditions,complementarity:c};
}
function benefits(relationship={}){
 const b=relationship.improvement||'unknown',m=relationship.measurement||'unknown',j=relationship.jointControl||'unknown';
 let key='unknown',title='Establish whether shared improvement incentives are needed',why='Answer whether both parties must keep contributing to improvements.',checks=[];
 if(b==='no'){key='fees';title='Start with service fees and agreed performance incentives';why='You have not identified a need for both parties to keep investing in improvements. A separate benefit-sharing scheme is not indicated by this answer.';}
 else if(b==='yes'){
  if(m==='savings'){key='gainshare';title='Start with contractual gainsharing';why='Both parties need an improvement incentive, and the resulting savings can be measured and attributed.';checks=['Agree the savings baseline, eligible costs and measurement period.','Agree each party’s contribution, sharing formula, verification and service-quality safeguards.'];}
  else if(m==='revenue'){key='revenue';title='Start with contractual revenue sharing';why='Both parties need an improvement incentive, and additional revenue can be measured and attributed.';checks=['Define eligible additional revenue, attribution, exclusions and reporting.','Agree each party’s contribution, sharing formula and verification.'];}
  else if(m==='both'){key='combined';title='Start with gainsharing and revenue sharing';why='Both savings and additional revenue can be measured and attributed.';checks=['Set separate baselines and formulas for savings and revenue; avoid double counting.','Agree contributions, verification, quality safeguards and when benefits are paid.'];}
  else if(m==='no'){key='measurement';title='Establish a measurable benefit before agreeing a share';why='Both parties need incentives, but the claimed benefits cannot currently be measured and attributed.';checks=['Test a measurement pilot or use agreed milestones and performance incentives.','A JV does not solve the missing measurement basis by itself.'];}
  else {key='measurement';title='Identify what benefits can be measured and shared';why='Both parties need an improvement incentive. Confirm whether savings, additional revenue or neither can be reliably attributed.';}
 }
 let governance={key:'unknown',title:'Joint control: not established',why:'Confirm whether joint ownership and ongoing investment decisions are actually needed. Benefit sharing alone does not require a JV.'};
 if(j==='no')governance={key:'contract',title:'No JV indicated',why:'Use contractual arrangements for any benefit sharing; retain the separately recommended asset ownership.'};
 if(j==='yes')governance={key:'consider',title:'Consider a JV only if contractual cooperation is insufficient',why:'You have identified a need for joint asset control and ongoing investment decisions. Compare contractual governance first; escalate to a JV only if it adds value. Define decision rights, funding, deadlock and exit arrangements.'};
 return {key,title,why,checks,governance};
}
function assess(inputs,assets,commercial={}){
 const rows=assets.filter(x=>x.name.trim()).map(x=>{
  const checks=[],why=[],missing=[];let position='Establish the asset and the rights before choosing ownership.';
  for(const k of ['kind','owner','rights','replacement','funding'])if(!x[k]||x[k]==='unknown')missing.push(k);
  if(x.kind==='reusable'){position='Evaluate supplier ownership with customer usage and continuity rights.';why.push('Reuse elsewhere can reward supplier development. Compare that benefit with the customer’s dependence before agreeing exclusivity.');checks.push('Identify reusable components and the rights needed to continue using essential functionality after support ends.');}
  if(x.kind==='bespoke'){position='Evaluate customer ownership or sufficient lasting rights to the bespoke deliverable.';why.push('Control can protect the customer’s further investment. Compare that benefit with any reduction in the supplier’s incentive to improve the asset.');checks.push('Compare ownership with an adequate licence; specify the deliverable, permitted modification and replacement-provider use.');}
  if(x.kind==='mixed'){position='Separate reusable components from bespoke components before allocating rights.';why.push('A single ownership demand can remove supplier reuse incentives or leave the customer dependent on inaccessible components.');checks.push('Map components and dependencies. Assess ownership and licences for each component separately.');}
  if(x.kind==='records'){position='Establish customer access to usable service records and transfer materials.';why.push('Runbooks, configurations and incident records support a credible change of provider. Access requirements do not necessarily require transfer of every underlying IP right.');checks.push('Define usable formats, updates, export and handover obligations.');}
  if(x.kind==='unknown')checks.push('Describe what this asset does and whether it is reusable, bespoke or a service record.');
  if(x.owner==='unknown')checks.push('Confirm current ownership and any third-party components.');
  if(x.rights==='unknown')checks.push('Confirm what your payment acquires: ownership, a continuing licence or access only during support.');
  if(x.rights==='term')checks.push('Access ends with support. Compare continued-use rights, transition access or a tested replacement before accepting dependence.');
  if(x.rights==='licence')checks.push('Verify that the continuing licence permits the use, modification and replacement-provider support you actually need.');
  if(x.rights==='ownership')checks.push('Identify exactly what ownership covers, including deliverables and exclusions for supplier background IP.');
  const conflict=(x.owner==='supplier'&&x.rights==='ownership')||(x.owner==='customer'&&x.rights==='term');
  if(conflict)checks.unshift('Clarify the apparent mismatch between current ownership and the rights acquired; these may refer to different components or a pending transfer.');
  if(x.replacement==='no'){checks.push('A replacement provider cannot continue today. Identify missing access, documentation, skills or substitutes; ownership alone will not deliver continuity.');why.push('Rights have practical value only when they support a usable alternative.');}
  if(x.replacement==='unknown')checks.push('Ask which functions stop working at exit and demonstrate whether another provider can continue.');
  if(x.replacement==='yes')checks.push('Record the evidence for replacement feasibility and maintain it through delivery.');
  if(x.funding==='upfront')checks.push('Link upfront payment to identified deliverables and acquired rights. Separate further improvements from development already paid for.');
  if(x.funding==='fee'||x.funding==='mixed')checks.push('Document agreed initial investment recovered through fees. Compare a recovery commitment with staged funding or declining recovery payments; avoid paying twice for recovered costs.');
  if(x.funding==='unknown')checks.push('Establish who funds initial development and how the supplier recovers the agreed investment.');
  return {name:x.name,position,why,checks,status:conflict?'Clarify conflicting answers':missing.length?'Provisional: evidence needed':'Position to negotiate',missing};
 });
 const recovery=[],incentives=[];
 const months=commercial.recoveryMonths;
 if(assets.some(x=>x.name.trim()&&['fee','mixed'].includes(x.funding))){
  recovery.push(months!==''&&months!==undefined&&Number.isFinite(Number(months))&&Number(months)>=0?`You entered ${Number(months)} months as the supplier’s recovery period. Validate the eligible investment and amounts already recovered; this is an input, not a model estimate.`:'Establish the supplier’s proposed recovery period and eligible initial investment.');
  recovery.push('Specify what happens on early termination, distinguishing termination causes and amounts already recovered. A recovery commitment alone does not reward extra effort.');
 }
 if(commercial.payment==='fixed')incentives.push('Under a fixed support fee, genuine effort savings may increase supplier margin. Preserve that improvement incentive while checking service quality and agreed outcomes.');
 else if(commercial.payment==='hourly')incentives.push('Under hourly billing, lower effort can reduce billable revenue. Consider an agreed improvement reward or another mechanism that makes worthwhile automation attractive.');
 else incentives.push('Establish how efficiency affects supplier earnings before assuming that it benefits from automation.');
 if(inputs.critical==='both')incentives.push('Both parties’ extra contributions are critical: check whether the proposed control protects one party while discouraging the other.');
 if(inputs.critical==='unknown')incentives.push('Confirm whose additional, hard-to-contract contribution matters most before preferring an ownership allocation.');
 return {rows,recovery,incentives,open:rows.some(r=>r.missing.length||r.status==='Clarify conflicting answers'),status:!rows.length?'Add an asset to assess':'Negotiation guidance; no optimal ownership calculated'};
}
const api={blankAsset,sapAssets,assess,decide,benefits};if(typeof module!=='undefined'&&module.exports)module.exports=api;root.PRT=api;
})(typeof window!=='undefined'?window:globalThis);
