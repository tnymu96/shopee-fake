import React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

const TableProductsInCart = () => {

    const carts = useSelector((state) => state.cartSlide.cart)

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150, hideable: true },
        {
            field: 'image',
            headerName: 'Ảnh',
            width: 80,
            sortable: false,
            align: 'center',
            renderCell: (params) => <img style={{ height: 35 }} src={params.value} />,
        },
        { field: 'title', headerName: 'Sản phẩm', minWidth: 180, flex: 1 },
        {
            field: 'price',
            headerName: 'Đơn giá',
            width: 130,
            sortable: false,
            valueGetter: ({ row }) => {
                if (!row.price) {
                    return null;
                }
                return row.price + ' $';
            },
        },
        { field: 'quantity', headerName: 'Số lượng', width: 140, type: 'number' },
        {
            field: 'count',
            headerName: 'Số tiền',
            width: 130,
            type: 'number',
            sortable: false,
            valueGetter: ({ row }) => {
                if (!row.price) {
                    return null;
                }
                return row.price * row.quantity + ' $';
            },
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={(params) => handleDeleteProductInCart(params)}
                />
            ]
        },
    ];

    const handleDeleteProductInCart = (params) => {
        console.log(params);
    }

    return (
        <>
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    columnVisibilityModel={{
                        id: false,
                    }}
                    rows={carts}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 30, 100]}
                    checkboxSelection
                />
            </div>
        </>
    )
}

export default TableProductsInCart