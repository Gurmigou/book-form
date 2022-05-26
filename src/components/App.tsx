import React, {useState} from 'react';
import '../styles/App.css';
import BookForm from "./BookForm";
import {Customer, DeliveryType, Order} from "../static/Models";
import OrderedBook from "./OrderedBook";

function App() {
    const [bookName, setBookName] = useState<string>("");
    const [numberOfBooks, setNumberOfBooks] = useState<number>(0);
    const [deliveryType, setDeliveryType] = useState<DeliveryType>(DeliveryType.POST);
    const [hasFestivePackage, setHasFestivePackage] = useState<boolean>(false);
    const [customer, setCustomer] = useState<Customer>({name: "", address: ""})
    const [orders, setOrders] = useState<Order[]>([]);

    return (
        <div className="App">
            <BookForm bookName={bookName} setBookName={setBookName} numberOfBooks={numberOfBooks}
                      setNumberOfBooks={setNumberOfBooks} orders={orders} setOrders={setOrders}
                      deliveryType={deliveryType} setDeliveryType={setDeliveryType}
                      hasFestivePackage={hasFestivePackage}
                      setHasFestivePackage={setHasFestivePackage} customer={customer} setCustomer={setCustomer}
            />
            <hr/>
            <h2 style={{textAlign: "center", marginBottom: "10px"}}>Список замовлених книг</h2>
            {
                orders.map((order, index) => {
                    return <OrderedBook key={index} order={order}/>
                })
            }
        </div>
    );
}

export default App;