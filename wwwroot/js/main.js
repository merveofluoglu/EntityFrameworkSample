
var table;

const addEmployee = () => {
    const _data = {
        Id: parseInt($("#addEmployee [name='EmployeeId']").val()),
        Name: $("#addEmployee [name='Name']").val(),
        Age: parseInt($("#addEmployee [name='Age']").val()),
        Email: $("#addEmployee [name='Email']").val(),
        PhoneNumber: $("#addEmployee [name='PhoneNumber']").val(),
        Salary: $("#addEmployee [name='Salary']").val()
    };
    $.ajax({
        url: "/home/add/",
        method: "POST",
        data: _data,
        success: function (response) {
            $('#addEmployee').modal('hide');
            table.destroy();
            FillDatatable();
            toastr.success("Employee added succesfully!");
        },
        error: function () {
            alert("error");
        }
    }
    );
}

const removeEmployee = (id) => {
    $.ajax({
        url: "/home/delete/" + id,
        method: "GET",
        success: function (response) {
            table.destroy();
            FillDatatable();
            toastr.error("Employee deleted succesfully!");
        },
        error: function () {
            alert("error");
        }
    }
    );
}

const updateEmployee = () => {

    const _data = {
        Id: parseInt($("#editEmployee [name='EmployeeId']").val()),
        Name: $("#editEmployee [name='Name']").val(),
        Age: parseInt($("#editEmployee [name='Age']").val()),
        Email: $("#editEmployee [name='Email']").val(),
        PhoneNumber: $("#editEmployee [name='PhoneNumber']").val(),
        Salary: $("#editEmployee [name='Salary']").val()
    };

    $.ajax({
        url: "/home/edit/",
        method: "POST",
        data: _data,
        success: function (response) {
            $('#editEmployee').modal('hide');           
            table.destroy();
            FillDatatable();
            toastr.info("Employee updated succesfully!");
        },
        error: function () {
            alert("error");
        }
    }
    );
}

const FillDatatable = () => {

    let _selectedId = 0;
    let _selectedName;
    let _selectedAge;
    let _selectedEmail;
    let _selectedPhoneNum;
    let _selectedSalary;
    
    $.ajax({
        url: '/Home/GetEmployeeList',
        method: "GET",
        dataType: 'json',
        success: function (data) {

                table = $('#EmployeeList').DataTable({
                data: data,
                bDestroy: true,
                dom: "Bfrtip",
                columns: [
                    { title: "Id", data: "id" },
                    { title: "Name", data: "name" },
                    { title: "Age", data: "age" },
                    { title: "Email", data: "email" },
                    { title: "Phone Number", data: "phoneNumber" },
                    { title: "Salary", data: "salary" }
                ],
                select: true,
                buttons: [{
                    text: "Delete",
                    atr: {
                        id: 'delete'
                    },
                    action: function () {
                        if (_selectedId == 0)
                            alert("Please select a row!");
                        else {
                            $("#dialog").modal('show');

                            $("#confirm").off('click').click(function () {
                                $('#dialog').modal('hide');
                                removeEmployee(_selectedId);
                            });
                        }
                    }       
                },
                {
                    text: "Edit",
                    atr: {
                        id: 'edit'
                    },
                    action: function () {
                        if (_selectedId == 0)
                            alert("Please select a row!");
                        else {
                            $("#editEmployee [name='EmployeeId']").val(_selectedId);
                            $("#editEmployee [name='Name']").val(_selectedName);
                            $("#editEmployee [name='Age']").val(_selectedAge);
                            $("#editEmployee [name='Email']").val(_selectedEmail);
                            $("#editEmployee [name='PhoneNumber']").val(_selectedPhoneNum);
                            $("#editEmployee [name='Salary']").val(_selectedSalary);
                            $("#editEmployee").modal('show');
                        }
                    }
                },
                {
                    text: "Add Employee",
                    atr: {
                        id: 'add'
                    },
                    action: function () {
                        $("#addEmployee [name='Name']").val("");
                        $("#addEmployee [name='Age']").val(null);
                        $("#addEmployee [name='Email']").val("");
                        $("#addEmployee [name='PhoneNumber']").val("");
                        $("#addEmployee [name='Salary']").val(null);
                        $("#addEmployee").modal('show');
                    }
                }
                ]
            }).off("select")
            .on("select", function (e, dt, type, indexes) {
                _selectedId = dt.data().id;
                _selectedName = dt.data().name;
                _selectedAge = dt.data().age;
                _selectedEmail = dt.data().email;
                _selectedPhoneNum = dt.data().phoneNumber;
                _selectedSalary = dt.data().salary;
                });
        }
    });

}
