import { Input, Form, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { setModalOpen } from "../../store/features/users/users.slice";
import type { FormInstance } from "antd/es/form";
import type { TUser, UserResponse } from "../../types/user.types";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiError } from "../../types/generic.types";

type Props = {
  form: FormInstance<TUser>;
  createUser: UseMutationResult<UserResponse, ApiError, Omit<TUser, "id">>;
  updateUser: UseMutationResult<
    UserResponse,
    ApiError,
    { id: number; data: Omit<Partial<TUser>, "id" | "email"> }
  >;
};

const UpsertUserModal = ({ form, createUser, updateUser }: Props) => {
  const dispatch = useDispatch();
  const { editingUser } = useSelector((state: RootState) => state.user);

  const handleFinish = (values: TUser) => {
    if (editingUser) {
      const updatePayload: Omit<Partial<TUser>, "id" | "email"> = {
        name: values.name,
        username: values.username,
        bio: values.bio,
      };
      updateUser.mutate(
        {
          id: editingUser.id,
          data: updatePayload,
        },
        {
          onSuccess: () => {
            message.success("User updated successfully");
            dispatch(setModalOpen(false));
            form.resetFields();
          },
          onError: (err) =>
            message.error(err.response?.data?.message ?? "Update failed"),
        }
      );
    } else {
      createUser.mutate(values, {
        onSuccess: () => {
          message.success("User created successfully");
          dispatch(setModalOpen(false));
          form.resetFields();
        },
        onError: (err) =>
          message.error(err.response?.data?.message ?? "Create failed"),
      });
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish}>
      <Form.Item<TUser> name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item<TUser>
        name="username"
        label="Username"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<TUser>
        name="email"
        label="Email"
        rules={[{ required: !editingUser }, { type: "email" }]}
      >
        <Input disabled={!!editingUser} />
      </Form.Item>

      {!editingUser && (
        <Form.Item<TUser>
          name="password"
          label="Password"
          rules={[{ required: true }, { min: 6 }]}
        >
          <Input type={"password"} />
        </Form.Item>
      )}

      <Form.Item<TUser> name="bio" label="Bio">
        <Input.TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};

export default UpsertUserModal;
