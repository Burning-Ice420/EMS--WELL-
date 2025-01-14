import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  throw new Error(
    "Missing required environment variables: CLIENT_ID, CLIENT_SECRET, or REDIRECT_URI"
  );
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);


export function getAuthUrl() {
  const scopes = ["https://www.googleapis.com/auth/calendar"];
  return oauth2Client.generateAuthUrl({
    access_type: "offline", // Important to get refresh tokens
    scope: scopes,
  });
}

export async function getAccessToken(code) {
  try {
    if (!code) {
      throw new Error("Authorization code is required");
    }
    
    const { tokens } = await oauth2Client.getToken(code);
    
    oauth2Client.setCredentials(tokens);
    
    return tokens;
  } catch (error) {
    console.error("Error retrieving access token:", error.message);
    throw new Error("Failed to retrieve access token");
  }
}

export async function addEvent(event) {
  try {
    if (!event || !event.summary || !event.start || !event.end) {
      throw new Error(
        "Event data is incomplete. Ensure 'summary', 'start', and 'end' are provided."
      );
    }


    const calendar = google.calendar({ version: "v3", auth: oauth2Client });


    const response = await calendar.events.insert({
      calendarId: "primary", // Use 'primary' for the default calendar
      resource: event,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding event to calendar:", error.response ? error.response.data : error.message);
    throw new Error("Failed to add event to calendar");
  }
}


export async function refreshToken() {
  try {
    const tokens = oauth2Client.credentials;
    
    if (tokens && tokens.refresh_token) {
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
      return credentials;
    } else {
      throw new Error("No refresh token found, unable to refresh access token");
    }
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    throw new Error("Failed to refresh access token");
  }
}
