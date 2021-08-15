let myData = []
const getData = async () => {
    const data = await fetch('https://ashok-api.herokuapp.com/')
    return await data.json()
}
const mytable = document.getElementById('mytable')
const setData = () => {
    getData().then(data => {
        if (data.length === 0)
            mytable.innerHTML += `<tr>No Data</tr>`
        else {
            myData = data
            data.map((data) => {
                const tr = document.createElement('tr')
                tr.innerHTML = `<td>${data._id}</td> 
        <td>${data.name}</td> 
        <td>${data.email}</td> 
        <td>${data.phone}</td> 
        <td>${data.userType}</td>
        <td><button onclick=editAction("${data._id}")>Edit</button>
        <button onclick=deleteAction("${data._id}")>Delete</button></td>`
                mytable.appendChild(tr)
            })
        }
    })
}

window.onload = setData
const refreshData = () => {
    mytable.innerHTML = `<tr>
    <th>Object Id</th>
    <th>Name</th>
    <th>Email</th>
    <th>Phone No.</th>
    <th>User Type</th>
    <th>Actions</th>
    </tr>`;
    setData()
}

async function editAction(id) {

    const editContainer = document.querySelector('.edit-container');
    editContainer.style.display = 'block'
    mytable.style.display = 'none'
    const name = document.querySelector('#name')
    const email = document.querySelector('#email')
    const phone = document.querySelector('#phone')
    const userType = document.querySelector('#userType')

    let user = myData.filter(data => data._id === id)[0]
    name.value = user.name
    email.value = user.email
    phone.value = user.phone
    userType.value = user.userType

    const update = document.querySelector('#update')
    const cancel = document.querySelector('#cancel')
    cancel.addEventListener('click', () => {
        editContainer.style.display = 'none'
        mytable.style.display = 'block'
    })

    update.addEventListener('click', async () => {
        await fetch(`https://ashok-api.herokuapp.com/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newUser: {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    userType: userType.value
                }
            })
        })

        editContainer.style.display = 'none'
        mytable.style.display = 'block'
        refreshData()
    })
}
async function deleteAction(id) {
    const result = confirm("Do you want to delete")
    if (result) {
        await fetch(`https://ashok-api.herokuapp.com/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    refreshData()
}