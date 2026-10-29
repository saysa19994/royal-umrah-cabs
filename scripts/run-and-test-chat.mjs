import { spawn } from 'node:child_process';
import http from 'node:http';

async function waitForServer(port, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}/api/chat`, (res) => {
          // Even a 405 or 200 or 503 means the server is listening
          resolve(true);
        });
        req.on('error', reject);
        req.setTimeout(500, () => {
          req.destroy();
          reject(new Error('timeout'));
        });
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`Server failed to start on port ${port} within ${timeoutMs}ms`);
}

async function askChat(question, locale = 'en', port = 3458) {
  try {
    const res = await fetch(`http://localhost:${port}/api/chat`, {
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

async function main() {
  const port = 3458;
  console.log(`Starting Next.js production server on port ${port}...`);

  const serverProcess = spawn('npx.cmd', ['next', 'start', '-p', String(port)], {
    cwd: process.cwd(),
    stdio: 'ignore',
    shell: true,
  });

  try {
    await waitForServer(port);
    console.log(`Server ready on port ${port}. Executing 10 test questions...\n`);

    const questions = [
      { q: 'What is the price from Jeddah airport to Makkah?', loc: 'en', label: '1. Price Jeddah airport->Makkah in EN' },
      { q: 'كم سعر التوصيل من مطار جدة إلى مكة المكرمة؟', loc: 'ar', label: '2. Price Jeddah airport->Makkah in AR' },
      { q: 'Berapa harga dari bandara Jeddah ke Makkah?', loc: 'id', label: '3. Price Jeddah airport->Makkah in ID' },
      { q: 'What is the duration of that route from Jeddah airport to Makkah?', loc: 'en', label: '4. Duration of route (Jeddah to Makkah)' },
      { q: 'Do you have Wi-Fi in the car?', loc: 'en', label: '5. "do you have Wi-Fi?"' },
      { q: 'Do you provide child seats?', loc: 'en', label: '6. "child seats?"' },
      { q: 'Is there free waiting time at the airport?', loc: 'en', label: '7. "free waiting time at the airport?"' },
      { q: 'Is the Miqat stop free and how long is it?', loc: 'en', label: '8. "is the Miqat stop free and how long?"' },
      { q: 'Do prices include VAT?', loc: 'en', label: '9. "do prices include VAT?"' },
      { q: 'Is the service 24/7?', loc: 'en', label: '10. "is the service 24/7?"' },
    ];

    const results = [];
    for (const item of questions) {
      const res = await askChat(item.q, item.loc, port);
      results.push({
        testCase: item.label,
        ...res
      });
    }

    console.log(JSON.stringify(results, null, 2));
  } finally {
    console.log('\nStopping server process...');
    try {
      process.kill(-serverProcess.pid);
    } catch {
      try {
        serverProcess.kill('SIGTERM');
      } catch {}
    }
    // Also cleanup any orphaned node on port 3458 on Windows
    try {
      spawn('taskkill', ['/F', '/IM', 'node.exe', '/FI', 'WINDOWTITLE eq *3458*'], { stdio: 'ignore' });
    } catch {}
  }
}

main().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
