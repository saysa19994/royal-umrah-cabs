import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const read=p=>readFileSync(p,'utf8');
test('route directory uses published DB route catalog and saved fares',()=>{
 const source=read('src/app/[locale]/routes/page.tsx');
 assert.match(source,/getPublishedRoutes/);
 assert.match(source,/liveRates\[route.slug\]/);
 assert.match(source,/hasDetails\?'\/routes\/'/);
});
test('route picker respects active admin routes and current fares',()=>{
 const source=read('src/components/routes/RouteNetworkDesk.tsx');
 assert.match(source,/rates\[route.slug\]/);
 assert.doesNotMatch(source,/ACTIVE_ROUTES=/);
});
test('administration can set localized place names',()=>{
 const source=read('src/app/admin/routes/page.tsx');
 assert.match(source,/translations/);
 assert.match(source,/\['ar','en','ms','id','ur','fr','es','de','tr','hi'\]/);
});
