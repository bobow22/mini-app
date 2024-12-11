'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import { convertDate, compareDates } from '@/helpers/formatDate';
import Navbar from '../components/Navbar';
import FormDialog from '../components/dialog';
import { ColDef } from 'ag-grid-community';

const initialValue = {
  id: '',
  date: '',
  product_name: '',
  color: '',
  amount: '',
  unit: '',
};

export default function FruitTablePage() {
  const [formData, setFormData] = useState(initialValue);
  const [rowData, setRowData] = useState([]);
  const [pageSize] = useState(20);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setError('');
    setFormData(initialValue);
    setOpen(false);
  };

  const getData = async () => {
    const result = await axios.get('/api/fruit');
    const fruits = result.data.fruits;
    setRowData(fruits);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: any) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async () => {
    if (formData.id) {
      try {
        // Validate inputs
        if (
          !formData.date ||
          !formData.product_name ||
          !formData.color ||
          !formData.amount ||
          !formData.unit
        ) {
          setError('Please fill out all fields');
          return;
        }

        await axios.put(`/api/fruit/${formData.id}`, formData);
        handleClose();
        getData();
      } catch (error) {
        console.error('Error adding data:', error);
      }
    } else {
      // Validate inputs
      if (
        !formData.date ||
        !formData.product_name ||
        !formData.color ||
        !formData.amount ||
        !formData.unit
      ) {
        setError('Please fill out all fields');
        return;
      }

      try {
        await axios.post('/api/fruit', formData); // Axios POST request
        handleClose();
        getData(); // Fetch updated data
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }
  };

  const handleUpdate = async (oldData: any) => {
    setFormData({ ...oldData, date: convertDate(oldData.date) });
    handleClickOpen();
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      'Are you sure that you want to delete this row?'
    );

    if (confirm) {
      try {
        await axios.delete(`/api/fruit/${id}`);
        getData(); // Fetch updated data
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const ActionButtons = (params: any) => {
    return (
      <div className='flex flex-wrap justify-center'>
        <button
          className='bg-yellow-500 hover:bg-blue-600 text-white rounded-md shadow-md mx-1 px-2 transition duration-300'
          onClick={() => handleUpdate(params.data)}
        >
          Update
        </button>
        <button
          className='bg-red-500 hover:bg-blue-600 text-white rounded-md shadow-md mx-1 px-2 transition duration-300'
          onClick={() => handleDelete(params.data.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const filterParams = {
    comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
      const res = compareDates(filterLocalDateAtMidnight, cellValue);
      return res;
    },
  };

  const colDefs: ColDef[] = [
    { field: 'id', hide: true },
    {
      headerName: 'Date',
      field: 'date',
      valueFormatter: (params: any) => {
        if (!params.value) return '';
        return format(new Date(params.value), 'dd/MM/yyyy');
      },
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
    },
    {
      field: 'product_name',
      headerName: 'Product Name',
    },
    { field: 'color', headerName: 'Color' },
    {
      field: 'amount',
      headerName: 'Amount',
      cellStyle: { textAlign: 'right' },
      valueFormatter: (params: any) => {
        return Number(params.value).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        });
      },
      flex: 0.8,
    },
    {
      field: 'unit',
      headerName: 'Unit',
      cellStyle: { textAlign: 'right' },
      flex: 0.8,
    },
    {
      field: 'total',
      headerName: 'Total',
      cellStyle: { textAlign: 'right' },
      valueFormatter: (params) => {
        return Number(params.value).toLocaleString('en-US', {
          maximumFractionDigits: 2,
        });
      },
      flex: 0.8,
    },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtons,
      filter: false,
      flex: 1,
    },
  ];

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
    headerClass: 'flex justify-center',
  };

  return (
    <div className='relative'>
      <Navbar />
      <div className='mt-4 flex flex-col items-center justify-center '>
        <h3 className='text-3xl  text-gray-800 mb-4 '>Fruit Data</h3>
      </div>

      <div className='flex justify-start'>
        <button
          className='bg-green-500 hover:bg-green-600 hover:border-green-900 text-white px-4 py-2 rounded shadow transition duration-300'
          onClick={handleClickOpen}
        >
          Add Fruit
        </button>
      </div>

      <div className='ag-theme-quartz-dark mt-18' style={{ height: '80vh' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={pageSize}
          paginationPageSizeSelector={[10, 20, 50]}
        />
      </div>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        handleChange={handleChange}
        handleFormSubmit={handleFormSubmit}
        showError={error}
      />
    </div>
  );
}
