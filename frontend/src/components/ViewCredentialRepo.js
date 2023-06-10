/**
 * Import of the main stylesheet generated by the SCSS files and preprocessor
 */
import '../scss/main.css';
/* Import of Styled React Bootstrap Table */
import Table from 'react-bootstrap/Table';

export const ViewCredentialRepo = () =>{
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Organisational Unit</th>
                <th>Division</th>
                <th>Resource</th>
                <th>Username</th>
                <th>Password</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Test</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>test</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>test</td>
                <td>Test</td>
            </tr>
            </tbody>
        </Table>
    );
}

export default BasicExample;