import { MdOutlineMailOutline } from "react-icons/md";
const EmailDom = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MdOutlineMailOutline
        style={{
          color: "white",
          width: 50,
          height: 50,
          marginTop: 10,
        }}
      />
      <span
        style={{
          color: "white",
          fontWeight: "400",
          fontFamily: "Roboto, sans-serif",
          whiteSpace: "nowrap",
          wordBreak: "break-all",
          marginTop: 4,
        }}
      >
        Email Domnode
      </span>
    </div>
  );
};

export default EmailDom;
