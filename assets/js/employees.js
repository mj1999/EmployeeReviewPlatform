//function to toggle assign pr form display in employees page
const toggleDisplay = function () {
  let assignPrForm = null;
  let isVisible = false;
  $(document).click(function (e) {
    if (e.target.innerHTML == "Assign PR" && !isVisible) {
      element = $(e.target);
      assignPrForm = element.siblings(".assign-pr-form");
      assignPrForm.removeClass("hidden");
      isVisible = true;
    } else {
      if (assignPrForm) {
        if (e.target.tagName != "LABEL" && e.target.tagName != "SELECT") {
          assignPrForm.addClass("hidden");
          isVisible = false;
        }
      }
    }
  });
};

const addEmployee = function (addEmployeeForm) {
  addEmployeeForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/user/create",
      data: addEmployeeForm.serialize(),
      success: function (data) {
        // console.log(data);
        const newEmployee = newEmployeeDom(
          data.data.newUser,
          data.data.employees
        );
        const parent = $("#employees-display");
        parent.prepend(newEmployee);
        toggleStatus($(" .toggle-status-form", newEmployee));
        removeEmployee($(" .remove-employee-form", newEmployee));
        createReview($(" .assign-pr-form", newEmployee));
      },
      error: function (jqXHR) {
        // console.log(jqXHR);
        notification("error", jqXHR.responseJSON.message);
      },
    });
    e.target.reset();
  });
};

const removeEmployee = function (removeEmployeeForm) {
  removeEmployeeForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/user/remove",
      data: removeEmployeeForm.serialize(),
      success: function (data) {
        $(`#${data.data.id}`).remove();
        notification("success", "Employee removed successfully");
      },
      error: function (jqXHR) {
        notification("error", jqXHR.responseJSON.message);
      },
    });
  });
};

const toggleStatus = function (toggleStatusForm) {
  toggleStatusForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/user/toggle-status",
      data: toggleStatusForm.serialize(),
      success: function (data) {
        // console.log(data);
        const statusDiv = toggleStatusForm.parent().siblings(".empl-status");
        const statusData = $(" .data", statusDiv);
        if (data.data.employee.admin) {
          statusData.text("Admin");
        } else {
          statusData.text("User");
        }
        notification("success", "Employee status updated");
      },
      error: function (jqXHR) {
        // console.log(jqXHR);
        notification("error", jqXHR.responseJSON.message);
      },
    });
  });
};

const createReview = function (reviewForm) {
  reviewForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/review/create",
      data: reviewForm.serialize(),
      success: function (data) {
        console.log(data);
        notification("success", "Review created successfully");
      },
      error: function (jqXHR) {
        notification("error", jqXHR.responseJSON.message);
      },
    });
  });
};

const newEmployeeDom = function (employee, employees) {
  return $(`
    <div id="${employee._id}" class="employee-card">
      <div class="empl-id">
        <div class="header">EID</div>
        <span class="data">${employee.eid}</span>
      </div>
      <div class="empl-name">
        <div class="header">NAME</div>
        <span class="data">${employee.name}</span>
      </div>
      <div class="empl-email">
        <div class="header">EMAIL</div>
        <span class="data">${employee.email}</span>
      </div>
      <div class="empl-status">
        <div class="header">RIGHTS</div>
        <span class="data">${employee.admin ? "Admin" : "User"}</span>
      </div>
      <div class="action-items">
        <form class="remove-employee-form">
          <input type="hidden" name="id" value="${employee._id}" />
          <button type="submit" style="background-color: rgb(189, 78, 78)">
            Remove
          </button>
        </form>
        <form class="toggle-status-form">
          <input type="hidden" name="id" value="${employee._id}" />
          <button type="submit">Toggle-status</button>
        </form>
        <button class="assign-pr-button">Assign PR</button>
        <form class="assign-pr-form hidden">
          <input type="hidden" name="reviewer" value="${employee.id}" />
          <label for="reviewee">Select the reviewee from the list-></label>
          <select class="select-options" name="reviewee-id">
            ${employees.map(selectOptionsDom)} 
          </select>
          <button type="submit">Assign PR</button>
        </form>
      </div>
    </div>
    `);
};

const selectOptionsDom = function (employee) {
  return `
  <option value="${employee.id}">${employee.name}</option>
  `;
};

addEmployee($("#add-employee-form"));

for (let form of $(".toggle-status-form")) {
  toggleStatus($(form));
}

for (let form of $(".remove-employee-form")) {
  removeEmployee($(form));
}

for (let form of $(".assign-pr-form")) {
  createReview($(form));
}

toggleDisplay();

// function for Noty notifications for client side
const notification = function (type, message) {
  new Noty({
    theme: "relax",
    text: message,
    type: type,
    layout: "topRight",
    timeout: 1500,
  }).show();
};
