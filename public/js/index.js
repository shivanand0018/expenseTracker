const expenseTable = document.getElementById('expenseTable');
var date = document.getElementById('date')
var category = document.getElementById('category')
var description = document.getElementById('description')
var amount = document.getElementById('amount')

async function addExpense(e) {
    try {
        e.preventDefault();
        console.log(date);
        if (date.value == "" || category.value == "" || description.value == "" || amount.value == "") {
            alert('Enter all details')
        }
        else {
            const obj = {
                date: date.value,
                category: category.value,
                description: description.value,
                amount: amount.value
            }
            console.log(obj);
            console.log('hello');
            const res = await axios.post('http://localhost:3000/home/post', obj)
            console.log(res);
            showData(res.data.data)
            total = total + parseInt(res.data.data.amount)
            totalAmount(total);
            date.value = '';
            category.value = '';
            description.value = '';
            amount.value = '';

        }
    }
    catch (err) {
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get('http://localhost:3000/home/getExpenses')
        console.log(res);
        for (let i = 0; i < res.data.data.length; i++) {
            showData(res.data.data[i]);
            total = total + res.data.data[i].amount;
            totalAmount(total)
        }
    }
    catch (err) {
        console.log(err);
    }
})

var total = 0;
function showData(data) {
    console.log(data);
    const date = data.date.split('T');
    let text = `<tr id=${data.id}>
                <td>${date[0]}</td>
                <td>${data.category}</td>
                <td>${data.description}</td>
                <td>$${data.amount}</td>
                <td><button onclick="editExpense(${data.id})">
                    Edit</button></td>
                <td><button class="deleteButton" onclick="deleteExpense(${data.id},${data.amount})">
                    Delete</button></td>
            </tr>`;
    expenseTable.innerHTML = expenseTable.innerHTML + text;
}

function totalAmount(amount) {
    let totalexpense = document.getElementById('total')
    totalexpense.innerHTML = `<h3>Total Expenses:$${amount}</h3>`
}

async function deleteExpense(id, amount) {
    try {
        const res = await axios.delete(`http://localhost:3000/home/delete/${id}`)
        console.log(id);
        let tr = document.getElementById(id);
        expenseTable.removeChild(tr);
        total = total - amount
        totalAmount(total);
    }
    catch (err) {
        console.log(err);
    }
}

async function editExpense(id) {
    try {
        const resp = await axios.get(`http://localhost:3000/home/getExpense/${id}`)
        console.log(resp);
        date.value = ((resp.data.data.date).split('T'))[0]
        category.value = resp.data.data.category;
        description.value = resp.data.data.description;
        amount.value = resp.data.data.amount;
        let tr = document.getElementById(id);
        expenseTable.removeChild(tr);
        total = total - resp.data.data.amount
        totalAmount(total);
        var btn = document.createElement('button')
        btn.appendChild(document.createTextNode('Update'))
        var btn1 = document.getElementById('but')
        btn1.appendChild(btn)
        btn.onclick = async () => {
            let obj = {
                date: date.value,
                category: category.value,
                description: description.value,
                amount: amount.value
            }
            const resp1 = await axios.put(`http://localhost:3000/home/updateExpense/${id}`, obj)
            console.log(resp1);
            btn1.removeChild(btn)
            showData(resp1.data.data)
            total = total + parseInt(resp1.data.data.amount)
            totalAmount(total);
            date.value = '';
            category.value = '';
            description.value = '';
            amount.value = '';
        }
    }
    catch (err) {
        console.log(err);
    }
}

