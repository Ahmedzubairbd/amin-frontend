import axios from 'axios';

// ----------------------------------------------------------------------

interface SMSConfig {
  apiKey: string;
  secretKey: string;
  senderId: string;
  baseUrl: string;
  alternateUrl: string;
}

interface SMSResponse {
  Status: string;
  Text: string;
  Message_ID?: string;
}

interface OTPResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

class SMSService {
  private config: SMSConfig;

  constructor() {
    this.config = {
      apiKey: process.env.SONALI_SMS_API_KEY || '',
      secretKey: process.env.SONALI_SMS_SECRET_KEY || '',
      senderId: process.env.SONALI_SMS_SENDER_ID || 'AMINDIAG',
      baseUrl: process.env.SONALI_SMS_BASE_URL || 'http://api.sonalisms.com:7788',
      alternateUrl: process.env.SONALI_SMS_ALTERNATE_URL || 'http://103.177.125.106:7788',
    };
  }

  /**
   * Send SMS using Sonali SMS API
   */
  private async sendSMS(phoneNumber: string, message: string): Promise<SMSResponse> {
    try {
      const params = new URLSearchParams({
        apikey: this.config.apiKey,
        secretkey: this.config.secretKey,
        callerID: this.config.senderId,
        toUser: phoneNumber,
        messageContent: message,
      });

      // Try primary URL first
      try {
        const response = await axios.get(`${this.config.baseUrl}/sendtext?${params}`);
        return response.data;
      } catch (error) {
        console.log('Primary SMS URL failed, trying alternate URL...');
        // Try alternate URL if primary fails
        const response = await axios.get(`${this.config.alternateUrl}/sendtext?${params}`);
        return response.data;
      }
    } catch (error: any) {
      console.error('SMS sending failed:', error);
      throw new Error(`SMS sending failed: ${error.message}`);
    }
  }

  /**
   * Generate OTP code
   */
  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Send OTP to phone number
   */
  async sendOTP(phoneNumber: string): Promise<OTPResponse> {
    try {
      const otp = this.generateOTP();
      const message = `Your Amin Diagnostics OTP is: ${otp}. Valid for 5 minutes. Do not share this code.`;

      const response = await this.sendSMS(phoneNumber, message);

      if (response.Status === '0' && response.Text === 'ACCEPTD') {
        // Store OTP in database or cache for verification
        await this.storeOTP(phoneNumber, otp);
        
        return {
          success: true,
          messageId: response.Message_ID,
        };
      } else {
        return {
          success: false,
          error: `SMS sending failed: ${response.Text}`,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Verify OTP
   */
  async verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
    try {
      // Retrieve stored OTP from database or cache
      const storedOTP = await this.getStoredOTP(phoneNumber);
      
      if (storedOTP && storedOTP === otp) {
        // Clear OTP after successful verification
        await this.clearOTP(phoneNumber);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('OTP verification failed:', error);
      return false;
    }
  }

  /**
   * Check SMS delivery status
   */
  async checkDeliveryStatus(messageId: string): Promise<any> {
    try {
      const params = new URLSearchParams({
        apikey: this.config.apiKey,
        secretkey: this.config.secretKey,
        messageid: messageId,
      });

      const response = await axios.get(`${this.config.baseUrl}/getstatus?${params}`);
      return response.data;
    } catch (error: any) {
      console.error('Delivery status check failed:', error);
      throw new Error(`Delivery status check failed: ${error.message}`);
    }
  }

  /**
   * Send bulk SMS
   */
  async sendBulkSMS(messages: Array<{ phoneNumber: string; message: string }>): Promise<any> {
    try {
      const content = messages.map(msg => ({
        callerID: this.config.senderId,
        toUser: msg.phoneNumber,
        messageContent: msg.message,
      }));

      const params = new URLSearchParams({
        apikey: this.config.apiKey,
        secretkey: this.config.secretKey,
        content: JSON.stringify(content),
      });

      const response = await axios.get(`${this.config.baseUrl}/send?${params}`);
      return response.data;
    } catch (error: any) {
      console.error('Bulk SMS sending failed:', error);
      throw new Error(`Bulk SMS sending failed: ${error.message}`);
    }
  }

  /**
   * Store OTP in database/cache (implement based on your storage solution)
   */
  private async storeOTP(phoneNumber: string, otp: string): Promise<void> {
    // TODO: Implement OTP storage
    // This could be stored in:
    // - Redis cache with TTL
    // - Database with expiration
    // - Memory cache (not recommended for production)
    
    console.log(`Storing OTP ${otp} for ${phoneNumber}`);
    
    // Example implementation with localStorage (for development only)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`otp_${phoneNumber}`, JSON.stringify({
        otp,
        timestamp: Date.now(),
        expiresAt: Date.now() + (5 * 60 * 1000), // 5 minutes
      }));
    }
  }

  /**
   * Get stored OTP from database/cache
   */
  private async getStoredOTP(phoneNumber: string): Promise<string | null> {
    // TODO: Implement OTP retrieval
    // This should match your storage implementation
    
    console.log(`Retrieving OTP for ${phoneNumber}`);
    
    // Example implementation with localStorage (for development only)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`otp_${phoneNumber}`);
      if (stored) {
        const data = JSON.parse(stored);
        if (Date.now() < data.expiresAt) {
          return data.otp;
        } else {
          // OTP expired, remove it
          localStorage.removeItem(`otp_${phoneNumber}`);
        }
      }
    }
    
    return null;
  }

  /**
   * Clear OTP from database/cache
   */
  private async clearOTP(phoneNumber: string): Promise<void> {
    // TODO: Implement OTP clearing
    // This should match your storage implementation
    
    console.log(`Clearing OTP for ${phoneNumber}`);
    
    // Example implementation with localStorage (for development only)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`otp_${phoneNumber}`);
    }
  }

  /**
   * Get SMS balance
   */
  async getBalance(): Promise<any> {
    try {
      const clientId = this.config.apiKey; // Using API key as client ID
      const response = await axios.get(
        `${this.config.baseUrl}/sms/smsConfiguration/smsClientBalance.jsp?client=${clientId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Balance check failed:', error);
      throw new Error(`Balance check failed: ${error.message}`);
    }
  }
}

// Export singleton instance
export const smsService = new SMSService();
export default smsService; 