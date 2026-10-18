const assert=require('node:assert/strict'),P=require('./docs/prt.js');
for(const [measurement,key] of [['savings','gainshare'],['revenue','revenue'],['both','combined'],['no','measurement'],['unknown','measurement']]){
 const r=P.benefits({improvement:'yes',measurement,jointControl:'no'});assert.equal(r.key,key);assert.equal(r.governance.key,'contract');
}
assert.equal(P.benefits({improvement:'no',measurement:'savings',jointControl:'no'}).key,'fees');
assert.equal(P.benefits({improvement:'unknown',measurement:'savings'}).key,'unknown');
assert.equal(P.benefits({improvement:'yes',measurement:'savings',jointControl:'yes'}).key,'gainshare');
assert.equal(P.benefits({jointControl:'yes'}).governance.key,'consider');
assert.equal(P.benefits({}).governance.key,'unknown');
const a={critical:'customer',supplierReuse:'reusable'},r={complementarity:'complementary',improvement:'yes',measurement:'savings',jointControl:'no'};
assert(P.decide(a,r).title.startsWith('Customer unified'));assert.equal(P.benefits(r).key,'gainshare');
console.log('PASS: savings, revenue, combined, unmeasurable, unknown, no mutual incentive, and joint-control branches; ownership coexists with gainsharing.');
