import { parse } from "json2csv";

interface IExportToCsv {
    data: any[];
    filename: string;
}

export async function ExportToCsv({data, filename}: IExportToCsv){
    const json = JSON.stringify(data);
    const fields = JSON.parse(json).map((item : any) => Object.keys(item))[0]
    const opts = { fields };    
    const csv = parse(data, opts);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();

    document.body.removeChild(link);


}