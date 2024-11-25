var dsLK;
$(document).ready(function () {
    getData();
});

function getData() {
    // var userId = localStorage.getItem("userId");
    // $('#hotenHeader').text(localStorage.getItem(loggedInUsername));
    axiosNoJWT
        .get(`/api/v1/Appointments`)
        .then(function (response) {
            dsLK = response.data;
            console.log(dsLK);
           // display(dsLK);
        })
        .catch(function (error) {
            console.error("Lỗi không tìm được:", error);
        });
}

function display(data) {
    const tableBody = document.querySelector('#tblBenhNhan tbody');
    tableBody.innerHTML = ''; // Xóa nội dung cũ nếu có

    data.forEach((item, index) => {
        const row = `
      <tr bn-id="${item.benhNhanId}">
        <td class="chk">
          <input type="checkbox" />
        </td>
        <td class="m-data-left">${index + 1}</td>
        <td class="m-data-left">${item.maBenhNhan}</td>
        <td class="m-data-left">${item.hoTen}</td>
        <td class="m-data-left">${item.gioiTinh || "Không xác định"}</td>
        <td class="m-data-left">${formatDate(item.ngaySinh)}</td>
        <td class="m-data-left">${item.email || "Chưa có email"}</td>
        <td class="m-data-left">${item.diaChi || "Chưa có địa chỉ"}</td>
        <td>
                  <div class="m-table-tool">
                    <div class="m-edit m-tool-icon" data-bs-toggle="modal" data-bs-target="#edit-patient" data-id="${item.benhNhanId}">
                      <i class="fas fa-edit text-primary"></i>
                    </div>
                    <div class="m-delete m-tool-icon" data-bs-toggle="modal" data-bs-target="#confirm-delete">
                      <i class="fas fa-trash-alt text-danger"></i>
                    </div>
                  </div>
                </td>
      </tr>
    `;
        tableBody.innerHTML += row; // Thêm hàng vào bảng
    });
}
