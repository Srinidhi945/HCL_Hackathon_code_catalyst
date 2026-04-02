export default function CategoryCard({ title, icon, onClick }) {

  return (

    <div style={cardStyle} onClick={onClick}>

      <div style={iconStyle}>{icon}</div>

      <h3>{title}</h3>

    </div>

  );

}

const cardStyle = {
  width: "180px",
  height: "150px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "transform 0.2s"
};

const iconStyle = {
  fontSize: "40px",
  marginBottom: "10px"
};