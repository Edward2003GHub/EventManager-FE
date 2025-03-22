export default function Input({ id, label, error, ...props}) {
  return (
    <div className="register-input">
      <input {...props} id={id} placeholder={label} />
      <p>{error}</p>
    </div>
  );
}
