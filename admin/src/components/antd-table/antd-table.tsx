import { Card, Table } from "antd";
import "./antd-table.css";
import { type TUser } from "../../types/user.types";
import type { ColumnsType } from "antd/es/table";
import type { TPagination } from "../../types/generic.types";
import { PAGE_SIZE } from "../../constants/constant";

type Props = {
  cols: ColumnsType<TUser> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  pagination: TPagination;
  setPagination: (t: TPagination) => void;
  rowKey?: string;
  loading?: boolean;
};

const AntdTable = (p: Props) => {
  return (
    <Card className="users-table-card">
      <Table
        columns={p.cols}
        dataSource={p?.data}
        size="small"
        rowKey={p?.rowKey ?? "id"}
        bordered
        loading={p?.loading}
        scroll={{ x: "max-content" }}
        pagination={{
          current: p.pagination.current,
          pageSize: p.pagination.pageSize ?? PAGE_SIZE,
          total: p.pagination.total,
          onChange: (page) =>
            p.setPagination({ ...p.pagination, current: page }),
        }}
      />
    </Card>
  );
};

export default AntdTable;
