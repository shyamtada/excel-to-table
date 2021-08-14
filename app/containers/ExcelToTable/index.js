/**
 * Excel To Table
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { useState, useEffec } from 'react';
import * as XLSX from "xlsx";

import './excelToTable.css';

export default function ExcelToTable() {
    const [file, setFile] = useState("");
    const [jsonData, setJsonData] = useState([]);


    const filePathset = (e) => {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);
        setFile(file);
        var f = file;
        var name = f.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
            // evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            /* Update state */
            console.log("Data>>>" + data);// shows that excel data is read
            console.log(convertToJson(data)); // shows data in json format
        };
        reader.readAsBinaryString(f);
    }

    const convertToJson = (csv) => {
        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }
        setJsonData(result);
        return result;
    }

    console.log("state", jsonData);
    return (
        <div>
            <h1 className="head-container">Excel To Table</h1>
            <div style={{ textAlign: 'center' }}>
                <label class="custom-file-upload">
                    <input
                        type="file"
                        id="file"
                        onChange={filePathset}
                    />
                    {file ? file.name : "Select XLSX file"}
                </label>
            </div>
            {
                jsonData && Object.keys(jsonData).length > 0 ?
                    <div className="table-container">
                        <table>
                            <tr>
                                {Object.entries(jsonData[0]).map(([key, value]) => {
                                    return (
                                        <th className="sticky-header">
                                            <span>{key}</span>
                                        </th>
                                    )
                                })}
                            </tr>
                            {jsonData.map((data, index) => {

                                return (
                                    <tr>
                                        {Object.entries(data).map(([key, value]) => {
                                            return (
                                                <td className="cell-align-border" style={index % 2 !== 0 ? { backgroundColor: '#F1F6FF' } : null}>
                                                    <span>{value ? value : '-'}</span>
                                                </td>

                                            )
                                        })}
                                    </tr>
                                )
                            }
                            )}
                        </table>
                    </div>
                    :
                    null
            }
        </div>
    );
}
