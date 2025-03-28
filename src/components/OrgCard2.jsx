export default function OrgCard2({ description }) {
  return (
    <a href="" style={{ textDecoration: "none", color: "black" }}>
      <div className="org-card2">
        <img
          src="https://picsum.photos/id/1/200/300"
          alt=""
          width="75px"
          height="75px"
          style={{ borderRadius: "50%" }}
        />
        <h3 style={{ padding: "0 16px", margin: "0 0 16px 0", flexGrow: 1 }}>{description}</h3>
      </div>
    </a>
  );
}
