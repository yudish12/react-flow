import { LuClock3 } from "react-icons/lu";
const DelayDom = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LuClock3
        style={{ color: "white", width: 50, height: 50, marginTop: 10 }}
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
        Delay Domnode
      </span>
    </div>
  );
};

export default DelayDom;
