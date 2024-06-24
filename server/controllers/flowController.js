import { catchAsync } from "../utils/index.js";
import { FlowChart } from "../models/flowchart.js";

export const getFlowChart = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const data = await FlowChart.findOne({ where: { userid: req.user.id } });
  return res.status(200).json({
    success: true,
    data: data,
  });
});
