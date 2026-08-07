import https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '..', '.env');

const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

const PIT_TOKEN = env.PIT_TOKEN;
const LOCATION_ID = env.LOCATION_ID;
const GHL_API_BASE = env.GHL_API_BASE || 'https://services.leadconnectorhq.com';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(GHL_API_BASE + path);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Authorization': `Bearer ${PIT_TOKEN}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
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
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Map of field names to their service folder
const fieldFolders = {
  'Stage_Rental_Event_Date': 'Av Valley Stage Rental',
  'Stage_Rental_Location': 'Av Valley Stage Rental',
  'Stage_Rental_Event_Type': 'Av Valley Stage Rental',
  'Stage_Rental_Expected_Attendance': 'Av Valley Stage Rental',
  'Stage_Rental_Sound_System_Needed': 'Av Valley Stage Rental',
  'Stage_Rental_Lighting_Needed': 'Av Valley Stage Rental',
  'Projector_Rental_Event_Date': 'Av Valley Projector Rental',
  'Projector_Rental_Location': 'Av Valley Projector Rental',
  'Projector_Rental_Event_Type': 'Av Valley Projector Rental',
  'Projector_Rental_Expected_Attendance': 'Av Valley Projector Rental',
  'Projector_Rental_Model_Interest': 'Av Valley Projector Rental',
  'Projector_Rental_Duration': 'Av Valley Projector Rental',
  'Projector_Rental_Delivery_Support': 'Av Valley Projector Rental',
  'Silent_Disco_Event_Date': 'Av Valley Silent Disco',
  'Silent_Disco_Location': 'Av Valley Silent Disco',
  'Silent_Disco_Event_Type': 'Av Valley Silent Disco',
  'Silent_Disco_Expected_Guests': 'Av Valley Silent Disco',
  'Silent_Disco_Headphones_Needed': 'Av Valley Silent Disco',
  'Silent_Disco_DJ_Channels': 'Av Valley Silent Disco',
  'Silent_Disco_Event_Duration': 'Av Valley Silent Disco',
  'Silent_Disco_Delivery_Setup_Option': 'Av Valley Silent Disco',
  'Silent_Disco_Backup_Headphones': 'Av Valley Silent Disco',
  'Silent_Disco_Outdoor_Equipment': 'Av Valley Silent Disco',
  'Silent_Disco_DJ_Operator_Needed': 'Av Valley Silent Disco',
  'Outdoor_Movie_Event_Date': 'Av Valley Outdoor Movie',
  'Outdoor_Movie_Location': 'Av Valley Outdoor Movie',
  'Outdoor_Movie_Event_Type': 'Av Valley Outdoor Movie',
  'Outdoor_Movie_Expected_Attendance': 'Av Valley Outdoor Movie',
  'Outdoor_Movie_Screen_Package': 'Av Valley Outdoor Movie',
  'Projection_Mapping_Event_Date': 'Av Valley Projector Mapping',
  'Projection_Mapping_Location': 'Av Valley Projector Mapping',
  'Projection_Mapping_Event_Type': 'Av Valley Projector Mapping',
  'Projection_Mapping_Surface_Type': 'Av Valley Projector Mapping',
  'Projection_Mapping_Surface_Dimensions': 'Av Valley Projector Mapping',
  'Projection_Mapping_Indoor_or_Outdoor': 'Av Valley Projector Mapping',
  'Projection_Mapping_Content_Available': 'Av Valley Projector Mapping',
  'Projection_Mapping_Custom_Content_Needed': 'Av Valley Projector Mapping',
  'Projection_Mapping_Live_Operation_Needed': 'Av Valley Projector Mapping',
};

async function updateCreatedFields() {
  console.log('Fetching all custom fields from EverReach...\n');

  try {
    const response = await makeRequest('GET', `/locations/${LOCATION_ID}/customFields`);

    if (response.status !== 200) {
      console.error('Failed to fetch fields');
      return;
    }

    const allFields = response.data.customFields || [];

    // Filter for AvValley fields only
    const avvalleyFields = allFields.filter(f =>
      Object.keys(fieldFolders).includes(f.name)
    );

    console.log(`Found ${avvalleyFields.length} AvValley fields\n`);

    // Build the complete record
    const completeRecord = avvalleyFields
      .map(field => ({
        folder: fieldFolders[field.name],
        name: field.name,
        id: field.id,
        fieldKey: field.fieldKey,
      }))
      .sort((a, b) => {
        // Sort by folder, then by name
        if (a.folder !== b.folder) {
          return a.folder.localeCompare(b.folder);
        }
        return a.name.localeCompare(b.name);
      });

    // Save to file
    fs.writeFileSync(
      path.join(__dirname, 'created-fields.json'),
      JSON.stringify(completeRecord, null, 2)
    );

    console.log(`✅ Updated created-fields.json with all ${completeRecord.length} fields\n`);

    // Show summary by folder
    const byFolder = {};
    completeRecord.forEach(f => {
      if (!byFolder[f.folder]) byFolder[f.folder] = [];
      byFolder[f.folder].push(f.name);
    });

    console.log('Summary by Service:');
    Object.entries(byFolder).forEach(([folder, fields]) => {
      console.log(`  ${folder}: ${fields.length} fields`);
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

updateCreatedFields().catch(console.error);
