import https from 'https';

const ACCESS_TOKEN = 'pit-3edd93ab-b665-445b-977b-c07deb48d2bb';
const SUBACCOUNT_ID = 'egpPz2GEm2dxE4YyvP44';

function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.everreach.link',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function testEndpoints() {
  console.log('Testing EverReach API endpoints...\n');

  const endpoints = [
    `/locations/${SUBACCOUNT_ID}`,
    `/locations/${SUBACCOUNT_ID}/customFields`,
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${endpoint}`);
      const response = await makeRequest('GET', endpoint);
      console.log(`Status: ${response.status}`);
      console.log(`Response: ${JSON.stringify(response.data, null, 2)}\n`);
    } catch (error) {
      console.log(`Error: ${error.message}\n`);
    }
  }
}

testEndpoints();
