import React from 'react';
import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';
import {IconButton, SvgIcon, Tooltip, Zoom} from '@mui/material';
import dayjs from 'dayjs';

const ExcelExportButton = ({ rows, columns, sheetName, fileName }) => {
  const exportToExcel = async () => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = columns;

    worksheet.addRows(rows);

    const buffer = await workbook.xlsx.writeBuffer();
    const currentDate = dayjs().format('DD-MM-YYYY');
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${fileName}_${currentDate}.xlsx`);
  };

  const ExcelIcon = (props) => (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" {...props}>
       <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
       <path d="M180 860 c-19 -19 -20 -33 -20 -380 0 -347 1 -361 20 -380 19 -19 33
        -20 207 -20 l187 0 -39 40 -39 40 -128 0 -128 0 0 320 0 320 140 0 140 0 0
        -100 0 -100 100 0 100 0 0 -100 0 -100 40 0 40 0 0 123 0 122 -118 118 -117
        117 -183 0 c-169 0 -183 -1 -202 -20z"/>
        <path d="M395 490 c19 -38 35 -74 35 -79 0 -5 -16 -37 -35 -71 -19 -34 -35
        -66 -35 -71 0 -5 18 -9 39 -9 37 0 40 3 58 45 10 25 21 45 25 45 3 0 14 -20
        24 -45 16 -43 19 -45 55 -45 22 0 39 4 39 10 0 5 -17 39 -37 76 l-37 67 37 68
        c20 37 37 70 37 73 0 3 -17 6 -38 6 -36 0 -39 -3 -58 -47 l-20 -48 -18 48
        c-18 46 -20 47 -62 47 l-44 0 35 -70z"/>
        <path d="M720 240 l0 -80 -62 0 -63 0 83 -82 82 -83 82 83 83 82 -63 0 -62 0
        0 80 0 80 -40 0 -40 0 0 -80z"/>
      </g>
    </SvgIcon>
  );

  return (
    <Tooltip TransitionComponent={Zoom} placement="left" title="Exportar a Excel" arrow>
      <IconButton color="primary" aria-label="export to excel" component="span" onClick={exportToExcel} size="small">
        <ExcelIcon fontSize="small"/>
      </IconButton>
    </Tooltip>
  );
};

export default ExcelExportButton;
