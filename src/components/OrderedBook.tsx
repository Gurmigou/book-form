import React from "react";
import {Order} from "../static/Models";
import "../styles/order.css"

function OrderedBook({order}: { order: Order }) {
    return (
      <div className={"order"}>
          <div className="order-row">
              <p>Назва книги</p>
              <p>{order.book.name}</p>
          </div>
          <div className="order-row">
              <p>Ціна книги</p>
              <p>{order.book.price}</p>
          </div>
          <div className="order-row">
              <p>Вартість замовлення</p>
              <p>{order.price}</p>
          </div>
          <div className="order-row">
              <p>Тип доставки</p>
              <p>{order.deliveryType}</p>
          </div>
          <div className="order-row">
              <p>Наявність подарунковиї упаковки</p>
              <p>{order.hasFestivePackage ? "Так" : "Ні"}</p>
          </div>
          <div className="order-row">
              <p>Ім'я замовника</p>
              <p>{order.customer.name}</p>
          </div>
          <div className="order-row">
              <p>Адреса замовника</p>
              <p>{order.customer.address}</p>
          </div>
          <hr/>
      </div>
    );
}

export default OrderedBook;