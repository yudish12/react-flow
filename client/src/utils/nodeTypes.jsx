import DelayDom from "../components/Nodes/DelayDom";
import EmailDom from "../components/Nodes/EmailDom";

export const NodeTypes = [
  {
    id: 1,
    name: "email",
    propertyNode: <div>Email Property Node</div>,
    domNode: <EmailDom />,
  },
  {
    id: 2,
    name: "delay",
    propertyNode: <div>Delay Property Node</div>,
    domNode: <DelayDom />,
  },
];
