import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function formatDate(dateString) {
  const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await fetch('http://localhost:3001/api/expenses');
    const data = await response.json();
    setExpenses(data);
  };

  const addExpense = async () => {
    const response = await fetch('http://localhost:3001/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        amount,
        type,
        date: selectedDate,
      }),
    });

    const data = await response.json();
    setExpenses([...expenses, data]);
    setName('');
    setAmount('');
    setType('');
    setSelectedDate(new Date());
  };

  const deleteExpense = async (id) => {
    const response = await fetch(`http://localhost:3001/api/expenses/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedExpenses = expenses.filter((expense) => expense._id !== id);
      setExpenses(updatedExpenses);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-5 mt-5 mb-5'>
            <h3 className='mb-3 text-center' style={{color: '#000057', fontWeight: 'bold'}}>Money Tracker</h3>
            <div className='card shadow'>
              <div className='card-body'>
                <form>
                  <div className='row'>
                    <div className='col-lg-6'>
                      <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input className='form-control'
                          type="text"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label'>Amount</label>
                        <input className='form-control'
                          type="text"
                          placeholder="Amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label'>Type</label>
                        <select className='form-control'
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="">Select Type</option>
                          <option value="Cash">Cash</option>
                          <option value="Card">Card</option>
                          <option value="Wallet">Wallet</option>
                          \<option value="UPI">UPI</option>
                          <option value="Net Banking">Netbanking</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-3'>
                        <label className='form-label'>Date</label>
                        <DatePicker className='form-control'
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="MM/dd/yyyy"
                        />
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div>
                        <button className='btn btn-warning' onClick={addExpense}>Add New</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='col-lg-12 mb-5'>
            {expenses.length > 0 ? (
              <div className='card shadow'>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table mb-0'>
                      <thead>
                        <tr>
                          <th scope="col">S.No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Amount <span>(INR)</span></th>
                          <th scope="col">Type</th>
                          <th className='text-center' scope="col">Date <span>(MM/DD/YY)</span></th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.reverse().map((expense, index) => (
                          <tr key={expense._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{expense.name}</td>
                            <td>₹ {expense.amount}</td>
                            <td>{expense.type}</td>
                            <td className='text-center'>{formatDate(expense.date)}</td>
                            <td><button className='btn btn-sm btn-danger' onClick={() => deleteExpense(expense._id)}><i class="fa-solid fa-trash"></i></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <p className='mb-0 text-center' style={{fontWeight: '500', color: '#000057'}}>No expenses available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
