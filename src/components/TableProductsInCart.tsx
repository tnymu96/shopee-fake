import React from 'react';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const TableProductsInCart = () => {
    const { t } = useTranslation();
    const carts = useSelector((state) => state.cartSlide.cart)

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150, hideable: true },
        {
            field: 'image',
            headerName: t('content.img') || '',
            width: 80,
            sortable: false,
            align: 'center',
            renderCell: (params) => <img style={{ height: 35 }} src={params.value} />,
        },
        { field: 'title', headerName: t('content.product') || '', minWidth: 180, flex: 1 },
        {
            field: 'price',
            headerName: t('content.price') || '',
            width: 130,
            sortable: false,
            valueGetter: ({ row }) => {
                if (!row.price) {
                    return null;
                }
                return row.price + ' $';
            },
        },
        { field: 'quantity', headerName: t('content.quantity') || '', width: 140, type: 'number' },
        {
            field: 'count',
            headerName: t('content.total') || '',
            width: 130,
            type: 'number',
            sortable: false,
            valueGetter: ({ row }) => {
                if (!row.price || !row.quantity) {
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
            {
                carts.length > 0
                    ?
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
                    :
                    <div>
                        {t('content.not-product-cart')}
                    </div>
            }

        </>
    )
}

export default TableProductsInCart