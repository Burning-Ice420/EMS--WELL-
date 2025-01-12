import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import styled from 'styled-components';



const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:5000/api/employee',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className='rounded-full'
                src={`http://localhost:5000/${emp.userId.profileImage}`}
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.log(error.message);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  if (!filteredEmployee) {
    return <div>Loading ...</div>;
  }

  return (
    <Container>
      <Title>Manage Employee</Title>
      <FilterSection>
        <SearchInput
          type="text"
          placeholder="Search By Name"
          onChange={handleFilter}
        />
        <AddButton to="/admin-dashboard/add-employee">
          Add New Employee
        </AddButton>
      </FilterSection>
      <DataTableWrapper>
        <DataTable columns={columns} data={filteredEmployee} pagination />
      </DataTableWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const AddButton = styled(Link)`
  padding: 8px 16px;
  background-color:rgb(20, 31, 184);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    background-color:rgb(29, 15, 159);
  }
`;

const DataTableWrapper = styled.div`
  margin-top: 24px;
`;
export default List;
