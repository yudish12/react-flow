import { NodeTypes } from "../utils/nodeTypes";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      style={{
        position: "absolute",
        width: "20%",
        height: "90%",
        top: 20,
        right: 10,
        borderRadius: 16,
        display: "flex",
        padding: "10px",
        flexDirection: "column",
        background: "#F7EFE5",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontFamily: "Roboto, sans-serif",
          fontWeight: 400,
        }}
      >
        Sidebar
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 8,
        }}
      >
        {NodeTypes.map((e) => (
          <div
            style={{
              width: "80%",
              padding: "10px",
              height: "100px",
              border: "2px solid #874CCC",
              background: "#7743DB",
              borderRadius: 12,
            }}
            onDragStart={(event) => onDragStart(event, e.name)}
            key={e.id}
            draggable
          >
            {e.domNode}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
