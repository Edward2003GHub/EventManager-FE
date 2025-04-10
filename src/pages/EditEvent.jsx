import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEvent() {
    const eventData = useRouteLoaderData('event-details');
    return <EventForm event={eventData} method="PATCH" />;
}