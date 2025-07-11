import axios from 'axios';

// ----------------------------------------------------------------------

interface OAuthConfig {
  google: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  github: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
}

interface OAuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'github';
}

class OAuthService {
  private config: OAuthConfig;

  constructor() {
    this.config = {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirectUri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/callback/google`,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        redirectUri: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/callback/github`,
      },
    };
  }

  /**
   * Get Google OAuth URL
   */
  getGoogleAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.google.clientId,
      redirect_uri: this.config.google.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  /**
   * Get GitHub OAuth URL
   */
  getGithubAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.github.clientId,
      redirect_uri: this.config.github.redirectUri,
      scope: 'read:user user:email',
    });

    return `https://github.com/login/oauth/authorize?${params}`;
  }

  /**
   * Exchange Google authorization code for access token
   */
  async getGoogleAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: this.config.google.clientId,
        client_secret: this.config.google.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.google.redirectUri,
      });

      return response.data.access_token;
    } catch (error: any) {
      console.error('Google token exchange failed:', error);
      throw new Error(`Google token exchange failed: ${error.message}`);
    }
  }

  /**
   * Exchange GitHub authorization code for access token
   */
  async getGithubAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: this.config.github.clientId,
        client_secret: this.config.github.clientSecret,
        code,
      }, {
        headers: {
          'Accept': 'application/json',
        },
      });

      return response.data.access_token;
    } catch (error: any) {
      console.error('GitHub token exchange failed:', error);
      throw new Error(`GitHub token exchange failed: ${error.message}`);
    }
  }

  /**
   * Get Google user profile
   */
  async getGoogleUserProfile(accessToken: string): Promise<OAuthUser> {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const userData = response.data;

      return {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        avatar: userData.picture,
        provider: 'google',
      };
    } catch (error: any) {
      console.error('Google profile fetch failed:', error);
      throw new Error(`Google profile fetch failed: ${error.message}`);
    }
  }

  /**
   * Get GitHub user profile
   */
  async getGithubUserProfile(accessToken: string): Promise<OAuthUser> {
    try {
      // Get user profile
      const profileResponse = await axios.get('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      // Get user emails
      const emailsResponse = await axios.get('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      const profileData = profileResponse.data;
      const emails = emailsResponse.data;
      const primaryEmail = emails.find((email: any) => email.primary)?.email || profileData.email;

      return {
        id: profileData.id.toString(),
        email: primaryEmail,
        name: profileData.name || profileData.login,
        avatar: profileData.avatar_url,
        provider: 'github',
      };
    } catch (error: any) {
      console.error('GitHub profile fetch failed:', error);
      throw new Error(`GitHub profile fetch failed: ${error.message}`);
    }
  }

  /**
   * Complete Google OAuth flow
   */
  async completeGoogleAuth(code: string): Promise<OAuthUser> {
    try {
      const accessToken = await this.getGoogleAccessToken(code);
      const userProfile = await this.getGoogleUserProfile(accessToken);
      return userProfile;
    } catch (error: any) {
      console.error('Google OAuth flow failed:', error);
      throw new Error(`Google OAuth flow failed: ${error.message}`);
    }
  }

  /**
   * Complete GitHub OAuth flow
   */
  async completeGithubAuth(code: string): Promise<OAuthUser> {
    try {
      const accessToken = await this.getGithubAccessToken(code);
      const userProfile = await this.getGithubUserProfile(accessToken);
      return userProfile;
    } catch (error: any) {
      console.error('GitHub OAuth flow failed:', error);
      throw new Error(`GitHub OAuth flow failed: ${error.message}`);
    }
  }

  /**
   * Validate OAuth configuration
   */
  validateConfig(): { google: boolean; github: boolean } {
    return {
      google: !!(this.config.google.clientId && this.config.google.clientSecret),
      github: !!(this.config.github.clientId && this.config.github.clientSecret),
    };
  }

  /**
   * Get OAuth provider status
   */
  getProviderStatus(): { google: boolean; github: boolean } {
    return this.validateConfig();
  }
}

// Export singleton instance
export const oauthService = new OAuthService();
export default oauthService; 