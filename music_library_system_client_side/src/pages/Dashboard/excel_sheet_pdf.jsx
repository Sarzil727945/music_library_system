import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import { addExcelSheet, getAllExcelSheet } from "../../api/excelSheet";
import html2canvas from "html2canvas";

const ExcelSheetPdf = () => {
     const [data, setData] = useState([]);
     const [excelAllData, setExcelAllData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [url, setUrl] = useState('');

     const notifySuccess = (text) => toast.success(text);
     const notifyError = (text) => toast.error(text);

     const handleFileUpload = (e) => {
          const reader = new FileReader();
          reader.readAsBinaryString(e.target.files[0]);
          reader.onload = (e) => {
               const data = e.target.result;
               const workbook = XLSX.read(data, { type: "binary" });
               const sheetName = workbook.SheetNames[0];
               const sheet = workbook.Sheets[sheetName];
               const parsedData = XLSX.utils.sheet_to_json(sheet);
               setData(parsedData);
          };
     };

     const tableRef = useRef();

     const generatePrintPdf = useReactToPrint({
          content: () => tableRef.current,
          documentTitle: "pdfDownloadSA",
     });

     const generatePdf = () => {
          const input = tableRef.current;

          html2canvas(input).then((canvas) => {
               const imgData = canvas.toDataURL('image/png');
               const pdf = new jsPDF('l', 'mm', 'a4');
               pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
               pdf.save('table.pdf');
          });
     };





     const newArray = []
     for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const name = element?.Name || `${element["First Name"]} ${element["Last Name"]} `
          const arrObj = { id: element.Id, name: name, gender: element.Gender, country: element.Country, age: element.Age, date: element.Date }
          newArray.push(arrObj);
     }

     const handleSubmitDownload = async (e) => {
          e.preventDefault();
          notifyS('Please Waiting URL To PDF Convert Running..');
          try {
               const response = await fetch(`http://localhost:5000/convertUrlToPDF`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url }),

               });

               if (response.ok) {
                    const blob = await response.blob();
                    console.log('Received Blob:', blob);
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'urlToPdfConverted.pdf';
                    link.click();
                    notifySuccess('UrlToPdf Download successfully')
               } else {
                    console.error('Failed to convert to PDF:', response.statusText);
               }
          } catch (error) {
               console.error('Error:', error);
               notifyError('please small file and try again')
          }
     };

     // excel sheet data get and post in database
     useEffect(() => {
          getExcelSheet()
     }, [])

     const getExcelSheet = () => {
          getAllExcelSheet().then(data => {
               setExcelAllData(data);
               setLoading(false)
          })
     }

     const dataPost = () => {
          for (let index = 0; index < newArray.length; index++) {
               const postValue = newArray[index];
               addExcelSheet(postValue).then(data => {
                    if (data?.insertedId) {
                         notifySuccess('Excel Sheet Post successfully');
                         getExcelSheet();
                    }
               })
          }

     }

     return (
          <div className="App">
               <div>
                    <div>
                         <div>
                              <input
                                   type="file"
                                   accept=".xlsx, .xls"
                                   onChange={handleFileUpload}
                              />
                              <button onClick={() => dataPost()}>Save Data</button>
                         </div>
                         <form onSubmit={handleSubmitDownload}>
                              <label>
                                   URL:
                                   <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                              </label>
                              <button className="btn btn-success mb-2" type="submit">
                                   UrlToPdf Download
                              </button>
                         </form>
                    </div>

                    {newArray.length > 0 && (
                         <table className="table" ref={tableRef}>
                              <thead className=" text-[16px]">
                                   <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Country</th>
                                        <th>Age</th>
                                        <th>Date</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {newArray.map((value, index) => (
                                        <tr key={index}>
                                             <td>{value.id}</td>
                                             <td>{value.name}</td>
                                             <td>{value.gender}</td>
                                             <td>{value.country}</td>
                                             <td>{value.age}</td>
                                             <td>{value.date}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    )}
               </div>

               <div className="container mt-5 pt-5">
                    <h3 className="mt-3 text-success"><center>Export React Table Data into EXCEL Sheet and PDF form</center></h3>
                    <div className="row mt-4">
                         <div>
                              <ReactHTMLTableToExcel
                                   id="test-table-xls-button"
                                   className="download-table-xls-button btn btn-success mb-3"
                                   table="table-to-xls"
                                   filename="tablexls"
                                   sheet="tablexls"
                                   buttonText="Export Data to Excel Sheet" />

                              <button className="btn btn-success mb-3 ml-5"
                                   onClick={generatePrintPdf} >
                                   Export Data to PDF and Print
                              </button>

                              <button className="btn btn-success mb-3 ml-5"
                                   onClick={generatePdf} >
                                   Export Data to PDF
                              </button>
                         </div>

                         <div ref={tableRef} style={{ width: '100%' }}>
                              <table className="table" id="table-to-xls">
                                   <thead className="thead-dark text-[16px]">
                                        <tr>
                                             <th>Id</th>
                                             <th>Name</th>
                                             <th>Gender</th>
                                             <th>Country</th>
                                             <th>Age</th>
                                             <th>Date</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {excelAllData.map((value, index) => (
                                             <tr key={index}>
                                                  <td>{value.id}</td>
                                                  <td>{value.name}</td>
                                                  <td>{value.gender}</td>
                                                  <td>{value.country}</td>
                                                  <td>{value.age}</td>
                                                  <td>{value.date}</td>
                                             </tr>
                                        ))}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default ExcelSheetPdf;
