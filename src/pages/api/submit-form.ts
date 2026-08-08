/**
 * Form submission API endpoint
 * Receives form data and submits to GoHighLevel
 */

import type { APIRoute } from 'astro';
import GHLClient from '../../lib/ghl-client';

export const prerender = false;

// Field mapping for each service type
// Maps form field names to GoHighLevel custom field IDs (contact.field_name format)
const fieldMappings: Record<string, Record<string, string>> = {
  'stage-rental': {
    name: 'firstName',
    organization: 'organization',
    email: 'email',
    phone: 'phone',
    event_date: 'stage_rental_event_date',
    location: 'stage_rental_location',
    event_type: 'stage_rental_event_type',
    audience_size: 'stage_rental_expected_attendance',
    sound_system: 'stage_rental_sound_system_needed',
    lighting: 'stage_rental_lighting_needed',
    message: 'stage_rental_additional_details',
  },
  'projector-rental': {
    name: 'firstName',
    organization: 'organization',
    email: 'email',
    phone: 'phone',
    projector_model: 'projector_rental_model_interest',
    event_date: 'projector_rental_event_date',
    location: 'projector_rental_location',
    event_type: 'projector_rental_event_type',
    attendance: 'projector_rental_expected_attendance',
    rental_duration: 'projector_rental_duration',
    delivery_type: 'projector_rental_delivery_support',
    message: 'projector_rental_special_requirements',
  },
  'projector-purchase': {
    name: 'firstName',
    organization: 'organization',
    email: 'email',
    phone: 'phone',
    projector_model: 'projector_purchase_model_interest',
    message: 'projector_purchase_special_requests',
  },
  'projection-mapping': {
    name: 'firstName',
    organization: 'organization',
    email: 'email',
    phone: 'phone',
    event_date: 'projection_mapping_event_date',
    location: 'projection_mapping_location',
    setting: 'projection_mapping_indoor_or_outdoor',
    event_type: 'projection_mapping_event_type',
    surface_type: 'projection_mapping_surface_type',
    surface_dimensions: 'projection_mapping_surface_dimensions',
    content_available: 'projection_mapping_content_available',
    custom_content_needed: 'projection_mapping_custom_content_needed',
    live_operation_needed: 'projection_mapping_live_operation_needed',
    message: 'projection_mapping_project_description',
  },
  'silent-disco': {
    name: 'firstName',
    organization: 'organization',
    email: 'email',
    phone: 'phone',
    event_date: 'silent_disco_event_date',
    location: 'silent_disco_location',
    event_type: 'silent_disco_event_type',
    guest_count: 'silent_disco_expected_guests',
    package_type: 'silent_disco_package_type',
    headphone_count: 'silent_disco_headphones_needed',
    dj_channels: 'silent_disco_dj_channels',
    duration: 'silent_disco_event_duration',
    delivery: 'silent_disco_delivery_setup_option',
    backup_headphones: 'silent_disco_backup_headphones',
    outdoor_equipment: 'silent_disco_outdoor_equipment',
    dj_operator: 'silent_disco_dj_operator_needed',
    message: 'silent_disco_additional_details',
  },
  'outdoor-movie': {
    name: 'firstName',
    organization: 'organization',
    email: 'email',
    phone: 'phone',
    event_date: 'outdoor_movie_event_date',
    location: 'outdoor_movie_location',
    event_type: 'outdoor_movie_event_type',
    attendance: 'outdoor_movie_expected_attendance',
    screen_package: 'outdoor_movie_screen_package',
    message: 'outdoor_movie_event_details',
  },
};

interface FormData {
  service: string;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate request
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let formData: any;
    try {
      formData = await request.json();
      console.log('Parsed form data:', formData);
    } catch (parseError) {
      const errorMsg = parseError instanceof Error ? parseError.message : 'Unknown parse error';
      console.error('Failed to parse request JSON:', errorMsg);

      // Try to read the body for debugging
      try {
        const bodyText = await request.text();
        console.error('Request body was:', bodyText);
      } catch (e) {
        console.error('Could not read request body');
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid JSON in request body: ${errorMsg}`,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const serviceType = formData.service || 'stage-rental';
    const mapping = fieldMappings[serviceType] || fieldMappings['stage-rental'];

    // Extract name parts
    const fullName = formData.name || '';
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ') || 'Inquiry';

    // Map form fields to custom field names
    const customFields: Record<string, string | number | boolean> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'service' || key === 'name' || key === 'email' || key === 'phone') {
        return; // Skip these, they're handled separately
      }
      const fieldName = mapping[key] || key;
      if (value !== undefined && value !== null && value !== '') {
        // Map consent checkbox to the consent field
        if (key === 'consent') {
          customFields['contact_consent'] = value === 'on' ? 'Yes' : 'No';
        } else {
          customFields[fieldName] = value;
        }
      }
    });

    console.log('Submitting form:', {
      service: serviceType,
      firstName,
      lastName,
      email: formData.email,
    });

    // Submit to GoHighLevel
    let ghlClient: InstanceType<typeof GHLClient>;
    try {
      ghlClient = new GHLClient();
    } catch (clientError) {
      const clientErrorMsg = clientError instanceof Error ? clientError.message : 'Failed to initialize GHL client';
      console.error('GHL Client Error:', clientErrorMsg);
      return new Response(
        JSON.stringify({
          success: false,
          error: clientErrorMsg,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await ghlClient.submitContact({
      firstName,
      lastName,
      email: formData.email,
      phone: formData.phone,
      customFields,
    });

    if (!result.success) {
      console.error('GHL submission failed:', result.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error || 'Failed to submit form',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        contactId: result.contactId,
        message: 'Form submitted successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Form submission error:', message, error);

    return new Response(
      JSON.stringify({
        success: false,
        error: message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
