import https from 'https';

// Your credentials
const ACCESS_TOKEN = 'pit-3edd93ab-b665-445b-977b-c07deb48d2bb';
const SUBACCOUNT_ID = 'egpPz2GEm2dxE4YyvP44';
const API_BASE = 'api.everreach.link';

// Helper function to make API request
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_BASE,
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

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test with one field
async function testCreateField() {
  console.log('Testing GoHighLevel API...\n');
  console.log(`Access Token: ${ACCESS_TOKEN}`);
  console.log(`Subaccount ID: ${SUBACCOUNT_ID}\n`);

  try {
    const payload = {
      name: 'Projector Model Interest',
      fieldType: 'select',
      required: false,
      groupName: 'AvValley_Projector_Rental',
      options: [
        { label: 'Christie Roadster HD20K-J (20,000 lumens, HD)', value: 'christie_20k' },
        { label: 'Barco HDX-W20 FLEX (20,000 lumens, WUXGA)', value: 'barco_20k' },
        { label: 'Christie HD14K-M (12,500 lumens, HD)', value: 'christie_14k' },
        { label: 'Barco RLM-W12 (11,500 lumens, WUXGA)', value: 'barco_12k' },
        { label: 'Barco RLM-W8 (8,000 lumens, WUXGA)', value: 'barco_8k' },
        { label: 'Not sure yet', value: 'not_sure' },
      ],
      helpText: 'Which projector model interests them',
    };

    console.log('Creating test field: "Projector Model Interest"\n');
    console.log(`Payload: ${JSON.stringify(payload, null, 2)}\n`);

    const path = `/locations/${SUBACCOUNT_ID}/customFields`;
    const response = await makeRequest('POST', path, payload);

    console.log(`Status Code: ${response.status}`);
    console.log(`Response:\n${JSON.stringify(response.data, null, 2)}`);

    if (response.status === 200 || response.status === 201) {
      console.log('\n✅ SUCCESS! Field created in GoHighLevel.');
      console.log('You can now run the full script: node gohighlevel-setup.js');
    } else {
      console.log('\n❌ FAILED! Check the response above for errors.');
      console.log('Common issues:');
      console.log('- Invalid Access Token');
      console.log('- Invalid Subaccount ID');
      console.log('- API endpoint has changed');
    }
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }
}

testCreateField();
