/* eslint-disable react/prop-types */

// Soft UI Dashboard React components

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function data(excelData) {


	const getExcelRows = (rows) => {
		const excelRows = [];
		rows.map((item, i) => {
			const index = (
				<MDTypography display="block" variant="caption" color="text" fontWeight="medium">
					{i + 1}
				</MDTypography>
			)
			const name = (
					<MDBox lineHeight={1} textAlign="left">
					<MDTypography display="block" variant="caption" color="text" fontWeight="medium" fontSize="16px">
							{item[0]}
					</MDTypography>
					<MDTypography variant="caption" fontSize="11px">{item[1]}</MDTypography>
					</MDBox>
			)
			const loads = (
					<MDTypography display="block" variant="caption" color="text" fontWeight="medium">
							{item[2]}
					</MDTypography>
			)

			const origins = (
					<MDBox lineHeight={1} textAlign="left">
					<MDTypography display="block" variant="caption" color="text" fontWeight="medium">
							{item[7]}
					</MDTypography>
					<MDTypography variant="caption">{item[9]}</MDTypography>
					</MDBox>
			)
			const destination =(
					<MDBox lineHeight={1} textAlign="left">
					<MDTypography display="block" variant="caption" color="text" fontWeight="medium">
							{item[8]}
					</MDTypography>
					<MDTypography variant="caption">{item[10]}</MDTypography>
					</MDBox>
			)
      excelRows.push({index, name, loads, origins, destination})
      return 0
		})
		return excelRows
	}

	const rows = getExcelRows(excelData);

	return {
			columns: [
					{Header: 'Index', accessor: 'index', width: '5%', align: 'center'},
					{Header: 'Name', accessor: 'name', width: '25%', align: 'left'},
					{Header: 'Available Loads', accessor: 'loads', width: '20%', align: 'center'},
					{Header: 'Origin', accessor: 'origins', width: '25%', align: 'left'},
					{Header: 'Destination', accessor: 'destination', width: '25%', align: 'left'}
			],
			rows
	};
}
