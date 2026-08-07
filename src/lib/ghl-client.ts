/**
 * GoHighLevel API Client
 * Handles communication with the LeadConnector API
 */

interface ContactPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, string | number | boolean>;
}

interface APIResponse {
  success: boolean;
  contactId?: string;
  error?: string;
}

export class GHLClient {
  private pit: string;
  private locationId: string;
  private apiBase: string;

  constructor() {
    this.pit = import.meta.env.PIT_TOKEN || '';
    this.locationId = import.meta.env.LOCATION_ID || '';
    this.apiBase = import.meta.env.GHL_API_BASE || 'https://services.leadconnectorhq.com';

    if (!this.pit || !this.locationId) {
      throw new Error('Missing GHL credentials in environment variables');
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.pit}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    };
  }

  /**
   * Create or upsert a contact in GoHighLevel
   */
  async submitContact(data: ContactPayload): Promise<APIResponse> {
    try {
      // Convert customFields object to array format [{ id, value }, ...]
      const customFieldsArray = Object.entries(data.customFields || {}).map(
        ([key, value]) => ({ id: key, value })
      );

      const payload = {
        locationId: this.locationId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        tags: data.tags || [],
        customFields: customFieldsArray,
      };

      const endpoint = `${this.apiBase}/contacts/upsert`;
      console.log('GHL Client: Submitting to', endpoint);
      console.log('GHL Client: Payload', payload);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      console.log('GHL Client: Response status', response.status);

      const responseText = await response.text();
      console.log('GHL Client: Response body:', responseText);

      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          // Response is not JSON
        }
        const errorMsg = errorData.message || errorData.error || responseText || `API Error: ${response.status} ${response.statusText}`;
        console.error('GHL Client: API Error -', errorMsg);
        throw new Error(errorMsg);
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid JSON response from API: ${responseText}`);
      }

      console.log('GHL Client: Full response:', result);
      console.log('GHL Client: Success, contact ID:', result.contact?.id || result.data?.id || 'unknown');

      return {
        success: true,
        contactId: result.contact?.id,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('GHL API Error:', message);
      return {
        success: false,
        error: message,
      };
    }
  }
}

export default GHLClient;
