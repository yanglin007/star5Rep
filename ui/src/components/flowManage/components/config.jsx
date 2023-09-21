import ChartDrag from "../dragcomp/ChartDrag";
import FetchData from "../dragcomp/FetchDataDrag";
import PublishDrag from "../dragcomp/PublishDrag";
import ReportDrag from "../dragcomp/ReportDrag";
import { FileExcelOutlined, DatabaseOutlined, FileImageOutlined, ExportOutlined } from "@ant-design/icons"

export const typeMap = {
    1: { comp: <FetchData />, title: "Get Data from Excel", className: "node-data", icon: <FileExcelOutlined />, name: "Fetch Data" }, //fetch data
    2: { comp: <FetchData />, title: "Get Data from Database", className: "node-data", icon: <DatabaseOutlined />, name: "Fetch Data" }, //fetch data
    3: { comp: <FetchData />, title: "Get Data from Image", className: "node-data", icon: <FileImageOutlined />, name: "Fetch Data" }, //fetch data
    4: { comp: <FetchData />, title: "Export Data to Excel", className: "node-data", icon: <ExportOutlined />, name: "Export Data" }, //fetch data
    5: { comp: <ChartDrag />, title: "Export Data to Json", className: "node-export-excel", icon: < ExportOutlined />, name: "Export Data" }, //generate chart
    6: { comp: <ReportDrag />, title: "Export Data to Pie", className: "node-export-json", icon: < ExportOutlined />, name: "Export Chart" }, //generate report
    7: { comp: <PublishDrag />, title: "Export Data to Line", className: "node-publish", icon: < ExportOutlined />, name: "Export Chart" }, //publish
    8: { comp: <PublishDrag />, title: "Export Data to Bar", className: "node-publish", icon: < ExportOutlined />, name: "Export Chart" }  //publish
}