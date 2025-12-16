import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarPlus } from "lucide-react";

interface AddToCalendarProps {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription: string;
}

const AddToCalendar = ({
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
}: AddToCalendarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Parse date and time to create proper date objects
  const parseDateTime = () => {
    const [year, month, day] = eventDate.split("-").map(Number);
    
    // Parse time - handle various formats
    let hours = 10;
    let minutes = 0;
    
    const timeMatch = eventTime.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM|am|pm)?/);
    if (timeMatch) {
      hours = parseInt(timeMatch[1]);
      minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
      const period = timeMatch[3]?.toUpperCase();
      
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
    }

    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    return { startDate, endDate };
  };

  const formatDateForGoogle = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, "");
  };

  const formatDateForICS = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, "").slice(0, -1);
  };

  const handleGoogleCalendar = () => {
    const { startDate, endDate } = parseDateTime();
    
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: eventName,
      dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`,
      details: eventDescription,
      location: eventLocation,
    });

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank");
    setIsOpen(false);
  };

  const handleOutlookCalendar = () => {
    const { startDate, endDate } = parseDateTime();
    
    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: eventName,
      startdt: startDate.toISOString(),
      enddt: endDate.toISOString(),
      body: eventDescription,
      location: eventLocation,
    });

    window.open(`https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`, "_blank");
    setIsOpen(false);
  };

  const handleAppleCalendar = () => {
    const { startDate, endDate } = parseDateTime();
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ListeningClub//Event//EN",
      "BEGIN:VEVENT",
      `DTSTART:${formatDateForICS(startDate)}`,
      `DTEND:${formatDateForICS(endDate)}`,
      `SUMMARY:${eventName}`,
      `DESCRIPTION:${eventDescription.replace(/\n/g, "\\n")}`,
      `LOCATION:${eventLocation}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${eventName.replace(/\s+/g, "-")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="shadow-soft">
          <CalendarPlus className="mr-2" size={16} />
          Add to Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleGoogleCalendar} className="cursor-pointer">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-9 15.75a.75.75 0 11-1.5 0v-6a.75.75 0 111.5 0v6zm0-9a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6 9a.75.75 0 11-1.5 0v-6a.75.75 0 111.5 0v6zm0-9a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
          </svg>
          Google Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAppleCalendar} className="cursor-pointer">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Apple Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOutlookCalendar} className="cursor-pointer">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V12zm-6-8.25v3h3v-3h-3zm0 4.5v3h3v-3h-3zm0 4.5v1.83l3.05-1.83H18zm-5.25-9v3h3.75v-3h-3.75zm0 4.5v3h3.75v-3h-3.75zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73h-3.75zM9 3.75V6h2l.13.01.12.04v-2.3H9zM3.13 21h11.12v-2.56l-5.94-3.75-.06.06q-.08.06-.15.12-.07.05-.15.1l-.22.15q-.04.02-.09.06l-.22.14-.13.08q-.09.05-.14.09-.06.04-.15.1l-.15.09-.14.1q-.04.03-.13.06l-.09.06H3.13V21zm14.12 0h4.62V15.1l-4.62 2.77V21z"/>
          </svg>
          Outlook
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddToCalendar;
