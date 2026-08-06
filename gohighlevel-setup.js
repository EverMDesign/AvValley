import https from 'https';

// Your credentials
const ACCESS_TOKEN = 'pit-3edd93ab-b665-445b-977b-c07deb48d2bb';
const SUBACCOUNT_ID = 'egpPz2GEm2dxE4YyvP44';

// API Configuration
const API_BASE = 'api.everreach.link';

// Helper function to make API requests
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

// Define custom fields for each service
const customFields = [
  // Common Contact Fields
  {
    name: 'Full Name',
    fieldType: 'text',
    required: true,
    placeholder: 'Enter full name',
    helpText: 'Contact person full name',
  },
  {
    name: 'Organization',
    fieldType: 'text',
    required: false,
    placeholder: 'Enter organization name',
    helpText: 'Company or organization name',
  },
  {
    name: 'Email Address',
    fieldType: 'email',
    required: true,
    placeholder: 'Enter email',
    helpText: 'Primary email contact',
  },
  {
    name: 'Phone Number',
    fieldType: 'phone',
    required: true,
    placeholder: 'Enter phone number',
    helpText: 'Primary phone contact',
  },

  // Event Details
  {
    name: 'Event Date',
    fieldType: 'date',
    required: false,
    helpText: 'Date of the event',
  },
  {
    name: 'Event Location',
    fieldType: 'text',
    required: true,
    placeholder: 'City/Zip',
    helpText: 'Event location or city',
  },
  {
    name: 'Event Type',
    fieldType: 'text',
    required: false,
    placeholder: 'e.g. Concert, Corporate, Wedding',
    helpText: 'Type of event',
  },
  {
    name: 'Expected Attendance',
    fieldType: 'number',
    required: false,
    placeholder: 'Number of guests/attendees',
    helpText: 'Expected audience or guest count',
  },

  // Stage Rental Specific
  {
    name: 'Sound System Needed',
    fieldType: 'select',
    required: false,
    options: [
      { label: 'Basic Sound System', value: 'basic_sound' },
      { label: 'Professional Audio', value: 'professional_audio' },
      { label: 'Not Needed', value: 'not_needed' },
    ],
    helpText: 'Type of sound system required',
  },
  {
    name: 'Lighting Needed',
    fieldType: 'select',
    required: false,
    options: [
      { label: 'Basic Lighting', value: 'basic_lighting' },
      { label: 'Advanced Lighting', value: 'advanced_lighting' },
      { label: 'Not Needed', value: 'not_needed' },
    ],
    helpText: 'Type of lighting required',
  },

  // Projector Rental Specific
  {
    name: 'Projector Model Interest',
    fieldType: 'select',
    required: false,
    options: [
      { label: 'Christie Roadster HD20K-J (20,000 lumens, HD)', value: 'christie_20k' },
      { label: 'Barco HDX-W20 FLEX (20,000 lumens, WUXGA)', value: 'barco_20k' },
      { label: 'Christie HD14K-M (12,500 lumens, HD)', value: 'christie_14k' },
      { label: 'Barco RLM-W12 (11,500 lumens, WUXGA)', value: 'barco_12k' },
      { label: 'Barco RLM-W8 (8,000 lumens, WUXGA)', value: 'barco_8k' },
      { label: 'Not sure yet', value: 'not_sure' },
    ],
    helpText: 'Which projector model interests them',
  },
  {
    name: 'Rental Duration',
    fieldType: 'select',
    required: false,
    options: [
      { label: '1 Day', value: '1_day' },
      { label: 'Multi-Day (2-7 days)', value: 'multi_day' },
      { label: 'Weekly', value: 'weekly' },
      { label: 'Monthly or Longer', value: 'monthly' },
    ],
    helpText: 'Length of rental needed',
  },
  {
    name: 'Delivery & Support',
    fieldType: 'select',
    required: false,
    options: [
      { label: 'Customer Pickup', value: 'customer_pickup' },
      { label: 'Delivery Only', value: 'delivery_only' },
      { label: 'Delivery & Setup', value: 'delivery_setup' },
      { label: 'Full Technical Support', value: 'full_support' },
    ],
    helpText: 'Delivery and support options',
  },

  // Silent Disco Specific
  {
    name: 'Headphones Needed',
    fieldType: 'number',
    required: false,
    placeholder: 'e.g. 50, 100',
    helpText: 'Number of wireless headphones needed',
  },
  {
    name: 'DJ Channels',
    fieldType: 'select',
    required: false,
    options: [
      { label: '1 DJ (1 Channel)', value: '1' },
      { label: '2 DJs (2 Channels)', value: '2' },
      { label: '3 DJs (3 Channels)', value: '3' },
      { label: '4 DJs (4 Channels)', value: '4' },
    ],
    helpText: 'Number of DJ channels/stations',
  },
  {
    name: 'Event Duration',
    fieldType: 'select',
    required: false,
    options: [
      { label: '4 Hours', value: '4h' },
      { label: '6 Hours', value: '6h' },
      { label: '8 Hours', value: '8h' },
      { label: 'Full Night (12+ Hours)', value: '12h' },
    ],
    helpText: 'Duration of the event',
  },
  {
    name: 'Delivery/Setup Option',
    fieldType: 'select',
    required: false,
    options: [
      { label: 'Customer Pickup', value: 'customer_pickup' },
      { label: 'AvValley Delivery & Setup', value: 'avvalley_delivery' },
      { label: 'Full Support (Setup & Operator)', value: 'full_support' },
    ],
    helpText: 'Delivery and setup options',
  },
  {
    name: 'Backup Headphones',
    fieldType: 'checkbox',
    required: false,
    helpText: 'Include backup/replacement headphones',
  },
  {
    name: 'Outdoor Equipment',
    fieldType: 'checkbox',
    required: false,
    helpText: 'Weatherproof/outdoor equipment needed',
  },
  {
    name: 'DJ Operator Needed',
    fieldType: 'checkbox',
    required: false,
    helpText: 'Professional DJ operator included',
  },

  // Outdoor Movie Specific
  {
    name: 'Screen Package',
    fieldType: 'select',
    required: false,
    options: [
      { label: 'Backyard Movie Screen', value: 'backyard' },
      { label: 'Community Movie Screen', value: 'community' },
      { label: 'Large Event Movie Screen', value: 'large_event' },
      { label: 'Not sure yet', value: 'not_sure' },
    ],
    helpText: 'Preferred movie screen package',
  },

  // Projection Mapping Specific
  {
    name: 'Surface Type',
    fieldType: 'select',
    required: false,
    options: [
      { label: 'Building facade', value: 'building_facade' },
      { label: 'Interior wall', value: 'interior_wall' },
      { label: 'Stage backdrop', value: 'stage_backdrop' },
      { label: 'Corporate space', value: 'corporate_space' },
      { label: 'Product display', value: 'product_display' },
      { label: 'Art installation', value: 'art_installation' },
      { label: 'Custom object', value: 'custom_object' },
      { label: 'Not sure yet', value: 'not_sure' },
    ],
    helpText: 'Type of projection surface',
  },
  {
    name: 'Surface Dimensions',
    fieldType: 'text',
    required: false,
    placeholder: 'e.g. 40ft wide x 20ft tall',
    helpText: 'Approximate dimensions of projection surface',
  },
  {
    name: 'Indoor or Outdoor',
    fieldType: 'select',
    required: false,
    options: [
      { label: 'Indoor', value: 'indoor' },
      { label: 'Outdoor', value: 'outdoor' },
      { label: 'Both/Mixed', value: 'both' },
    ],
    helpText: 'Whether event is indoor or outdoor',
  },
  {
    name: 'Content Available',
    fieldType: 'checkbox',
    required: false,
    helpText: 'Content already available',
  },
  {
    name: 'Custom Content Needed',
    fieldType: 'checkbox',
    required: false,
    helpText: 'Custom content production needed',
  },
  {
    name: 'Live Operation Needed',
    fieldType: 'checkbox',
    required: false,
    helpText: 'Live operation during event',
  },

  // General
  {
    name: 'Additional Details',
    fieldType: 'textarea',
    required: false,
    placeholder: 'Any special requirements or notes...',
    helpText: 'Additional comments or special requests',
  },
];

async function createCustomFields() {
  console.log('Starting GoHighLevel custom field creation...\n');
  console.log(`Subaccount ID: ${SUBACCOUNT_ID}`);
  console.log(`Total fields to create: ${customFields.length}\n`);

  let created = 0;
  let failed = 0;

  for (const field of customFields) {
    try {
      const payload = {
        name: field.name,
        fieldType: field.fieldType,
        required: field.required || false,
      };

      // Add optional properties if they exist
      if (field.placeholder) payload.placeholder = field.placeholder;
      if (field.helpText) payload.helpText = field.helpText;
      if (field.options) payload.options = field.options;

      const path = `/locations/${SUBACCOUNT_ID}/customFields`;
      const response = await makeRequest('POST', path, payload);

      if (response.status === 200 || response.status === 201) {
        console.log(`Created: ${field.name}`);
        created++;
      } else {
        console.log(`Failed: ${field.name} (Status: ${response.status})`);
        console.log(`Response: ${JSON.stringify(response.data)}\n`);
        failed++;
      }
    } catch (error) {
      console.log(`Error creating ${field.name}: ${error.message}\n`);
      failed++;
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\nSummary:`);
  console.log(`Created: ${created}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${created + failed}`);
}

createCustomFields().catch(console.error);
