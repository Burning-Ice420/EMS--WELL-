import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DateTimePicker from "react-datetime-picker";

const Container = styled.div`
  width: 500px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Button = styled.button`
  padding: 12px 25px;
  margin: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const StyledDateTimePicker = styled(DateTimePicker)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  font-size: 18px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  
  .react-datetime-picker__wrapper {
    position: relative;
    width: 100%;
  }

  .react-datetime-picker__calendarWrapper {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 10px;
    z-index: 9999;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }

  .react-datetime-picker__calendar {
    position: absolute;
    width: 350px;
    max-width: 100%;
    z-index: 9999;
    margin-top: 10px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    display: block;
  }
`;

const Input = styled.input`
  padding: 12px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 15px 0;
  font-size: 18px;
`;

const Google = () => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  const dateTimePickerRef = useRef(null);

  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get user's local timezone

  useEffect(() => {
    if (session) {
      console.log("User logged in:", session.user.email);
    }
  }, [session]);

  const adjustCalendarPosition = () => {
    const pickerElement = dateTimePickerRef.current;
    const calendarElement = document.querySelector(".react-datetime-picker__calendar");

    if (pickerElement && calendarElement) {
      const pickerRect = pickerElement.getBoundingClientRect();
      const calendarRect = calendarElement.getBoundingClientRect();

      // If calendar overflows the viewport (bottom side), move it above the input
      if (window.innerHeight - pickerRect.bottom < calendarRect.height) {
        calendarElement.style.top = `${pickerRect.top - calendarRect.height - 10}px`;
      } else {
        // Otherwise, position it normally below the input
        calendarElement.style.top = `${pickerRect.bottom + 10}px`;
      }
    }
  };

  // Adjust calendar position when the calendar opens
  useEffect(() => {
    adjustCalendarPosition();
    window.addEventListener("resize", adjustCalendarPosition);

    return () => {
      window.removeEventListener("resize", adjustCalendarPosition);
    };
  }, [start, end]);

  async function googleSignIn() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
        redirectTo: window.location.href,
      },
    });
    if (error) alert("Error logging in with Google");
    setLoading(false);
  }

  async function signOut() {
    setLoading(true);
    await supabase.auth.signOut();
    window.location.href = "/admin-dashboard"; // Redirect to admin dashboard after sign-out
    setLoading(false);
  }

  async function createCalendarEvent() {
    if (!session || !eventName || !eventDescription) {
      alert("Please provide event name, description, and date range.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        alert("Error fetching session: " + error.message);
        return;
      }

      const token = data.session.provider_token;
      if (!token) {
        alert("Missing Google OAuth token.");
        return;
      }

      const event = {
        summary: eventName,
        description: eventDescription,
        start: {
          dateTime: start.toISOString(),
          timeZone: localTimezone, // Automatically set user's local timezone
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: localTimezone, // Automatically set user's local timezone
        },
      };

      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert("Event created successfully!");
      } else {
        alert("Failed to create event: " + responseData.error.message);
      }
    } catch (error) {
      console.error("Error creating calendar event:", error);
      alert("Error creating event.");
    }
  }

  return (
    <Container>
      {session ? (
        <>
          <h2>Hey there, {session.user.email}</h2>
          <p>Start of your event</p>
          <StyledDateTimePicker
            ref={dateTimePickerRef}
            onChange={setStart}
            value={start}
            calendarClassName="custom-calendar"
          />

          <p>End of your event</p>
          <StyledDateTimePicker
            ref={dateTimePickerRef}
            onChange={setEnd}
            value={end}
            calendarClassName="custom-calendar"
          />

          <Input
            type="text"
            placeholder="Event Name"
            onChange={(e) => setEventName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Event Description"
            onChange={(e) => setEventDescription(e.target.value)}
          />

          <Button onClick={createCalendarEvent}>Create Calendar Event</Button>
          <Button onClick={signOut} disabled={loading}>
            {loading ? "Signing Out..." : "Sign Out"}
          </Button>
        </>
      ) : (
        <Button onClick={googleSignIn} disabled={loading}>
          {loading ? "Signing In..." : "Sign In With Google"}
        </Button>
      )}
    </Container>
  );
};

export default Google;
