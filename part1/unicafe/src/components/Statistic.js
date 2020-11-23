import React from 'react';

const Statistic = ({ text, value }) => (
	<table>
		<tbody>
			<tr>
				<td>{text}:</td> 
				<td>{value}</td>
			</tr>
		</tbody>
	</table>
);

export default Statistic; 