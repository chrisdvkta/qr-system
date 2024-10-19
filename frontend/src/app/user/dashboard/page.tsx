"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../../../components/ui/dialog";
import { useToast } from "../../../hooks/use-toast";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login...");
        router.push("/login");
        return;
      }

      try {
        const eventRes = await fetch("http://localhost:5000/api/user/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!eventRes.ok) {
          throw new Error(`Error fetching events. Status: ${eventRes.status}`);
        }

        const eventData = await eventRes.json();
        setEvents(eventData);

        const ticketRes = await fetch(
          "http://localhost:5000/api/user/tickets/my",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!ticketRes.ok) {
          throw new Error(
            `Error fetching tickets. Status: ${ticketRes.status}`
          );
        }

        const ticketData = await ticketRes.json();
        setMyTickets(ticketData);
      } catch (error) {
        console.error("Error fetching events or tickets:", error);
      }
    };

    fetchData();
  }, [router]);

  const handleBuyTicket = async (eventId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/ticket/buy/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ eventId }),
        }
      );

      if (!res.ok) {
        throw new Error(`Error buying ticket. Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        alert("Ticket purchased successfully!");
        setSelectedTicketId(eventId);
      }
    } catch (error) {
      console.error("Error buying ticket:", error);
    }
  };

  const handleShowQR = async (ticketId) => {
    setSelectedTicketId(ticketId);
    try {
      const qrCode = await QRCode.toDataURL(ticketId);
      setQrCodeUrl(qrCode);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10 p-5 ">
      <h1 className="text-3xl font-bold">User Dashboard</h1>

      <Card>
        <section>
          <CardHeader>
            <h2 className="text-2xl font-bold ">Available Events</h2>
          </CardHeader>
          <CardContent className="flex flex-row gap-10 items-center">
            {events.map((event) => (
              <Card key={event._id}>
                <CardHeader>
                  <h3 className="text-xl font-bold">{event.name}</h3>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p>{event.description}</p>
                  <Button onClick={() => handleBuyTicket(event._id)}>
                    Buy Ticket
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </section>
      </Card>

      <Card>
        <section>
          <CardHeader>
            <h2 className="text-2xl font-bold">My Tickets</h2>
          </CardHeader>
          <CardContent className="flex flex-row gap-10">
            {myTickets.map((ticket) => (
              <Card
                className="flex flex-col justify-center items-center"
                key={ticket._id}
              >
                <CardHeader>
                  <h3 className="text-2xl font-bold">{ticket.event.name}</h3>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleShowQR(ticket._id)}>
                        Show QR
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="text-black flex flex-col justify-center items-center">
                      <DialogHeader>
                        <DialogDescription>
                          Scan this QR code for your ticket!
                        </DialogDescription>
                      </DialogHeader>
                      <img src={qrCodeUrl} alt="QR Code" />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </section>
      </Card>
    </div>
  );
};

export default Dashboard;
