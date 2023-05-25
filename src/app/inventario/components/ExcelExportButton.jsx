import React from 'react';
import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';
import {IconButton, SvgIcon, Tooltip, Zoom} from '@mui/material';
import dayjs from 'dayjs';

const ExcelExportButton = ({ rows, columns, sheetName, fileName, outlined, fontSize }) => {
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
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"   fontSize={fontSize} {...props}>
        <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
        {outlined ? (
            <>
            <path d="M180 860 c-19 -19 -20 -33 -20 -380 0 -347 1 -361 20 -380 19 -19 33 -20 207 -20 l187 0 -39 40 -39 40 -128 0 -128 0 0 320 0 320 140 0 140 0 0 -100 0 -100 100 0 100 0 0 -100 0 -100 40 0 40 0 0 123 0 122 -118 118 -117 117 -183 0 c-169 0 -183 -1 -202 -20z" />
            <path d="M395 490 c19 -38 35 -74 35 -79 0 -5 -16 -37 -35 -71 -19 -34 -35 -66 -35 -71 0 -5 18 -9 39 -9 37 0 40 3 58 45 10 25 21 45 25 45 3 0 14 -20 24 -45 16 -43 19 -45 55 -45 22 0 39 4 39 10 0 5 -17 39 -37 76 l-37 67 37 68 c20 37 37 70 37 73 0 3 -17 6 -38 6 -36 0 -39 -3 -58 -47 l-20 -48 -18 48 c-18 46 -20 47 -62 47 l-44 0 35 -70z" />
            <path d="M720 240 l0 -80 -62 0 -63 0 83 -82 82 -83 82 83 83 82 -63 0 -62 0 0 80 0 80 -40 0 -40 0 0 -80z" />
            </>
        ) : (
            <>
            <path d="M160 480 l0 -420 270 0 c149 0 270 2 270 4 0 3 -22 32 -50 65 -31 37 -50 70 -50 86 0 23 3 25 50 25 l50 0 0 70 0 70 50 0 50 0 0 158 0 157 -103 103 -102 102 -218 0 -217 0 0 -420z m520 295 l95 -95 -98 0 -97 0 0 95 c0 52 1 95 3 95 1 0 45 -43 97 -95z m-227 -211 c15 -30 31 -53 35 -50 4 3 19 27 32 55 22 48 25 51 62 51 44 0 45 1 -18 -98 -19 -29 -34 -57 -34 -62 0 -5 20 -41 45 -79 25 -38 45 -72 45 -75 0 -3 -17 -6 -37 -6 -36 0 -40 3 -67 55 -16 30 -31 55 -35 55 -3 0 -19 -25 -36 -55 -28 -52 -32 -55 -67 -55 -21 0 -38 2 -38 5 0 3 20 36 45 75 25 39 45 75 45 81 0 6 -18 41 -40 79 -22 38 -40 71 -40 74 0 3 17 6 38 6 36 0 39 -3 65 -56z" />
            <path d="M740 271 l0 -70 -50 -3 -50 -3 35 -44 c55 -69 119 -141 125 -141 7 0 150 176 150 185 0 3 -20 5 -45 5 l-45 0 0 70 0 70 -60 0 -60 0 0 -69z" />
            </>
        )}
        </g>
    </SvgIcon>
  );

  return (
    <Tooltip TransitionComponent={Zoom} placement="left" title="Exportar a Excel" arrow>
      <IconButton color="primary" aria-label="export to excel" component="span" onClick={exportToExcel} size="small">
        <ExcelIcon fontSize={fontSize} outlined={outlined.toString()} />
      </IconButton>
    </Tooltip>
  );
};

export default ExcelExportButton;
