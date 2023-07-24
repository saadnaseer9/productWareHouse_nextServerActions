"use client";

import React, { useEffect, useState } from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Sample data for the table
const data = [
  {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    address: "123 Main Street",
    city: "New York",
    country: "USA",
    occupation: "Software Engineer",
    phone: "+1 123-456-7890",
  },
  {
    name: "Jane Smith",
    age: 25,
    email: "jane@example.com",
    address: "456 Park Avenue",
    city: "Los Angeles",
    country: "USA",
    occupation: "Graphic Designer",
    phone: "+1 987-654-3210",
  },
  {
    name: "Robert Johnson",
    age: 40,
    email: "robert@example.com",
    address: "789 First Street",
    city: "Chicago",
    country: "USA",
    occupation: "Accountant",
    phone: "+1 567-890-1234",
  },
  {
    name: "Emily Davis",
    age: 28,
    email: "emily@example.com",
    address: "321 Second Avenue",
    city: "San Francisco",
    country: "USA",
    occupation: "Marketing Manager",
    phone: "+1 234-567-8901",
  },
  {
    name: "Michael Brown",
    age: 35,
    email: "michael@example.com",
    address: "987 Third Boulevard",
    city: "Houston",
    country: "USA",
    occupation: "Business Analyst",
    phone: "+1 890-123-4567",
  },
  {
    name: "Michael Brown",
    age: 35,
    email: "michael@example.com",
    address: "987 Third Boulevard",
    city: "Houston",
    country: "USA",
    occupation: "Business Analyst",
    phone: "+1 890-123-4567",
  },
  {
    name: "Michael Brown",
    age: 35,
    email: "michael@example.com",
    address: "987 Third Boulevard",
    city: "Houston",
    country: "USA",
    occupation: "Business Analyst",
    phone: "+1 890-123-4567",
  },
  {
    name: "Michael Brown",
    age: 35,
    email: "michael@example.com",
    address: "987 Third Boulevard",
    city: "Houston",
    country: "USA",
    occupation: "Business Analyst",
    phone: "+1 890-123-4567",
  },
  {
    name: "Michael Brown",
    age: 35,
    email: "michael@example.com",
    address: "987 Third Boulevard",
    city: "Houston",
    country: "USA",
    occupation: "Business Analyst",
    phone: "+1 890-123-4567",
  },
  {
    name: "Michael Brown",
    age: 35,
    email: "michael@example.com",
    address: "987 Third Boulevard",
    city: "Houston",
    country: "USA",
    occupation: "Business Analyst",
    phone: "+1 890-123-4567",
  },
];

// React component for the data table
const DataTable = () => {
  const [importedData, setImportedData] = useState([]);
  const [showUpload, setShowUpload] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    const savedData = localStorage.getItem("uploadedData");
    if (savedData) {
      setImportedData(JSON.parse(savedData));
    }
  }, []);

  // Function to export the table data to Excel format
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Sheet1"
    );
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    saveAs(
      new Blob([excelBuffer], {
        type: "application/octet-stream",
      }),
      "data.xlsx"
    );
    console.log("excelBuffer", workbook);
  };

  // Function to export the table data to PDF format
  //   const exportToPDF = () => {
  //     const styles = StyleSheet.create({
  //       page: { flexDirection: 'row', backgroundColor: '#E4E4E4' },
  //       section: { flexGrow: 1, margin: 10, padding: 10, textAlign: 'center' },
  //     });

  //     const MyDocument = (
  //       <Document>
  //         <Page size="A4" style={styles.page}>
  //           <View style={styles.section}>
  //             <Text>Name</Text>
  //             {data.map((item) => (
  //               <Text key={item.name}>{item.name}</Text>
  //             ))}
  //           </View>
  //           <View style={styles.section}>
  //             <Text>Age</Text>
  //             {data.map((item) => (
  //               <Text key={item.name}>{item.age}</Text>
  //             ))}
  //           </View>
  //           <View style={styles.section}>
  //             <Text>Email</Text>
  //             {data.map((item) => (
  //               <Text key={item.name}>{item.email}</Text>
  //             ))}
  //           </View>
  //         </Page>
  //       </Document>
  //     );

  //     const pdfBlob = new Blob([MyDocument], { type: 'application/pdf' });
  //     saveAs(pdfBlob, 'data.pdf');
  //   };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to read data from Excel file
  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, {
          type: "binary",
        });

        // Assuming the first sheet is the one to read
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet data to JSON format
        const jsonData =
          XLSX.utils.sheet_to_json(worksheet);

        // Update the state with imported data
        setImportedData(jsonData);
        setCurrentPage(1);

        localStorage.setItem(
          "uploadedData",
          JSON.stringify(jsonData)
        );
      };
      reader.readAsBinaryString(selectedFile);
    }
  };
  const clearData = () => {
    localStorage.removeItem("uploadedData");
    setImportedData([]);
    setSelectedFile(null);
  };
  const getCurrentPageData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    console.log("importedData",importedData)
    return importedData.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  };
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to handle pagination: move to the next page
  const goToNextPage = () => {
    const maxPage = Math.ceil(
      importedData.length / itemsPerPage
    );
    if (currentPage < maxPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
        
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ background: "orange" }}>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Occupation</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody
          style={{
            background: "black",
            color: "white",
            textAlign: "center",
          }}
        >
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.city}</td>
              <td>{item.country}</td>
              <td>{item.occupation}</td>

              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={exportToExcel}
          style={{
            background: "black",
            color: "white",
            padding: "1%",
            borderRadius: "10px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
        >
          Export to Excel
        </button>

        <div style={{ marginTop: "2%" }}>
          {selectedFile ? (
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
              }}
            >
              <p
                style={{
                  background: "orange",
                  color: "black",
                  borderRadius: "10px",
                  fontWeight: "600",
                  padding: "1%",
                  width: "20%",
                  marginRight: "20px",
                }}
              >
                Selected File: {selectedFile.name}
              </p>
              <button
                onClick={handleUpload}
                style={{
                  background: "black",
                  color: "white",
                  borderRadius: "10px",
                  padding: "1%",
                  marginRight: "20px",
                  fontWeight: "600",
                }}
              >
                Upload
              </button>
              <button
                onClick={clearData}
                style={{
                  color: "black",
                  border: "1px solid orange",
                  padding: "1%",
                  marginRight: "20px",
                  fontWeight: "600",
                  borderRadius: "10px",
                }}
              >
                Clear
              </button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileChange}
                style={{
                  background: "orange",
                  color: "black",
                  padding: "1%",
                  marginLeft: "20px",
                  borderRadius: "10px",
                  fontWeight: "600",
                }}
              />
            </div>
          )}
          {importedData.length > 0 ? (
              <table
              style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "20px",
                }}
                >
              <thead>
                <tr  style={{background:"black",color:"white",fontWeight:"600"}}>
                  {Object.keys(importedData[0]).map(
                    (key) => (
                      <th key={key}>{key}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map((item, index) => (
                  <tr key={index}  style={{background:"orange",fontWeight:"600"}}>
                    {Object.values(item).map(
                      (value, colIndex) => (
                        <td key={colIndex}>{value}</td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          
          ) : null}
          <div style={{display:"flex",justifyContent:"center",marginTop:"20px",marginBottom:"20px"}}>
          <button onClick={goToPrevPage} style={{marginRight:"20px",background:"black",color:"orange",padding:"1%",borderRadius:"10px",fontWeight:"600"}}>Previous</button>
            <button onClick={goToNextPage}  style={{color:"black",border:"2px solid orange",padding:"1%",borderRadius:"10px",fontWeight:"600"}}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
