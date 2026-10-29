async function askChat(question, locale = 'en') {
  try {
    const res = await fetch('http://localhost:3458/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: question }],
        locale
      })
    });

    const status = res.status;
    const text = await res.text();

    return {
      question,
      locale,
      httpStatus: status,
      rawResponseBody: text.trim()
    };
  } catch (err) {
    return {
      question,
      locale,
      error: err.message
    };
  }
}

async function run() {
  const questions = [
    { q: 'What is the price from Jeddah airport to Makkah?', loc: 'en', label: '1. price Jeddah airport->Makkah in EN' },
    { q: 'كم سعر التوصيل من مطار جدة إلى مكة المكرمة؟', loc: 'ar', label: '2. price Jeddah airport->Makkah in AR' },
    { q: 'Berapa harga dari bandara Jeddah ke Makkah?', loc: 'id', label: '3. price Jeddah airport->Makkah in ID' },
    { q: 'What is the duration of that route from Jeddah airport to Makkah?', loc: 'en', label: '4. duration of that route' },
    { q: 'Do you have Wi-Fi in the car?', loc: 'en', label: '5. "do you have Wi-Fi?"' },
    { q: 'Do you provide child seats?', loc: 'en', label: '6. "child seats?"' },
    { q: 'Is there free waiting time at the airport?', loc: 'en', label: '7. "free waiting time at the airport?"' },
    { q: 'Is the Miqat stop free and how long is it?', loc: 'en', label: '8. "is the Miqat stop free and how long?"' },
    { q: 'Do prices include VAT?', loc: 'en', label: '9. "do prices include VAT?"' },
    { q: 'Is the service 24/7?', loc: 'en', label: '10. "is the service 24/7?"' },
  ];

  const results = [];
  for (const item of questions) {
    const result = await askChat(item.q, item.loc);
    results.push({
      itemNumberAndTitle: item.label,
      ...result
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

run();
