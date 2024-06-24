import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./components/Sidebar";
import { useCallback, useRef, useState } from "react";
import { useAuthContext } from "./context/AuthContext";
import Login from "./components/Login";

let id = 0;
const getId = () => `dndnode_${id++}`;
function Flow() {
  const initialNodes = [];
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { isLoggedIn, loading } = useAuthContext();
  console.log(isLoggedIn, loading);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!isLoggedIn) {
    return <Login />;
  }
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "98vw",
        top: 0,
        right: 0,
      }}
    >
      <ReactFlowProvider>
        <div
          style={{ height: "100vh", width: "98vw" }}
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background
              style={{ backgroundColor: "#FFFBF5" }}
              color="lightgray"
              variant={BackgroundVariant.Lines}
            />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
