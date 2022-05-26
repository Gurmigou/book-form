import React, {ChangeEvent} from "react";
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Button, Checkbox, FormControl, TextField} from "@mui/material";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Book, Customer, DeliveryType, Order} from "../static/Models";
import "../styles/book-form.css";
import {books} from "../static/Content";

function BookForm({bookName, setBookName, numberOfBooks, setNumberOfBooks, orders, setOrders,
                   deliveryType, setDeliveryType, hasFestivePackage, setHasFestivePackage, customer, setCustomer}: {
    bookName: string, setBookName: any
    numberOfBooks: number, setNumberOfBooks: any,
    orders: Order[], setOrders: any, deliveryType: DeliveryType,
    setDeliveryType: any, hasFestivePackage: boolean,
    setHasFestivePackage: any, customer: Customer,
    setCustomer: any
}) {

    const onBookChange = (event: SelectChangeEvent): void => {
        setBookName(event.target.value as string);
    }

    const onNumberOfBooksChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setNumberOfBooks(parseInt(event.target.value));
    }

    const onDeliveryTypeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setDeliveryType(event.target.value);
    }

    const onHasFestivePackageChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setHasFestivePackage(event.target.checked);
    }

    const onCustomerNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setCustomer({
            ...customer,
            name: event.target.value
        });
    }

    const onCustomerAddressChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setCustomer({
            ...customer,
            address: event.target.value
        });
    }

    const calculateOrderPrice = (): number => {
        let numberOf = Number(numberOfBooks) || 0;
        const booksPrice = getBookPriceByName(bookName);

        let price = numberOf * booksPrice;

        if (deliveryType === DeliveryType.POST)
            price *= 1.05;
        if (deliveryType === DeliveryType.COURIER)
            price *= 1.15;
        if (hasFestivePackage)
            price *= 1.10;

        return price;
    }

    const getBookPriceByName = (bookName: string): number => {
        return books.find(book => book.name === bookName)?.price || 0;
    }

    const clearAllFields = () => {
        setBookName("");
        setNumberOfBooks(0);
        setDeliveryType(DeliveryType.POST);
        setHasFestivePackage(false);
        setCustomer({
            name: "",
            address: ""
        });
    }

    const isValid = (): boolean => {
        return bookName !== "" && numberOfBooks > 0 && customer.name !== "" && customer.address !== "";
    }

    const addNewOrder = () => {
        if (isValid()) {
            const newOrder: Order = {
                book: {
                    name: bookName,
                    price: getBookPriceByName(bookName)
                },
                numberOfBooks: numberOfBooks,
                price: calculateOrderPrice(),
                deliveryType: deliveryType,
                hasFestivePackage: hasFestivePackage,
                customer: customer
            };
            setOrders(orders.concat(newOrder));
            clearAllFields();
        } else {
            alert("Заповність усі поля, будь ласка!");
        }
    }

    return (
       <div>
           <div>
               <label>Оберіть книгу</label>
               <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Книга</InputLabel>
                   <Select defaultValue="" value={bookName} label="Книга" onChange={onBookChange}>
                       {
                           books.map((book: Book) => {
                               return <MenuItem key={book.name} value={book.name}>{book.name}</MenuItem>
                           })
                       }
                   </Select>
               </FormControl>
           </div>
           <div>
               <label>Кількість книг</label>
               <input type={"number"} min={1} value={numberOfBooks} onChange={onNumberOfBooksChange}/>
           </div>
           <div>
               <label>Оберіть спосіб доставки замовлення</label>
               <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="Поштою"
                           name="radio-buttons-group" value={deliveryType} onChange={onDeliveryTypeChange}>
                   <FormControlLabel value="Поштою" control={<Radio />} label="Поштою" />
                   <FormControlLabel value="Кур'єром" control={<Radio />} label="Кур'єром" />
               </RadioGroup>
           </div>

           <div>
               <FormControlLabel control={<Checkbox checked={hasFestivePackage} onChange={onHasFestivePackageChange}/>}
                                 label={"Додати подарункову упаковку до замовлення"} />
           </div>
           <div>
               <TextField id="outlined-basic" label="Ваше ім'я" variant="outlined"
                          value={customer.name} onChange={onCustomerNameChange}/>
               <TextField id="outlined-basic" label="Ваша адреса" variant="outlined"
                          value={customer.address} onChange={onCustomerAddressChange}/>
           </div>
           <div style={{fontSize: "18px"}}>
               <label>Вартість</label>
               <h3>{calculateOrderPrice()}</h3>
           </div>
           <div>
               <Button style={{marginRight: "10px"}} onClick={addNewOrder} variant="contained">Додати до замовлення</Button>
               <Button onClick={clearAllFields} variant="contained">Очистити усі поля</Button>
           </div>
       </div>
    );
}

export default BookForm;