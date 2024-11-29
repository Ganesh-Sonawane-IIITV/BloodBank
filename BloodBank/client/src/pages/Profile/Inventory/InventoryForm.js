import { Modal, Form, Radio, Input, message, Select } from "antd";
import React from "react";
import { getAntdInputValidation } from "../../../utils/helpers";
import { AddInventory } from "../../../apicalls/inventory";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";

const { Option } = Select;

function InventoryForm({ open, setOpen, reloadData }) {
  // Ensure that `state.users` has `currentUser`
  const { currentUser } = useSelector((state) => state.users); 
  const [form] = Form.useForm();
  const [InventoryType, setInventoryType] = React.useState("in");
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await AddInventory({
        ...values,
        InventoryType,
        organization: currentUser._id,
      });

      if (response.success) {
        message.success("Inventory Added Successfully!");
        setOpen(false);
        reloadData(); // Call this to reload data if needed
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <Modal
      title="ADD INVENTORY"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      onOk={() => form.submit()}
    >
      <Form
        layout="vertical" 
        className="flex flex-col gap-3"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Inventory Type">
          <Radio.Group
            value={InventoryType}
            onChange={(e) => setInventoryType(e.target.value)}
          >
            <Radio value="in">In</Radio>
            <Radio value="out">Out</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Blood Group"
          name="bloodGroup"
          rules={getAntdInputValidation()}
        >
          <Select>
            <Option value="A+">A+</Option>
            <Option value="A-">A-</Option>
            <Option value="B+">B+</Option>
            <Option value="B-">B-</Option>
            <Option value="AB+">AB+</Option>
            <Option value="AB-">AB-</Option>
            <Option value="O+">O+</Option>
            <Option value="O-">O-</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={InventoryType === "out" ? "Hospital Email" : "Donor Email"}
          name="email"
          rules={getAntdInputValidation()}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Quantity (ML)"
          name="quantity" 
          rules={getAntdInputValidation()}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default InventoryForm;
