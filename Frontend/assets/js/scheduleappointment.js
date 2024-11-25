$(document).ready(function () {
  //Khi nhấn nút xem lịch khám
  $("#btnXemLichKham").click(function () {
    $("#edit-name").focus();
  });

  //Khi nhấn nút lưu
  $("#btnDatLich").click(function () {
    //1. Validate data
    //Họ tên không được để trống
    //Số điện thoại không được để trống
    //Email phải đúng định dạng
    //Ngày sinh phải nhỏ hơn ngày hiện tại
    //Ngày, giờ khám không được để trống
    //Ca khám không được để trống
    //Bác sĩ không được để trống
    let inputDate = $("#appointment-date")
    checkValidateInput(inputDate);
  });

  //Khi nhấn nút Sửa
  $("#btnEditAppointment").click(function(){
    let inputDate = $("#edit-appointment-date");
    checkValidateInput(inputDate);
  })

  $("[required]").blur(function () {
    validateInputRequired(this);
  });
  // $("select[required]").blur(function () {
  //   validateInputRequired(this);
  //   console.log(this);
  // });
});
function checkValidateInput(inputDate) {
  let dateOfBirth = $(inputDate).val();
  if (dateOfBirth) {
    dateOfBirth = new Date(dateOfBirth);
  }
  if (dateOfBirth < new Date()) {
    $(inputDate).addClass("input-error");
    $(inputDate).attr(
      "title",
      "Ngày khám không được nhỏ hơn ngày hiện tại!"
    );
  } else {
    $(inputDate).removeClass("input-error");
    $(inputDate).removeAttr("title");
  }
}

function validateInputRequired(input) {
  let value = $(input).val();
  if (value === "" || value === null) {
    $(input).addClass("input-error");
    $(input).attr("title", "Thông tin này không được phép để trống!");
  } else {
    $(input).removeClass("input-error");
    $(input).removeAttr("title");
  }
}
