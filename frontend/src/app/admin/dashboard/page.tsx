"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { toast, useToast } from "../../../hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Redirecting to login...");
        router.push("/admin/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/admin/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error fetching events. Status: ${res.status}`);
        }

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [router]);

  const handleCreateEvent = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/admin/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) {
        throw new Error(`Error creating event. Status: ${res.status}`);
      }

      const createdEvent = await res.json();
      setEvents([...events, createdEvent]);
      toast({
        title: "Event created successfully!",
      });
      setNewEvent({ name: "", description: "", date: "" });
    } catch (error) {
      toast({
        variant: "desctructive",
        title: "Error creating event!",
      });
      console.error("Error creating event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error deleting event. Status: ${res.status}`);
      }

      setEvents(events.filter((event) => event._id !== eventId));
      toast({
        title: "Event deleted successfully!",
      });
    } catch (error) {
      toast({
        variant: "desctructive",
        title: "Error deleting event!",
      });
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-5 flex flex-col  justify-center gap-5 ">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      <section>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Create New Event</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 ">
            <Input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
            />
            <Input
              type="text"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Manage Events</h2>
          </CardHeader>
          <CardContent className="flex gap-10 items-center">
            {events.map((event) => (
              <div key={event._id} className="">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <Button onClick={() => handleDeleteEvent(event._id)}>
                  Delete Event
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;
