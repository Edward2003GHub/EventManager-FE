export default function EventForm({ event }) {
  return (
    <form method="post">
      <input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={event ? event.name : ""}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        defaultValue={event ? event.description : ""}
      />
      <input
        type="text"
        name="startTime"
        placeholder="StartTime"
        defaultValue={event ? event.startTime : ""}
      />
      <input
        type="text"
        name="endTime"
        placeholder="EndTime"
        defaultValue={event ? event.endTime : ""}
      />
      <input
        type="file"
        name="eventPhoto"
        placeholder="EventPhoto"
        defaultValue={event ? event.eventPhoto : ""}
      />
      <input
        type="text"
        name="photoUrl"
        placeholder="PhotoUrl"
        defaultValue={event ? event.photoUrl : ""}
      />
      <input type="submit" value="Add Event" />
    </form>
  );
}
