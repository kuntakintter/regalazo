const https = require('https');
const fs = require('fs');
const querystring = require('querystring');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.trim().replace(/^['"]|['"]$/g, '');
    env[match[1]] = value;
  }
});

const clientId = env.AMAZON_CLIENT_ID;
const clientSecret = env.AMAZON_CLIENT_SECRET;

async function testOAuth(params) {
  return new Promise((resolve) => {
    const postData = querystring.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      ...params
    });

    const req = https.request('https://api.amazon.com/auth/o2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        } catch(e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });

    req.on('error', e => resolve({ error: e.message }));
    req.write(postData);
    req.end();
  });
}

async function run() {
  // Test without scope
  console.log('Test without scope:');
  console.log(await testOAuth({}));

  // Test scope profile
  console.log('Test scope profile:');
  console.log(await testOAuth({ scope: 'profile' }));
}

run();
