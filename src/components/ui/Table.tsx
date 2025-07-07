import React from 'react';
import { clsx } from 'clsx';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto">
      <table className={clsx('w-full text-sm text-left text-slate-500', className)}>
        {children}
      </table>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead className={clsx('text-xs text-slate-700 uppercase bg-slate-50', className)}>
      {children}
    </thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return (
    <tbody className={clsx('text-slate-700', className)}>
      {children}
    </tbody>
  );
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  striped?: boolean;
  hover?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ 
  children, 
  className, 
  striped = false, 
  hover = false 
}) => {
  return (
    <tr className={clsx(
      'border-b',
      striped && 'even:bg-slate-50',
      hover && 'hover:bg-slate-50',
      className
    )}>
      {children}
    </tr>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  header?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({ 
  children, 
  className, 
  header = false 
}) => {
  const Component = header ? 'th' : 'td';
  
  return (
    <Component className={clsx(
      'px-4 py-2',
      header && 'font-medium text-slate-900',
      className
    )}>
      {children}
    </Component>
  );
};

interface MedicalTableProps {
  headers: string[];
  data: (string | React.ReactNode)[][];
  className?: string;
}

export const MedicalTable: React.FC<MedicalTableProps> = ({ 
  headers, 
  data, 
  className 
}) => {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableCell key={index} header>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} striped hover>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}; 