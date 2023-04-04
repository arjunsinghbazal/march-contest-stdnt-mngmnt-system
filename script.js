var data = [];
var cnt = 0;
function addstudents(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;



//required input
if (name == '' || email == '' || age == '' || grade == '' || degree == '') {
    alert("Fill All fields")
    return;
}

cnt++;

//add data to array 
data.push({
    ID: cnt, name: name, email: email, age: age, grade: grade, degree: degree
});

localStorage.setItem("data", JSON.stringify(data));
document.getElementById('name').value = "";
document.getElementById('email').value = "";
document.getElementById('age').value = "";
document.getElementById('grade').value = "";
document.getElementById('degree').value = "";
console.log(data);
tabledata();
}

function tabledata() {
    const table = document.getElementById('tbody');
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    table.value = "";
    data.forEach((student) => {
        const row = document.createElement("tr");

        var keys = Object.keys(student);
        var id = document.createElement('td');

        const name = document.createElement('td');
        const email = document.createElement('td');
        const age = document.createElement('td');
        const grade = document.createElement('td');
        const degree = document.createElement('td');

        keys.forEach((key) => {
            if (key == 'ID') {
                id.innerHTML = student[key];
            }
            else if (key == 'name') {
                name.innerHTML = student[key];
            }
            else if (key == 'email') {
                email.innerHTML = student[key];
            }
            else if (key == 'age') {
                age.innerHTML = student[key];
            }
            else if (key == 'grade') {
                grade.innerHTML = student[key];
            }
            else
                degree.innerHTML = `<div>${
                    student[key]
                }
                </div> <div class="icons"><a onClick="edit(${student['ID']})"
                class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" 
                class='fa'>&#xf1f8;</a> </div> `;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(grade);
            row.appendChild(degree);
        })
        table.appendChild(row);
    })

}

function searchData() {
    var  input = document.getElementById("search");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("tbody");
    var tr = table.getElementsByTagName("tr");


    for (let i = 0; i < tr.length; i++) {
        var  td = tr[i].getElementsByTagName("td")[1];
        var td1 = tr[i].getElementsByTagName("td")[2];
        var td2 = tr[i].getElementsByTagName("td")[5];

        if (td || td1 || td2) {
            var  textValue = td.textContent || td.innerText;
            var  textValue1 = td1.textContent || td1.innerText;
            var  textValue2 = td2.textContent || td2.innerText;

            if (textValue.toUpperCase().indexOf(filter) > -1 || textValue1.toUpperCase().indexOf(filter) > -1 || textValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }

            else {
                tr[i].style.display = "none";
            }

        }
    }
}
function edit(id) {
    data.forEach((student) => {
        if (student['ID'] == id) {
            document.getElementById('name').value = student['name'];
            document.getElementById('email').value = student['email'];
            document.getElementById('age').value = student['age'];
            document.getElementById('grade').value = student['grade'];
            document.getElementById('degree').value = student['degree'];
            document.getElementById('btn-submit').innerText = 'Edit Student';

            document.getElementById("btn-submit").onclick = function jsFunc() {

                student['name'] = document.getElementById('name').value;
                student['email'] = document.getElementById('email').value;
                student['age'] = document.getElementById('age').value;
                student['grade'] = document.getElementById('grade').value;
                student['degree'] = document.getElementById('degree').value;

                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('age').value = "";
                document.getElementById('grade').value = "";
                document.getElementById('degree').value = "";

                document.getElementById('btn-submit').innerText = 'Add Student';

                tabledata();
            }
        }
    })
}

function del(id) {
    data.forEach((student, index) => {
        if (student['ID'] == id) {
            data.splice(index, 1);
            tabledata();
        }
    })
}

window.onload = () => {
    data = JSON.parse(localStorage.getItem('data')) || [];
    cnt = data.reduce((max, student) => Math.max(max, student.ID), 0);
    tabledata();
};

window.onbeforeunload = () => {
    localStorage.setItem('data', JSON.stringify(data));
};

