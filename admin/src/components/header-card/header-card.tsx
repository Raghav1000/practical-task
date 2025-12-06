import { Card, Space, Input, Button } from "antd";
import Title from "antd/es/typography/Title";
import "./header-card.css";

type Props = {
  handleSearch: (val: string) => void;
  handleOpenCreateModal: () => void;
};

const HeaderCard = (p: Props) => {
  return (
    <Card className="users-header-card">
      <div className="users-header">
        <Title level={4} className="users-title">
          Users
        </Title>

        <Space className="users-actions">
          <Input.Search
            placeholder="Search by name, username, email..."
            allowClear
            onSearch={p.handleSearch}
            className="users-search-input"
          />
          <Button type="primary" onClick={p.handleOpenCreateModal}>
            Create User
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default HeaderCard;
