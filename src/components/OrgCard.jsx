export default function OrgCard({ image, title }) {
  return (
    <a href="#" className="org-link">
      <div className="org-card">
        <img
          src={image}
          alt=""
          width="77px"
          height="77px"
          style={{ borderRadius: "50%", marginBottom: "20px" }}
        />
        <h3 style={{margin: "0px 0px 43px", fontWeight: "normal"}}>{title}</h3>
      </div>
    </a>
  );
}
