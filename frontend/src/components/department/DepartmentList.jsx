import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import styled from "styled-components";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const responnse = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (responnse.data.success) {
        let sno = 1;
        const data = await responnse.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <LoadingText>Loading ...</LoadingText>
      ) : (
        <Container>
          <Header>
            <h3>Manage Departments</h3>
          </Header>
          <SearchAndAdd>
            <SearchInput
              type="text"
              placeholder="Search By Dep Name"
              onChange={filterDepartments}
            />
            <AddButton to="/admin-dashboard/add-department">Add New Department</AddButton>
          </SearchAndAdd>
          <DataTableContainer>
            <DataTable columns={columns} data={filteredDepartments} pagination />
          </DataTableContainer>
        </Container>
      )}
    </>
  );
};


const Container = styled.div`
  padding: 1.25rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1.25rem;
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const SearchAndAdd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
`;

const SearchInput = styled.input`
  padding: 0.25rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const AddButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color:rgb(21, 50, 212);
  border-radius: 0.375rem;
  color: white;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    background-color:rgb(18, 12, 197);
  }
`;

const DataTableContainer = styled.div`
  margin-top: 1.25rem;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
`;

export default DepartmentList;
