var bn;
$(document).ready(function () {

    getData();

    $('#suaThongTin').on('submit', function (e) {
        e.preventDefault();

        let ngaySinh = $("#ngaysinh").val() + "T00:00:00";
        let checkedRadio = $('input[name="gender"]:checked');
        let valueGT = checkedRadio.val();
        // Gửi request đăng ký
        axiosJWT
            .put(`/api/Patients/${bn.benhNhanId}`, {
                benhNhanId: bn.benhNhanId,
                maBenhNhan: bn.maBenhNhan,
                hoTen: $("#hoten").val(),
                ngaySinh: ngaySinh,
                loaiGioiTinh: parseInt(valueGT),
                soDienThoai: $("#sdt").val(),
                email: $("#email").val(),
                diaChi: $("#diachi").val(),
                tienSuBenhLy: $("#tiensubenhly").val()
            })
            .then(function (response) {
                console.log('Cập nhật thông tin thành công:', response);
                getData();
            })
            .catch(function (error) {
                showErrorPopup();
                console.error("Lỗi khi đăng ký:", error);
            });
    });

});
function getData() {
    var userId = localStorage.getItem("userId");
    console.log(userId);
    // $('#hotenHeader').text(localStorage.getItem(loggedInUsername));
    axiosJWT
        .get(`/api/Patients/getbyuserid/${userId}`)
        .then(function (response) {
            bn = response.data;
            display();
        })
        .catch(function (error) {
            showErrorPopup();
            console.error("Lỗi không tìm được:", error);
        });
}
function display() {
    console.log(bn);
    var username = localStorage.getItem("userName");
    $("#hotenHeader").text(bn.hoTen);
    $("#username").val(username);
    $("#hoten").val(bn.hoTen);
    $("#email").val(bn.email);
    $("#sdt").val(bn.soDienThoai);
    $("#diachi").val(bn.diaChi);
    $("#tiensubenhly").val(bn.tienSuBenhLy);
    if (bn.gioiTinh == "Nam")
        $('#male').prop('checked', true);
    else if (bn.gioiTinh == "Nữ")
        $('#female').prop('checked', true);
    else
        $('#other').prop('checked', true);
    // Lấy phần ngày bằng cách cắt chuỗi trước ký tự 'T'
    if(bn.ngaySinh != null){
        let formattedDate = bn.ngaySinh.split('T')[0];
        $("#ngaysinh").val(formattedDate);
    }
    
}


// "benhNhanId": "23ae6817-b672-4630-a67c-cfecbbc065d0",
//         "maBenhNhan": "BN009",
//         "hoTen": "Nguyen Khac Canh",
//         "hinhAnh": "canh.jpg",
//         "ngaySinh": "1985-08-15T00:00:00",
//         "loaiGioiTinh": 0,
//         "gioiTinh": "Nam",
//         "soDienThoai": "0987654321",
//         "email": "lethib@example.com",
//         "diaChi": "456 Hai Ba Trung, Hanoi",
//         "tienSuBenhLy": "Tiền sử tiểu đường"
function showErrorPopup() {
    const errorPopup = document.getElementById("error-popup");
    errorPopup.style.visibility = "visible";

    // Ẩn popup sau 3 giây
    setTimeout(() => {
        hideErrorPopup();
    }, 3000);
}
function hideErrorPopup() {
    const errorPopup = document.getElementById("error-popup");
    errorPopup.style.visibility = "hidden";
}