const DEFAULT_IMG_URL = "https://i.ibb.co/MBtjqXQ/no-avatar.gif";

export const productColumns = [
    {
        field: "productName",
        headerName: "Product Name",
        width: 280,
    },
    {
        field: "serialNumber",
        headerName: "Product Id",
        width: 180,
    },
    {
        field: "category",
        headerName: "Category",
        width: 160,
    },
    {
        field: "weight",
        headerName: "Weight",
        width: 140,
    },
    {
        field: "price",
        headerName: "Price",
        width: 120,
        renderCell: (params) => {
            return (
                <span>{`\u09F3${params.row.price}`}</span>
            )
        }
    },
    {
        field: "sellStatus",
        headerName: "Sell Status",
        width: 140,
        renderCell: (params) => {
            return (
                <div
                    className={`${params.row.sellStatus === 'sold' ? 'bg-red-500' : 'bg-blue-500'} text-white py-1 px-4 rounded cursor-pointer`}
                >
                    <span className="capitalize"> {params.row.sellStatus}</span>
                </div>
            );
        },
    },
];