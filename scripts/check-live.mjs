async function main() {
  const res = await fetch('https://duyufalrahmanvip.com/ar?nocache=' + Date.now(), {
    headers: { 'Cache-Control': 'no-cache' }
  });
  console.log('Status:', res.status);
  console.log('Date header:', res.headers.get('date'));
  console.log('Age header:', res.headers.get('age'));
  console.log('x-vercel-id:', res.headers.get('x-vercel-id'));
  const text = await res.text();
  console.log('HTML length:', text.length);
  console.log('Has packages:', text.includes('باقات العمرة'));
  console.log('Has guarantee:', text.includes('معايير الخدمة'));
  console.log('Has booking calc button:', text.includes('احسب تكلفة مشوارك') || text.includes('Calculate Your Fare'));
  const buildMatch = text.match(/"buildId":"([^"]+)"/);
  console.log('Build ID:', buildMatch ? buildMatch[1] : 'none');
}
main().catch(console.error);
