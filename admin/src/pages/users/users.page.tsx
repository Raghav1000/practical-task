import { useDispatch, useSelector } from "react-redux";
import { Modal, message, Form, Spin } from "antd";
import { useEffect } from "react";
import HeaderCard from "../../components/header-card/header-card";
import AntdTable from "../../components/antd-table/antd-table";
import UpsertUserModal from "../../components/upsert-user-form/upsert-user-form";
import {
  setModalOpen,
  setEditingUser,
  setPagination,
  setSearchText,
} from "../../store/features/users/users.slice";
import {
  useUsersQuery,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../../hooks/users/users.query";
import { userColumns } from "./utils/cols";
import type { TUser } from "../../types/user.types";
import type { RootState } from "../../store/store";

const UsersPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<TUser>();
  const { modalOpen, editingUser, searchText, pagination } = useSelector(
    (state: RootState) => state.user
  );
  const { data, isLoading, isFetching, error } = useUsersQuery(
    pagination.current,
    pagination.pageSize,
    searchText
  );

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  useEffect(() => {
    if (data) {
      dispatch(
        setPagination({
          total: data.total,
          current: data.page,
          pageSize: pagination.pageSize,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  const handleSearch = (val: string) => {
    dispatch(setSearchText(val));
    dispatch(
      setPagination({
        current: 1,
        pageSize: pagination.pageSize,
      })
    );
  };

  const handleOpenCreateModal = () => {
    dispatch(setEditingUser(null));
    form.resetFields();
    dispatch(setModalOpen(true));
  };

  const handleOpenEditModal = (user: TUser) => {
    dispatch(setEditingUser(user));
    form.setFieldsValue(user);
    dispatch(setModalOpen(true));
  };

  const handleDeleteUser = (id: number) => {
    Modal.confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      okType: "danger",
      onOk: () => {
        deleteUser.mutate(id, {
          onSuccess: () => message.success("User deleted successfully"),
          onError: (err) =>
            message.error(err instanceof Error ? err.message : "Delete failed"),
        });
      },
    });
  };

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="users-page-container">
      <HeaderCard
        handleSearch={handleSearch}
        handleOpenCreateModal={handleOpenCreateModal}
      />

      <Spin spinning={isLoading}>
        <AntdTable
          cols={userColumns({
            onEdit: handleOpenEditModal,
            onDelete: handleDeleteUser,
          })}
          data={data?.data || []}
          pagination={pagination}
          setPagination={(p) => dispatch(setPagination(p))}
          loading={isFetching}
        />
      </Spin>

      <Modal
        open={modalOpen}
        title={editingUser ? "Update User" : "Create User"}
        onCancel={() => {
          dispatch(setModalOpen(false));
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={editingUser ? "Update" : "Create"}
        confirmLoading={createUser.isPending || updateUser.isPending}
      >
        <UpsertUserModal
          form={form}
          createUser={createUser}
          updateUser={updateUser}
        />
      </Modal>
    </div>
  );
};

export default UsersPage;
