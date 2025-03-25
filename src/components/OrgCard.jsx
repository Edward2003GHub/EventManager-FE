export default function OrgCard({ image, title }) {
  return (
    <a href="#" className="org-link">
      <div className="org-card">
        <img
          src={image}
          alt=""
          width="75px"
          height="75px"
          style={{ borderRadius: "50%", marginBottom: "10px" }}
        />
        <p style={{ margin: 0, fontSize: "10px" }}>{title}</p>
      </div>
    </a>
  );
}
