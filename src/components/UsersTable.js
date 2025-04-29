import React, { useEffect, useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { DndContext, closestCenter, PointerSensor } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';

const DraggableHeader = ({ header }) => {
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id: header.id });

    const handleSortClick = (e) => {
        e.preventDefault();
        const isSortedDesc = header.column.getIsSorted() === 'desc';
        header.column.getToggleSortingHandler()({ id: header.id, desc: !isSortedDesc });
    };

    return (
        <TableCell
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            sx={{
                fontWeight: 'bold',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                cursor: "pointer",
                userSelect: 'none',
            }}
            onClick={header.column.getCanSort() ? handleSortClick : undefined}
        >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getIsSorted() && (header.column.getIsSorted() === 'asc' ? ' ↑' : ' ↓')}
        </TableCell>
    );
};

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnOrder, setColumnOrder] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
    };

    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'ID', size: 100, enableSorting: true },
        { accessorKey: 'name', header: 'Имя', size: 150, enableSorting: true },
        { accessorKey: 'email', header: 'Email', size: 200, enableSorting: true },
        { accessorKey: 'role', header: 'Роль', size: 120, enableSorting: true },
        {
            id: 'actions',
            header: 'Действия',
            cell: ({ row }) => (
                <Box>
                    <Button variant="text" color="primary" size="small" onClick={() => handleDelete(row.original.id)}>
                        Удалить
                    </Button>
                    <Button variant="text" color="secondary" size="small" onClick={() => handleBlock(row.original.id)}>
                        Заблокировать
                    </Button>
                </Box>
            ),
            size: 200,
            enableSorting: false,
        },
    ], []);

    useEffect(() => {
        setColumnOrder(columns.map(col => col.id || col.accessorKey));
    }, [columns]);

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting, columnOrder },
        onSortingChange: setSorting,
        onColumnOrderChange: setColumnOrder,
        columnOrder,
    });

    const handleDragEnd = ({ active, over }) => {
        if (active && over && active.id !== over.id) {
            const updatedColumnOrder = arrayMove(columnOrder, columnOrder.indexOf(active.id), columnOrder.indexOf(over.id));
            setColumnOrder(updatedColumnOrder);
        }
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
        setUsers(users.filter(user => user.id !== id));
    };

    const handleBlock = async (id) => {
        await fetch(`http://localhost:5000/api/users/${id}/block`, { method: 'PUT' });
        setUsers(users.map(u => u.id === id ? { ...u, role: 'blocked' } : u));
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={[{ sensor: PointerSensor, options: { activationConstraint: { distance: 5 } } }]}
        >
            <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>Пользователи</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="users table">
                            <TableHead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <DraggableHeader key={header.id} header={header} />
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </SortableContext>
        </DndContext>
    );
};

export default UsersTable;
