import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import useFirebase from "../../hooks/useFirebase";
import "./MyOrders.css";
const MyOrders = () => {
  const { user } = useFirebase();
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    fetch(
      `https://ghostly-goosebumps-39347.herokuapp.com/orders/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, [user.email]);

  const handleCancel = (id) => {
    const proceed = window.confirm("Are you sure you want to delete");
    if (proceed) {
      const url = `https://ghostly-goosebumps-39347.herokuapp.com/orders/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted Successfully");
            const remainingProducts = myOrders.filter(
              (order) => order._id !== id
            );
            setMyOrders(remainingProducts);
          }
        });
    }
  };
  return (
    <div className="my-order-area py-5">
      <div className="container">
        <div className="row py-5">
          <div className="col-md-12">
            <div className="section-title text-center">
              <h2>My Orders</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="order-single">
              <Table striped bordered responsive hover>
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th style={{ whiteSpace: "nowrap" }}>User Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{order.name}</td>
                      <td style={{ whiteSpace: "nowrap" }}>${order.price}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{order.status}</td>
                      <td>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="btn btn-danger ms-2"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
