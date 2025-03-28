export default function OrgCard({ description }) {
  return (
    <a href="#" className="org-link">
      <div className="org-card">
        <img
          src="https://picsum.photos/id/1/200/300"
          alt=""
          width="77px"
          height="77px"
          style={{ borderRadius: "50%", marginBottom: "20px" }}
        />
        <p style={{fontWeight: "normal", margin: 0}}>{description}</p>
      </div>
    </a>
  );
}
