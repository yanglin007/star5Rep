import ChartDrag from "../dragcomp/ChartDrag";
import ExportExcel from "../dragcomp/ExportExcel";
import FetchDataDrag from "../dragcomp/FetchDataDrag";
import FetchData from "../dragcomp/FetchDataDrag";
import FetchExcelDrag from "../dragcomp/FetchExcelDrag";
import FetchPdfDrag from "../dragcomp/FetchPdfDrag";
import GenRulesDrag from "../dragcomp/GenRulesDrag";
import PublishDrag from "../dragcomp/PublishDrag";
import ReportDrag from "../dragcomp/ReportDrag";
import { FileExcelOutlined, DatabaseOutlined, FileImageOutlined, ExportOutlined,FormOutlined } from "@ant-design/icons"

export const typeMap = {
    1: { comp:<FetchExcelDrag/>, title: "Get Data from Excel", className: "node-data", icon: <FileExcelOutlined />, name: "Fetch Data" }, //fetch data
    2: { comp: <FetchDataDrag/>, title: "Get Data from Database", className: "node-data", icon: <DatabaseOutlined />, name: "Fetch Data" }, //fetch data
    3: { comp: <FetchPdfDrag/>, title: "Get Data from Image", className: "node-data", icon: <FileImageOutlined />, name: "Fetch Data" }, //fetch data
    4: { comp: <ExportExcel/>,title: "Export Data to Excel", className: "node-data", icon: <ExportOutlined />, name: "Export Data" }, //fetch data
    5: { comp: <ExportExcel/>, title: "Export Data to Json", className: "node-export-excel", icon: < ExportOutlined />, name: "Export Data" }, //generate chart
    6: { comp: <ReportDrag />, title: "Export Data to Pie", className: "node-export-json", icon: < ExportOutlined />, name: "Export Chart" }, //generate report
    7: { comp: <ReportDrag />, title: "Export Data to Line", className: "node-publish", icon: < ExportOutlined />, name: "Export Chart" }, //publish
    8: { comp: <ReportDrag />, title: "Export Data to Bar", className: "node-publish", icon: < ExportOutlined />, name: "Export Chart" },  //publish
    9: { comp: <GenRulesDrag/>, title: "Generate Mapping Rules", className: "node-publish", icon:<FormOutlined />, name: "Generate Rules" }
}