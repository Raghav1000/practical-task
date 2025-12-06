import { Space, Button, Popconfirm, Avatar } from "antd";
import type { TUser } from "../../../types/user.types";
import { MdDelete, MdEdit } from "react-icons/md";

interface UserColumnsProps {
  onEdit: (user: TUser) => void;
  onDelete: (id: number) => void;
}

export const userColumns = ({ onEdit, onDelete }: UserColumnsProps) => [
  { title: "ID", dataIndex: "id", key: "id" },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <div style={{ display: "flex", gap: "1rem" }}>
        <Avatar style={{ backgroundColor: "black" }} size="small">
          {name?.split("")?.[0]}
        </Avatar>
        <span>{name}</span>
      </div>
    ),
  },
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Bio", dataIndex: "bio", key: "bio" },
  {
    title: "Actions",
    key: "actions",
    render: (_: unknown, record: TUser) => (
      <Space>
        <Button
          icon={<MdEdit size={16} />}
          type="link"
          onClick={() => onEdit(record)}
        />
        <Popconfirm
          title="Are you sure delete this user?"
          onConfirm={() => onDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<MdDelete size={16} />} type="link" danger />
        </Popconfirm>
      </Space>
    ),
  },
];
