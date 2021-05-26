import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import laptop from "../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ height: "200px", objectFit: "contain" }}
          className="p-1"
          alt={title}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
